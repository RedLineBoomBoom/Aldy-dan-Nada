import React, { useState } from 'react';
import { Calendar, Heart, Sparkles, MapPin, Smile, ArrowRight } from 'lucide-react';

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
      milestone: 'Kencan pertama & momen jadian yang tak terlupakan ❤️',
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
      milestone: 'Ratusan tempat kuliner & foto lucu tak terhitung 🍦',
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
      milestone: 'Belajar saling mengerti, memaafkan, dan tumbuh dewasa bersama 🫂',
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
      milestone: 'Empat tahun penuh cinta, komitmen, dan mimpi masa depan 💍',
    },
  ];

  const currentChapter = chapters.find((c) => c.year === activeYearTab) || chapters[0];
  const yearPhotos = photos.filter((p) => p.year === activeYearTab);

  return (
    <section id="timeline" className="relative py-20 px-4 max-w-6xl mx-auto section-opt">
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-3">
          <Calendar className="w-3.5 h-3.5" /> Kilas Balik 4 Tahun
        </div>
        <h2 className="text-3xl sm:text-5xl font-romantic font-bold text-gray-900 mb-4">
          Perjalanan Cinta Aldy <span className="text-rose-500 italic">&amp;</span> Nada
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
          Setiap babak punya keindahannya sendiri. Klik setiap tahun di bawah untuk membuka kenangan-kenangan manis kita:
        </p>
      </div>

      {/* Interactive Tabs for Years */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1.5 bg-rose-100/70 border border-rose-200/80 rounded-2xl shadow-inner gap-1 sm:gap-2 max-w-full overflow-x-auto no-scrollbar">
          {chapters.map((ch) => (
            <button
              key={ch.year}
              onClick={() => setActiveYearTab(ch.year)}
              className={`flex items-center gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer whitespace-nowrap ${
                activeYearTab === ch.year
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-100'
                  : 'text-gray-700 hover:text-rose-700 hover:bg-white/60'
              }`}
            >
              <span className="text-base sm:text-lg">{ch.icon}</span>
              <span className="font-semibold">Tahun {ch.year}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chapter Details Card */}
      <div className="bg-white/90 border border-rose-100 rounded-3xl p-6 sm:p-10 shadow-xl shadow-rose-950/5 mb-12 relative overflow-hidden transition-all duration-500">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-rose-100/80 pb-6">
          <div>
            <span className="inline-block text-xs uppercase tracking-wider font-bold text-rose-500 mb-1.5">
              {currentChapter.period}
            </span>
            <h3 className="text-2xl sm:text-3xl font-romantic font-bold text-gray-900 mb-1">
              {currentChapter.title}
            </h3>
            <p className="text-sm text-gray-500 italic">
              {currentChapter.subtitle}
            </p>
          </div>

          <div className="self-start md:self-center px-4 py-2 bg-rose-50 border border-rose-200/60 rounded-2xl flex items-center gap-2 text-rose-700 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{currentChapter.milestone}</span>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-6">
          {currentChapter.description}
        </p>

        <div className="bg-rose-50/70 border-l-4 border-rose-400 p-4 rounded-r-2xl mb-8">
          <p className="font-romantic italic text-base sm:text-lg text-rose-900">
            {currentChapter.quote}
          </p>
        </div>

        {/* Year Photo Grid Gallery */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
            <h4 className="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-rose-500 text-rose-500 shrink-0" />
              <span>Foto Kenangan Tahun ke-{activeYearTab} ({yearPhotos.length} Foto)</span>
            </h4>
            <span className="text-[10px] sm:text-xs text-gray-400">Klik foto untuk memperbesar ✨</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {yearPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => onSelectPhoto(photo)}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-rose-100/50 border border-rose-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  decoding="async"
                  width={300}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 text-white">
                  <p className="font-handwriting text-base leading-tight line-clamp-2">
                    {photo.caption}
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
