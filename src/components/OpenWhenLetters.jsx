import React, { useState, useEffect } from 'react';
import { Mail, Heart, Sparkles, X, Moon, Smile, Frown, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OpenWhenLetters() {
  const [activeLetter, setActiveLetter] = useState(null);

  // Lock background scroll on mobile and desktop when a letter modal is open
  useEffect(() => {
    if (activeLetter) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    }
  }, [activeLetter]);

  const letters = [
    {
      id: 'kangen',
      title: 'Saat Kamu Lagi Kangen Aldy',
      subtitle: 'Pelukan hangat dari jauh',
      icon: '🥺',
      color: 'from-rose-500 to-pink-500',
      bgLight: 'bg-rose-50',
      badge: 'Buka Saat Rindu',
      content: [
        'Hai sayangku...',
        'Kalau kamu lagi buka surat ini, pasti kamu lagi kangen banget ya sama Aldy? Percaya deh, detik ini juga Aldy pasti lagi mikirin kamu atau kangen senyum kamu.',
        'Meskipun kita lagi nggak lagi tatap muka sekarang, rasa sayang dan perhatian Aldy selalu ada di samping kamu. Coba tutup mata sebentar, bayangin pelukan hangat Aldy.',
        'Sekarang juga, langsung kirim pesan atau telepon Aldy ya! Bilang "Aldy, aku kangen", Aldy pasti langsung respon secepat kilat. I miss you more, Nada ❤️',
      ],
    },
    {
      id: 'lelah',
      title: 'Saat Kamu Lagi Capek / Lelah',
      subtitle: 'Istirahat ya, kamu udah hebat hari ini',
      icon: '🌙',
      color: 'from-indigo-500 to-purple-500',
      bgLight: 'bg-indigo-50',
      badge: 'Buka Saat Lelah',
      content: [
        'Sayangku, tarik napas pelan-pelan ya...',
        'Dunia di luar sana mungkin hari ini lagi berat, tugas atau pekerjaan mungkin bikin lelah, tapi Aldy mau ngingetin: kamu udah berjuang hebat banget hari ini. Aldy bener-bener bangga sama kamu.',
        'Jangan terlalu keras sama diri sendiri ya. Kalau lelah, istirahat dulu, nggak semua hal harus selesai hari ini. Rebahin badan, minum air hangat, dan dengerin lagu yang tenang.',
        'Pundak Aldy selalu siap kapan pun kamu butuh bersandar. Tidur nyenyak malam ini ya sayang, besok kita sambut hari baru bareng-bareng lagi 🫂✨',
      ],
    },
    {
      id: 'kesel',
      title: 'Saat Kamu Lagi Kesel sama Aldy',
      subtitle: 'Aldy minta maaf dari lubuk hati terdalam',
      icon: '😤',
      color: 'from-amber-500 to-rose-500',
      bgLight: 'bg-amber-50',
      badge: 'Buka Saat Ngambek',
      content: [
        'Duh... Aldy bikin salah apa ya sampai bidadari Aldy cemberut begini? 🥺',
        'Pertama-tama, Aldy minta maaf yang sebesar-besarnya ya sayang kalau ucapan, sikap, atau ketidaktahuan Aldy bikin hati Nada terluka atau jengkel. Aldy nggak pernah ada niat sedikit pun buat bikin kamu sedih.',
        'Nada boleh kok ngomel atau keluarin unek-uneknya ke Aldy. Aldy siap pasang telinga dan dengerin semuanya tanpa membantah.',
        'Tapi jangan lama-lama ngambeknya yaa... Aldy nggak bisa kalau dicuekin kamu lama-lama. Habis ini Aldy beliin es krim atau makanan favorit kamu ya? Senyum lagi dong sayangku 🍦❤️',
      ],
    },
    {
      id: 'semangat',
      title: 'Saat Kamu Butuh Disemangati',
      subtitle: 'Pengingat betapa luar biasanya Nada',
      icon: '🌟',
      color: 'from-emerald-500 to-teal-500',
      bgLight: 'bg-emerald-50',
      badge: 'Buka Saat Butuh Energi',
      content: [
        'Halo orang hebat kesayangan Aldy!',
        'Kalau kamu lagi merasa ragu sama kemampuanmu, ingat ini: Nada adalah wanita yang cerdas, tangguh, dan punya hati yang luar biasa. Aldy saksi hidup seberapa gigihnya kamu selama 4 tahun kita bareng.',
        'Tantangan yang lagi kamu hadapi sekarang cuma batu loncatan kecil. Kamu jauh lebih kuat dari apa yang kamu pikirkan!',
        'Aldy bakal selalu ada di garis depan buat jadi suporter nomor 1 kamu. Semangat ya cintaku, kamu pasti bisa lewatin ini dengan luar biasa! Go Nada! 🚀💖',
      ],
    },
  ];

  const handleOpenLetter = (letter) => {
    setActiveLetter(letter);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3'],
    });
  };

  return (
    <section id="open-when" className="py-14 sm:py-20 px-3.5 sm:px-4 max-w-6xl mx-auto section-opt">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2.5 sm:mb-3 whitespace-nowrap">
          <Mail className="w-3.5 h-3.5 shrink-0" />
          <span className="whitespace-nowrap">Amplop Spesial Mood</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-romantic font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">
          Surat "Open When..." <span className="inline-block whitespace-nowrap">Untuk Nada 💌</span>
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-xs sm:text-base px-2">
          Amplop-amplop kecil ini bisa kamu buka kapan pun suasana hatimu sedang membutuhkan Aldy:
        </p>
      </div>

      {/* 4 Envelopes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {letters.map((letter) => (
          <div
            key={letter.id}
            onClick={() => handleOpenLetter(letter)}
            className="group relative bg-white border border-rose-100 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
          >
            {/* Top decorative gradient bar */}
            <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${letter.color}`} />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{letter.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200/60 whitespace-nowrap">
                  {letter.badge}
                </span>
              </div>

              <h3 className="font-romantic text-lg sm:text-xl font-bold text-gray-900 mb-1 leading-snug group-hover:text-rose-600 transition">
                {letter.title}
              </h3>
              <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                {letter.subtitle}
              </p>
            </div>

            <div className="pt-3 border-t border-rose-50 flex items-center justify-between text-xs font-semibold text-rose-600">
              <span>Buka Surat</span>
              <span className="transform group-hover:translate-x-1 transition duration-200">➔</span>
            </div>
          </div>
        ))}
      </div>

      {/* Letter Reading Modal */}
      {activeLetter && (
        <div
          onClick={() => setActiveLetter(null)}
          onTouchMove={(e) => {
            // Prevent background touch scrolling when dragging outside on backdrop
            if (e.target === e.currentTarget) {
              e.preventDefault();
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300 overscroll-none touch-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#fffdfa] border border-rose-200 rounded-3xl p-6 sm:p-10 shadow-2xl animate-in zoom-in-95 duration-300 max-h-[85vh] sm:max-h-[90vh] overflow-y-auto overscroll-contain touch-pan-y no-scrollbar"
          >
            {/* Top Tape decoration */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-rose-200/90 rounded -rotate-1 border border-white/60 shadow-xs" />

            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-rose-100 pb-3 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">{activeLetter.icon}</span>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-rose-500 block">
                    {activeLetter.badge}
                  </span>
                  <h3 className="font-romantic text-lg sm:text-xl font-bold text-gray-900">
                    {activeLetter.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveLetter(null)}
                className="p-1 rounded-full hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition cursor-pointer"
                title="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body in Romantic Typography */}
            <div className="space-y-3.5 text-gray-800 font-romantic text-sm sm:text-base leading-relaxed">
              {activeLetter.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Signature */}
            <div className="mt-6 pt-4 border-t border-rose-100 flex items-center justify-between text-xs text-rose-400">
              <span className="font-handwriting text-2xl text-rose-700 font-bold">
                Aldy ❤️
              </span>
              <span>Selalu ada untukmu</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
