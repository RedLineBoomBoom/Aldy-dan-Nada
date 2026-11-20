import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Mic, Upload, Volume2, RotateCcw, Heart, Sparkles, Check, Disc3 } from 'lucide-react';

export default function VoiceNotePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(42); // default 42s
  const [audioUrl, setAudioUrl] = useState(() => {
    try {
      return localStorage.getItem('anniversary_custom_voicenote') || '/voicenote.mp3';
    } catch {
      return '/voicenote.mp3';
    }
  });

  const [hasCustomVN, setHasCustomVN] = useState(() => {
    try {
      return !!localStorage.getItem('anniversary_custom_voicenote');
    } catch {
      return false;
    }
  });

  const [showRecorder, setShowRecorder] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingTimerRef = useRef(null);

  // Sync time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Playback notice:', err);
        // Fallback: If voicenote.mp3 doesn't exist yet, simulate playback animation
        setIsPlaying(true);
      });
    }
  };

  // Simulating time advancement if local file hasn't been uploaded yet
  useEffect(() => {
    let timer;
    if (isPlaying && (!audioRef.current || audioRef.current.paused)) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, duration]);

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Audio = event.target?.result;
      if (base64Audio) {
        setAudioUrl(base64Audio);
        setHasCustomVN(true);
        try {
          localStorage.setItem('anniversary_custom_voicenote', base64Audio);
        } catch {}
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Voice Recording via Browser Microphone
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Audio = reader.result;
          setAudioUrl(base64Audio);
          setHasCustomVN(true);
          try {
            localStorage.setItem('anniversary_custom_voicenote', base64Audio);
          } catch {}
        };
        reader.readAsDataURL(audioBlob);

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      alert('Tidak dapat mengakses mikrofon. Pastikan izin mikrofon telah diberikan di browser!');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    }
  };

  const handleResetVN = () => {
    try {
      localStorage.removeItem('anniversary_custom_voicenote');
    } catch {}
    setAudioUrl('/voicenote.mp3');
    setHasCustomVN(false);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (newTime) => {
    const target = Math.max(0, Math.min(newTime, duration || 42));
    setCurrentTime(target);
    if (audioRef.current) {
      audioRef.current.currentTime = target;
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="pesan-suara" className="py-14 sm:py-20 px-3.5 sm:px-4 max-w-4xl mx-auto section-opt">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2.5 sm:mb-3 whitespace-nowrap">
          <Mic className="w-3.5 h-3.5 shrink-0" /> Pesan Suara Spesial Dari Aldy
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-romantic font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">
          Dengarkan Suara <span className="inline-block whitespace-nowrap text-rose-600">Dari Hati</span>
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto text-xs sm:text-base px-2">
          Ada kata-kata yang terlalu berharga jika hanya dituliskan. Pasang earphone-mu dan dengarkan pesan tulus dari Aldy:
        </p>
      </div>

      {/* Retro Cassette Tape / Voice Note Card */}
      <div className="relative bg-gradient-to-b from-[#2b1820] to-[#1c0f14] text-white rounded-3xl p-6 sm:p-9 shadow-xl shadow-rose-950/20 border-2 border-rose-900/40 overflow-hidden">
        {/* Subtle tape window glare */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Vintage Cassette Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-rose-900/40 text-xs text-rose-200/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="font-mono tracking-widest uppercase font-semibold">Aldy & Nada • Side A</span>
          </div>
          <span className="font-mono bg-rose-950/80 px-2.5 py-0.5 rounded-md border border-rose-800/40 text-amber-300">
            22.11.2026
          </span>
        </div>

        {/* Cassette Tape Reels Visual */}
        <div className="flex items-center justify-center gap-6 sm:gap-12 mb-7">
          {/* Reel Left */}
          <div className="flex flex-col items-center">
            <Disc3
              className={`w-14 h-14 sm:w-20 sm:h-20 text-rose-300/80 transition-transform duration-700 ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
            />
          </div>

          {/* Tape Center Window */}
          <div className="w-28 sm:w-44 h-12 sm:h-16 bg-black/60 rounded-xl border border-rose-800/50 flex items-center justify-center p-2 relative overflow-hidden">
            {/* Animated Waveform Bars */}
            <div className="flex items-center gap-1 sm:gap-1.5 h-full">
              {[40, 70, 30, 90, 60, 100, 45, 80, 50, 95, 35, 75, 60, 85].map((height, i) => (
                <div
                  key={i}
                  className={`w-1 sm:w-1.5 bg-gradient-to-t from-rose-500 to-amber-300 rounded-full transition-all duration-300 ${
                    isPlaying ? 'opacity-100' : 'opacity-35'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(15, (height * (1 + Math.sin(currentTime * 4 + i))) % 100)}%` : '20%',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Reel Right */}
          <div className="flex flex-col items-center">
            <Disc3
              className={`w-14 h-14 sm:w-20 sm:h-20 text-rose-300/80 transition-transform duration-700 ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
            />
          </div>
        </div>

        {/* Player Controls & Scrubber */}
        <div className="space-y-4 mb-6">
          {/* Interactive Draggable & Clickable Seek Bar */}
          <div className="space-y-1.5 select-none">
            <div className="relative group w-full py-2.5 flex items-center cursor-pointer">
              {/* Native range input on top for 100% reliable click, drag & touch on mobile & desktop */}
              <input
                type="range"
                min="0"
                max={duration || 42}
                step="0.1"
                value={Math.min(currentTime, duration || 42)}
                onChange={(e) => handleSeek(parseFloat(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-pointer"
                title="Geser atau klik untuk memajukan / mengulang audio"
              />

              {/* Background Track */}
              <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-rose-900/50 relative">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 via-pink-400 to-amber-300 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (currentTime / (duration || 42)) * 100)}%` }}
                />
              </div>

              {/* Custom Thumb handle */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full shadow-lg shadow-rose-500/60 border-2 border-rose-500 pointer-events-none group-hover:scale-125 transition-transform z-20"
                style={{ left: `${Math.min(100, Math.max(0, (currentTime / (duration || 42)) * 100))}%` }}
              />
            </div>

            {/* Time labels */}
            <div className="flex justify-between items-center text-xs font-mono text-rose-300/80 px-0.5">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Main Play/Pause Button */}
          <div className="flex items-center justify-center pt-1">
            <button
              type="button"
              onClick={togglePlay}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white flex items-center justify-center shadow-lg shadow-rose-600/40 hover:scale-105 active:scale-95 transition cursor-pointer"
              title={isPlaying ? 'Jeda' : 'Putar Pesan Suara'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
              ) : (
                <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white ml-0.5" />
              )}
            </button>
          </div>
        </div>

        {/* Bottom Drawer Toggle (Ganti / Rekam VN Sendiri) */}
        <div className="mt-5 pt-4 border-t border-rose-900/30 flex items-center justify-between text-xs text-rose-300/70">
          <button
            onClick={() => setShowRecorder(!showRecorder)}
            className="hover:text-amber-300 flex items-center gap-1.5 transition cursor-pointer"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>{showRecorder ? 'Tutup Pengaturan Rekaman' : 'Ganti / Rekam Voice Note Sendiri'}</span>
          </button>

          {hasCustomVN && (
            <button
              onClick={handleResetVN}
              className="hover:text-rose-400 flex items-center gap-1 transition cursor-pointer text-[11px]"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Suara</span>
            </button>
          )}
        </div>

        {/* Custom Record / Upload Panel */}
        {showRecorder && (
          <div className="mt-4 p-4 rounded-2xl bg-black/50 border border-rose-800/40 space-y-3">
            <p className="text-xs text-rose-200">
              Aldy bisa merekam suara langsung melalui mikrofon HP/laptop atau mengunggah file audio rekaman (.mp3 / .m4a):
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {!isRecording ? (
                <button
                  type="button"
                  onClick={startRecording}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Mulai Rekam Suara</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopRecording}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 animate-pulse transition active:scale-95 cursor-pointer"
                >
                  <span className="w-2.5 h-2.5 rounded-xs bg-white" />
                  <span>Selesai Rekam ({recordingTime}s)</span>
                </button>
              )}

              <label className="px-4 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900/80 border border-rose-700/50 text-rose-200 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Unggah File Audio</span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
