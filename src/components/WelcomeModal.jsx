import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Music, Sparkles, Lock, Unlock, Clock, AlertCircle } from 'lucide-react';

export default function WelcomeModal({ onOpenWebsite }) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Check if running on local environment
  const isLocalHost = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.startsWith('192.168.') ||
    window.location.hostname.endsWith('.local')
  );

  // Optional preview toggle for local testing
  const [previewLockedOnLocal, setPreviewLockedOnLocal] = useState(false);

  // Countdown to 22 November 2026 00:00:00
  const targetDate = new Date('2026-11-22T00:00:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds, isPast: false });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Is the button currently locked?
  // - If run on local: UNLOCKED by default (unless previewLockedOnLocal is clicked)
  // - If online/production: LOCKED until countdown reaches 0 on 22 November 2026
  const isLocked = isLocalHost
    ? previewLockedOnLocal && !timeLeft.isPast
    : !timeLeft.isPast;

  // Disable scrolling on body while WelcomeModal is active
  useEffect(() => {
    if (!isDismissed) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      const preventTouch = (e) => {
        if (!e.target.closest('.modal-content')) {
          e.preventDefault();
        }
      };
      document.addEventListener('touchmove', preventTouch, { passive: false });

      return () => {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.removeEventListener('touchmove', preventTouch);
      };
    }
  }, [isDismissed]);

  const handleOpen = () => {
    if (isLocked) return;

    // Fire festive romantic confetti
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#ffe4e6', '#fbbf24'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f43f5e', '#fb7185', '#fda4af'],
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f43f5e', '#fb7185', '#fda4af'],
      });
    }, 250);

    setIsClosing(true);
    setTimeout(() => {
      setIsDismissed(true);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      onOpenWebsite();
    }, 700);
  };

  if (isDismissed) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-[#2b0f19]/80 backdrop-blur-md touch-none overscroll-none transition-all duration-700 ${
        isClosing ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <div className="modal-content relative w-full max-w-sm sm:max-w-md bg-white/95 border border-rose-200/80 rounded-3xl p-4 sm:p-8 pt-5 sm:pt-7 text-center shadow-2xl max-h-[90dvh] overflow-y-auto no-scrollbar">
        {/* Decorative background glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-rose-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-pink-200/40 rounded-full blur-2xl pointer-events-none" />

        {/* Floating Heart / Lock Icon badge */}
        <div className="relative mx-auto w-14 h-14 sm:w-20 sm:h-20 mb-2.5 sm:mb-4 flex items-center justify-center bg-gradient-to-tr from-rose-500 to-pink-400 rounded-2xl shadow-lg shadow-rose-500/25 animate-float-slow shrink-0">
          {isLocked ? (
            <Lock className="w-7 h-7 sm:w-10 sm:h-10 text-white animate-pulse" />
          ) : (
            <Heart className="w-7 h-7 sm:w-10 sm:h-10 text-white fill-white animate-heart-beat" />
          )}
          <div className="absolute -top-1 -right-1 bg-amber-400 text-amber-950 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-bold shadow flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> 4 Tahun!
          </div>
        </div>

        {/* Romantic greeting text */}
        <span className="inline-block text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-rose-500 mb-0.5 sm:mb-1">
          Surat Spesial Dari Aldy
        </span>
        <h1 className="text-lg sm:text-3xl font-romantic font-bold text-gray-900 mb-1.5 sm:mb-2 leading-tight">
          Happy 4th Anniversary, <span className="inline-block whitespace-nowrap">Nada! 🌸</span>
        </h1>
        <p className="text-[11px] sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-5 px-1">
          Nggak kerasa udah 4 tahun kita jalan bareng, ngelewatin ratusan cerita, tawa, dan kenangan indah. Ada sesuatu yang spesial buat kamu di sini...
        </p>

        {/* Live Countdown Box (Shown when locked or countdown active) */}
        {!timeLeft.isPast && (
          <div className="bg-rose-50/90 border border-rose-200/80 rounded-2xl p-2.5 sm:p-4 mb-3 sm:mb-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-rose-600 uppercase tracking-wider mb-1.5 sm:mb-2">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>
                {isLocked ? 'Terkunci Menuju 22 November 2026' : 'Countdown Menuju 22 November 2026'}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              <div className="bg-white rounded-xl p-1 sm:p-2 border border-rose-100 shadow-xs">
                <span className="block text-sm sm:text-2xl font-bold font-mono text-rose-600">
                  {timeLeft.days}
                </span>
                <span className="text-[8px] sm:text-[10px] text-gray-400 uppercase font-semibold">
                  Hari
                </span>
              </div>
              <div className="bg-white rounded-xl p-1 sm:p-2 border border-rose-100 shadow-xs">
                <span className="block text-sm sm:text-2xl font-bold font-mono text-rose-600">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[8px] sm:text-[10px] text-gray-400 uppercase font-semibold">
                  Jam
                </span>
              </div>
              <div className="bg-white rounded-xl p-1 sm:p-2 border border-rose-100 shadow-xs">
                <span className="block text-sm sm:text-2xl font-bold font-mono text-rose-600">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[8px] sm:text-[10px] text-gray-400 uppercase font-semibold">
                  Menit
                </span>
              </div>
              <div className="bg-white rounded-xl p-1 sm:p-2 border border-rose-100 shadow-xs">
                <span className="block text-sm sm:text-2xl font-bold font-mono text-rose-600">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[8px] sm:text-[10px] text-gray-400 uppercase font-semibold">
                  Detik
                </span>
              </div>
            </div>

            {isLocked && (
              <p className="text-[10px] sm:text-[11px] text-rose-500/90 mt-1.5 sm:mt-2 font-medium">
                🔒 Tombol akan otomatis terbuka begitu countdown selesai!
              </p>
            )}
          </div>
        )}

        {/* CTA Button: LOCKED vs UNLOCKED state */}
        {isLocked ? (
          <div className="w-full">
            <button
              disabled={true}
              className="w-full inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2.5 sm:py-3.5 bg-gray-200/90 text-gray-400 font-semibold text-[11px] sm:text-sm rounded-xl sm:rounded-2xl cursor-not-allowed shadow-inner transition"
            >
              <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
              <span>Terkunci • Terbuka 22 November 2026</span>
            </button>
            <p className="text-[10px] sm:text-[11px] text-gray-400 mt-1.5 sm:mt-2 italic">
              Sabar ya sayang, kenangan kita akan terbuka saat hari H tiba ❤️
            </p>
          </div>
        ) : (
          <button
            onClick={handleOpen}
            className="group relative w-full inline-flex items-center justify-center gap-2 sm:gap-2.5 px-4 py-2.5 sm:py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-medium text-xs sm:text-base rounded-xl sm:rounded-2xl shadow-xl shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <Music className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce shrink-0" />
            <span className="font-semibold tracking-wide">Buka Kenangan Kita &amp; Putar Lagu</span>
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white shrink-0" />
          </button>
        )}

        {/* Local mode indicator & testing control */}
        {isLocalHost && (
          <div className="mt-2.5 pt-2 border-t border-rose-100 flex items-center justify-between text-[10px] text-gray-400">
            <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-semibold border border-emerald-200">
              🛠️ Mode Local (Tidak Terkunci)
            </span>
            <button
              type="button"
              onClick={() => setPreviewLockedOnLocal(!previewLockedOnLocal)}
              className="text-rose-500 hover:underline cursor-pointer font-medium"
            >
              {previewLockedOnLocal ? 'Kembalikan Terbuka' : 'Tes Tampilan Terkunci'}
            </button>
          </div>
        )}

        <p className="text-[10px] sm:text-xs text-rose-400 mt-2 sm:mt-3 flex items-center justify-center gap-1">
          <span>✨ Disarankan pasang earphone untuk pengalaman terbaik</span>
        </p>
      </div>
    </div>
  );
}
