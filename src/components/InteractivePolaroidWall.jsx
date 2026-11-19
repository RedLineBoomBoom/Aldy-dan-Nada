import React, { useState } from 'react';
import { Heart, Camera, Sparkles, Filter, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InteractivePolaroidWall({ photos = [], likes = {}, onLike, onSelectPhoto }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredPhotos = photos.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return p.isFeatured;
    return p.year === parseInt(activeFilter, 10);
  });

  return (
    <section id="galeri" className="py-14 sm:py-20 px-3.5 sm:px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2.5 sm:mb-3">
          <Camera className="w-3.5 h-3.5" /> Galeri Polaroid Kenangan
        </div>
        <h2 className="text-2xl sm:text-5xl font-romantic font-bold text-gray-900 mb-2 sm:mb-4">
          Potret Cerita Selama 4 Tahun
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-xs sm:text-base px-2">
          Setiap jepretan kamera menyimpan jutaan rasa sayang. Klik foto mana pun untuk melihat cerita lengkapnya atau berikan cinta ❤️
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
                : 'bg-white hover:bg-rose-50 text-gray-600 border border-rose-200'
            }`}
          >
            ✨ Semua ({photos.length})
          </button>
          <button
            onClick={() => setActiveFilter('featured')}
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
              onClick={() => setActiveFilter(String(yr))}
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
        {filteredPhotos.map((photo, index) => {
          // No rotation on mobile to avoid overlapping, gentle on desktop
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
                  loading="lazy"
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
                <p className="font-handwriting text-xs sm:text-lg text-gray-800 leading-tight line-clamp-2">
                  {photo.caption}
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
    </section>
  );
}
