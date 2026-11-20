import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Music, Sparkles, Lock, Unlock, Clock, AlertCircle, PartyPopper } from 'lucide-react';

export default function WelcomeModal({ onOpenWebsite }) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);
  // Dedicated celebration mode state (persists permanently, never overwritten by 1s interval)
  const [forceCelebrated, setForceCelebrated] = useState(false);

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

  // Effective celebration state: true if naturally reached or explicitly tested/celebrated
  const isCelebrationTime = forceCelebrated || timeLeft.isPast;

  // Play celebration audio fanfare/chime
  const playCelebrationChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      // Warm chord progression celebration chime: C5, E5, G5, C6
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        const startTime = ctx.currentTime + idx * 0.12;
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.exponentialRampToValueAtTime(0.25, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.9);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 1.0);
      });
    } catch (e) {
      console.warn('Audio chime notice:', e);
    }
  };

  // Grand celebration fireworks cannon
  const fireCelebrationFireworks = () => {
    // 1. Initial Massive Center Blast
    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.55 },
      colors: ['#f43f5e', '#ec4899', '#fbbf24', '#f59e0b', '#ffffff', '#a855f7'],
    });

    // 2. Dual Side Fireworks Cannons for 4 seconds
    const end = Date.now() + 3800;
    const interval = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      // Random star bursts
      confetti({
        startVelocity: 35,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random() * 0.8 + 0.1, y: Math.random() * 0.5 + 0.1 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#fbbf24', '#ffffff'],
      });
      // Left cannon
      confetti({
        particleCount: 30,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: ['#f43f5e', '#ec4899', '#fbbf24'],
      });
      // Right cannon
      confetti({
        particleCount: 30,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: ['#f43f5e', '#ec4899', '#fbbf24'],
      });
    }, 320);
  };

  const handleTriggerCelebration = () => {
    setForceCelebrated(true);
    setPreviewLockedOnLocal(false);
    fireCelebrationFireworks();
    playCelebrationChime();
  };

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        if (!hasCelebrated) {
          setHasCelebrated(true);
          fireCelebrationFireworks();
          playCelebrationChime();
        }
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
  }, [targetDate, hasCelebrated]);

  // Is the button currently locked?
  // - If celebration is active: ALWAYS UNLOCKED!
  // - If run on local: UNLOCKED by default (unless previewLockedOnLocal is clicked)
  // - If online/production: LOCKED until celebration arrives on 22 November 2026
  const isLocked = isCelebrationTime
    ? false
    : isLocalHost
    ? previewLockedOnLocal
    : true;

  // Disable scrolling on body while WelcomeModal is active
  useEffect(() => {
    if (!isDismissed) {
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = '';
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
      onOpenWebsite();
    }, 700);
  };

  if (isDismissed) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-[#2b0f19]/80 backdrop-blur-md touch-none overscroll-none select-none transition-all duration-700 ${
        isClosing ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <div className="modal-content relative w-full max-w-sm sm:max-w-md bg-white/95 border border-rose-200/80 rounded-3xl p-4 sm:p-7 pt-4.5 sm:pt-6 text-center shadow-2xl overflow-hidden touch-none overscroll-none select-none">
        {/* Decorative background glow safely contained */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none -z-10">
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-rose-200/40 rounded-full blur-2xl" />
          <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-pink-200/40 rounded-full blur-2xl" />
        </div>

        {/* Floating Heart / Lock / Party Icon badge */}
        <div
          onClick={handleTriggerCelebration}
          title={isLocked ? 'Klik untuk uji perayaan' : 'Selamat 4 Tahun!'}
          className={`relative mx-auto w-12 h-12 sm:w-16 sm:h-16 mb-2.5 sm:mb-3 flex items-center justify-center rounded-2xl shadow-lg transition-all duration-500 shrink-0 cursor-pointer ${
            isCelebrationTime
              ? 'bg-gradient-to-tr from-amber-500 via-rose-500 to-pink-500 shadow-amber-500/30 scale-105 animate-bounce-slow'
              : 'bg-gradient-to-tr from-rose-500 to-pink-400 shadow-rose-500/25 animate-float-slow'
          }`}
        >
          {isLocked ? (
            <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-pulse" />
          ) : isCelebrationTime ? (
            <PartyPopper className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-pulse" />
          ) : (
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-white animate-heart-beat" />
          )}
          <div className="absolute -top-1.5 -right-2.5 bg-amber-400 text-amber-950 text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-full font-bold shadow-md flex items-center gap-1 whitespace-nowrap select-none pointer-events-none z-20">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-950 shrink-0" />
            <span className="whitespace-nowrap font-bold">
              {isCelebrationTime ? '🎉 4 Tahun!' : '4 Tahun!'}
            </span>
          </div>
        </div>

        {/* Romantic greeting text */}
        <span className="inline-block text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-rose-500 mb-0.5 whitespace-nowrap">
          {isCelebrationTime ? '🎉 HARI INI RESMI 4 TAHUN! 🎉' : 'Surat Spesial Dari Aldy'}
        </span>
        <h1 className="text-base sm:text-2xl font-romantic font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">
          <span className="inline-block whitespace-nowrap">Happy 4th Anniversary,</span>{' '}
          <span className="inline-block whitespace-nowrap">Nada! 🌸</span>
        </h1>
        <p className="text-[11px] sm:text-sm text-gray-600 leading-relaxed mb-2.5 sm:mb-4 px-1">
          {isCelebrationTime
            ? 'Waktu yang kita tunggu-tunggu akhirnya tiba! Tepat hari ini, 22 November 2026, genap sudah 4 tahun (1.461 hari) kita berjalan bersama. Ada kenangan indah dan pesan cinta yang siap kamu buka sekarang... 💖'
            : 'Nggak kerasa udah 4 tahun kita jalan bareng, ngelewatin ratusan cerita, tawa, dan kenangan indah. Ada sesuatu yang spesial buat kamu di sini...'}
        </p>

        {/* Live Countdown Box OR Grand Celebration Banner */}
        {!isCelebrationTime ? (
          <div className="bg-rose-50/90 border border-rose-200/80 rounded-2xl p-2 sm:p-3.5 mb-2.5 sm:mb-3.5 text-center">
            <div className="flex items-center justify-center gap-1.5 text-[9.5px] sm:text-[11px] font-bold text-rose-600 uppercase tracking-wider mb-1 sm:mb-2 whitespace-nowrap">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className="whitespace-nowrap">
                {isLocked ? 'Terkunci Menuju 22 November 2026' : 'Countdown Menuju 22 November 2026'}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              <div className="bg-white rounded-xl p-1 sm:p-2 border border-rose-100 shadow-xs text-center">
                <span className="block text-xs sm:text-xl font-bold font-mono text-rose-600 whitespace-nowrap">
                  {timeLeft.days}
                </span>
                <span className="block text-[8px] sm:text-[10px] text-gray-400 uppercase font-semibold whitespace-nowrap">
                  Hari
                </span>
              </div>
              <div className="bg-white rounded-xl p-1 sm:p-2 border border-rose-100 shadow-xs text-center">
                <span className="block text-xs sm:text-xl font-bold font-mono text-rose-600 whitespace-nowrap">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="block text-[8px] sm:text-[10px] text-gray-400 uppercase font-semibold whitespace-nowrap">
                  Jam
                </span>
              </div>
              <div className="bg-white rounded-xl p-1 sm:p-2 border border-rose-100 shadow-xs text-center">
                <span className="block text-xs sm:text-xl font-bold font-mono text-rose-600 whitespace-nowrap">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="block text-[8px] sm:text-[10px] text-gray-400 uppercase font-semibold whitespace-nowrap">
                  Menit
                </span>
              </div>
              <div className="bg-white rounded-xl p-1 sm:p-2 border border-rose-100 shadow-xs text-center">
                <span className="block text-xs sm:text-xl font-bold font-mono text-rose-600 whitespace-nowrap">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="block text-[8px] sm:text-[10px] text-gray-400 uppercase font-semibold whitespace-nowrap">
                  Detik
                </span>
              </div>
            </div>

            {isLocked && (
              <p className="text-[9.5px] sm:text-[11px] text-rose-500/90 mt-1 sm:mt-1.5 font-medium leading-snug">
                🔒 Tombol akan otomatis terbuka begitu countdown selesai!
              </p>
            )}
          </div>
        ) : (
          /* Festive Celebration Banner When Countdown Finishes - Completely steady and easy to read */
          <div className="relative bg-gradient-to-br from-amber-50/95 via-rose-50/95 to-pink-50/95 border-2 border-amber-400 rounded-2xl p-3.5 sm:p-4 mb-2.5 sm:mb-3.5 text-center shadow-xl shadow-amber-500/15">
            <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-extrabold text-amber-900 uppercase tracking-wide mb-1.5">
              <PartyPopper className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0" />
              <span>Countdown Selesai • Waktunya Merayakan! 🥳</span>
            </div>
            <p className="text-xs sm:text-[13px] font-medium text-rose-950/90 leading-relaxed px-1">
              Kunci kenangan telah terbuka seutuhnya! Semua cerita, foto, dan pesan cinta dari Aldy siap untuk kamu jelajahi sekarang. ✨
            </p>
          </div>
        )}

        {/* CTA Button: LOCKED vs UNLOCKED state */}
        {isLocked ? (
          <div className="w-full">
            <button
              disabled={true}
              className="w-full inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:py-3 bg-gray-200/90 text-gray-400 font-semibold text-[11px] sm:text-sm rounded-xl sm:rounded-2xl cursor-not-allowed shadow-inner transition whitespace-nowrap"
            >
              <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
              <span className="whitespace-nowrap">Terkunci • Terbuka 22 November 2026</span>
            </button>
            <p className="text-[9.5px] sm:text-[11px] text-gray-400 mt-1 sm:mt-1.5 italic leading-snug">
              Sabar ya sayang, kenangan kita akan terbuka saat hari H tiba ❤️
            </p>
          </div>
        ) : (
          <button
            onClick={handleOpen}
            className="group relative w-full inline-flex items-center justify-center gap-2 sm:gap-2.5 px-4 py-2 sm:py-3.5 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-xs sm:text-base rounded-xl sm:rounded-2xl shadow-xl shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer whitespace-nowrap animate-bounce-slow"
          >
            <PartyPopper className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-200 shrink-0" />
            <span className="font-bold tracking-wide whitespace-nowrap">
              {isCelebrationTime ? '🎉 Masuk ke Perayaan 4 Tahun Kita 🌸' : 'Buka Kenangan Kita & Putar Lagu'}
            </span>
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white shrink-0" />
          </button>
        )}

        {/* Local mode indicator & testing control */}
        {isLocalHost && (
          <div className="mt-2.5 pt-2 border-t border-rose-100 flex items-center justify-between text-[9.5px] text-gray-400 gap-1 flex-wrap">
            <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-semibold border border-emerald-200 whitespace-nowrap">
              🛠️ Mode Local ({isCelebrationTime ? 'Perayaan Aktif' : isLocked ? 'Terkunci' : 'Hitung Mundur'})
            </span>
            <div className="flex items-center gap-2">
              {isCelebrationTime ? (
                <button
                  type="button"
                  onClick={() => {
                    setForceCelebrated(false);
                    setPreviewLockedOnLocal(false);
                  }}
                  className="text-rose-600 hover:text-rose-700 hover:underline cursor-pointer font-bold whitespace-nowrap bg-rose-50 px-2 py-0.5 rounded border border-rose-200 shadow-xs"
                  title="Kembalikan tampilan ke hitung mundur / countdown"
                >
                  ↺ Kembali ke Countdown
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleTriggerCelebration}
                  className="text-amber-800 hover:text-amber-900 font-bold hover:underline cursor-pointer whitespace-nowrap bg-amber-100 px-2 py-0.5 rounded border border-amber-300 shadow-xs"
                  title="Ledakkan kembang api, bunyi lonceng perayaan, dan buka mode selesai countdown"
                >
                  🎉 Tes Efek Perayaan
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setForceCelebrated(false);
                  setPreviewLockedOnLocal(!previewLockedOnLocal);
                }}
                className="text-gray-500 hover:underline cursor-pointer font-medium whitespace-nowrap"
              >
                {previewLockedOnLocal ? 'Buka Kunci' : 'Kunci Ulang'}
              </button>
            </div>
          </div>
        )}

        <p className="text-[9.5px] sm:text-xs text-rose-400 mt-1.5 sm:mt-2 flex items-center justify-center gap-1 whitespace-nowrap">
          <span className="whitespace-nowrap">✨ Disarankan pasang earphone untuk pengalaman terbaik</span>
        </p>
      </div>
    </div>
  );
}
