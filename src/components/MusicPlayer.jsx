import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Music, Upload, Check, X, RotateCcw, AlertCircle } from 'lucide-react';
import { romanticMusicBox } from '../utils/audioSynth';

const YoutubeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

// Helper to extract 11-char YouTube Video ID
export function extractYouTubeId(url) {
  if (!url) return null;
  const trimmed = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/|music\.youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/;
  const match = trimmed.match(regExp);
  return match ? match[1] : null;
}

export default function MusicPlayer({ autoPlayTrigger }) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Gunakan sessionStorage: tersimpan saat refresh (F5/reload), namun otomatis kembali ke default saat website/tab di-close
  const [activeSource, setActiveSource] = useState(() => {
    try {
      return sessionStorage.getItem('anniversary_music_source') || 'local'; // 'local' | 'mp3' | 'youtube'
    } catch {
      return 'local';
    }
  });

  // Local/Custom MP3
  const [customAudioUrl, setCustomAudioUrl] = useState(() => {
    try {
      return sessionStorage.getItem('anniversary_custom_audio_url') || '/music.mp3';
    } catch {
      return '/music.mp3';
    }
  });

  // YouTube Link
  const [youtubeInput, setYoutubeInput] = useState(() => {
    try {
      return sessionStorage.getItem('anniversary_custom_youtube_url') || '';
    } catch {
      return '';
    }
  });
  const [youtubeVideoId, setYoutubeVideoId] = useState(() => {
    try {
      const saved = sessionStorage.getItem('anniversary_custom_youtube_url');
      return saved ? extractYouTubeId(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentTrackTitle, setCurrentTrackTitle] = useState(() => {
    try {
      return sessionStorage.getItem('anniversary_track_title') || "Perhaps Love (사랑인가요) ❤️";
    } catch {
      return "Perhaps Love (사랑인가요) ❤️";
    }
  });

  const [activeTab, setActiveTab] = useState('youtube'); // 'youtube' | 'upload'
  const [youtubeError, setYoutubeError] = useState('');
  const [youtubeSuccess, setYoutubeSuccess] = useState('');
  const [isLoadingYoutube, setIsLoadingYoutube] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const audioRef = useRef(null);
  const fileInputRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const isYtApiReadyRef = useRef(false);

  // Auto-pause when Aldy's Voice Note plays, auto-resume when it ends/pauses
  const wasPlayingBeforeVNRef = useRef(false);
  const isPlayingRef = useRef(isPlaying);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Persist exact playback position to prevent song restarting from 0:00
  const currentAudioTimeRef = useRef(0);
  const currentYtTimeRef = useRef(0);

  const startPlayRef = useRef(null);
  const pausePlayRef = useRef(null);

  // Load YouTube IFrame API script once & bersihkan legacy localStorage music
  useEffect(() => {
    try {
      localStorage.removeItem('anniversary_music_source');
      localStorage.removeItem('anniversary_custom_youtube_url');
      localStorage.removeItem('anniversary_custom_audio_url');
      localStorage.removeItem('anniversary_track_title');
    } catch {}

    if (typeof window === 'undefined') return;

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }

    const previousOnReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      isYtApiReadyRef.current = true;
      if (previousOnReady) previousOnReady();
      initYouTubePlayer();
    };

    if (window.YT && window.YT.Player) {
      isYtApiReadyRef.current = true;
      initYouTubePlayer();
    }
  }, []);

  // Initialize or update YouTube Player
  const initYouTubePlayer = () => {
    if (!window.YT || !window.YT.Player) return;
    if (!youtubeVideoId) return;

    if (ytPlayerRef.current && typeof ytPlayerRef.current.loadVideoById === 'function') {
      try {
        ytPlayerRef.current.loadVideoById({
          videoId: youtubeVideoId,
          startSeconds: 0
        });
        if (isPlaying) {
          ytPlayerRef.current.playVideo();
        }
        return;
      } catch (err) {
        console.error('Error reloading video in existing YT player', err);
      }
    }

    const container = document.getElementById('youtube-hidden-player');
    if (!container) return;

    try {
      ytPlayerRef.current = new window.YT.Player('youtube-hidden-player', {
        height: '200',
        width: '200',
        videoId: youtubeVideoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: youtubeVideoId,
          modestbranding: 1,
          playsinline: 1,
          enablejsapi: 1,
          origin: window.location.origin
        },
        events: {
          onReady: (event) => {
            if (activeSource === 'youtube' && isPlaying) {
              event.target.playVideo();
            }
          },
          onStateChange: (event) => {
            // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
            if (event.data === 1) {
              setIsPlaying(true);
            } else if (event.data === 2) {
              setIsPlaying(false);
            } else if (event.data === 0) {
              event.target.playVideo(); // loop playback
            }
          }
        }
      });
    } catch (err) {
      console.error('Error creating YouTube player', err);
    }
  };

  useEffect(() => {
    if (youtubeVideoId && isYtApiReadyRef.current) {
      initYouTubePlayer();
    }
  }, [youtubeVideoId]);

  // Auto-hide when not scrolling for 3 seconds
  const resetHideTimer = () => {
    setIsVisible(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    if (!showUploader) {
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
  };

  useEffect(() => {
    resetHideTimer();

    let lastActivityTime = 0;
    const handleActivity = () => {
      const now = performance.now();
      if (now - lastActivityTime < 350) return;
      lastActivityTime = now;
      resetHideTimer();
    };

    const handleMouseMove = (e) => {
      const distFromRight = window.innerWidth - e.clientX;
      const distFromBottom = window.innerHeight - e.clientY;
      if (distFromRight < 150 && distFromBottom < 150) {
        resetHideTimer();
      }
    };

    window.addEventListener('scroll', handleActivity, { passive: true });
    window.addEventListener('touchstart', handleActivity, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [showUploader]);

  // Trigger play on modal open
  useEffect(() => {
    if (autoPlayTrigger) {
      startPlay();
      resetHideTimer();
    }
  }, [autoPlayTrigger]);

  const startPlay = (explicitTime = null) => {
    setIsPlaying(true);
    // Notify any other audio players (like voice notes) that background music has started
    window.dispatchEvent(new CustomEvent('anniversary_music_play'));

    if (activeSource === 'youtube' && ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
      if (audioRef.current) audioRef.current.pause();
      const seekYt = explicitTime !== null ? explicitTime : currentYtTimeRef.current;
      if (seekYt > 0 && typeof ytPlayerRef.current.seekTo === 'function') {
        try {
          ytPlayerRef.current.seekTo(seekYt, true);
        } catch {}
      }
      ytPlayerRef.current.playVideo();
    } else if (audioRef.current) {
      const targetTime = explicitTime !== null ? explicitTime : currentAudioTimeRef.current;

      // Restore exact playback position so song does not restart from 0:00
      if (targetTime > 0 && Number.isFinite(targetTime)) {
        try {
          audioRef.current.currentTime = targetTime;
        } catch (err) {
          console.warn('Could not set currentTime before play:', err);
        }
      }

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Guard against browser buffer eviction resetting currentTime to 0 on play()
          if (targetTime > 0 && audioRef.current && audioRef.current.currentTime < 1 && targetTime >= 1) {
            try {
              audioRef.current.currentTime = targetTime;
            } catch {}
          }
        }).catch(() => {
          romanticMusicBox.play();
        });
      }
    } else {
      romanticMusicBox.play();
    }
  };

  const pausePlay = () => {
    setIsPlaying(false);
    if (activeSource === 'youtube' && ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
      try {
        const ytSecs = ytPlayerRef.current.getCurrentTime();
        if (ytSecs && ytSecs > 0) currentYtTimeRef.current = ytSecs;
      } catch {}
      ytPlayerRef.current.pauseVideo();
    }
    if (audioRef.current) {
      if (audioRef.current.currentTime > 0) {
        currentAudioTimeRef.current = audioRef.current.currentTime;
      }
      audioRef.current.pause();
    }
    romanticMusicBox.pause();
  };

  startPlayRef.current = startPlay;
  pausePlayRef.current = pausePlay;

  // Auto-pause background music when Aldy's Voice Note plays, auto-resume from exact second
  useEffect(() => {
    const handleVoiceNoteState = (e) => {
      const isVNPlaying = !!e.detail?.isPlaying;
      if (isVNPlaying) {
        if (isPlayingRef.current) {
          wasPlayingBeforeVNRef.current = true;
          // Capture exact current time immediately before pausing
          if (audioRef.current && audioRef.current.currentTime > 0) {
            currentAudioTimeRef.current = audioRef.current.currentTime;
          }
          if (activeSource === 'youtube' && ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === 'function') {
            try {
              const ytSecs = ytPlayerRef.current.getCurrentTime();
              if (ytSecs > 0) currentYtTimeRef.current = ytSecs;
            } catch {}
          }
          pausePlayRef.current?.();
        }
      } else {
        if (wasPlayingBeforeVNRef.current) {
          wasPlayingBeforeVNRef.current = false;
          // Resume from the exact saved second
          const resumeTime = currentAudioTimeRef.current;
          startPlayRef.current?.(resumeTime);
        }
      }
    };

    window.addEventListener('anniversary_voicenote_state', handleVoiceNoteState);
    return () => {
      window.removeEventListener('anniversary_voicenote_state', handleVoiceNoteState);
    };
  }, [activeSource]);

  const togglePlay = () => {
    resetHideTimer();
    if (isPlaying) {
      wasPlayingBeforeVNRef.current = false;
      pausePlay();
    } else {
      startPlay();
    }
  };

  // Handle YouTube link submission
  const handleApplyYouTube = async (e) => {
    e.preventDefault();
    setYoutubeError('');
    setYoutubeSuccess('');

    const vidId = extractYouTubeId(youtubeInput);
    if (!vidId) {
      setYoutubeError('Link YouTube tidak valid! Contoh format yang benar: https://youtu.be/... atau https://www.youtube.com/watch?v=...');
      return;
    }

    setIsLoadingYoutube(true);
    let resolvedTitle = 'Lagu YouTube Favorit Aldy & Nada 🎵';

    try {
      const res = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${vidId}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.title) {
          resolvedTitle = data.title;
        }
      }
    } catch {
      // fallback to resolvedTitle
    } finally {
      setIsLoadingYoutube(false);
    }

    currentYtTimeRef.current = 0;
    setYoutubeVideoId(vidId);
    setActiveSource('youtube');
    setCurrentTrackTitle(resolvedTitle);
    setYoutubeSuccess(`Berhasil memasang lagu: "${resolvedTitle}"`);

    // Pause native audio
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Save to sessionStorage: aman saat refresh (tidak hilang), tapi otomatis kembali ke lagu awal saat web/tab di-close
    try {
      sessionStorage.setItem('anniversary_music_source', 'youtube');
      sessionStorage.setItem('anniversary_custom_youtube_url', youtubeInput.trim());
      sessionStorage.setItem('anniversary_track_title', resolvedTitle);
      // Hapus data lama di localStorage jika ada
      localStorage.removeItem('anniversary_music_source');
      localStorage.removeItem('anniversary_custom_youtube_url');
      localStorage.removeItem('anniversary_track_title');
    } catch {}

    setIsPlaying(true);
    if (ytPlayerRef.current && typeof ytPlayerRef.current.loadVideoById === 'function') {
      ytPlayerRef.current.loadVideoById({ videoId: vidId });
      ytPlayerRef.current.playVideo();
    } else {
      initYouTubePlayer();
    }

    setTimeout(() => {
      setShowUploader(false);
      resetHideTimer();
    }, 1500);
  };

  // Handle MP3 upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const title = file.name.replace(/\.[^/.]+$/, '');
      currentAudioTimeRef.current = 0;
      setCustomAudioUrl(url);
      setCurrentTrackTitle(title);
      setActiveSource('mp3');

      // Stop YouTube if playing
      if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
        ytPlayerRef.current.pauseVideo();
      }

      try {
        sessionStorage.setItem('anniversary_music_source', 'mp3');
        sessionStorage.setItem('anniversary_track_title', title);
        localStorage.removeItem('anniversary_music_source');
        localStorage.removeItem('anniversary_track_title');
      } catch {}

      setIsPlaying(true);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = url;
          audioRef.current.play().catch(() => {});
        }
      }, 100);

      setShowUploader(false);
      resetHideTimer();
    }
  };

  // Reset to default song
  const handleResetToDefault = () => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
      ytPlayerRef.current.pauseVideo();
    }

    currentAudioTimeRef.current = 0;
    currentYtTimeRef.current = 0;
    setActiveSource('local');
    setCustomAudioUrl('/music.mp3');
    setCurrentTrackTitle("Perhaps Love (사랑인가요) ❤️");
    setYoutubeInput('');
    setYoutubeVideoId(null);
    setYoutubeError('');
    setYoutubeSuccess('');

    try {
      sessionStorage.removeItem('anniversary_music_source');
      sessionStorage.removeItem('anniversary_custom_youtube_url');
      sessionStorage.removeItem('anniversary_custom_audio_url');
      sessionStorage.removeItem('anniversary_track_title');
      localStorage.removeItem('anniversary_music_source');
      localStorage.removeItem('anniversary_custom_youtube_url');
      localStorage.removeItem('anniversary_custom_audio_url');
      localStorage.removeItem('anniversary_track_title');
    } catch {}

    if (audioRef.current) {
      audioRef.current.src = '/music.mp3';
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }

    setShowUploader(false);
    resetHideTimer();
  };

  return (
    <>
      {/* Native HTML5 Audio Tag (Used for default / uploaded MP3) */}
      <audio
        ref={audioRef}
        src={customAudioUrl}
        loop
        preload="auto"
        onTimeUpdate={() => {
          if (audioRef.current && audioRef.current.currentTime > 0) {
            currentAudioTimeRef.current = audioRef.current.currentTime;
          }
        }}
        onLoadedMetadata={() => {
          if (wasPlayingBeforeVNRef.current && currentAudioTimeRef.current > 0 && audioRef.current) {
            try {
              audioRef.current.currentTime = currentAudioTimeRef.current;
            } catch {}
          }
        }}
        onPlay={() => {
          if (activeSource !== 'youtube') setIsPlaying(true);
        }}
        onPause={() => {
          if (activeSource !== 'youtube') setIsPlaying(false);
        }}
        onEnded={() => {
          currentAudioTimeRef.current = 0;
          if (activeSource !== 'youtube') setIsPlaying(false);
        }}
      />

      {/* Invisible YouTube Iframe Player container */}
      <div
        style={{
          position: 'fixed',
          top: '-9999px',
          left: '-9999px',
          width: '1px',
          height: '1px',
          opacity: 0.01,
          pointerEvents: 'none',
          visibility: 'visible',
          zIndex: -1
        }}
      >
        <div id="youtube-hidden-player" />
      </div>

      {/* Floating Bottom Music Bar with 3-second Auto Hide */}
      <div
        onMouseEnter={() => {
          if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
          setIsVisible(true);
        }}
        onMouseLeave={resetHideTimer}
        className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 transition-all duration-500 ease-in-out ${
          isVisible || showUploader
            ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
            : 'opacity-0 translate-y-6 pointer-events-none scale-95'
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3 bg-white/95 backdrop-blur-md border border-rose-200/90 shadow-xl shadow-rose-950/10 rounded-full p-2 sm:py-2.5 sm:px-3 transition-all duration-300 hover:shadow-rose-400/25">
          {/* Animated Vinyl / CD */}
          <div
            onClick={togglePlay}
            className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-rose-400 p-0.5 shadow cursor-pointer flex items-center justify-center shrink-0 ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '6s' }}
            title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
          >
            <div className="w-full h-full bg-[#2b101b] rounded-full flex items-center justify-center border border-rose-300/40">
              <div className="w-3.5 h-3.5 rounded-full bg-rose-200 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2b101b]" />
              </div>
            </div>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-600 flex items-center justify-center transition cursor-pointer shrink-0"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          {/* Music settings / Link YouTube & MP3 toggle */}
          <button
            onClick={() => {
              setShowUploader(!showUploader);
              setIsVisible(true);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer shrink-0 ${
              activeSource === 'youtube'
                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                : 'bg-gray-100 hover:bg-rose-50 text-gray-600 hover:text-rose-600'
            }`}
            title="Ganti Lagu (Link YouTube / MP3)"
          >
            {activeSource === 'youtube' ? <YoutubeIcon className="w-4 h-4" /> : <Upload className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Music Options Modal Popover */}
        {showUploader && (
          <div className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] max-w-xs sm:max-w-sm sm:w-88 bg-white/98 backdrop-blur-md border border-rose-200/90 rounded-3xl p-4 sm:p-5 shadow-2xl text-left text-xs text-gray-700 animate-in fade-in slide-in-from-bottom-2 z-50">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-rose-100">
              <h4 className="font-bold text-gray-900 flex items-center gap-1.5 text-xs sm:text-sm">
                <Music className="w-4 h-4 text-rose-500" />
                <span>Pasang Lagu Favorit</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowUploader(false)}
                className="w-6 h-6 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current Active Track Preview */}
            <div className="bg-rose-50/70 border border-rose-100 rounded-2xl p-2 sm:p-2.5 mb-3 flex items-center gap-2">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-400 text-white flex items-center justify-center shrink-0">
                {activeSource === 'youtube' ? <YoutubeIcon className="w-3.5 h-3.5" /> : <Music className="w-3 h-3" />}
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-[9px] sm:text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                  Sedang Diputar:
                </span>
                <span className="block text-[11px] sm:text-xs font-bold text-gray-800 truncate">
                  {currentTrackTitle}
                </span>
              </div>
            </div>

            {/* Tab Switcher */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-gray-100 rounded-xl mb-3">
              <button
                type="button"
                onClick={() => setActiveTab('youtube')}
                className={`py-1.5 rounded-lg text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  activeTab === 'youtube'
                    ? 'bg-white text-red-600 shadow-xs'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
                <span>Link YouTube</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`py-1.5 rounded-lg text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  activeTab === 'upload'
                    ? 'bg-white text-rose-600 shadow-xs'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>File MP3</span>
              </button>
            </div>

            {/* Tab 1: YouTube Link Input */}
            {activeTab === 'youtube' && (
              <form onSubmit={handleApplyYouTube} className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Tempel (Paste) Link Video YouTube:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="https://youtu.be/... atau youtube.com"
                      value={youtubeInput}
                      onChange={(e) => {
                        setYoutubeInput(e.target.value);
                        setYoutubeError('');
                        setYoutubeSuccess('');
                      }}
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-red-400 bg-rose-50/20"
                    />
                    <YoutubeIcon className="w-4 h-4 text-red-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {youtubeError && (
                  <div className="flex items-start gap-1.5 text-[11px] text-red-600 font-medium bg-red-50 p-2 rounded-xl border border-red-100">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{youtubeError}</span>
                  </div>
                )}

                {youtubeSuccess && (
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold bg-emerald-50 p-2 rounded-xl border border-emerald-100">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{youtubeSuccess}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoadingYoutube || !youtubeInput.trim()}
                  className="w-full py-2.5 px-3 bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md shadow-red-500/20 active:scale-95 transition cursor-pointer"
                >
                  <YoutubeIcon className="w-4 h-4" />
                  <span>{isLoadingYoutube ? 'Memuat Lagu...' : 'Pasang Lagu YouTube'}</span>
                </button>
              </form>
            )}

            {/* Tab 2: Upload MP3 */}
            {activeTab === 'upload' && (
              <div className="space-y-3">
                <p className="text-gray-500 leading-relaxed text-[11px]">
                  Kamu bisa mengunggah file musik MP3 langsung dari memori HP atau laptop:
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 px-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md shadow-rose-500/20 active:scale-95 transition cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Pilih File MP3</span>
                </button>
              </div>
            )}

            {/* Footer Reset Option */}
            <div className="mt-4 pt-2.5 border-t border-rose-100 flex items-center justify-between text-[10px]">
              <span className="text-gray-400">Ingin lagu awal kita?</span>
              <button
                type="button"
                onClick={handleResetToDefault}
                className="text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 cursor-pointer hover:underline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset ke Lagu Default</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}