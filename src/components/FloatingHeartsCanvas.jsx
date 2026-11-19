import React, { useEffect, useRef } from 'react';

export default function FloatingHeartsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Respect user reduced-motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let isRunning = true;
    let lastDrawTime = 0;
    const TARGET_FPS = 38; // Silky smooth for gentle floating, saves 40-50% CPU/GPU compared to 60/120Hz
    const FRAME_INTERVAL = 1000 / TARGET_FPS;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Particle colors
    const colors = [
      'rgba(244, 63, 94, 0.42)',   // rose
      'rgba(251, 113, 133, 0.38)',  // light rose
      'rgba(249, 168, 212, 0.42)', // pink
      'rgba(253, 186, 116, 0.32)', // warm peach
      'rgba(216, 180, 254, 0.32)', // lavender
    ];

    // Mobile vs Desktop particle budgeting
    const isMobile = window.innerWidth < 640;
    const count = isMobile
      ? Math.min(10, Math.max(6, Math.floor(window.innerWidth / 45)))
      : Math.min(18, Math.max(12, Math.floor(window.innerWidth / 55)));

    const particles = [];

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 20;
        this.size = Math.random() * (isMobile ? 10 : 13) + 8;
        this.speedY = Math.random() * 0.7 + 0.35;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.018;
        this.type = Math.random() > 0.45 ? 'heart' : Math.random() > 0.55 ? 'petal' : 'circle';
        this.opacity = Math.random() * 0.45 + 0.25;
      }

      update() {
        this.y -= this.speedY;
        this.x += Math.sin(this.angle) * 0.5 + this.speedX;
        this.angle += this.spin;

        if (this.y < -25 || this.x < -25 || this.x > width + 25) {
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
          const s = this.size * 0.075;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-10 * s, -10 * s, -20 * s, 5 * s, 0, 20 * s);
          ctx.bezierCurveTo(20 * s, 5 * s, 10 * s, -10 * s, 0, 0);
          ctx.fill();
        } else if (this.type === 'petal') {
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size * 0.55, this.size * 0.28, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    // Throttled mouse interaction on desktop only
    let lastMouseTime = 0;
    const handleMouseMove = (e) => {
      if (isMobile) return;
      const now = performance.now();
      if (now - lastMouseTime < 250) return;
      lastMouseTime = now;

      if (particles.length < count + 6) {
        const p = new Particle();
        p.x = e.clientX + (Math.random() - 0.5) * 15;
        p.y = e.clientY + (Math.random() - 0.5) * 15;
        p.speedY = Math.random() * 1.0 + 0.6;
        p.size = Math.random() * 7 + 7;
        particles.push(p);
      }
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Pause rendering when tab is hidden or minimized
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      } else {
        if (!isRunning) {
          isRunning = true;
          lastDrawTime = performance.now();
          animationFrameId = requestAnimationFrame(render);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Pause canvas updates during active scrolling to free 100% compositor & GPU resources
    let isScrolling = false;
    let scrollTimeout = null;

    const handleScroll = () => {
      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        lastDrawTime = performance.now();
      }, 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const render = (currentTime) => {
      if (!isRunning) return;

      animationFrameId = requestAnimationFrame(render);

      // Skip redrawing while scrolling: freezes current frame in GPU memory, zero jank
      if (isScrolling) return;

      // Frame pacing: limit draw rate to target FPS
      const elapsed = currentTime - lastDrawTime;
      if (elapsed < FRAME_INTERVAL) return;
      lastDrawTime = currentTime - (elapsed % FRAME_INTERVAL);

      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (!isMobile) window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60 will-change-transform transform-gpu"
    />
  );
}
