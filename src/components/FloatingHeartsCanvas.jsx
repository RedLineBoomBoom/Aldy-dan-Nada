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

    // Romantic dreamy watercolor pastel palette (subtle, airy, and translucent)
    const colors = [
      'rgba(244, 63, 94, 0.38)',   // soft rose
      'rgba(251, 113, 133, 0.34)', // soft light rose
      'rgba(249, 168, 212, 0.38)', // soft pink
      'rgba(253, 186, 116, 0.28)', // soft warm peach
      'rgba(216, 180, 254, 0.28)', // soft dreamy lavender
    ];

    // Sparse, clean particle count so text and photos remain completely clear
    const isMobile = window.innerWidth < 640;
    const count = isMobile
      ? Math.min(7, Math.max(4, Math.floor(window.innerWidth / 65)))
      : Math.min(13, Math.max(7, Math.floor(window.innerWidth / 95)));

    const particles = [];

    class Particle {
      constructor(isManual = false, x = null, y = null) {
        if (isManual) {
          this.x = x ?? Math.random() * width;
          this.y = y ?? height + 20;
          this.size = Math.random() * 6 + 7;
          this.speedY = Math.random() * 0.8 + 0.45;
          this.speedX = (Math.random() - 0.5) * 0.6;
          this.color = colors[Math.floor(Math.random() * colors.length)];
          this.angle = Math.random() * Math.PI * 2;
          this.spin = (Math.random() - 0.5) * 0.025;
          this.type = Math.random() > 0.4 ? 'heart' : Math.random() > 0.5 ? 'petal' : 'circle';
          this.opacity = Math.random() * 0.2 + 0.45;
        } else {
          this.reset(true);
        }
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 25;
        this.size = Math.random() * 7 + 8; // Delicate sizes: 8px to 15px
        this.speedY = Math.random() * 0.5 + 0.25; // Gentle, tranquil upward drift
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.016;
        this.type = Math.random() > 0.45 ? 'heart' : Math.random() > 0.55 ? 'petal' : 'circle';
        this.opacity = Math.random() * 0.25 + 0.25; // Translucent so text is 100% readable
      }

      update() {
        this.y -= this.speedY;
        this.x += Math.sin(this.angle) * 0.45 + this.speedX;
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

    // Populate ambient particles
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    // Smooth, restrained cursor trail on desktop
    let lastMouseTime = 0;
    const handleMouseMove = (e) => {
      const now = performance.now();
      // Throttle spawn to every 95ms for a light, delicate trail
      if (now - lastMouseTime < 95) return;
      lastMouseTime = now;

      const p = new Particle(
        true,
        e.clientX + (Math.random() - 0.5) * 14,
        e.clientY + (Math.random() - 0.5) * 14
      );
      particles.push(p);

      // Keep maximum total particles strictly bounded so it never clutters
      if (particles.length > count + 6) {
        particles.shift();
      }
    };

    // Click burst: creates a modest, graceful burst of 2 small hearts
    const handleClick = (e) => {
      for (let i = 0; i < 2; i++) {
        const p = new Particle(
          true,
          e.clientX + (Math.random() - 0.5) * 18,
          e.clientY + (Math.random() - 0.5) * 18
        );
        p.speedY = Math.random() * 0.9 + 0.5;
        particles.push(p);
      }
      if (particles.length > count + 8) {
        particles.splice(0, particles.length - (count + 8));
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    // Handle tab visibility
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      } else {
        if (!isRunning) {
          isRunning = true;
          animationFrameId = requestAnimationFrame(render);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isRunning = false;
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-60"
    />
  );
}
