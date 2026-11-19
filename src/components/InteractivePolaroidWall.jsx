import React, { useState, useMemo } from 'react';
import { Heart, Camera, Sparkles, Filter, Eye, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';

const INITIAL_BATCH = 16;
const BATCH_INCREMENT = 16;

export default function InteractivePolaroidWall({ photos = [], likes = {}, onLike, onSelectPhoto }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);

  const filteredPhotos = useMemo(() => {
    return photos.filter((p) => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'featured') return p.isFeatured;
      return p.year === parseInt(activeFilter, 10);
    });
  }, [photos, activeFilter]);

  // When filter changes, reset visible count
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setVisibleCount(INITIAL_BATCH);
  };

  // When in specific year, show all photos of that year (typically ~15).
  // When in 'all', display progressively up to visibleCount to keep mobile browser ultra-fast.
  const displayedPhotos = useMemo(() => {
    if (activeFilter !== 'all') return filteredPhotos;
    return filteredPhotos.slice(0, visibleCount);
  }, [filteredPhotos, activeFilter, visibleCount]);

  const hasMore = activeFilter === 'all' && visibleCount < filteredPhotos.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + BATCH_INCREMENT, filteredPhotos.length));
  };

  const handleShowAll = () => {
    setVisibleCount(filteredPhotos.length);
  };

  return (
    <section id="galeri" className="py-14 sm:py-20 px-3.5 sm:px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2.5 sm:mb-3">
          <Camera className="w-3.5 h-3.5" /> Galeri Polaroid Kenangan
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-romantic font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">
          Potret Cerita <span className="inline-block whitespace-nowrap">Selama 4 Tahun</span>
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-xs sm:text-base px-2">
          Setiap jepretan kamera menyimpan jutaan rasa sayang. Klik foto mana pun untuk melihat cerita lengkapnya atau berikan cinta ❤️
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
                : 'bg-white hover:bg-rose-50 text-gray-600 border border-rose-200'
            }`}
          >
            ✨ Semua ({photos.length})
          </button>
          <button
            onClick={() => handleFilterChange('featured')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-1 ${
              activeFilter === 'featured'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
                : 'bg-white hover:bg-rose-50 text-gray-600 border border-rose-200'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Spesial</span>
          </button>
          {[1, 2, 3, 4].map((yr) => (
            <button
              key={yr}
              onClick={() => handleFilterChange(String(yr))}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer ${
                activeFilter === String(yr)
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
                  : 'bg-white hover:bg-rose-50 text-gray-600 border border-rose-200'
              }`}
            >
              Tahun ke-{yr}
            </button>
          ))}
        </div>
      </div>

      {/* Polaroid Grid Layout: 2 columns on mobile, never overlapping */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
        {displayedPhotos.map((photo, index) => {
          const photoLikes = likes[photo.id] || 0;

          return (
            <div
              key={photo.id}
              onClick={() => onSelectPhoto(photo)}
              className="polaroid-card group relative bg-white p-2 pb-3.5 sm:p-3.5 sm:pb-5 rounded-xl border border-rose-100 cursor-pointer hover:scale-102 sm:hover:scale-105 hover:z-20 transition-all duration-300"
            >
              {/* Cute Washi / Masking Tape on Top */}
              <div
                className={`absolute -top-2 left-1/2 -translate-x-1/2 w-14 sm:w-20 h-4 sm:h-5 rounded-sm backdrop-blur-sm border border-white/50 shadow-sm pointer-events-none ${
                  index % 3 === 0
                    ? 'bg-rose-200/70'
                    : index % 3 === 1
                    ? 'bg-amber-100/80'
                    : 'bg-pink-200/70'
                }`}
              />

              {/* Photo Frame */}
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-rose-50 mb-2 sm:mb-3 group/frame">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading={index < 8 ? "eager" : "lazy"}
                  onError={(e) => {
                    if (!e.target.dataset.retried) {
                      e.target.dataset.retried = "true";
                      e.target.src = photo.src + "?t=" + Date.now();
                    }
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/frame:scale-105"
                />

                {/* Year tag badge */}
                <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 px-1.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-medium tracking-wide">
                  Thn {photo.year}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="p-1.5 sm:p-2 rounded-full bg-white/90 text-rose-600 shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>

              {/* Caption & Like Row */}
              <div className="px-0.5 flex items-start justify-between gap-1 sm:gap-2">
                <p className="font-handwriting text-xs sm:text-base text-gray-800 leading-snug">
                  "{photo.caption}"
                </p>

                {/* Love Button */}
                <button
                  onClick={(e) => onLike && onLike(photo.id, e)}
                  className="flex flex-col items-center shrink-0 p-1 rounded-full hover:bg-rose-50 text-rose-500 transition active:scale-90 cursor-pointer"
                  title="Kirim Love"
                >
                  <Heart
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition ${
                      photoLikes > 0 ? 'fill-rose-500 text-rose-500 scale-110' : 'text-rose-400'
                    }`}
                  />
                  {photoLikes > 0 && (
                    <span className="text-[9px] sm:text-[10px] font-bold text-rose-600 leading-none mt-0.5">
                      {photoLikes}
                    </span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progressive Load More Buttons (Ultra-fast mobile performance) */}
      {hasMore && (
        <div className="mt-8 sm:mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 text-xs sm:text-sm font-bold shadow-sm hover:shadow transition active:scale-95 cursor-pointer"
          >
            <span>Tampilkan Foto Lainnya (+{Math.min(BATCH_INCREMENT, filteredPhotos.length - visibleCount)})</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <button
            onClick={handleShowAll}
            className="text-xs text-gray-500 hover:text-rose-600 underline transition cursor-pointer"
          >
            Tampilkan Sekaligus ({filteredPhotos.length} Foto)
          </button>
        </div>
      )}
    </section>
  );
}
