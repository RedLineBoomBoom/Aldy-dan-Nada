// Web Audio procedural romantic music box generator
// Plays a warm, sweet, gentle romantic chord progression (Fmaj7 -> G -> Em7 -> Am7)

class RomanticMusicBox {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.noteIndex = 0;
    this.gainNode = null;
    
    // Notes frequencies (Hz)
    // C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392.00, A4=440.00, B4=493.88
    // C5=523.25, D5=587.33, E5=659.25, F5=698.46, G5=783.99, A5=880.00
    this.melodyPattern = [
      // Fmaj7
      { note: 349.23, duration: 0.4 }, { note: 440.00, duration: 0.4 }, { note: 523.25, duration: 0.4 }, { note: 659.25, duration: 0.8 },
      { note: 523.25, duration: 0.4 }, { note: 440.00, duration: 0.4 },
      // G
      { note: 392.00, duration: 0.4 }, { note: 493.88, duration: 0.4 }, { note: 587.33, duration: 0.4 }, { note: 783.99, duration: 0.8 },
      { note: 587.33, duration: 0.4 }, { note: 493.88, duration: 0.4 },
      // Em7
      { note: 329.63, duration: 0.4 }, { note: 392.00, duration: 0.4 }, { note: 493.88, duration: 0.4 }, { note: 659.25, duration: 0.8 },
      { note: 493.88, duration: 0.4 }, { note: 392.00, duration: 0.4 },
      // Am7
      { note: 440.00, duration: 0.4 }, { note: 523.25, duration: 0.4 }, { note: 659.25, duration: 0.4 }, { note: 880.00, duration: 0.9 },
      { note: 659.25, duration: 0.4 }, { note: 523.25, duration: 0.4 },
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.28, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, duration) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Main chime oscillator
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    
    // Sub harmonic for warmth
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    
    osc.type = 'sine';
    subOsc.type = 'triangle';
    
    osc.frequency.setValueAtTime(freq, now);
    subOsc.frequency.setValueAtTime(freq * 0.5, now);
    
    // Envelope: quick attack, natural chime decay
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.35, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 1.2);
    
    subGain.gain.setValueAtTime(0.001, now);
    subGain.gain.exponentialRampToValueAtTime(0.12, now + 0.05);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.9);
    
    osc.connect(noteGain);
    subOsc.connect(subGain);
    
    noteGain.connect(this.gainNode);
    subGain.connect(this.gainNode);
    
    osc.start(now);
    subOsc.start(now);
    
    osc.stop(now + duration + 1.5);
    subOsc.stop(now + duration + 1.2);
  }

  step() {
    if (!this.isPlaying) return;
    const current = this.melodyPattern[this.noteIndex];
    this.playTone(current.note, current.duration);
    
    this.noteIndex = (this.noteIndex + 1) % this.melodyPattern.length;
    
    // Tempo interval in ms
    const delay = current.duration * 750;
    this.timer = setTimeout(() => this.step(), delay);
  }

  play() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.step();
  }

  pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  setVolume(volume) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, volume * 0.35)), this.ctx.currentTime);
    }
  }
}

export const romanticMusicBox = new RomanticMusicBox();
