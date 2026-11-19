import React, { useState } from 'react';
import { Mail, Heart, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LoveLetterSection() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#fbbf24'],
    });
  };

  return (
    <section id="surat-cinta" className="py-14 sm:py-20 px-3.5 sm:px-4 max-w-4xl mx-auto text-center section-opt">
      <div className="mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2.5 sm:mb-3">
          <Mail className="w-3.5 h-3.5" /> Surat Dari Hati
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-romantic font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">
          Surat Terbuka untuk <span className="inline-block whitespace-nowrap">Nada Tersayang</span>
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto text-xs sm:text-base px-2">
          Ada pesan tulus yang ingin Aldy sampaikan setelah 4 tahun perjalanan kita. Buka segel amplop di bawah ini ya:
        </p>
      </div>

      {!isOpen ? (
        /* Sealed Envelope View */
        <div className="flex justify-center px-2">
          <div
            onClick={handleOpenEnvelope}
            className="group relative w-full max-w-md bg-gradient-to-b from-rose-100 to-rose-200 border border-rose-300 rounded-3xl p-6 sm:p-12 shadow-xl sm:shadow-2xl shadow-rose-900/10 cursor-pointer hover:scale-102 sm:hover:scale-105 transition-all duration-500 overflow-hidden"
          >
            {/* Envelope flap lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                <path d="M0,0 L200,160 L400,0" fill="none" stroke="#be123c" strokeWidth="2" />
                <path d="M0,300 L160,130" fill="none" stroke="#be123c" strokeWidth="1" />
                <path d="M400,300 L240,130" fill="none" stroke="#be123c" strokeWidth="1" />
              </svg>
            </div>

            {/* Wax Seal Stamp in Center */}
            <div className="relative mx-auto w-18 h-18 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-rose-700 to-rose-500 text-white flex flex-col items-center justify-center shadow-lg shadow-rose-900/30 group-hover:scale-110 transition-transform duration-300 border-4 border-rose-300/60">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 fill-white mb-0.5 animate-heart-beat" />
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest">BUKA</span>
            </div>

            <p className="mt-5 sm:mt-6 text-xs sm:text-sm font-semibold text-rose-800 tracking-wide">
              Untuk: Nada Tersayang 🌸
            </p>
            <p className="text-[11px] sm:text-xs text-rose-600/80">
              (Klik segel merah untuk membuka surat)
            </p>
          </div>
        </div>
      ) : (
        /* Unfolded Letter Parchment */
        <div className="relative bg-[#fffdfa] border border-amber-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-12 shadow-xl sm:shadow-2xl text-left max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500">
          {/* Subtle vintage texture accent */}
          <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-5 sm:h-6 bg-rose-200/85 rounded -rotate-1 border border-white/60 shadow-xs" />

          {/* Letter Header */}
          <div className="flex items-start justify-between gap-3 border-b border-rose-100 pb-3 sm:pb-4 mb-4 sm:mb-6">
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-rose-500 block mb-0.5">
                Spesial 4 Tahun Kita • 22 November 2026
              </span>
              <h3 className="text-base sm:text-2xl font-romantic font-bold text-gray-900 leading-snug">
                Untuk Nada, Tempat Pulang <span className="inline-block whitespace-nowrap">Ternyaman Aldy</span>
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 sm:p-1.5 rounded-full hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition shrink-0 cursor-pointer"
              title="Tutup Surat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Letter Body in Romantic Typography */}
          <div className="space-y-3 sm:space-y-4 text-gray-800 font-romantic text-sm sm:text-lg leading-relaxed">
            <p>Halo, Nada sayang...</p>

            <p>
              Hari ini tepat 4 tahun sejak kita memutuskan untuk memulai perjalanan ini bersama. Kalau diingat-ingat lagi, rasanya baru kemarin kita pertama kali duduk berdua, ngobrol canggung tapi saling tersenyum bahagia.
            </p>

            <p>
              Selama 1.460+ hari ini, terima kasih ya udah jadi orang yang selalu sabar, yang senyumnya selalu jadi obat terbaik sehabis Aldy lelah beraktivitas. Terima kasih udah mau nemenin di setiap masa senang maupun susah, mendengarkan cerita-cerita random, dan selalu menerima Aldy apa adanya.
            </p>

            <p>
              Banyak hal yang berubah di dunia ini, tapi satu hal yang selalu pasti: rasa sayang dan syukur Aldy karena memiliki Nada di hidup ini. Bersama kamu, Aldy belajar arti mencintai yang tulus, saling menguatkan, dan bertumbuh jadi pribadi yang lebih baik.
            </p>

            <p>
              Semoga di tahun ke-4 ini dan tahun-tahun berikutnya, tangan kita akan selalu saling menggenggam erat. Mari terus membuat jutaan kenangan manis, tertawa bersama sampai tua, dan mewujudkan semua mimpi-mimpi kita berdua.
            </p>

            <p className="pt-1.5 font-bold text-rose-600">
              Happy 4th Anniversary, cintaku. I love you so much, more than words could ever say. ❤️
            </p>
          </div>

          {/* Letter Signature */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-rose-100 flex items-end justify-between gap-2">
            <div>
              <span className="text-[11px] sm:text-xs text-gray-400 block">Selamanya mencintaimu,</span>
              <span className="font-handwriting text-2xl sm:text-4xl text-rose-700 font-bold">
                Aldy
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] sm:text-xs text-rose-400 font-medium flex items-center gap-1">
                <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-rose-500 text-rose-500 inline" /> 4 Tahun &amp; Selamanya
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
