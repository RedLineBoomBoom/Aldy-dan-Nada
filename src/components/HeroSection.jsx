import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Sparkles, ChevronDown, RotateCw } from 'lucide-react';
import confetti from 'canvas-confetti';

// Calculate relationship duration based on 4-year anniversary milestone
export default function HeroSection({ featuredPhotos = [] }) {
  // Tanggal jadian: 22 November 2022 -> Anniversary ke-4: 22 November 2026
  const startDate = new Date('2022-11-22T00:00:00');
  
  const [timeTogether, setTimeTogether] = useState({
    years: 4,
    days: 1461,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  useEffect(() => {
    const updateCounter = () => {
      const now = new Date();
      const diffMs = now.getTime() - startDate.getTime();

      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
      const seconds = Math.floor((diffMs / 1000) % 60);

      setTimeTogether({
        years: 4,
        days: totalDays,
        hours,
        minutes,
        seconds,
      });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNextPhoto = () => {
    if (featuredPhotos.length > 0) {
      setActivePhotoIdx((prev) => (prev + 1) % featuredPhotos.length);
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.5 },
        colors: ['#f43f5e', '#fb7185', '#fda4af'],
      });
    }
  };

  const samplePhotos = featuredPhotos.length > 0 ? featuredPhotos : [
    { src: '/photos/photo_01.webp', caption: 'Kencan pertama kita yang selalu bikin senyum ❤️' },
    { src: '/photos/photo_07.webp', caption: 'Tertawa lepas bareng kamu adalah momen terbaik ✨' },
    { src: '/photos/photo_16.webp', caption: 'Selalu ada cerita baru setiap hari sama Nada 🌸' },
    { src: '/photos/photo_31.webp', caption: 'Tempat pulang ternyaman Aldy 🥰' },
    { src: '/photos/photo_46.webp', caption: '4 tahun dan akan terus selamanya 💕' },
  ];

  const currentPhoto = samplePhotos[activePhotoIdx % samplePhotos.length];

  return (
    <section className="relative min-h-[85vh] sm:min-h-[92vh] flex flex-col justify-center items-center text-center px-3.5 sm:px-4 pt-10 pb-16 sm:pt-12 sm:pb-20 overflow-hidden">
      {/* Soft romantic backdrop blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-tr from-rose-200/40 via-pink-100/30 to-amber-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Cute Pill */}
      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-rose-100/80 border border-rose-200/90 text-rose-700 text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-sm animate-float-slow">
        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-500" />
        <span>Spesial 4 Tahun Perjalanan Cinta</span>
        <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-rose-500 text-rose-500" />
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl sm:text-6xl md:text-7xl font-romantic font-bold tracking-tight text-gray-900 mb-3 sm:mb-4 max-w-4xl leading-[1.2] px-2">
        Aldy <span className="text-rose-500 font-normal italic">&amp;</span> Nada
      </h1>

      <p className="text-sm sm:text-lg md:text-xl text-rose-950/70 max-w-2xl font-light mb-6 sm:mb-8 leading-relaxed px-2">
        Selamat hari jadi ke-4, cintaku. Terima kasih sudah menjadi alasan di balik jutaan senyum, tawa, dan rumah ternyaman bagi hatiku.
      </p>

      {/* Live Counter Cards */}
      <div className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-8 sm:mb-12">
        <div className="bg-white/80 backdrop-blur-sm border border-rose-100 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-sm hover:shadow-md transition">
          <span className="block text-xl sm:text-4xl font-bold font-romantic text-rose-600">
            {timeTogether.years}
          </span>
          <span className="text-[10px] sm:text-xs uppercase tracking-tight sm:tracking-wider font-semibold text-gray-500">
            Tahun Penuh Kasih
          </span>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-rose-100 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-sm hover:shadow-md transition">
          <span className="block text-xl sm:text-4xl font-bold font-romantic text-rose-600">
            {timeTogether.days.toLocaleString('id-ID')}
          </span>
          <span className="text-[10px] sm:text-xs uppercase tracking-tight sm:tracking-wider font-semibold text-gray-500">
            Hari Bersama
          </span>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-rose-100 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-sm hover:shadow-md transition">
          <span className="block text-xl sm:text-4xl font-bold font-romantic text-rose-600">
            {String(timeTogether.hours).padStart(2, '0')}:{String(timeTogether.minutes).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs uppercase tracking-tight sm:tracking-wider font-semibold text-gray-500">
            Jam &amp; Menit
          </span>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-rose-100 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-sm hover:shadow-md transition">
          <span className="block text-xl sm:text-4xl font-bold font-romantic text-rose-500">
            {String(timeTogether.seconds).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs uppercase tracking-tight sm:tracking-wider font-semibold text-gray-500">
            Detik Berdetak
          </span>
        </div>
      </div>

      {/* Featured Interactive Polaroid Showcase */}
      <div className="relative group max-w-[280px] sm:max-w-md w-full mb-8 sm:mb-10">
        {/* Background stack aesthetic cards - reduced rotation on mobile */}
        <div className="absolute inset-0 bg-white/60 border border-rose-100 rounded-2xl shadow-md rotate-1.5 sm:rotate-3 scale-95 pointer-events-none transition-transform group-hover:rotate-6" />
        <div className="absolute inset-0 bg-white/80 border border-rose-100 rounded-2xl shadow-md -rotate-1 sm:-rotate-2 scale-98 pointer-events-none transition-transform group-hover:-rotate-4" />

        {/* Foreground Main Polaroid */}
        <div className="relative bg-white p-3 pb-5 sm:p-4 sm:pb-6 rounded-2xl border border-rose-100 shadow-xl shadow-rose-900/10 transition-all duration-300">
          {/* Masking tape on top */}
          <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-5 sm:h-6 bg-rose-200/60 backdrop-blur-sm rounded-sm -rotate-1 border border-white/40 shadow-sm pointer-events-none" />

          {/* Photo container */}
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-rose-50 mb-3 group/img">
            <img
              src={currentPhoto.src}
              alt={currentPhoto.caption || 'Kenangan Aldy dan Nada'}
              fetchPriority="high"
              decoding="sync"
              width={400}
              height={500}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
            />
            {/* Click to shuffle badge */}
            <button
              onClick={handleNextPhoto}
              className="absolute bottom-2.5 right-2.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white/95 backdrop-blur-sm hover:bg-white text-rose-700 text-[11px] sm:text-xs font-semibold rounded-full shadow flex items-center gap-1 transition active:scale-95 cursor-pointer"
            >
              <RotateCw className="w-3 h-3" /> Ganti ({activePhotoIdx + 1}/{samplePhotos.length})
            </button>
          </div>

          <p className="font-handwriting text-base sm:text-2xl text-gray-800 text-center leading-snug px-1">
            "{currentPhoto.caption}"
          </p>
        </div>
      </div>

      {/* Action Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none">
        <a
          href="#timeline"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium text-xs sm:text-base rounded-full shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:-translate-y-0.5 transition duration-300 cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>Jelajahi 4 Tahun Kita</span>
          <ChevronDown className="w-4 h-4" />
        </a>

        <a
          href="#surat-cinta"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 font-medium text-xs sm:text-base rounded-full shadow-sm hover:shadow hover:-translate-y-0.5 transition duration-300 cursor-pointer"
        >
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          <span>Buka Surat Dari Aldy</span>
        </a>
      </div>
    </section>
  );
}
