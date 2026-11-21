import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Gift, CheckCircle, Flame, Laugh, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  subscribeCoupons,
  claimCouponCloud,
  resetCoupons,
  isFirebaseConfigured,
} from '../services/cloudSync';

export default function CouplesFunZone() {
  // Love meter state
  const [lovePercent, setLovePercent] = useState(100);
  const [isOverload, setIsOverload] = useState(false);

  // Coupons claimed state with instant localStorage + real-time cloud sync
  const [claimedCoupons, setClaimedCoupons] = useState(() => {
    try {
      const saved = localStorage.getItem('anniversary_claimed_coupons');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const unsubscribe = subscribeCoupons((data) => {
      if (data && typeof data === 'object') {
        setClaimedCoupons(data);
      }
    });
    return () => unsubscribe();
  }, []);

  // 10 Reasons why Aldy loves Nada
  const [revealedReasons, setRevealedReasons] = useState({});

  const coupons = [
    {
      id: 'coupon_1',
      title: '🎟️ Kupon Bebas Ngambek (24 Jam)',
      category: 'Spesial Penenang Hati',
      desc: 'Kalau Nada lagi ngambek atau bete, cukup tunjukin kupon ini ke Aldy. Langsung dapet bujukan lembut, pelukan hangat, dan es krim sampai senyum lagi!',
      stamp: 'BERLAKU SELAMANYA',
    },
    {
      id: 'coupon_2',
      title: '🍨 Kupon Traktir Kuliner Bebas Pilih',
      category: 'Pesta Makanan Enak',
      desc: 'Bebas pilih makanan, kopi, atau dessert apa aja yang lagi kamu idamkan hari ini. Aldy yang traktir tanpa banyak protes!',
      stamp: 'DITANGGUNG ALDY',
    },
    {
      id: 'coupon_3',
      title: '🎬 Kupon Movie Night & Teman Cerita',
      category: 'Santai & Quality Time',
      desc: 'Nada pegang kendali penuh mau nonton film/series apa aja, ditemani cemilan lengkap dan pundak Aldy buat bersandar seharian.',
      stamp: 'BEBAS PILIH FILM',
    },
    {
      id: 'coupon_4',
      title: '🫂 Kupon Peluk & Deep Talk Tanpa Batas',
      category: 'Tempat Pulang Ternyaman',
      desc: 'Kapan pun kamu lelah dengan dunia, butuh didengar tanpa dihakimi, atau butuh pelukan erat, Aldy selalu siap sedia 24/7.',
      stamp: 'SELALU ADA BUAT NADA',
    },
  ];

  const reasons = [
    { num: '01', text: 'Senyum manis Nada yang selalu bikin hati Aldy tenang sehabis hari yang melelahkan.' },
    { num: '02', text: 'Cara Nada ketawa lepas saat kita bercanda hal konyol berdua.' },
    { num: '03', text: 'Perhatian-perhatian kecil Nada yang selalu bikin Aldy merasa sangat dicintai.' },
    { num: '04', text: 'Nada adalah pendengar terbaik untuk semua cerita random Aldy.' },
    { num: '05', text: 'Ekspresi menggemaskan Nada pas lagi ngambek tapi tetep keliatan lucu.' },
    { num: '06', text: 'Selalu saling dukung mimpi dan menemani di setiap proses kehidupan.' },
    { num: '07', text: 'Seleranya sama, dari makanan favorit sampai obrolan nyambung banget.' },
    { num: '08', text: 'Pelukan Nada yang selalu terasa seperti rumah paling nyaman di dunia.' },
    { num: '09', text: 'Nada selalu tulus, apa adanya, dan punya hati yang luar biasa baik.' },
    { num: '10', text: 'Karena bersama Nada, Aldy selalu merasa menjadi orang yang paling beruntung di dunia.' },
  ];

  const handleClaim = (couponId) => {
    claimCouponCloud(couponId, claimedCoupons);
    setClaimedCoupons((prev) => {
      const next = {
        ...prev,
        [couponId]: {
          claimed: true,
          claimedAt: Date.now(),
          dateStr: new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
        },
      };
      try {
        localStorage.setItem('anniversary_claimed_coupons', JSON.stringify(next));
      } catch {}
      return next;
    });

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#fb7185', '#fbbf24', '#34d399'],
    });
  };

  const handleResetCoupons = () => {
    if (window.confirm('Reset semua status kupon agar bisa diklaim kembali?')) {
      resetCoupons();
      setClaimedCoupons({});
      try {
        localStorage.removeItem('anniversary_claimed_coupons');
      } catch {}
    }
  };

  const handleSliderChange = (e) => {
    let val = parseInt(e.target.value, 10);
    // Funny lock: if Nada tries to drag below 50%
    if (val < 50) {
      val = 50;
    }
    setLovePercent(val);
  };

  const handleTriggerOverload = () => {
    setIsOverload(true);
    setLovePercent(10000);
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#f43f5e', '#ec4899', '#a855f7', '#fbbf24', '#38bdf8'],
    });
  };

  const toggleReason = (idx) => {
    setRevealedReasons((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <section id="fun-zone" className="py-14 sm:py-20 px-3.5 sm:px-4 max-w-6xl mx-auto section-opt">
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2.5 sm:mb-3 whitespace-nowrap">
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span className="whitespace-nowrap">Zona Manis &amp; Gemas</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-romantic font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">
          Spesial Buat <span className="inline-block whitespace-nowrap">Nada Tersenyum</span>
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-xs sm:text-base px-2">
          Ada beberapa kupon cinta yang bisa kamu klaim, tes level cinta, dan alasan kenapa kamu selalu jadi orang paling istimewa bagi Aldy!
        </p>
      </div>

      {/* Part 1: Interactive Love Meter */}
      <div className="bg-white/95 border border-rose-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-xl shadow-rose-900/5 mb-10 sm:mb-16 text-center relative overflow-hidden">
        <div className="max-w-xl mx-auto">
          <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-rose-500 mb-1 sm:mb-2 block">
            Mini Game Lucu
          </span>
          <h3 className="text-lg sm:text-2xl md:text-3xl font-romantic font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
            Seberapa Sayang <span className="inline-block whitespace-nowrap">Nada sama Aldy? 💖</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
            Coba geser pengukurnya ke kanan. Hati-hati ya, tombolnya nggak bisa geser ke bawah 50% karena sayangnya Nada pasti banyak banget! 😜
          </p>

          {/* Big Percentage Display */}
          <div className="mb-4 sm:mb-6">
            <span className="inline-block text-4xl sm:text-6xl font-romantic font-bold text-rose-600 tracking-tight transition-all duration-300">
              {isOverload ? '∞ 10.000%' : `${lovePercent}%`}
            </span>
            <p className="text-xs sm:text-sm font-medium text-rose-700/80 mt-1 px-2">
              {isOverload
                ? '🚀 OVERLOAD! Cintanya Nada ke Aldy nembus sampai galaksi Bima Sakti! 🪐💫'
                : lovePercent >= 100
                ? '❤️ Sayang banget polll! Aldy juga sayang banget sama Nada!'
                : lovePercent >= 80
                ? '🥰 Aww, seneng banget dengernya, pasti Aldy makin sayang!'
                : '😋 Hmm lumayan, tapi Aldy yakin aslinya 100% kan?'}
            </p>
          </div>

          {/* Range Slider */}
          <div className="px-2 sm:px-4 mb-4 sm:mb-6">
            <input
              type="range"
              min="0"
              max="100"
              value={isOverload ? 100 : lovePercent}
              onChange={handleSliderChange}
              disabled={isOverload}
              className="w-full h-3 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-500 transition"
            />
          </div>

          {/* Secret Overload Button */}
          {!isOverload && (
            <button
              onClick={handleTriggerOverload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-amber-400 to-rose-400 text-amber-950 font-bold text-[11px] sm:text-xs rounded-full shadow hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Klik di sini kalau sayangnya lebih dari 100%!</span>
            </button>
          )}
        </div>
      </div>

      {/* Part 2: Kupon Cinta 4 Tahun (Interactive Vouchers with Realtime Cloud Sync) */}
      <div className="mb-10 sm:mb-16">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 mb-1.5 sm:mb-2">
            <h3 className="text-lg sm:text-2xl md:text-3xl font-romantic font-bold text-gray-900 leading-tight">
              🎟️ Kupon Cinta <span className="inline-block whitespace-nowrap">Spesial 4 Tahun</span>
            </h3>
            {isFirebaseConfigured && (
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 whitespace-nowrap shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                <span>Tersinkron di HP Nada &amp; Aldy ✨</span>
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 px-2 max-w-xl mx-auto">
            Kupon ini resmi dan bisa Nada gunakan kapan aja ke Aldy. Status klaim tersimpan permanen dan tersinkronisasi otomatis!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {coupons.map((coupon) => {
            const claimData = claimedCoupons[coupon.id];
            const isClaimed = typeof claimData === 'object' ? !!claimData.claimed : !!claimData;
            const claimDate = typeof claimData === 'object' && claimData.dateStr ? claimData.dateStr : null;

            return (
              <div
                key={coupon.id}
                className="relative bg-white border-2 border-dashed border-rose-200 rounded-2xl p-4 sm:p-6 shadow-sm sm:shadow-md transition-all duration-300 hover:shadow-lg flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Clean Non-Overlapping Header */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-rose-500 block">
                      {coupon.category}
                    </span>
                    {isClaimed && (
                      <span className="bg-rose-500/10 border border-rose-500 text-rose-600 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase shrink-0 animate-in fade-in whitespace-nowrap">
                        ✓ TERKLAIM {claimDate ? `(${claimDate})` : ''}
                      </span>
                    )}
                  </div>

                  <h4 className="text-base sm:text-xl font-bold text-gray-900 mb-2 leading-snug">
                    {coupon.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 sm:mb-6">
                    {coupon.desc}
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-rose-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] sm:text-xs font-mono font-semibold text-rose-400 truncate">
                    {coupon.stamp}
                  </span>
                  <button
                    onClick={() => handleClaim(coupon.id)}
                    disabled={isClaimed}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 transition shrink-0 cursor-pointer ${
                      isClaimed
                        ? 'bg-rose-100 text-rose-600 cursor-default'
                        : 'bg-rose-500 hover:bg-rose-600 text-white shadow shadow-rose-500/30'
                    }`}
                  >
                    {isClaimed ? (
                      <>
                        <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Sudah Diklaim
                      </>
                    ) : (
                      <>
                        <Gift className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Klaim Kupon
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reset Option if any coupon is claimed */}
        {Object.keys(claimedCoupons).some((k) => !!claimedCoupons[k]) && (
          <div className="text-center mt-4 sm:mt-5">
            <button
              onClick={handleResetCoupons}
              className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-rose-600 transition cursor-pointer underline underline-offset-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset status kupon</span>
            </button>
          </div>
        )}
      </div>

      {/* Part 3: 10 Alasan Kenapa Aldy Selalu Sayang Nada */}
      <div>
        <div className="text-center mb-6 sm:mb-10">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-romantic font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">
            10 Alasan Kenapa Aldy <span className="inline-block whitespace-nowrap">Selalu Sayang Nada ❤️</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 px-2">
            Dari jutaan alasan yang ada, ini adalah beberapa hal yang selalu bikin Aldy bersyukur punya kamu:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
          {reasons.map((r, i) => {
            const isRevealed = revealedReasons[i];
            return (
              <div
                key={r.num}
                onClick={() => toggleReason(i)}
                className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isRevealed
                    ? 'bg-rose-50/90 border-rose-300 shadow-sm'
                    : 'bg-white border-rose-100 hover:border-rose-200 hover:shadow'
                }`}
              >
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-rose-500 bg-rose-100 px-2 py-0.5 sm:py-1 rounded-lg shrink-0">
                    {r.num}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                      {r.text}
                    </p>
                  </div>
                  <Heart
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition ${
                      isRevealed ? 'fill-rose-500 text-rose-500 scale-110' : 'text-gray-300'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
