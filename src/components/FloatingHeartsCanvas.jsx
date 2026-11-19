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
    const TARGET_FPS = 35; // Silky smooth 35 FPS, gentle on mobile & desktop battery/GPU
    const FRAME_INTERVAL = 1000 / TARGET_FPS;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Romantic watercolor pastel palette
    const colors = [
      'rgba(244, 63, 94, 0.42)',   // rose
      'rgba(251, 113, 133, 0.38)',  // light rose
      'rgba(249, 168, 212, 0.42)', // soft pink
      'rgba(253, 186, 116, 0.32)', // warm peach
      'rgba(216, 180, 254, 0.32)', // dreamy lavender
    ];

    // Mobile vs Desktop particle budgeting
    const isMobile = window.innerWidth < 640;
    const baseCount = isMobile
      ? Math.min(10, Math.max(6, Math.floor(window.innerWidth / 45)))
      : Math.min(22, Math.max(14, Math.floor(window.innerWidth / 50)));

    const particles = [];

    class Particle {
      constructor(isCursor = false, startX = 0, startY = 0) {
        this.isCursor = isCursor;
        if (isCursor) {
          this.x = startX;
          this.y = startY;
          this.size = Math.random() * 8 + 8;
          this.speedY = Math.random() * 0.8 + 0.45;
          this.speedX = (Math.random() - 0.5) * 0.8;
          this.color = colors[Math.floor(Math.random() * colors.length)];
          this.angle = Math.random() * Math.PI * 2;
          this.spin = (Math.random() - 0.5) * 0.025;
          this.type = Math.random() > 0.4 ? 'heart' : Math.random() > 0.5 ? 'petal' : 'circle';
          this.opacity = Math.random() * 0.2 + 0.45;
          this.fadeSpeed = Math.random() * 0.008 + 0.009;
          this.dead = false;
        } else {
          this.reset(true);
        }
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 25;
        this.size = Math.random() * (isMobile ? 9 : 13) + 7;
        this.speedY = Math.random() * 0.65 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.016;
        this.type = Math.random() > 0.45 ? 'heart' : Math.random() > 0.55 ? 'petal' : 'circle';
        this.opacity = Math.random() * 0.4 + 0.22;
        this.dead = false;
      }

      update() {
        this.y -= this.speedY;
        this.x += Math.sin(this.angle) * 0.4 + this.speedX;
        this.angle += this.spin;

        if (this.isCursor) {
          this.opacity -= this.fadeSpeed;
          if (this.opacity <= 0.02 || this.y < -30) {
            this.dead = true;
          }
        } else {
          if (this.y < -30 || this.x < -30 || this.x > width + 30) {
            this.reset();
          }
        }
      }

      draw() {
        if (this.opacity <= 0) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, this.opacity));

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

    // Initialize base ambient particles
    for (let i = 0; i < baseCount; i++) {
      particles.push(new Particle());
    }

    // Desktop mouse interaction (subtle, romantic pastel trail that blends with the website)
    const isFinePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    let lastMouseMove = 0;

    const handleMouseMove = (e) => {
      const now = performance.now();
      // Throttle spawn to every 110ms for a gentle, dreamy trail
      if (now - lastMouseMove < 110) return;
      lastMouseMove = now;

      // Keep max particles strictly bounded
      if (particles.length < baseCount + 16) {
        particles.push(
          new Particle(
            true,
            e.clientX + (Math.random() - 0.5) * 16,
            e.clientY + (Math.random() - 0.5) * 16
          )
        );
      }
    };

    const handleClick = (e) => {
      // Gentle burst of 3 soft watercolor hearts on click
      if (particles.length >= baseCount + 20) return;
      for (let i = 0; i < 3; i++) {
        particles.push(
          new Particle(
            true,
            e.clientX + (Math.random() - 0.5) * 24,
            e.clientY + (Math.random() - 0.5) * 24
          )
        );
      }
    };

    if (isFinePointer && !isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('click', handleClick, { passive: true });
    }

    // Pause rendering when tab is hidden to save battery & memory
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

    const render = (currentTime) => {
      if (!isRunning) return;

      animationFrameId = requestAnimationFrame(render);

      // Frame pacing: limit draw rate to target FPS
      const elapsed = currentTime - lastDrawTime;
      if (elapsed < FRAME_INTERVAL) return;
      lastDrawTime = currentTime - (elapsed % FRAME_INTERVAL);

      ctx.clearRect(0, 0, width, height);

      // Update and draw particles, removing dead cursor particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.dead) {
          particles.splice(i, 1);
        } else {
          p.draw();
        }
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      window.removeEventListener('resize', handleResize);
      if (isFinePointer && !isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('click', handleClick);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
    />
  );
}
