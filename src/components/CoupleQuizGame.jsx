import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, Trophy, RotateCcw, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const QUESTIONS = [
  {
    id: 1,
    question: 'Siapa yang biasanya paling lama kalau dandan atau siap-siap mau pergi?',
    options: [
      { text: 'Nada (pasti, milih baju aja 1 jam 😜)', reaction: 'Haha jujur banget! Tapi hasilnya selalu cantik maksimal kok 🥰' },
      { text: 'Aldy (pura-pura nyari kunci padahal emang lelet)', reaction: 'Bisa-bisanya nuduh Aldy! Padahal Aldy yang nungguin di motor/mobil wkwk 😆' },
      { text: 'Dua-duanya lama, saling tunggu-tungguan', reaction: 'Nah ini baru seimbang, saling ngaret bareng haha! 🤝' },
    ],
  },
  {
    id: 2,
    question: 'Kalimat yang paling sering keluar pas kita berdua bingung mau makan apa?',
    options: [
      { text: '"Terserah kamu aja deh..."', reaction: 'Klasik! Kata "terserah" adalah misteri terbesar di dunia percintaan 😂' },
      { text: '"Makan apa ya..." (mikir sambil liat-liat menu 30 menit)', reaction: 'Ujung-ujungnya balik lagi ke tempat yang itu-itu lagi haha! 🍜' },
      { text: '"Yang deket sini aja, laper banget!"', reaction: 'Definisi laper mengalahkan rasa gengsi haha! 😋' },
    ],
  },
  {
    id: 3,
    question: 'Siapa yang paling gengsian pas lagi ngambek atau bete?',
    options: [
      { text: 'Nada (cemberut tapi tetep pengen dibujuk)', reaction: 'Mukanya gemas banget kalau lagi cemberut, pengen dicubit! 🥺❤️' },
      { text: 'Aldy (sok cuek padahal kepikiran setengah mati)', reaction: 'Bener banget, Aldy nggak bisa tenang sedetik pun kalau Nada lagi cuek 😭' },
      { text: 'Sama-sama gengsi tapi akhirnya ketawa juga', reaction: 'Itulah magisnya hubungan 4 tahun kita, marahan gak pernah tahan lama! ✨' },
    ],
  },
  {
    id: 4,
    question: 'Di tahun ke-4 ini, seberapa yakin Aldy & Nada bakal terus bersama?',
    options: [
      { text: '100% Yakin, nggak ada yang lain!', reaction: 'Amin paling kencang! Aldy juga 100% yakin sama Nada ❤️' },
      { text: '10.000% Pokoknya mau sama kamu terus!', reaction: 'Awww luluh banget hati Aldy dengernya! 🥰💍' },
      { text: 'Selamanya sampai rambut kita berdua memutih', reaction: 'Ini jawaban paling sempurna. Mari menua bersama, cintaku 🌸' },
    ],
  },
];

export default function CoupleQuizGame() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelectOption = (idx) => {
    setSelectedOption(idx);
    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fbbf24'],
    });

    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        setIsFinished(true);
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#f43f5e', '#ec4899', '#fbbf24', '#38bdf8'],
        });
      }
    }, 1200);
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelectedOption(null);
    setIsFinished(false);
  };

  const q = QUESTIONS[currentQ];

  return (
    <div className="bg-white/95 border border-rose-200 rounded-3xl p-5 sm:p-8 shadow-xl shadow-rose-900/5 max-w-xl mx-auto my-12 text-center relative overflow-hidden">
      {!isFinished ? (
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-rose-500 mb-4">
            <span className="flex items-center gap-1 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 whitespace-nowrap">
              <HelpCircle className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Pertanyaan {currentQ + 1} dari {QUESTIONS.length}</span>
            </span>
            <span className="text-gray-400">Mini Quiz Lucu</span>
          </div>

          <h3 className="font-romantic text-lg sm:text-2xl font-bold text-gray-900 mb-6 leading-snug">
            "{q.question}"
          </h3>

          <div className="space-y-3 mb-4">
            {q.options.map((opt, idx) => {
              const isChosen = selectedOption === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={selectedOption !== null}
                  className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition cursor-pointer flex items-center justify-between ${
                    isChosen
                      ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/25 scale-[1.01]'
                      : 'bg-white hover:bg-rose-50/70 border-rose-100 text-gray-700 hover:border-rose-300'
                  }`}
                >
                  <span>{opt.text}</span>
                  {isChosen && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <p className="text-xs sm:text-sm font-semibold text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200 animate-in fade-in">
              {q.options[selectedOption].reaction}
            </p>
          )}
        </div>
      ) : (
        /* Quiz Finished Result Screen */
        <div className="py-4 animate-in zoom-in-95 duration-500">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4 shadow-sm animate-bounce">
            <Trophy className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-widest font-bold text-rose-500 block mb-1">
            Hasil Tes Kecocokan 4 Tahun
          </span>
          <h3 className="font-romantic text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Skor: 100% Cocok Seumur Hidup! 🏆❤️
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed mb-6">
            Selamat! Aldy dan Nada resmi dinobatkan sebagai <strong>Pasangan Ter-Sefrekuensi Sejagat Raya</strong>. Nggak ada yang bisa gantiin kecocokan kalian berdua!
          </p>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-xs sm:text-sm font-semibold rounded-full shadow-md shadow-rose-500/25 transition active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Mainkan Kuis Lagi</span>
          </button>
        </div>
      )}
    </div>
  );
}
