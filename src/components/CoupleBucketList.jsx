import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Plus, Sparkles, Heart, Trash2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

const DEFAULT_BUCKET_LIST = [
  { id: 'b1', text: 'Liburan berdua menikmati matahari terbenam di pantai 🌅', isDone: true, isCustom: false },
  { id: 'b2', text: 'Makan malam romantis merayakan 4 tahun perjalanan kita 🍽️✨', isDone: true, isCustom: false },
  { id: 'b3', text: 'Road trip santai sambil nyanyi lagu favorit berdua di perjalanan 🚗🎶', isDone: false, isCustom: false },
  { id: 'b4', text: 'Nonton konser musik musisi idola bareng 🎸', isDone: false, isCustom: false },
  { id: 'b5', text: 'Belajar masak menu baru berdua di dapur impian 🍳👩‍🍳', isDone: false, isCustom: false },
  { id: 'b6', text: 'Staycation santai di tempat sejuk dengan pemandangan bintang ⛺🌙', isDone: false, isCustom: false },
  { id: 'b7', text: 'Punya rumah dan ruang ternyaman masa depan kita berdua 🏡🤍', isDone: false, isCustom: false },
  { id: 'b8', text: 'Menua bersama dengan senyuman dan cinta yang sama seperti hari ini 👵👴💍', isDone: false, isCustom: false },
];

export default function CoupleBucketList() {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('anniversary_bucket_list');
      return saved ? JSON.parse(saved) : DEFAULT_BUCKET_LIST;
    } catch {
      return DEFAULT_BUCKET_LIST;
    }
  });

  const [newWish, setNewWish] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('anniversary_bucket_list', JSON.stringify(items));
    } catch {}
  }, [items]);

  const toggleItem = (id, e) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextDone = !item.isDone;
          if (nextDone) {
            // Confetti burst on completing a dream!
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 },
              colors: ['#f43f5e', '#fb7185', '#fda4af', '#fbbf24'],
            });
          }
          return { ...item, isDone: nextDone };
        }
        return item;
      })
    );
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newWish.trim()) return;

    const newItem = {
      id: 'custom_' + Date.now(),
      text: newWish.trim(),
      isDone: false,
      isCustom: true,
    };

    setItems((prev) => [...prev, newItem]);
    setNewWish('');

    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#f43f5e', '#fbbf24', '#f472b6'],
    });
  };

  const handleDeleteItem = (id, e) => {
    e.stopPropagation();
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleReset = () => {
    if (window.confirm('Kembalikan daftar impian ke awal?')) {
      setItems(DEFAULT_BUCKET_LIST);
    }
  };

  const completedCount = items.filter((i) => i.isDone).length;
  const progressPercent = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  return (
    <section id="bucket-list" className="py-14 sm:py-20 px-3.5 sm:px-4 max-w-4xl mx-auto section-opt">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2.5 sm:mb-3 whitespace-nowrap">
          <Sparkles className="w-3.5 h-3.5 shrink-0" /> Peta Impian • Our Future Bucket List
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-romantic font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">
          Impian yang Ingin Kita <span className="inline-block whitespace-nowrap text-rose-600">Wujudkan Bersama</span>
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto text-xs sm:text-base px-2">
          Daftar impian manis yang akan kita arungi berdua di tahun ke-5 dan seterusnya. Kamu juga bisa menambahkan impian barumu di bawah!
        </p>
      </div>

      {/* Card Container */}
      <div className="bg-white rounded-3xl border border-rose-100 p-5 sm:p-8 shadow-sm">
        {/* Progress Bar Header */}
        <div className="mb-6 pb-6 border-b border-rose-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-1.5">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500 shrink-0" />
              <span>Progres Impian Kita</span>
            </span>
            <span className="text-xs sm:text-sm font-semibold text-rose-600">
              {completedCount} dari {items.length} Terwujud ({progressPercent}%)
            </span>
          </div>

          <div className="w-full h-2.5 bg-rose-100/70 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="space-y-2.5 sm:space-y-3 mb-6">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={(e) => toggleItem(item.id, e)}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 group select-none ${
                item.isDone
                  ? 'bg-rose-50/60 border-rose-200/80 text-gray-500'
                  : 'bg-white hover:bg-rose-50/30 border-rose-100 text-gray-800 hover:border-rose-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="shrink-0 text-rose-500 focus:outline-hidden transition-transform group-hover:scale-110"
                >
                  {item.isDone ? (
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 fill-rose-500 text-white" />
                  ) : (
                    <Circle className="w-5 h-5 sm:w-6 sm:h-6 text-rose-300" />
                  )}
                </button>
                <span
                  className={`text-xs sm:text-sm font-medium leading-relaxed ${
                    item.isDone ? 'line-through text-gray-400' : 'text-gray-800'
                  }`}
                >
                  {item.text}
                </span>
              </div>

              {item.isCustom && (
                <button
                  onClick={(e) => handleDeleteItem(item.id, e)}
                  title="Hapus Impian Ini"
                  className="p-1 text-gray-300 hover:text-rose-500 transition shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add New Wish Form */}
        <form onSubmit={handleAddItem} className="flex gap-2">
          <input
            type="text"
            value={newWish}
            onChange={(e) => setNewWish(e.target.value)}
            placeholder="Tulis impian baru kita berdua di sini... ✨"
            className="flex-1 px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl border border-rose-200 focus:outline-hidden focus:border-rose-400 focus:ring-2 focus:ring-rose-200/50 bg-rose-50/20 text-gray-800 placeholder-gray-400"
          />
          <button
            type="submit"
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-rose-500 hover:bg-rose-600 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-rose-500/20 transition active:scale-95 flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Tambah Impian</span>
            <span className="sm:hidden">Tambah</span>
          </button>
        </form>

        {/* Footer controls */}
        <div className="mt-4 pt-3 flex items-center justify-between text-[11px] text-gray-400">
          <span>💡 Klik item untuk menandai impian yang sudah terwujud</span>
          <button
            onClick={handleReset}
            className="hover:text-rose-500 flex items-center gap-1 transition cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset ke Default</span>
          </button>
        </div>
      </div>
    </section>
  );
}
