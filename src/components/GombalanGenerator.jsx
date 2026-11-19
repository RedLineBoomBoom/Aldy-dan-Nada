import React, { useState } from 'react';
import { Sparkles, Dices, Heart, Quote } from 'lucide-react';
import confetti from 'canvas-confetti';

const GOMBALAN_LIST = [
  'Nada tahu nggak bedanya kamu sama modem? Kalau modem nyambungin ke internet, kalau kamu nyambungin masa depanku ❤️',
  'Aldy nggak butuh kompas, soalnya ke mana pun kakiku melangkah, arah hatiku selalu tertuju ke Nada ✨',
  'Katanya manusia butuh oksigen buat hidup. Tapi kenapa kalau nggak dapet kabar dari kamu, rasanya lemas ya? 😜',
  'Rumah paling nyaman itu bukan gedung mewah, tapi pundak Nada pas lagi dengerin cerita Aldy 🏠💕',
  'Kalau mencintaimu adalah ujian sekolah, Aldy pasti dapet nilai 100 karena nggak pernah mau nyontek ke yang lain!',
  'Di antara jutaan bintang di langit, cuma senyum manis Nada yang bisa menerangi hari-hari lelah Aldy 🌟',
  'Bumi itu berputar pada porosnya, tapi duniaku berputar di sekitar senyumanmu 🥰',
  '4 tahun sama kamu rasanya baru 4 menit, cepet banget karena setiap detiknya selalu bikin bahagia!',
  'Nada nggak capek apa? Tiap hari selalu lari-larian di pikiran Aldy tanpa henti 🏃‍♀️❤️',
  'Mau sesibuk apa pun hari ini, satu notifikasi dari kamu udah cukup buat bikin seharian penuh energi 🔋💖',
  'Kalau Nada tanya alasan Aldy sayang kamu, jawabannya sederhana: karena kamu adalah kamu, dan itu sempurna buatku 🌸',
];

export default function GombalanGenerator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handleNextGombalan = () => {
    setAnimating(true);
    confetti({
      particleCount: 15,
      spread: 40,
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#fb7185', '#fda4af'],
    });

    setTimeout(() => {
      let next;
      do {
        next = Math.floor(Math.random() * GOMBALAN_LIST.length);
      } while (next === currentIndex && GOMBALAN_LIST.length > 1);
      setCurrentIndex(next);
      setAnimating(false);
    }, 200);
  };

  return (
    <div className="bg-gradient-to-br from-rose-50/80 to-pink-50/60 border border-rose-200/80 rounded-3xl p-5 sm:p-8 shadow-sm max-w-xl mx-auto my-10 text-center relative overflow-hidden">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-rose-600 text-xs font-semibold mb-3 border border-rose-100 shadow-xs whitespace-nowrap">
        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
        <span className="whitespace-nowrap">Generator Kata Manis Aldy</span>
      </div>

      <h3 className="font-romantic text-xl sm:text-2xl font-bold text-gray-900 mb-4">
        Lagi Butuh Disayang Hari Ini? 🥰
      </h3>

      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-rose-100/80 mb-5 min-h-[100px] flex items-center justify-center relative">
        <Quote className="absolute top-2 left-2 w-6 h-6 text-rose-100 pointer-events-none" />
        <p
          className={`font-handwriting text-lg sm:text-2xl text-rose-900 leading-snug transition-all duration-200 ${
            animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          "{GOMBALAN_LIST[currentIndex]}"
        </p>
      </div>

      <button
        onClick={handleNextGombalan}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs sm:text-sm rounded-full shadow-md shadow-rose-500/25 transition active:scale-95 cursor-pointer"
      >
        <Dices className="w-4 h-4" />
        <span>Acak Kata Manis Lainnya</span>
      </button>
    </div>
  );
}
