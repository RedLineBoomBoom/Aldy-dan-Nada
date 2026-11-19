import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Heart, Delete, Sparkles, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const CORRECT_PIN = '22112204';
const PIN_LENGTH = 8;

export default function PinLockScreen({ onUnlock }) {
  const [pin, setPin] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showHint, setShowHint] = useState(false);

  // Lock body scroll while PIN screen is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  // Handle number press
  const handlePressDigit = (digit) => {
    if (isSuccess || pin.length >= PIN_LENGTH) return;
    setIsError(false);
    setErrorMessage('');
    const newPin = pin + digit;
    setPin(newPin);

    // Auto verify when 8 digits entered
    if (newPin.length === PIN_LENGTH) {
      verifyPin(newPin);
    }
  };

  // Handle delete
  const handleDelete = () => {
    if (isSuccess) return;
    setIsError(false);
    setErrorMessage('');
    setPin((prev) => prev.slice(0, -1));
  };

  // Verify PIN
  const verifyPin = (inputPin) => {
    if (inputPin === CORRECT_PIN) {
      setIsSuccess(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#fbbf24'],
      });
      setTimeout(() => {
        onUnlock();
      }, 700);
    } else {
      setIsError(true);
      setErrorMessage('PIN-nya salah nih sayang! Coba ingat-ingat lagi ya 😝');
      setTimeout(() => {
        setPin('');
      }, 800);
    }
  };

  // Keyboard support (hardware keyboard)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handlePressDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, isSuccess]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#200812]/80 backdrop-blur-lg touch-none overscroll-none overflow-y-auto">
      <div
        className={`relative w-full max-w-[320px] sm:max-w-sm bg-white/95 border border-rose-200/90 rounded-3xl p-5 sm:p-7 text-center shadow-2xl transition-all duration-300 my-auto ${
          isError ? 'animate-shake' : ''
        }`}
      >
        {/* Glow Effects */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-300/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-pink-300/40 rounded-full blur-2xl pointer-events-none" />

        {/* Lock / Unlock Icon Header */}
        <div className="relative mx-auto w-12 h-12 sm:w-16 sm:h-16 mb-2.5 sm:mb-4 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-400 text-white shadow-lg shadow-rose-500/30 transition-transform duration-300">
          {isSuccess ? (
            <Unlock className="w-6 h-6 sm:w-8 sm:h-8 animate-bounce" />
          ) : (
            <Lock className="w-6 h-6 sm:w-8 sm:h-8" />
          )}
        </div>

        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-rose-500 block mb-0.5">
          Kotak Rahasia Cinta 💌
        </span>
        <h2 className="text-lg sm:text-2xl font-romantic font-bold text-gray-900 mb-1 leading-tight">
          Khusus untuk <span className="inline-block whitespace-nowrap">Nada Tersayang</span>
        </h2>
        <p className="text-[11px] sm:text-xs text-gray-600 mb-4 sm:mb-6 leading-tight">
          Masukkan 8 digit PIN spesial untuk membuka website anniversary kita:
        </p>

        {/* 8 PIN Dots Indicator */}
        <div className="flex justify-center items-center gap-2 sm:gap-2.5 mb-4 sm:mb-6">
          {Array.from({ length: PIN_LENGTH }).map((_, index) => {
            const isFilled = index < pin.length;
            return (
              <div
                key={index}
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                  isSuccess
                    ? 'bg-rose-500 border-rose-500 scale-110 shadow-sm shadow-rose-500'
                    : isError
                    ? 'bg-red-400 border-red-500 scale-95'
                    : isFilled
                    ? 'bg-rose-500 border-rose-500 scale-105 shadow-sm shadow-rose-500/40'
                    : 'bg-transparent border-rose-200'
                }`}
              >
                {isFilled && !isError && (
                  <Heart className="w-1.5 h-1.5 fill-white text-white" />
                )}
              </div>
            );
          })}
        </div>

        {/* Error message */}
        {errorMessage && (
          <p className="text-[11px] sm:text-xs font-semibold text-rose-600 mb-3 animate-in fade-in leading-tight">
            {errorMessage}
          </p>
        )}

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 max-w-[240px] sm:max-w-[260px] mx-auto mb-3 sm:mb-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handlePressDigit(digit)}
              className="w-14 h-11 sm:w-16 sm:h-13 mx-auto rounded-xl sm:rounded-2xl bg-rose-50/70 hover:bg-rose-100 active:scale-95 text-gray-800 text-base sm:text-lg font-bold font-mono border border-rose-100 shadow-sm transition flex items-center justify-center cursor-pointer"
            >
              {digit}
            </button>
          ))}

          {/* Empty spacer / Clear */}
          <button
            type="button"
            onClick={() => setPin('')}
            className="w-14 h-11 sm:w-16 sm:h-13 mx-auto rounded-xl sm:rounded-2xl hover:bg-rose-50 active:scale-95 text-rose-400 text-[11px] font-semibold transition flex items-center justify-center cursor-pointer"
          >
            Reset
          </button>

          {/* Zero */}
          <button
            type="button"
            onClick={() => handlePressDigit('0')}
            className="w-14 h-11 sm:w-16 sm:h-13 mx-auto rounded-xl sm:rounded-2xl bg-rose-50/70 hover:bg-rose-100 active:scale-95 text-gray-800 text-base sm:text-lg font-bold font-mono border border-rose-100 shadow-sm transition flex items-center justify-center cursor-pointer"
          >
            0
          </button>

          {/* Backspace */}
          <button
            type="button"
            onClick={handleDelete}
            className="w-14 h-11 sm:w-16 sm:h-13 mx-auto rounded-xl sm:rounded-2xl hover:bg-rose-50 active:scale-95 text-rose-600 text-sm transition flex items-center justify-center cursor-pointer"
            title="Hapus"
          >
            <Delete className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Hint Dropdown */}
        <div className="pt-2 border-t border-rose-100/80">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-[11px] sm:text-xs text-rose-500 hover:text-rose-700 font-medium inline-flex items-center gap-1 cursor-pointer transition"
          >
            <HelpCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>{showHint ? 'Sembunyikan Petunjuk' : 'Butuh Petunjuk PIN?'}</span>
          </button>

          {showHint && (
            <p className="text-[10px] sm:text-[11px] text-gray-500 mt-2 bg-rose-50/80 p-2 sm:p-2.5 rounded-xl border border-rose-100 leading-relaxed animate-in fade-in">
              💡 <strong>Petunjuk:</strong> Tanggal jadian kita berdua digabung dengan angka anniversary ke-4!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
