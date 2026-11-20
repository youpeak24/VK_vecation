import React, { useRef, useState } from 'react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { friendlyUploadError, uploadImage } from '../../lib/firebase/storage';

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  placeholder?: string;
}

/**
 * Image picker for the admin: choose a file (or drop one) to upload it, or
 * paste an image URL. Shows a live preview either way.
 */
export const ImageField: React.FC<ImageFieldProps> = ({ label, value, onChange, required, placeholder }) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setNotice(null);
    setUploading(true);
    try {
      const { url, mode } = await uploadImage(file);
      onChange(url);
      if (mode === 'embedded') {
        setNotice('Image saved inside the database (Firebase Storage is not enabled yet). It works fine; enable Storage for best performance.');
      }
    } catch (err) {
      setError(friendlyUploadError(err));
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = ''; // allow re-picking the same file
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        void handleFile(e.dataTransfer.files?.[0]);
      }}
      className={`rounded-xl transition-colors ${dragging ? 'bg-blue-50 ring-2 ring-[#0866D9]/30' : ''}`}
    >
      <label className="block font-heading font-bold text-slate-700 mb-1">
        {label}
        {required ? ' *' : ''}
      </label>

      <div className="flex gap-3 items-start">
        <div className="w-16 h-16 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden shrink-0 flex items-center justify-center">
          {value ? (
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
              }}
              onLoad={(e) => {
                (e.currentTarget as HTMLImageElement).style.visibility = 'visible';
              }}
            />
          ) : (
            <ImagePlus size={20} className="text-slate-300" />
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-2">
          <input
            type="url"
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder ?? 'https://… or upload an image'}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20 focus:border-[#0866D9] text-xs"
          />

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInput.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-heading font-bold transition-colors disabled:opacity-60 cursor-pointer"
            >
              {uploading ? <Loader2 size={13} className="animate-spin" /> : <ImagePlus size={13} />}
              <span>{uploading ? 'Uploading…' : 'Choose image'}</span>
            </button>
            {value && !uploading && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="inline-flex items-center gap-1 px-2 py-1.5 text-[11px] text-slate-500 hover:text-rose-600 cursor-pointer"
              >
                <X size={12} />
                <span>Remove</span>
              </button>
            )}
            <span className="text-[10px] text-slate-400">or drag &amp; drop · JPG, PNG, WebP · auto-resized</span>
          </div>

          {error && <p className="text-[11px] text-rose-600">{error}</p>}
          {notice && !error && <p className="text-[11px] text-amber-600">{notice}</p>}
        </div>
      </div>

      <input
        ref={fileInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        className="hidden"
        onChange={(e) => void handleFile(e.target.files?.[0])}
      />
    </div>
  );
};

export default ImageField;
