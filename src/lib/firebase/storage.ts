import {
  connectStorageEmulator,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { app } from './client';
import { useEmulators } from './config';
import { newId } from '../ids';

/**
 * Admin image uploads.
 *
 *  1. Preferred: Firebase Storage (`uploads/…`), returns a public URL.
 *  2. Fallback: if Storage is not enabled / reachable, the (heavily compressed)
 *     image is embedded in the record as a data URL, so uploads still work.
 *     Enable Storage (see README) and uploads switch to option 1 automatically.
 *
 * Images are always resized in the browser first, so files stay small.
 * Storage access rules live in /storage.rules.
 */
const MAX_INPUT_BYTES = 15 * 1024 * 1024; // what we accept from the user's device
const MAX_STORAGE_BYTES = 5 * 1024 * 1024; // what the Storage rules accept
const MAX_EMBEDDED_BYTES = 250 * 1024; // keeps database records (and page loads) light
const STORAGE_EDGE = 1600;
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const STORAGE_RETRY_AFTER_MS = 5 * 60 * 1000;

export interface UploadResult {
  url: string;
  /** 'cloud' = Firebase Storage URL, 'embedded' = stored inside the database record. */
  mode: 'cloud' | 'embedded';
}

let storage: ReturnType<typeof getStorage> | null = null;
let storageUnavailableUntil = 0;

function getBucket() {
  if (!storage) {
    storage = getStorage(app);
    // Fail fast (default is ~10 minutes of retries) so the fallback kicks in quickly.
    storage.maxUploadRetryTime = 8_000;
    storage.maxOperationRetryTime = 8_000;
    if (useEmulators) {
      try {
        connectStorageEmulator(storage, '127.0.0.1', 9199);
      } catch {
        /* already connected */
      }
    }
  }
  return storage;
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

async function resize(file: File, maxEdge: number, quality: number): Promise<{ blob: Blob; ext: string }> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Your browser could not process this image.');
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();

  let blob = await canvasToBlob(canvas, 'image/webp', quality);
  let ext = 'webp';
  if (!blob || blob.type !== 'image/webp') {
    blob = await canvasToBlob(canvas, 'image/jpeg', Math.min(0.9, quality + 0.05));
    ext = 'jpg';
  }
  if (!blob) throw new Error('Your browser could not process this image.');
  return { blob, ext };
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Could not read the image.'));
    reader.readAsDataURL(blob);
  });
}

/** Smallest-reasonable version of the image, embedded as a data URL. */
async function embed(file: File): Promise<UploadResult> {
  if (file.type === 'image/gif') {
    if (file.size > MAX_EMBEDDED_BYTES) {
      throw new Error('GIFs this large need Firebase Storage. Please enable it, or choose a JPG/PNG.');
    }
    return { url: await blobToDataUrl(file), mode: 'embedded' };
  }
  for (const [edge, quality] of [[1280, 0.78], [1000, 0.68], [800, 0.58]] as const) {
    const { blob } = await resize(file, edge, quality);
    if (blob.size <= MAX_EMBEDDED_BYTES) return { url: await blobToDataUrl(blob), mode: 'embedded' };
  }
  throw new Error('That image is too detailed to store without Firebase Storage. Please enable Storage or pick a smaller image.');
}

export function friendlyUploadError(error: unknown): string {
  const code = (error as { code?: string })?.code ?? '';
  if (code === 'storage/unauthorized' || code === 'storage/unauthenticated') {
    return 'You do not have permission to upload images.';
  }
  if (code === 'storage/canceled') return 'Upload cancelled.';
  return error instanceof Error && error.message ? error.message : 'Upload failed. Please try again.';
}

/** Validates, resizes and stores an image. Resolves with the URL to save on the record. */
export async function uploadImage(file: File): Promise<UploadResult> {
  if (!ACCEPTED.includes(file.type)) throw new Error('Please choose a JPG, PNG, WebP, GIF or AVIF image.');
  if (file.size > MAX_INPUT_BYTES) throw new Error('That image is larger than 15 MB. Please choose a smaller one.');

  if (Date.now() >= storageUnavailableUntil) {
    try {
      const { blob, ext } =
        file.type === 'image/gif' ? { blob: file as Blob, ext: 'gif' } : await resize(file, STORAGE_EDGE, 0.85);
      if (blob.size > MAX_STORAGE_BYTES) throw new Error('That image is still larger than 5 MB after compression.');

      const target = ref(getBucket(), `uploads/${new Date().getFullYear()}/${newId('img')}.${ext}`);
      await uploadBytes(target, blob, {
        contentType: blob.type,
        cacheControl: 'public,max-age=31536000,immutable',
      });
      return { url: await getDownloadURL(target), mode: 'cloud' };
    } catch (error) {
      const code = (error as { code?: string })?.code ?? '';
      // Real permission problems must be shown, not hidden by the fallback.
      if (code === 'storage/unauthorized' || code === 'storage/unauthenticated') throw error;
      if (!code.startsWith('storage/')) throw error; // validation / processing errors
      console.warn('[storage] unavailable, embedding image instead:', code);
      storageUnavailableUntil = Date.now() + STORAGE_RETRY_AFTER_MS;
    }
  }

  return embed(file);
}
