// Unambiguous alphabet (no 0/O, 1/I/L) so references are easy to read out over the phone.
const ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

function randomChars(length: number): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('');
}

/** Collision-safe record id, e.g. `pkg-lq3x9k2mpx` (time-ordered + random suffix). */
export function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}${randomChars(3).toLowerCase()}`;
}

/** Human-friendly reference, e.g. `VK-2026-K7M2P` or `VK-BK-2026-7QX4D`. */
export function newReference(prefix: string): string {
  return `${prefix}-${new Date().getFullYear()}-${randomChars(5)}`;
}
