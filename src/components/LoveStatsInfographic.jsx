import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MessageCircleHeart, PhoneCall, Camera, Utensils, Compass, Heart, Sparkles } from 'lucide-react';

export default function LoveStatsInfographic() {
  const [liveSeconds, setLiveSeconds] = useState(0);

  useEffect(() => {
    // Tanggal jadian: 22 November 2022 00:00:00 WIB (UTC+7)
    const startDate = new Date('2022-11-22T00:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diffInSeconds = Math.max(0, Math.floor((now - startDate) / 1000));
      setLiveSeconds(diffInSeconds);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: Calendar,
      number: '1.461',
      unit: 'Hari',
      label: 'Hari Penuh Makna',
      desc: 'Setiap matahari terbit selalu ada alasan baru untuk bersyukur memilikimu.',
      color: 'from-rose-500 to-pink-500',
      shadow: 'shadow-rose-500/15',
      bgColor: 'bg-rose-50/80',
      badge: '4 Tahun Penuh',
    },
    {
      icon: Clock,
      number: '35.064+',
      unit: 'Jam',
      label: 'Waktu Saling Menyayangi',
      desc: 'Waktu yang kita lalui bersama selalu terasa begitu singkat dan berharga.',
      color: 'from-pink-500 to-rose-400',
      shadow: 'shadow-pink-500/15',
      bgColor: 'bg-pink-50/80',
      badge: 'Non-stop',
    },
    {
      icon: MessageCircleHeart,
      number: '100.000+',
      unit: 'Pesan',
      label: 'Obrolan & Cerita Chat',
      desc: 'Dari sapaan selamat pagi, kabar harian, stiker lucu, hingga curhatan hati.',
      color: 'from-amber-500 to-rose-400',
      shadow: 'shadow-amber-500/15',
      bgColor: 'bg-amber-50/80',
      badge: 'Setiap Hari',
    },
    {
      icon: PhoneCall,
      number: '1.200+',
      unit: 'Jam',
      label: 'Telepon & Video Call',
      desc: 'Menemani hari-hari lelah sampai salah satu dari kita ketiduran di layar.',
      color: 'from-rose-600 to-red-400',
      shadow: 'shadow-rose-600/15',
      bgColor: 'bg-rose-50/80',
      badge: 'Suara Ternyaman',
    },
    {
      icon: Camera,
      number: '60',
      unit: 'Foto',
      label: 'Potret Kenangan Pilihan',
      desc: 'Momen-momen terbaik berdua yang dirangkum rapi di galeri polaroid ini.',
      color: 'from-fuchsia-500 to-pink-500',
      shadow: 'shadow-fuchsia-500/15',
      bgColor: 'bg-fuchsia-50/80',
      badge: 'Kenangan Abadi',
    },
    {
      icon: Utensils,
      number: 'Ratusan',
      unit: 'Menu',
      label: 'Kencan Kuliner Favorit',
      desc: 'Makan enak bareng dari pinggir jalan sampai tempat makan favorit kita berdua.',
      color: 'from-orange-500 to-amber-500',
      shadow: 'shadow-orange-500/15',
      bgColor: 'bg-orange-50/80',
      badge: 'Perut Senang',
    },
    {
      icon: Compass,
      number: 'Ribuan',
      unit: 'KM',
      label: 'Langkah Bersama',
      desc: 'Jarak yang kita tempuh berdua, saling mengunjungi dan jalan-jalan santai.',
      color: 'from-pink-600 to-rose-500',
      shadow: 'shadow-pink-600/15',
      bgColor: 'bg-pink-50/80',
      badge: 'Satu Arah',
    },
    {
      icon: Heart,
      number: '∞',
      unit: 'Kadar Cinta',
      label: 'Sayang Aldy ke Nada',
      desc: 'Rasa sayang yang tak terhingga dan akan terus tumbuh semakin dalam setiap harinya.',
      color: 'from-rose-500 to-red-500',
      shadow: 'shadow-rose-500/25',
      bgColor: 'bg-rose-100/80',
      badge: 'Selamanya ❤️',
    },
  ];

  return (
    <section id="statistik" className="py-14 sm:py-20 px-3.5 sm:px-4 max-w-6xl mx-auto section-opt">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2.5 sm:mb-3 whitespace-nowrap">
          <Sparkles className="w-3.5 h-3.5 shrink-0" /> Infografis Cinta • 4 Tahun Bersama
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-romantic font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">
          Angka di Balik <span className="inline-block whitespace-nowrap text-rose-600">Kisah Kita</span>
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-xs sm:text-base px-2">
          Bukan sekadar angka, tapi setiap detiknya adalah bukti nyata betapa berharganya 4 tahun yang telah kita lalui bersama.
        </p>
      </div>

      {/* Grid of Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 mb-8 sm:mb-12">
        {stats.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={idx}
              className={`relative rounded-2xl p-3.5 sm:p-5 border border-rose-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group overflow-hidden`}
            >
              {/* Subtle gradient blob on hover */}
              <div
                className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-tr ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity blur-xl pointer-events-none`}
              />

              <div>
                {/* Top row: Icon & Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr ${stat.color} text-white flex items-center justify-center shadow-md ${stat.shadow} shrink-0`}
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100/80 whitespace-nowrap">
                    {stat.badge}
                  </span>
                </div>

                {/* Number & Unit */}
                <div className="flex items-baseline gap-1 sm:gap-1.5 mb-1">
                  <span className="text-xl sm:text-3xl font-bold font-romantic text-gray-900 tracking-tight">
                    {stat.number}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-rose-500">
                    {stat.unit}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-1 leading-snug">
                  {stat.label}
                </h3>
              </div>

              {/* Description */}
              <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed mt-2 pt-2 border-t border-rose-50/80">
                {stat.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Live Running Seconds Ticker Banner */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 rounded-2xl p-4 sm:p-6 text-white shadow-lg shadow-rose-500/20 text-center relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-white/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-amber-300/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center gap-1.5 sm:gap-2">
          <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-rose-100">
            <Heart className="w-4 h-4 fill-white text-white animate-pulse shrink-0" />
            <span>Detik Cinta Kita Terus Berjalan Bersama</span>
          </div>

          <div className="text-2xl sm:text-4xl md:text-5xl font-mono font-bold tracking-wider text-amber-200 drop-shadow-sm">
            {liveSeconds.toLocaleString('id-ID')}
          </div>

          <p className="text-[11px] sm:text-xs text-rose-100 max-w-md">
            Detik demi detik yang telah kita ukir sejak 22 November 2022, dan akan terus bertambah indah selamanya.
          </p>
        </div>
      </div>
    </section>
  );
}
