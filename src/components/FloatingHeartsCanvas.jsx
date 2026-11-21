import React, { useEffect, useRef } from 'react';

export default function FloatingHeartsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let isRunning = true;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Romantic dreamy watercolor pastel palette (clear, vibrant yet soft)
    const colors = [
      'rgba(244, 63, 94, 0.60)',   // rose
      'rgba(251, 113, 133, 0.55)', // light rose
      'rgba(249, 168, 212, 0.60)', // soft pink
      'rgba(253, 186, 116, 0.48)', // warm peach
      'rgba(216, 180, 254, 0.48)', // dreamy lavender
    ];

    // Battery & CPU thermal optimization:
    const isMobile = window.innerWidth < 640;
    const targetFpsInterval = isMobile ? 55 : 28; // ~18 FPS on mobile, ~35 FPS on desktop
    let lastDrawTime = 0;
    let isScrolling = false;
    let scrollTimeout = null;
    let idleTimeout = null;

    // Wake up canvas on user interaction and auto-pause when idle on mobile to keep device ice-cold
    const wakeUp = () => {
      if (!isRunning && !document.hidden) {
        isRunning = true;
        lastDrawTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
      if (isMobile) {
        if (idleTimeout) clearTimeout(idleTimeout);
        idleTimeout = setTimeout(() => {
          isRunning = false;
          if (animationFrameId) cancelAnimationFrame(animationFrameId);
        }, 3500); // Stop rendering if user is idle for 3.5s (e.g. reading a letter or viewing a photo)
      }
    };

    // Pause canvas completely while actively scrolling on mobile to keep 60fps/120fps scroll silky
    const handleScroll = () => {
      wakeUp();
      if (!isMobile) return;
      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', wakeUp, { passive: true });
    window.addEventListener('touchmove', wakeUp, { passive: true });

    // Perfectly balanced particle count: 5 on mobile, 14 on desktop
    const count = isMobile ? 5 : 14;

    const particles = [];

    class Particle {
      constructor(isManual = false, x = null, y = null) {
        if (isManual) {
          this.x = x ?? Math.random() * width;
          this.y = y ?? height + 20;
          this.size = Math.random() * 7 + 9;
          this.speedY = Math.random() * 1.0 + 0.55;
          this.speedX = (Math.random() - 0.5) * 0.6;
          this.color = colors[Math.floor(Math.random() * colors.length)];
          this.angle = Math.random() * Math.PI * 2;
          this.spin = (Math.random() - 0.5) * 0.025;
          this.type = Math.random() > 0.35 ? 'heart' : Math.random() > 0.5 ? 'petal' : 'circle';
          this.opacity = Math.random() * 0.25 + 0.55;
        } else {
          this.reset(true);
        }
      }

      reset(init = false) {
        this.x = Math.random() * width;
        // Distribute immediately across the whole screen on load
        this.y = init ? Math.random() * height : height + 20;
        this.size = Math.random() * 8 + 10; // Well-proportioned size: 10px to 18px
        this.speedY = Math.random() * 0.65 + 0.38; // Graceful, visible upward motion
        this.speedX = (Math.random() - 0.5) * 0.45;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.018;
        this.type = Math.random() > 0.35 ? 'heart' : Math.random() > 0.5 ? 'petal' : 'circle';
        this.opacity = Math.random() * 0.25 + 0.45; // Visible and clear without obstructing reading
      }

      update() {
        this.y -= this.speedY;
        this.x += Math.sin(this.angle) * 0.5 + this.speedX;
        this.angle += this.spin;

        if (this.y < -30 || this.x < -30 || this.x > width + 30) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;

        if (this.type === 'heart') {
          const s = this.size * 0.08;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-10 * s, -10 * s, -20 * s, 5 * s, 0, 20 * s);
          ctx.bezierCurveTo(20 * s, 5 * s, 10 * s, -10 * s, 0, 0);
          ctx.fill();
        } else if (this.type === 'petal') {
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size * 0.6, this.size * 0.3, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.38, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    // Populate ambient particles immediately
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    // Smooth romantic cursor trail on desktop
    let lastMouseTime = 0;
    const handleMouseMove = (e) => {
      wakeUp();
      const now = performance.now();
      if (now - lastMouseTime < 75) return;
      lastMouseTime = now;

      const p = new Particle(
        true,
        e.clientX + (Math.random() - 0.5) * 15,
        e.clientY + (Math.random() - 0.5) * 15
      );
      particles.push(p);

      if (particles.length > count + 12) {
        particles.shift();
      }
    };

    // Click burst: creates a lovely cluster of 3 floating hearts
    const handleClick = (e) => {
      wakeUp();
      for (let i = 0; i < 3; i++) {
        const p = new Particle(
          true,
          e.clientX + (Math.random() - 0.5) * 20,
          e.clientY + (Math.random() - 0.5) * 20
        );
        p.speedY = Math.random() * 1.2 + 0.7;
        particles.push(p);
      }
      if (particles.length > count + 16) {
        particles.splice(0, particles.length - (count + 16));
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    // Handle tab visibility so background tabs pause cleanly
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      } else {
        wakeUp();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = (currentTime) => {
      if (!isRunning) return;

      animationFrameId = requestAnimationFrame(render);

      // Skip painting while actively scrolling on mobile to keep GPU cool
      if (isScrolling) return;

      // Throttle FPS to prevent GPU overheating & heavy battery drain
      const elapsed = currentTime - lastDrawTime;
      if (elapsed < targetFpsInterval) return;
      lastDrawTime = currentTime - (elapsed % targetFpsInterval);

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
    };

    // Kick off animation loop and start mobile idle countdown
    wakeUp();

    return () => {
      isRunning = false;
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', wakeUp);
      window.removeEventListener('touchmove', wakeUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (idleTimeout) clearTimeout(idleTimeout);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
}
