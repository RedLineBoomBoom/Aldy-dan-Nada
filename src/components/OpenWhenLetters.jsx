import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
      cutout: '/mood_kangen.png',
      caption: 'Pelukan hangat Aldy selalu ada buat Nada tercinta ❤️',
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
      cutout: '/mood_lelah.png',
      caption: 'Pundak Aldy selalu siap jadi tempat ternyamanmu bersandar 🫂✨',
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
      cutout: '/mood_kesel.png',
      caption: 'Senyum lagi dong bidadariku, jangan ngambek lama-lama ya 🍦🥰',
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
      cutout: '/mood_semangat.png',
      caption: 'Aldy selalu bangga dan jadi suporter nomor 1 buat Nada! 🎓🚀💖',
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
    <section id="open-when" className="py-14 sm:py-20 px-3.5 sm:px-4 max-w-6xl mx-auto">
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

      {/* Letter Reading Modal (Rendered via React Portal directly into body for true viewport fullscreen on mobile) */}
      {activeLetter && typeof document !== 'undefined' && createPortal(
        <div
          onClick={() => setActiveLetter(null)}
          onTouchMove={(e) => {
            // Prevent background touch scrolling when dragging outside on backdrop
            if (e.target === e.currentTarget) {
              e.preventDefault();
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300 overscroll-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full h-[100dvh] sm:h-auto sm:max-h-[92vh] sm:max-w-lg bg-[#fffdfa] border-0 sm:border sm:border-rose-200 rounded-none sm:rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col overflow-hidden"
          >
            {/* Top Tape decoration (visible on desktop/tablet) */}
            <div className="hidden sm:block absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-rose-200/90 rounded -rotate-1 border border-white/60 shadow-xs z-30" />

            {/* Sticky Header with Title and Close Button */}
            <div className="sticky top-0 bg-[#fffdfa]/95 backdrop-blur-md z-20 px-5 sm:px-8 pt-4 sm:pt-6 pb-3 border-b border-rose-100 flex items-start justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl sm:text-4xl shrink-0">{activeLetter.icon}</span>
                <div>
                  <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-rose-500 block">
                    {activeLetter.badge}
                  </span>
                  <h3 className="font-romantic text-lg sm:text-2xl font-bold text-gray-900 leading-snug">
                    {activeLetter.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveLetter(null)}
                className="p-1.5 sm:p-2 rounded-full bg-rose-50 sm:bg-transparent hover:bg-rose-100 text-gray-500 hover:text-rose-600 transition cursor-pointer shrink-0"
                title="Tutup"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Scrollable Body: Content, Cutout Photo, and Signature flow in sequence with NO overlapping */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-5 space-y-6 overscroll-contain touch-pan-y no-scrollbar">
              {/* Content Body in Romantic Typography */}
              <div className="space-y-4 text-gray-800 font-romantic text-sm sm:text-base leading-relaxed">
                {activeLetter.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Transparent Couple Cutout - placed AFTER text in natural flow */}
              <div className="pt-2 pb-2 flex flex-col items-center justify-center select-none relative">
                <div className="relative w-full flex flex-col items-center justify-center">
                  {/* Soft warm romantic glow behind cutout */}
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-200/40 via-pink-100/20 to-transparent rounded-full blur-2xl pointer-events-none" />
                  <img
                    src={activeLetter.cutout || '/bg_couple_right.png'}
                    alt={activeLetter.title}
                    className="relative max-h-[220px] sm:max-h-[260px] w-auto max-w-[85%] object-contain drop-shadow-md opacity-95 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] animate-float-slow"
                  />
                  {activeLetter.caption && (
                    <span className="text-[11px] sm:text-xs font-romantic italic text-rose-500/90 mt-2 text-center px-4 tracking-wide">
                      {activeLetter.caption}
                    </span>
                  )}
                </div>
              </div>

              {/* Signature */}
              <div className="pt-3 border-t border-rose-100">
                <div className="flex items-center justify-between text-xs sm:text-sm text-rose-400">
                  <span className="font-handwriting text-3xl sm:text-2xl text-rose-700 font-bold">
                    Aldy ❤️
                  </span>
                  <span className="font-medium text-rose-500">Selalu ada untukmu</span>
                </div>
              </div>

              {/* Bottom Close Button for Mobile One-Handed Use */}
              <button
                onClick={() => setActiveLetter(null)}
                className="sm:hidden mt-2 w-full py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 hover:from-rose-600 hover:to-rose-500 text-white font-bold rounded-2xl shadow-md shadow-rose-500/20 active:scale-98 transition flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white shrink-0" />
                <span>Tutup Surat</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
