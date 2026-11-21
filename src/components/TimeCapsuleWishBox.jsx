import React, { useState, useEffect } from 'react';
import { Hourglass, Sparkles, Send, Heart, Lock, Calendar, Cloud } from 'lucide-react';
import confetti from 'canvas-confetti';
import { subscribeWishes, saveNewWish, isFirebaseConfigured, DEFAULT_WISHES } from '../services/cloudSync';

export default function TimeCapsuleWishBox() {
  const [wishes, setWishes] = useState(DEFAULT_WISHES);
  const [author, setAuthor] = useState('Nada');
  const [wishText, setWishText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Subscribe to real-time cloud data (or localStorage fallback)
  useEffect(() => {
    const unsubscribe = subscribeWishes((cloudWishes) => {
      setWishes(cloudWishes);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!wishText.trim()) return;

    setIsSubmitting(true);
    const newWish = {
      id: `wish_${Date.now()}`,
      author: author.trim() || 'Nada',
      text: wishText.trim(),
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };

    const updated = await saveNewWish(newWish, wishes);
    setWishes(updated);

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#fb7185', '#fbbf24', '#38bdf8'],
    });

    setWishText('');
    setIsSubmitting(false);
  };

  return (
    <section id="kapsul-waktu" className="py-14 sm:py-20 px-3.5 sm:px-4 max-w-5xl mx-auto section-opt">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2.5 sm:mb-3 whitespace-nowrap">
          <Hourglass className="w-3.5 h-3.5 shrink-0" />
          <span className="whitespace-nowrap">Menatap Masa Depan</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-romantic font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">
          Kapsul Waktu <span className="inline-block whitespace-nowrap">Harapan Kita ⏳</span>
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-xs sm:text-base px-2">
          Tuliskan doa, mimpi, dan harapanmu untuk tahun ke-5 dan seterusnya. Pesan ini akan terkunci di sini dan selalu bisa kita baca bersama!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Input */}
        <div className="lg:col-span-5 bg-white/95 border border-rose-200 rounded-3xl p-5 sm:p-7 shadow-lg shadow-rose-900/5">
          <h3 className="font-romantic text-lg sm:text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Kirim Pesan ke Masa Depan</span>
          </h3>
          <p className="text-xs text-gray-500 mb-5">
            {isFirebaseConfigured
              ? 'Pesan tersimpan di cloud & tersinkronisasi otomatis di HP Nada dan Aldy.'
              : 'Pesan ini tersimpan permanen dan tidak akan hilang saat di-refresh.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Dari Siapa:
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAuthor('Nada')}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                    author === 'Nada'
                      ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                      : 'bg-rose-50/60 text-gray-700 border-rose-200'
                  }`}
                >
                  🌸 Nada
                </button>
                <button
                  type="button"
                  onClick={() => setAuthor('Aldy')}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                    author === 'Aldy'
                      ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                      : 'bg-rose-50/60 text-gray-700 border-rose-200'
                  }`}
                >
                  🎩 Aldy
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Tulis Harapan / Doamu:
              </label>
              <textarea
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
                placeholder="Contoh: Semoga kita selalu kompak, sehat bareng, dan tahun depan bisa liburan ke..."
                rows={4}
                required
                className="w-full p-3 rounded-2xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs sm:text-sm text-gray-800 placeholder-gray-400 bg-rose-50/30 resize-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !wishText.trim()}
              className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 disabled:opacity-60 text-white font-semibold text-xs sm:text-sm rounded-2xl shadow-md shadow-rose-500/25 transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Kunci Harapan di Kapsul Waktu</span>
            </button>
          </form>
        </div>

        {/* Wishes Display List */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-1.5">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>Harapan yang Sudah Terkunci ({wishes.length})</span>
            </h4>
            {isFirebaseConfigured ? (
              <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1.5 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Tersinkron di Semua HP ✨
              </span>
            ) : (
              <span className="text-[11px] text-gray-400">Tersimpan di Kapsul ✨</span>
            )}
          </div>

          <div className="space-y-3 max-h-[460px] overflow-y-auto no-scrollbar pr-1">
            {wishes.map((w) => (
              <div
                key={w.id}
                className="bg-white border border-rose-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow transition relative overflow-hidden"
              >
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-rose-50">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold tracking-wide">
                      {w.author === 'Nada' ? '🌸 Nada' : '🎩 Aldy'}
                    </span>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {w.date}
                    </span>
                  </div>
                  <Lock className="w-3.5 h-3.5 text-rose-300" />
                </div>

                <p className="font-romantic text-sm sm:text-base text-gray-800 leading-relaxed italic">
                  "{w.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
