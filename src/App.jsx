import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import FloatingHeartsCanvas from './components/FloatingHeartsCanvas';
import PinLockScreen from './components/PinLockScreen';
import WelcomeModal from './components/WelcomeModal';
import MusicPlayer from './components/MusicPlayer';
import HeroSection from './components/HeroSection';
import FourYearTimeline from './components/FourYearTimeline';
import InteractivePolaroidWall from './components/InteractivePolaroidWall';
import LoveLetterSection from './components/LoveLetterSection';
import OpenWhenLetters from './components/OpenWhenLetters';
import CouplesFunZone from './components/CouplesFunZone';
import BucinStickersSection from './components/BucinStickersSection';
import CoupleQuizGame from './components/CoupleQuizGame';
import GombalanGenerator from './components/GombalanGenerator';
import LoveStatsInfographic from './components/LoveStatsInfographic';
import VoiceNotePlayer from './components/VoiceNotePlayer';
import CoupleBucketList from './components/CoupleBucketList';
import LoveCertificateCard from './components/LoveCertificateCard';
import TimeCapsuleWishBox from './components/TimeCapsuleWishBox';
import PhotoModal from './components/PhotoModal';
import Footer from './components/Footer';

// Loaded curated photos
import rawPhotos from './data/photos.json';

export default function App() {
  // PIN Password Gate: tersimpan di sessionStorage agar aman dari refresh tidak sengaja, namun terkunci kembali saat website di-close
  const [isUnlocked, setIsUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem('anniversary_unlocked') === 'true';
    } catch {
      return false;
    }
  });
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Likes yang tersimpan permanen di localStorage (tidak pernah hilang saat refresh)
  const [likes, setLikes] = useState(() => {
    try {
      const saved = localStorage.getItem('anniversary_photo_likes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleLike = (photoId, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setLikes((prev) => {
      const nextLikes = {
        ...prev,
        [photoId]: (prev[photoId] || 0) + 1,
      };
      try {
        localStorage.setItem('anniversary_photo_likes', JSON.stringify(nextLikes));
      } catch (err) {
        console.error('Error saving likes to localStorage', err);
      }
      return nextLikes;
    });

    // Confetti burst on like
    if (e && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 18,
        spread: 40,
        origin: { x, y },
        colors: ['#f43f5e', '#fb7185', '#fda4af'],
      });
    } else {
      confetti({
        particleCount: 20,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#f43f5e', '#fb7185', '#fda4af'],
      });
    }
  };

  // Programmatic smooth scroll for in-page anchor links without global CSS scroll-behavior jank
  React.useEffect(() => {
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.length > 1) {
          const targetElem = document.querySelector(href);
          if (targetElem) {
            e.preventDefault();
            targetElem.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Filter 5-6 photos with great aspect ratio for hero showcase
  const featuredPhotos = rawPhotos.filter((p) => p.isFeatured).slice(0, 8);

  const handleUnlock = () => {
    setIsUnlocked(true);
    try {
      sessionStorage.setItem('anniversary_unlocked', 'true');
    } catch {}
  };

  const handleLock = () => {
    setIsUnlocked(false);
    try {
      sessionStorage.removeItem('anniversary_unlocked');
    } catch {}
  };

  const handleOpenWebsite = () => {
    setAutoPlayMusic(true);
  };

  const handleClosePhotoModal = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = '';
  };

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = rawPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % rawPhotos.length;
    setSelectedPhoto(rawPhotos[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = rawPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + rawPhotos.length) % rawPhotos.length;
    setSelectedPhoto(rawPhotos[prevIndex]);
  };

  // If locked, render PIN protection gate with floating hearts background
  if (!isUnlocked) {
    return (
      <div className="relative min-h-screen text-[#4a2432] selection:bg-rose-200 selection:text-rose-900">
        <FloatingHeartsCanvas />
        <PinLockScreen onUnlock={handleUnlock} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-[#4a2432] selection:bg-rose-200 selection:text-rose-900">
      {/* Interactive Floating Hearts & Petals Canvas */}
      <FloatingHeartsCanvas />

      {/* Welcome Entrance Popup with confetti & music unlock */}
      <WelcomeModal onOpenWebsite={handleOpenWebsite} />

      {/* Floating Bottom Music Player */}
      <MusicPlayer autoPlayTrigger={autoPlayMusic} />

      {/* Main Content Layout */}
      <main className="relative z-10">
        {/* Hero & Live 4-Year Countdown */}
        <HeroSection featuredPhotos={featuredPhotos} />

        {/* Infografis Statistik Cinta 4 Tahun (Angka-angka bermakna) */}
        <LoveStatsInfographic />

        {/* Surat Cinta Utama (Amplop Segel Lilin Merah) */}
        <LoveLetterSection />

        {/* 4-Year Story Timeline (Chapters 1, 2, 3, 4) */}
        <FourYearTimeline
          photos={rawPhotos}
          onSelectPhoto={(photo) => setSelectedPhoto(photo)}
        />

        {/* Interactive Full Polaroid Wall (Masonry with filters & persistent likes) */}
        <InteractivePolaroidWall
          photos={rawPhotos}
          likes={likes}
          onLike={handleLike}
          onSelectPhoto={(photo) => setSelectedPhoto(photo)}
        />

        {/* Pesan Suara Khusus Dari Aldy (Vintage Cassette Voice Note Player) */}
        <VoiceNotePlayer />

        {/* Kotak Surat "Open When..." (Buka saat kangen, capek, kesel, semangat) */}
        <OpenWhenLetters />

        {/* Peta Impian Berdua (Bucket List Interaktif Masa Depan) */}
        <CoupleBucketList />

        {/* Zona Manis & Gemas (Love meter, Kupon Cinta, 10 Alasan) */}
        <CouplesFunZone />

        {/* Animasi Stiker GIF Gemas (Bucin Stickers) */}
        <BucinStickersSection />

        {/* Mini Quiz Lucu & Generator Gombalan */}
        <section className="px-3.5 sm:px-4 max-w-6xl mx-auto section-opt">
          <CoupleQuizGame />
          <GombalanGenerator />
        </section>

        {/* Sertifikat Resmi Cinta 4 Tahun (Bisa Diunduh sebagai Gambar PNG) */}
        <LoveCertificateCard />

        {/* Kapsul Waktu Harapan Masa Depan */}
        <TimeCapsuleWishBox />
      </main>

      {/* Sweet Footer with re-lock option */}
      <Footer onLock={handleLock} />

      {/* Fullscreen Photo Modal with Next/Prev Controls & Like button */}
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          allPhotos={rawPhotos}
          likes={likes}
          onLike={handleLike}
          onClose={handleClosePhotoModal}
          onNext={handleNextPhoto}
          onPrev={handlePrevPhoto}
        />
      )}
    </div>
  );
}
