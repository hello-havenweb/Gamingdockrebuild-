import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  title: string;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onSelectIndex,
  title,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        onSelectIndex((currentIndex + 1) % images.length);
      }
      if (e.key === 'ArrowLeft') {
        onSelectIndex((currentIndex - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onSelectIndex]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fadeIn">
      {/* TOP BAR */}
      <div className="flex items-center justify-between text-white pb-4 border-b border-white/10">
        <div>
          <h4 className="font-heading font-bold text-sm sm:text-base">{title}</h4>
          <span className="text-xs text-[#9ca3af]">
            Screenshot {currentIndex + 1} of {images.length}
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close Lightbox"
          className="p-2.5 rounded-full bg-white/10 hover:bg-[#ff3045] text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* CENTER IMAGE WITH CONTROLS */}
      <div className="relative flex-1 flex items-center justify-center py-4">
        {images.length > 1 && (
          <button
            onClick={() => onSelectIndex((currentIndex - 1 + images.length) % images.length)}
            aria-label="Previous screenshot"
            className="absolute left-2 sm:left-6 z-10 p-3 rounded-full bg-black/60 hover:bg-[#ff3045] text-white backdrop-blur-md border border-white/10 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <img
          src={images[currentIndex]}
          alt={`${title} screenshot ${currentIndex + 1}`}
          className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
        />

        {images.length > 1 && (
          <button
            onClick={() => onSelectIndex((currentIndex + 1) % images.length)}
            aria-label="Next screenshot"
            className="absolute right-2 sm:right-6 z-10 p-3 rounded-full bg-black/60 hover:bg-[#ff3045] text-white backdrop-blur-md border border-white/10 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* BOTTOM THUMBNAILS */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => onSelectIndex(i)}
            className={`relative rounded-md overflow-hidden w-16 h-10 border-2 transition-all shrink-0 ${
              i === currentIndex ? 'border-[#ff3045] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={img} alt="thumb" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
