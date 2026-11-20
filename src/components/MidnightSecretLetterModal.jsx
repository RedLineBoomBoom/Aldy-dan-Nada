import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Mail, Heart, Sparkles, X, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MidnightSecretLetterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [previewUnlocked, setPreviewUnlocked] = useState(false);

  // Target date: 22 November 2026 00:00:00 WIB
  const targetDate = new Date('2026-11-22T00:00:00').getTime();
  const [isPast, setIsPast] = useState(false);
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const checkTime = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setIsPast(true);
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setCountdown({ d, h, m, s });
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const isUnlocked = isPast || previewUnlocked;

  const handleOpenModal = () => {
    if (!isUnlocked) return;
    setIsOpen(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#fbbf24', '#f59e0b', '#f43f5e', '#ec4899', '#ffffff'],
    });
  };

  return (
    <div className="mt-8 sm:mt-12 max-w-xl mx-auto px-2">
      {/* Golden Secret Envelope Teaser Card */}
      <div
        onClick={handleOpenModal}
        className={`relative rounded-3xl p-5 sm:p-7 border-2 transition-all duration-300 overflow-hidden cursor-pointer ${
          isUnlocked
            ? 'bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-yellow-500/15 border-amber-300 shadow-lg shadow-amber-500/15 hover:scale-102 sm:hover:scale-103'
            : 'bg-rose-50/70 border-dashed border-rose-300/80 hover:bg-rose-100/50'
        }`}
      >
        {/* Glow */}
        {isUnlocked && (
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-rose-400/10 to-amber-300/10 animate-pulse pointer-events-none" />
        )}

        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left relative z-10">
          {/* Lock / Envelope Icon Badge */}
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
              isUnlocked
                ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-white shadow-amber-500/30 animate-bounce-slow'
                : 'bg-rose-200 text-rose-700'
            }`}
          >
            {isUnlocked ? (
              <PartyPopper className="w-7 h-7 sm:w-8 sm:h-8" />
            ) : (
              <Lock className="w-6 h-6 sm:w-7 sm:h-7" />
            )}
          </div>

          <div className="flex-1">
            <div className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-700 mb-0.5">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>{isUnlocked ? 'Terbuka Spesial Hari H!' : 'Surat Rahasia Hari H'}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug mb-1">
              {isUnlocked
                ? '💌 Surat Rahasia 22 November: Buka Sekarang!'
                : '🔒 Terkunci Hingga Jam 00:00 (22 November 2026)'}
            </h3>

            <p className="text-xs text-gray-600 leading-relaxed">
              {isUnlocked
                ? 'Detik-detik perayaan 4 tahun kita telah tiba. Klik di sini untuk membaca surat rahasia dari Aldy!'
                : `Sabar ya sayang, surat rahasia ini baru akan terbuka otomatis dalam ${countdown.d}h ${countdown.h}j ${countdown.m}m ${countdown.s}d!`}
            </p>
          </div>
        </div>

        {/* Aldy Preview Toggle helper */}
        <div className="mt-3 pt-2.5 border-t border-rose-200/60 flex items-center justify-end">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPreviewUnlocked(!previewUnlocked);
            }}
            className="text-[10px] text-gray-400 hover:text-rose-600 underline cursor-pointer"
          >
            {previewUnlocked ? 'Kembalikan ke Mode Terkunci' : '👀 Pratinjau Surat Hari H'}
          </button>
        </div>
      </div>

      {/* Secret Letter Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-gradient-to-b from-[#fffcf8] to-[#fff7f9] border-2 border-amber-300 rounded-3xl p-5 sm:p-8 shadow-2xl text-left"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="text-center pb-4 mb-4 border-b border-rose-100">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">
                <PartyPopper className="w-3.5 h-3.5 text-amber-600" /> Hari Ini Hari Jadi Kita!
              </div>
              <h2 className="text-2xl sm:text-3xl font-romantic font-bold text-gray-900">
                Happy 4th Anniversary, Sayangku! 🌸💍
              </h2>
              <span className="text-xs text-rose-600 font-semibold">22 November 2026 • Midnight Secret Letter</span>
            </div>

            {/* Letter Content */}
            <div className="font-handwriting text-base sm:text-xl text-gray-800 leading-relaxed space-y-4">
              <p>
                Hai Nada tercinta...
              </p>
              <p>
                Tepat saat jam menunjukkan pukul 00:00 dan tanggal berganti ke <strong>22 November 2026</strong>, genap sudah 4 tahun (1.461 hari) kita berjalan berdampingan.
              </p>
              <p>
                Aldy mau bilang terima kasih dari lubuk hati yang paling dalam. Terima kasih untuk setiap tawa lepasmu yang selalu jadi obat lelah terbaik, kesabaranmu yang luar biasa, dan caramu menyayangi Aldy dengan tulus apa adanya.
              </p>
              <p>
                Dunia di luar sana mungkin sering berubah dan berisik, tapi di samping Nada, Aldy selalu merasa menemukan rumah ternyaman untuk pulang.
              </p>
              <p>
                Semoga di tahun ke-4 ini, dan tahun-tahun berikutnya yang panjang, cinta kita semakin kuat, saling menjaga, saling mendukung impian masing-masing, dan melangkah sampai pelaminan nanti.
              </p>
              <p className="text-rose-600 font-bold">
                Selamat 4 tahun perjalanan cinta kita ya sayang. Aldy sayang banget sama Nada, hari ini, besok, dan selamanya. ❤️💍
              </p>
              <div className="pt-2 text-right">
                <p className="font-bold">Dari yang selalu mencintaimu,</p>
                <p className="text-2xl text-rose-600 font-bold">Aldy ✨</p>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="mt-6 pt-4 border-t border-rose-100 text-center">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-500/20 transition active:scale-95 cursor-pointer"
              >
                Peluk Hangat dari Nada ❤️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
