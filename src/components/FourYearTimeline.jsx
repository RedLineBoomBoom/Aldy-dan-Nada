import React, { useState } from 'react';
import { Calendar, Heart, Sparkles, MapPin, Smile, ArrowRight, Camera } from 'lucide-react';

export default function FourYearTimeline({ photos = [], onSelectPhoto }) {
  const [activeYearTab, setActiveYearTab] = useState(1);

  const chapters = [
    {
      year: 1,
      title: 'Tahun ke-1: Awal Mula Kisah Kita',
      subtitle: 'Deg-degan, malu-malu, dan awal dari segalanya',
      period: 'Tahun 1 • Awal Perjalanan',
      icon: '🌱',
      tag: 'Babak Pertama',
      description:
        'Masih ingat canggungnya obrolan pertama kita? Dari saling curi pandang, senyum malu-malu di kencan pertama, sampai akhirnya Aldy berani menggenggam tangan Nada. Di tahun pertama ini, Aldy sadar bahwa kehadiran Nada membawa warna baru yang begitu hangat.',
      quote: '“Setiap senyum manis Nada di tahun ini selalu bikin hati Aldy luluh.”',
      milestone: 'Kencan pertama & jadian manis ❤️',
    },
    {
      year: 2,
      title: 'Tahun ke-2: Ribuan Cerita & Tawa',
      subtitle: 'Makin sefrekuensi dan menjelajah dunia berdua',
      period: 'Tahun 2 • Memori Indah',
      icon: '🌻',
      tag: 'Babak Penuh Tawa',
      description:
        'Masa di mana kita mulai hafal kebiasaan konyol masing-masing. Berburu kuliner enak, jalan-jalan sore tanpa tujuan jelas, foto candid lucu, sampai ketawa ngakak bareng. Hal-hal paling sederhana sekalipun jadi terasa magis kalau dilewatin bareng kamu.',
      quote: '“Bisa jadi diri sendiri seutuhnya saat berada di sampingmu.”',
      milestone: 'Ratusan kuliner & foto lucu 🍦',
    },
    {
      year: 3,
      title: 'Tahun ke-3: Saling Menguatkan',
      subtitle: 'Melewati hari-hari lelah dengan saling merangkul',
      period: 'Tahun 3 • Cinta yang Dewasa',
      icon: '🌊',
      tag: 'Babak Kedewasaan',
      description:
        'Hubungan kita bukan hanya tentang hari-hari cerah, tapi juga tentang saling menopang di hari yang lelah. Menjadi pendengar setia saat ada keluh kesah, pelukan penenang saat sedang capek, dan alasan untuk selalu bangkit lagi. Makasih udah selalu jadi support system terbaik buat Aldy.',
      quote: '“Nada adalah rumah paling tenang di kala dunia sedang ramai.”',
      milestone: 'Saling menguatkan & bertumbuh 🫂',
    },
    {
      year: 4,
      title: 'Tahun ke-4: Empat Tahun & Selamanya',
      subtitle: 'Rasa sayang yang terus bertambah setiap detiknya',
      period: 'Tahun 4 • Menatap Masa Depan',
      icon: '💖',
      tag: 'Babak Keabadian',
      description:
        'Genap 4 tahun kita bergandengan tangan. Waktu berlalu begitu cepat, tapi perasaan kagum dan sayang Aldy ke Nada nggak pernah berkurang sedikit pun. Malah makin dalam setiap harinya. Aldy bersyukur banget punya kamu, dan Aldy ingin terus sama kamu untuk tahun-tahun selanjutnya.',
      quote: '“4 tahun yang indah, dan Aldy siap untuk ribuan tahun bersamamu ke depan.”',
      milestone: 'Empat tahun penuh cinta & doa 💍',
    },
  ];

  const currentChapter = chapters.find((c) => c.year === activeYearTab) || chapters[0];
  const yearPhotos = photos.filter((p) => p.year === activeYearTab);

  return (
    <section id="timeline" className="relative py-8 sm:py-16 px-3.5 sm:px-6 max-w-6xl mx-auto section-opt scroll-mt-6 sm:scroll-mt-10">
      {/* Section Header */}
      <div className="text-center mb-5 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2 sm:mb-2.5 whitespace-nowrap">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span className="whitespace-nowrap">Kilas Balik 4 Tahun</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-romantic font-bold text-gray-900 mb-1.5 sm:mb-3 leading-tight">
          Perjalanan Cinta <span className="inline-block">Aldy <span className="text-rose-500 italic">&amp;</span> Nada</span>
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-xs sm:text-base px-2">
          Setiap babak punya keindahannya sendiri. Klik setiap tahun di bawah untuk membuka kenangan-kenangan manis kita:
        </p>
      </div>

      {/* Interactive Tabs for Years (Grid on mobile to fit all 4 years without clipping) */}
      <div className="flex justify-center mb-4 sm:mb-8">
        <div className="grid grid-cols-4 w-full max-w-md p-1 sm:p-1.5 bg-rose-100/70 border border-rose-200/80 rounded-2xl shadow-inner gap-1 sm:gap-2">
          {chapters.map((ch) => (
            <button
              key={ch.year}
              onClick={() => setActiveYearTab(ch.year)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 px-1 sm:px-4 py-1.5 sm:py-2 rounded-xl text-center transition-all duration-300 cursor-pointer ${
                activeYearTab === ch.year
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 font-bold scale-[1.02]'
                  : 'text-gray-700 hover:text-rose-700 hover:bg-white/60 font-medium'
              }`}
            >
              <span className="text-sm sm:text-lg">{ch.icon}</span>
              <span className="text-[11px] sm:text-sm font-semibold tracking-tight whitespace-nowrap">Tahun {ch.year}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chapter Details Card */}
      <div className="bg-white/95 border border-rose-100 rounded-3xl p-3.5 sm:p-7 md:p-9 shadow-xl shadow-rose-950/5 mb-8 sm:mb-12 relative overflow-hidden transition-all duration-500">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-100/50 rounded-full blur-3xl pointer-events-none" />

        {/* Compact Chapter Header: Badges side-by-side, never wraps awkwardly */}
        <div className="relative z-10 mb-3.5 sm:mb-6 border-b border-rose-100/80 pb-3 sm:pb-5">
          <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-3 mb-2">
            <span className="inline-block text-[10px] sm:text-xs uppercase tracking-wider font-bold text-rose-500 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200/50">
              {currentChapter.period}
            </span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200/70 rounded-full text-rose-700 font-semibold text-[10px] sm:text-xs shadow-2xs">
              <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
              <span className="whitespace-nowrap">{currentChapter.milestone}</span>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-romantic font-bold text-gray-900 mb-1 leading-snug">
            {currentChapter.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 italic">
            {currentChapter.subtitle}
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed text-xs sm:text-base mb-3.5 sm:mb-5">
          {currentChapter.description}
        </p>

        <div className="bg-rose-50/70 border-l-3 sm:border-l-4 border-rose-400 px-3 py-2 sm:px-4 sm:py-3 rounded-r-xl sm:rounded-r-2xl mb-4 sm:mb-6">
          <p className="font-romantic italic text-xs sm:text-base text-rose-900 leading-snug">
            {currentChapter.quote}
          </p>
        </div>

        {/* Year Photo Grid Gallery */}
        <div>
          <div className="flex flex-row items-center justify-between gap-1 mb-3 sm:mb-4">
            <h4 className="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-1.5 whitespace-nowrap">
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-rose-500 text-rose-500 shrink-0" />
              <span>Foto Kenangan ({yearPhotos.length} Foto)</span>
            </h4>
            <span className="text-[10px] sm:text-xs text-rose-400 font-medium">Klik untuk perbesar ✨</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {yearPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => onSelectPhoto(photo)}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-rose-100/50 border border-rose-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Background placeholder while image loads */}
                <div className="absolute inset-0 flex items-center justify-center text-rose-300">
                  <Camera className="w-6 h-6 opacity-40" />
                </div>

                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    if (!e.target.dataset.retried) {
                      e.target.dataset.retried = "true";
                      e.target.src = photo.src + "?t=" + Date.now();
                    }
                  }}
                  className="relative z-10 w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 sm:p-2.5 text-white">
                  <p className="font-handwriting text-xs sm:text-base leading-snug">
                    "{photo.caption}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
