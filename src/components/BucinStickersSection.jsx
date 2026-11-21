import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Send, Smile, MessageCircleHeart, Plus, Trash2, Move, Hand } from 'lucide-react';
import {
  subscribeStickers,
  saveStickers,
  isFirebaseConfigured,
  DEFAULT_STICKERS
} from '../services/cloudSync';

const STICKER_LIST = [
  {
    id: 'bubu_hug',
    file: '/stickers/bubu-bubu-dudu.gif',
    title: 'Peluk Bucin Bubu & Dudu',
    category: 'Peluk',
    dialogue: 'Peluk erat Nada sayang, gak boleh lepas yaa! 🤗❤️',
    emoji: '🐼',
    color: 'from-rose-500 to-pink-500'
  },
  {
    id: 'bubu_dance',
    file: '/stickers/bubu-dancing-dance.gif',
    title: 'Joget Happy 4 Tahun',
    category: 'Bahagia',
    dialogue: 'Seneng banget bisa rayain 4 tahun bareng kesayangan! 💃🕺✨',
    emoji: '🎉',
    color: 'from-amber-500 to-rose-400'
  },
  {
    id: 'couple_forgive',
    file: '/stickers/couple-forgive-me.gif',
    title: 'Maafin Aldy Ya Cil',
    category: 'Lucu',
    dialogue: 'Maafin kalo Aldy suka ngeselin, tapi sayangnya tulus dan banyak banget kok! 🥺👉👈',
    emoji: '🥺',
    color: 'from-pink-500 to-rose-400'
  },
  {
    id: 'cute_adorable',
    file: '/stickers/cute-adorable.gif',
    title: 'Gemas Maksimal',
    category: 'Gemas',
    dialogue: 'Kenapa pacar Aldy gemes banget sih tiap hari?! Bikin jatuh cinta terus 🌸🥰',
    emoji: '😻',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'bear_kiss',
    file: '/stickers/bear-kiss-bear-kisses.gif',
    title: 'Cium Pipi Bertubi-tubi',
    category: 'Cium',
    dialogue: 'Muach muach muachhh! Happy 4th Anniversary cinta matinya Aldy! 💋✨',
    emoji: '🐻',
    color: 'from-rose-600 to-red-400'
  },
  {
    id: 'cutie_cat',
    file: '/stickers/cutie-cat.gif',
    title: 'Kucing Manja Nempel',
    category: 'Manja',
    dialogue: 'Mau nempel terus kayak perangko sama Nada selamanya! 🐾❤️',
    emoji: '🐱',
    color: 'from-sky-500 to-pink-400'
  },
  {
    id: 'mocha_hearts',
    file: '/stickers/mocha-bear-hearts.gif',
    title: 'Banjir Hati & Cinta',
    category: 'Cinta',
    dialogue: 'Hati Aldy 100% isinya cuma Nada seorang, gak ada yang lain! 💖💌',
    emoji: '💕',
    color: 'from-pink-600 to-rose-500'
  },
  {
    id: 'mochi_peach',
    file: '/stickers/mochi-mochi-peach-cat-peach-cat.gif',
    title: 'Puk-Puk Sayang',
    category: 'Sayang',
    dialogue: 'Semangat terus sayaaang! Aldy selalu ada dan bangga sama kamu! 🍑✨',
    emoji: '🥰',
    color: 'from-amber-400 to-orange-400'
  },
  {
    id: 'peach_phone',
    file: '/stickers/peach-goma-phone.gif',
    title: 'Lagi Liatin Chat Kamu',
    category: 'Kangen',
    dialogue: 'Lagi senyum-senyum sendiri liatin foto dan chat dari bidadari Aldy 📱💭',
    emoji: '💌',
    color: 'from-violet-500 to-rose-400'
  }
];

export default function BucinStickersSection() {
  const [selectedSticker, setSelectedSticker] = useState(STICKER_LIST[0]);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [flyingStickers, setFlyingStickers] = useState([]);
  
  // Sticker Board State (Syncs real-time with Firebase / localStorage)
  const [stickerBoard, setStickerBoard] = useState(DEFAULT_STICKERS);

  useEffect(() => {
    const unsubscribe = subscribeStickers((cloudStickers) => {
      setStickerBoard(cloudStickers);
    });
    return () => unsubscribe();
  }, []);

  const [activeDraggingId, setActiveDraggingId] = useState(null);
  const [isDragOverBoard, setIsDragOverBoard] = useState(false);
  const boardRef = useRef(null);
  const dragContextRef = useRef(null);

  const categories = ['Semua', 'Peluk', 'Cium', 'Gemas', 'Cinta', 'Manja', 'Lucu'];

  const filteredStickers = activeCategory === 'Semua'
    ? STICKER_LIST
    : STICKER_LIST.filter(s => s.category === activeCategory);

  // Play cute synthetic bubble pop sound
  const playPopSound = (pitch = 540) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const handleSelectSticker = (sticker, e) => {
    setSelectedSticker(sticker);
    playPopSound(600 + Math.random() * 200);

    // Spawn flying sticker animation
    const newFlying = {
      id: Date.now() + Math.random(),
      file: sticker.file,
      left: Math.max(15, Math.min(85, (e ? (e.clientX / window.innerWidth) * 100 : 50) + (Math.random() * 20 - 10))),
    };

    setFlyingStickers((prev) => [...prev.slice(-8), newFlying]);
    setTimeout(() => {
      setFlyingStickers((prev) => prev.filter(f => f.id !== newFlying.id));
    }, 2000);

    // Little heart burst
    confetti({
      particleCount: 15,
      spread: 45,
      origin: { y: 0.8 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3']
    });
  };

  // Add sticker to board programmatically (e.g. from button)
  const handleAddToBoard = () => {
    if (!boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const stickerW = 68;
    const stickerH = 76;
    
    // Pick random location strictly clamped inside board
    const maxPixelX = Math.max(0, rect.width - stickerW - 8);
    const maxPixelY = Math.max(0, rect.height - stickerH - 8);
    const randX = Math.floor(Math.random() * (maxPixelX * 0.75)) + 8;
    const randY = Math.floor(Math.random() * (maxPixelY * 0.75)) + 8;

    const xPercent = rect.width > 0 ? (randX / rect.width) * 100 : 30;
    const yPercent = rect.height > 0 ? (randY / rect.height) * 100 : 25;

    const newItem = {
      id: Date.now(),
      stickerId: selectedSticker.id,
      x: xPercent,
      y: yPercent,
      rotation: Math.floor(Math.random() * 20) - 10,
      note: selectedSticker.title
    };

    const updated = [...stickerBoard, newItem];
    setStickerBoard(updated);
    saveStickers(updated);

    playPopSound(720);
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ec4899', '#f43f5e', '#fbbf24']
    });
  };

  // Drag and Drop from Grid onto Board (HTML5 Drag & Drop)
  const handleDragStartFromList = (e, sticker) => {
    e.dataTransfer.setData('text/plain', sticker.id);
    setSelectedSticker(sticker);
  };

  const handleBoardDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (!isDragOverBoard) setIsDragOverBoard(true);
  };

  const handleBoardDragLeave = (e) => {
    if (boardRef.current && !boardRef.current.contains(e.relatedTarget)) {
      setIsDragOverBoard(false);
    }
  };

  const handleBoardDrop = (e) => {
    e.preventDefault();
    setIsDragOverBoard(false);
    if (!boardRef.current) return;

    const stickerId = e.dataTransfer.getData('text/plain') || selectedSticker.id;
    const matchedSticker = STICKER_LIST.find(s => s.id === stickerId) || selectedSticker;

    const rect = boardRef.current.getBoundingClientRect();
    const stickerW = 68;
    const stickerH = 76;

    // Drop position centered on mouse, clamped strictly inside board boundary
    const mouseX = e.clientX - rect.left - (stickerW / 2);
    const mouseY = e.clientY - rect.top - (stickerH / 2);

    const clampedX = Math.max(4, Math.min(rect.width - stickerW - 4, mouseX));
    const clampedY = Math.max(4, Math.min(rect.height - stickerH - 4, mouseY));

    const xPercent = (clampedX / rect.width) * 100;
    const yPercent = (clampedY / rect.height) * 100;

    const newItem = {
      id: Date.now(),
      stickerId: matchedSticker.id,
      x: xPercent,
      y: yPercent,
      rotation: Math.floor(Math.random() * 16) - 8,
      note: matchedSticker.title
    };

    const updated = [...stickerBoard, newItem];
    setStickerBoard(updated);
    saveStickers(updated);

    playPopSound(750);
    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.65 },
      colors: ['#f43f5e', '#ec4899', '#fbbf24']
    });
  };

  // Inside-Board Dragging with Pointer Events (Mouse + Touch support & strict boundary clamping)
  const handlePointerDownOnBoardSticker = (e, item) => {
    e.stopPropagation();
    if (!boardRef.current) return;

    const rect = boardRef.current.getBoundingClientRect();
    const stickerW = 68;
    const stickerH = 76;

    // Current pixel position from stored percentage
    const currentPixelX = (item.x / 100) * rect.width;
    const currentPixelY = (item.y / 100) * rect.height;

    dragContextRef.current = {
      id: item.id,
      startX: e.clientX,
      startY: e.clientY,
      initialPixelX: currentPixelX,
      initialPixelY: currentPixelY,
      rect,
      stickerW,
      stickerH,
      hasMoved: false
    };

    setActiveDraggingId(item.id);
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!dragContextRef.current || !boardRef.current) return;
      const ctx = dragContextRef.current;

      const deltaX = e.clientX - ctx.startX;
      const deltaY = e.clientY - ctx.startY;

      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
        ctx.hasMoved = true;
      }

      const rect = boardRef.current.getBoundingClientRect();
      const rawX = ctx.initialPixelX + deltaX;
      const rawY = ctx.initialPixelY + deltaY;

      // STRICT CLAMPING: sticker CANNOT leave the board area
      const minX = 4;
      const minY = 4;
      const maxX = Math.max(minX, rect.width - ctx.stickerW - 4);
      const maxY = Math.max(minY, rect.height - ctx.stickerH - 4);

      const clampedX = Math.max(minX, Math.min(maxX, rawX));
      const clampedY = Math.max(minY, Math.min(maxY, rawY));

      const newPercentX = (clampedX / rect.width) * 100;
      const newPercentY = (clampedY / rect.height) * 100;

      setStickerBoard(prev =>
        prev.map(st => st.id === ctx.id ? { ...st, x: newPercentX, y: newPercentY } : st)
      );
    };

    const handlePointerUp = () => {
      if (dragContextRef.current && dragContextRef.current.hasMoved) {
        setStickerBoard(latest => {
          saveStickers(latest);
          return latest;
        });
      }
      dragContextRef.current = null;
      setActiveDraggingId(null);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, []);

  const handleRemoveFromBoard = (id, e) => {
    if (e) e.stopPropagation();
    const updated = stickerBoard.filter(item => item.id !== id);
    setStickerBoard(updated);
    saveStickers(updated);
  };

  const handleSendToWhatsApp = (sticker) => {
    const text = encodeURIComponent(`Sayang Nada! Ada stiker bucin lucu di web anniversary kita: "${sticker.title}" 🐼❤️\n\n"${sticker.dialogue}"`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section className="py-12 sm:py-16 px-3.5 sm:px-6 relative overflow-hidden section-opt">
      {/* Flying sticker particles */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {flyingStickers.map(f => (
          <div
            key={f.id}
            className="absolute animate-float-up opacity-90 drop-shadow-lg"
            style={{ left: `${f.left}%`, bottom: '15%' }}
          >
            <img src={f.file} alt="Flying Sticker" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100/80 border border-pink-200 text-rose-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-xs whitespace-nowrap">
            <Smile className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Koleksi Bucin Gemas</span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-romantic font-bold text-gray-900 mb-2 leading-tight">
            🐼 Animasi Stiker GIF Gemas <span className="inline-block whitespace-nowrap">(Bucin Stickers)</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
            Geser stiker favoritmu langsung ke papan kenangan di bawah! Kamu bisa bebas atur posisinya ke mana saja tanpa keluar dari area papan ❤️
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-5">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 scale-105'
                    : 'bg-white/80 text-gray-600 border border-rose-100 hover:bg-rose-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid & Interactive Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* Left / Grid of Stickers (7 cols) */}
          <div className="lg:col-span-7 bg-white/95 border border-rose-100/90 rounded-3xl p-4 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-rose-50">
              <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Klik atau Tarik (Drag) Stiker ke Papan
              </span>
              <span className="text-[11px] text-rose-500 font-medium">
                {filteredStickers.length} Stiker Tersedia
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3.5">
              {filteredStickers.map(sticker => {
                const isSelected = selectedSticker.id === sticker.id;
                return (
                  <div
                    key={sticker.id}
                    draggable={true}
                    onDragStart={(e) => handleDragStartFromList(e, sticker)}
                    onClick={(e) => handleSelectSticker(sticker, e)}
                    className={`relative group flex flex-col items-center p-2 sm:p-3 rounded-2xl border transition-all duration-300 cursor-grab active:cursor-grabbing select-none ${
                      isSelected
                        ? 'bg-gradient-to-b from-rose-50 to-pink-100/70 border-rose-400 scale-[1.03] shadow-md shadow-rose-200'
                        : 'bg-white/90 border-rose-100 hover:border-rose-200 hover:scale-[1.02] shadow-xs'
                    }`}
                    title="Klik untuk reaksi atau geser (drag) ke papan"
                  >
                    <div className="relative w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center mb-1 overflow-hidden">
                      <img
                        src={sticker.file}
                        alt={sticker.title}
                        width={80}
                        height={80}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain pointer-events-none group-hover:scale-110 transition duration-300"
                      />
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-gray-800 line-clamp-1 text-center w-full px-0.5">
                      {sticker.title}
                    </span>
                    <span className="text-[8px] sm:text-[9px] text-rose-500 font-medium flex items-center gap-0.5 mt-0.5">
                      <span>{sticker.emoji}</span>
                      <Move className="w-2 h-2 sm:w-2.5 sm:h-2.5 opacity-60 group-hover:opacity-100" />
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-gray-400 mt-3 text-center flex items-center justify-center gap-1">
              <Hand className="w-3 h-3 text-rose-400" />
              <span>Bisa langsung ditarik (drag &amp; drop) ke papan stiker kenangan!</span>
            </p>
          </div>

          {/* Right / Interactive Spotlight & Dialogue Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-gradient-to-b from-white to-rose-50/90 border border-rose-200/90 rounded-3xl p-5 sm:p-6 shadow-xl text-center relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-300/30 rounded-full blur-2xl pointer-events-none" />

              {/* Big Featured Sticker */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-3 flex items-center justify-center">
                <div className="absolute inset-0 bg-rose-200/40 rounded-full blur-xl scale-90 animate-pulse" />
                <img
                  src={selectedSticker.file}
                  alt={selectedSticker.title}
                  className="w-full h-full object-contain relative z-10 drop-shadow-md animate-bounce-slow"
                />
              </div>

              {/* Badge */}
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 shadow-xs mb-1.5">
                {selectedSticker.emoji} {selectedSticker.title}
              </span>

              {/* Sweet Bucin Speech Bubble */}
              <div className="relative bg-white border border-rose-200 rounded-2xl p-3.5 sm:p-4 my-2.5 shadow-sm text-left">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-rose-200 rotate-45" />
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-500 mb-1">
                  <MessageCircleHeart className="w-3.5 h-3.5" />
                  <span>Kata-kata Bucin Aldy:</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 italic font-medium leading-relaxed">
                  "{selectedSticker.dialogue}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                <button
                  type="button"
                  onClick={handleAddToBoard}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-500/20 active:scale-95 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tempel ke Papan</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSendToWhatsApp(selectedSticker)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-500/20 active:scale-95 transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim ke WA</span>
                </button>
              </div>
            </div>

            {/* Sticker Board Canvas (Tempel Stiker & Bebas Geser) */}
            <div className="bg-white/95 border border-rose-200/90 rounded-3xl p-4 sm:p-5 shadow-xl">
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-rose-50">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                    📌 Papan Stiker Kenangan Nada
                  </span>
                  {isFirebaseConfigured && (
                    <span className="text-[9px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Sync Cloud
                    </span>
                  )}
                </div>
                {stickerBoard.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setStickerBoard([]);
                      saveStickers([]);
                    }}
                    className="text-[10px] text-gray-400 hover:text-rose-500 flex items-center gap-1 cursor-pointer transition"
                  >
                    <Trash2 className="w-3 h-3" /> Bersihkan Papan
                  </button>
                )}
              </div>

              {/* The Interactive Clamped Board Area */}
              <div
                ref={boardRef}
                onDragOver={handleBoardDragOver}
                onDragLeave={handleBoardDragLeave}
                onDrop={handleBoardDrop}
                className={`relative h-56 sm:h-64 w-full bg-[#fff9fa] border-2 border-dashed rounded-2xl overflow-hidden transition-colors duration-200 select-none ${
                  isDragOverBoard
                    ? 'border-rose-500 bg-rose-50/60 ring-2 ring-rose-300'
                    : 'border-rose-200 hover:border-rose-300'
                }`}
              >
                {stickerBoard.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-3 text-gray-400 pointer-events-none">
                    <Smile className="w-8 h-8 text-rose-300 mb-1" />
                    <p className="text-xs font-medium text-gray-600">Papan stiker masih kosong nih!</p>
                    <p className="text-[10px] text-gray-400">Tarik (drag) stiker ke sini atau klik "Tempel ke Papan" ❤️</p>
                  </div>
                ) : (
                  stickerBoard.map((item) => {
                    const st = STICKER_LIST.find(s => s.id === item.stickerId) || STICKER_LIST[0];
                    const isDraggingThis = activeDraggingId === item.id;
                    return (
                      <div
                        key={item.id}
                        onPointerDown={(e) => handlePointerDownOnBoardSticker(e, item)}
                        className={`absolute touch-none select-none cursor-grab active:cursor-grabbing transition-shadow ${
                          isDraggingThis ? 'z-30 scale-105' : 'z-10 hover:z-20'
                        }`}
                        style={{
                          left: `${item.x}%`,
                          top: `${item.y}%`,
                          transform: `rotate(${item.rotation}deg)`,
                          transformOrigin: 'center center'
                        }}
                      >
                        <div
                          className={`relative group bg-white/95 p-1.5 rounded-2xl border transition-all ${
                            isDraggingThis
                              ? 'border-rose-400 shadow-xl ring-2 ring-rose-400/40'
                              : 'border-rose-200 shadow-md hover:shadow-lg'
                          }`}
                        >
                          {/* Dedicated delete button */}
                          <button
                            type="button"
                            onClick={(e) => handleRemoveFromBoard(item.id, e)}
                            className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow cursor-pointer opacity-80 group-hover:opacity-100 transition"
                            title="Hapus stiker"
                          >
                            ×
                          </button>

                          {/* Sticker Image */}
                          <img
                            src={st.file}
                            alt={st.title}
                            className="w-12 h-12 object-contain pointer-events-none"
                            draggable={false}
                          />

                          {/* Sticker Caption */}
                          <span className="block text-[8px] font-bold text-rose-600 text-center truncate max-w-[54px] pointer-events-none mt-0.5">
                            {item.note || '❤️'}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}

                {/* Floating Guide overlay if drag over */}
                {isDragOverBoard && (
                  <div className="absolute inset-0 bg-rose-500/10 backdrop-blur-[1px] flex items-center justify-center pointer-events-none z-40">
                    <span className="bg-white/95 text-rose-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-md border border-rose-200">
                      Lepaskan untuk menempel di sini! ✨
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[10px] text-gray-400">
                <span className="flex items-center gap-1 text-rose-500 font-medium">
                  <Move className="w-3 h-3" /> Geser stiker bebas (terkunci di area papan)
                </span>
                <span>{isFirebaseConfigured ? 'Tersinkron di Semua HP ✨' : 'Tersimpan otomatis ✨'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}