import React from 'react';
import { Heart, Sparkles, ArrowUp, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Footer({ onLock }) {
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.8 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#fbbf24'],
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white/80 border-t border-rose-100 py-10 sm:py-16 px-3.5 sm:px-4 text-center mt-12 sm:mt-20 overflow-hidden">
      {/* Decorative top blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-500 mb-4 sm:mb-6 shadow-sm animate-float-slow">
          <Heart className="w-6 h-6 sm:w-7 sm:h-7 fill-rose-500 animate-heart-beat" />
        </div>

        <h3 className="text-xl sm:text-3xl font-romantic font-bold text-gray-900 mb-2 sm:mb-3">
          <span className="inline-block whitespace-nowrap">Aldy &amp; Nada</span> • <span className="inline-block whitespace-nowrap">Selamanya ❤️</span>
        </h3>

        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed mb-6 font-light px-2">
          "Terima kasih sudah menjadi bagian terindah dalam hidupku selama 4 tahun ini. Mari terus saling menjaga dan menua bersama."
        </p>

        {/* Confetti celebration button */}
        <div className="mb-6 sm:mb-8 flex flex-wrap justify-center gap-2 sm:gap-3">
          <button
            onClick={triggerConfetti}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-medium text-[11px] sm:text-sm rounded-full shadow-md shadow-rose-500/25 transition active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Rayakan Lagi 🎉</span>
          </button>

          {onLock && (
            <button
              onClick={onLock}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-rose-100 hover:bg-rose-200 text-rose-700 font-medium text-[11px] sm:text-sm rounded-full transition active:scale-95 cursor-pointer"
              title="Kunci Kembali Website"
            >
              <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Kunci Layar</span>
            </button>
          )}

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-gray-100 hover:bg-rose-50 text-gray-700 hover:text-rose-600 font-medium text-[11px] sm:text-sm rounded-full transition active:scale-95 cursor-pointer"
            title="Kembali ke Atas"
          >
            <ArrowUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Ke Atas</span>
          </button>
        </div>

        <div className="text-[11px] sm:text-xs text-rose-400 font-medium flex items-center justify-center flex-wrap gap-1 pt-4 border-t border-rose-100">
          <span>Dibuat dengan segenap cinta oleh</span>
          <span className="font-bold text-rose-600">Aldy</span>
          <span>untuk</span>
          <span className="font-bold text-rose-600">Nada</span>
          <span>❤️ 2022 - 2026</span>
        </div>
      </div>
    </footer>
  );
}
