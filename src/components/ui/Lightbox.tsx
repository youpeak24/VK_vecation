import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  images: { url: string; title: string; caption?: string; location?: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  const current = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-fade-in">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
        aria-label="Close Lightbox"
      >
        <X size={26} />
      </button>

      {/* Prev button */}
      {images.length > 1 && (
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/25 rounded-full transition-colors cursor-pointer"
          aria-label="Previous Image"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {/* Main Image Container */}
      <div className="max-w-5xl max-h-[85vh] p-4 flex flex-col items-center">
        <img
          src={current.url}
          alt={current.title}
          className="max-h-[72vh] max-w-full object-contain rounded-lg shadow-2xl transition-transform duration-300"
        />
        <div className="mt-4 text-center text-white">
          <h4 className="text-lg font-heading font-semibold">{current.title}</h4>
          {current.location && <p className="text-xs text-[#00B8A9] font-medium mt-0.5">{current.location}</p>}
          {current.caption && <p className="text-sm text-slate-300 mt-1 max-w-xl mx-auto">{current.caption}</p>}
          <span className="text-xs text-slate-400 mt-2 block">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/25 rounded-full transition-colors cursor-pointer"
          aria-label="Next Image"
        >
          <ChevronRight size={28} />
        </button>
      )}
    </div>
  );
};
