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

    // Romantic dreamy watercolor pastel palette (vibrant yet soft)
    const colors = [
      'rgba(244, 63, 94, 0.55)',   // rose
      'rgba(251, 113, 133, 0.50)',  // light rose
      'rgba(249, 168, 212, 0.55)', // soft pink
      'rgba(253, 186, 116, 0.45)', // warm peach
      'rgba(216, 180, 254, 0.45)', // dreamy lavender
    ];

    // Responsive particle count (plenty of visible hearts & petals floating)
    const count = Math.min(32, Math.max(16, Math.floor(window.innerWidth / 40)));
    const particles = [];

    class Particle {
      constructor(isManual = false, x = null, y = null) {
        if (isManual) {
          this.x = x ?? Math.random() * width;
          this.y = y ?? height + 20;
          this.size = Math.random() * 10 + 9;
          this.speedY = Math.random() * 1.2 + 0.7;
          this.speedX = (Math.random() - 0.5) * 0.8;
          this.color = colors[Math.floor(Math.random() * colors.length)];
          this.angle = Math.random() * Math.PI * 2;
          this.spin = (Math.random() - 0.5) * 0.03;
          this.type = Math.random() > 0.4 ? 'heart' : Math.random() > 0.5 ? 'petal' : 'circle';
          this.opacity = Math.random() * 0.3 + 0.6;
        } else {
          this.reset(true);
        }
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 25;
        this.size = Math.random() * 14 + 10;
        this.speedY = Math.random() * 0.85 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.02;
        this.type = Math.random() > 0.4 ? 'heart' : Math.random() > 0.5 ? 'petal' : 'circle';
        this.opacity = Math.random() * 0.4 + 0.35;
      }

      update() {
        this.y -= this.speedY;
        this.x += Math.sin(this.angle) * 0.6 + this.speedX;
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
          ctx.arc(0, 0, this.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    // Populate initial drifting hearts and petals
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    // Smooth romantic cursor trail
    let lastMouseTime = 0;
    const handleMouseMove = (e) => {
      const now = performance.now();
      if (now - lastMouseTime < 65) return;
      lastMouseTime = now;

      const p = new Particle(
        true,
        e.clientX + (Math.random() - 0.5) * 16,
        e.clientY + (Math.random() - 0.5) * 16
      );
      particles.push(p);

      if (particles.length > count + 22) {
        particles.shift();
      }
    };

    // Click burst: creates a lovely cluster of floating hearts
    const handleClick = (e) => {
      for (let i = 0; i < 4; i++) {
        const p = new Particle(
          true,
          e.clientX + (Math.random() - 0.5) * 24,
          e.clientY + (Math.random() - 0.5) * 24
        );
        p.speedY = Math.random() * 1.5 + 0.9;
        particles.push(p);
      }
      if (particles.length > count + 28) {
        particles.splice(0, particles.length - (count + 28));
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    // Handle tab visibility so background tabs don't waste power
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
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
}
