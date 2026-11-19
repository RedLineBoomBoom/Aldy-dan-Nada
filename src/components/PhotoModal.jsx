import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Heart, Sparkles } from 'lucide-react';

export default function PhotoModal({ photo, allPhotos = [], likes = {}, onLike, onClose, onNext, onPrev }) {
  // Always define safe close handler that unfreezes scrolling
  const handleClose = useCallback(() => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    if (onClose) onClose();
  }, [onClose]);

  // Lock body & html scroll while modal is open, and guaranteed unlock on unmount
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose, onNext, onPrev]);

  if (!photo) return null;

  const currentIndex = allPhotos.findIndex((p) => p.id === photo.id);
  const total = allPhotos.length;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh] animate-in zoom-in-95 duration-300 border border-white/20"
      >
        {/* Close Button with High Z-Index & Touch Support */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-black/90 active:scale-95 text-white flex items-center justify-center backdrop-blur-sm transition cursor-pointer shadow-lg"
          title="Tutup (Esc)"
          aria-label="Tutup Modal"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Photo Area with Next/Prev Overlay */}
        <div className="relative md:w-3/5 bg-black flex items-center justify-center overflow-hidden min-h-[220px] sm:min-h-[400px] max-h-[45vh] sm:max-h-[75vh]">
          <img
            src={photo.src}
            alt={photo.caption}
            className="w-full h-full max-h-[45vh] sm:max-h-[75vh] object-contain"
          />

          {/* Navigation Controls */}
          {total > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/25 hover:bg-white/45 text-white flex items-center justify-center backdrop-blur-sm transition cursor-pointer"
                title="Foto Sebelumnya"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/25 hover:bg-white/45 text-white flex items-center justify-center backdrop-blur-sm transition cursor-pointer"
                title="Foto Selanjutnya"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </>
          )}
        </div>

        {/* Info & Story Details Area */}
        <div className="md:w-2/5 p-4 sm:p-8 flex flex-col justify-between bg-white overflow-y-auto">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-rose-500 mb-2">
              <span className="flex items-center gap-1.5 bg-rose-50 px-2.5 py-0.5 sm:py-1 rounded-full border border-rose-200 text-[11px] sm:text-xs">
                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Tahun ke-{photo.year}
              </span>
              {total > 0 && (
                <span className="text-gray-400 text-[11px] sm:text-xs">
                  {currentIndex + 1} dari {total}
                </span>
              )}
            </div>

            <h3 className="font-romantic text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 leading-snug">
              Momen Manis Aldy &amp; Nada
            </h3>

            <p className="font-handwriting text-base sm:text-2xl text-rose-800 leading-snug mb-3 sm:mb-6 bg-rose-50/50 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-rose-100">
              "{photo.caption}"
            </p>

            <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
              {photo.tags?.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] sm:text-xs font-medium"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-3 sm:pt-4 border-t border-rose-100 flex items-center justify-between text-[11px] sm:text-xs text-gray-400">
            {onLike && (
              <button
                onClick={(e) => onLike(photo.id, e)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold transition active:scale-95 cursor-pointer"
              >
                <Heart
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition ${
                    (likes[photo.id] || 0) > 0 ? 'fill-rose-500 text-rose-500 scale-110' : 'text-rose-400'
                  }`}
                />
                <span>{(likes[photo.id] || 0) > 0 ? `${likes[photo.id]} Suka` : 'Kirim Love'}</span>
              </button>
            )}
            <span>Aldy &amp; Nada • 4th Anniversary ❤️</span>
          </div>
        </div>
      </div>
    </div>
  );
}
