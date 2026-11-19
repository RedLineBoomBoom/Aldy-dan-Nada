import React, { useEffect, useRef } from 'react';

export default function FloatingHeartsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle types: 'heart', 'petal', 'sparkle'
    const colors = [
      'rgba(244, 63, 94, 0.45)',   // rose
      'rgba(251, 113, 133, 0.4)',  // light rose
      'rgba(249, 168, 212, 0.45)', // pink
      'rgba(253, 186, 116, 0.35)', // warm peach
      'rgba(216, 180, 254, 0.35)', // lavender
    ];

    const particles = [];
    const count = Math.min(35, Math.floor(window.innerWidth / 40));

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 20;
        this.size = Math.random() * 14 + 10;
        this.speedY = Math.random() * 0.8 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.02;
        this.type = Math.random() > 0.4 ? 'heart' : Math.random() > 0.5 ? 'petal' : 'circle';
        this.opacity = Math.random() * 0.5 + 0.3;
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
          // Draw heart path
          const s = this.size * 0.08;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-10 * s, -10 * s, -20 * s, 5 * s, 0, 20 * s);
          ctx.bezierCurveTo(20 * s, 5 * s, 10 * s, -10 * s, 0, 0);
          ctx.fill();
        } else if (this.type === 'petal') {
          // Draw oval petal
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size * 0.6, this.size * 0.3, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Soft bokeh circle
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    // Mouse movement interaction
    let mouse = { x: -100, y: -100 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (Math.random() > 0.6) {
        const p = new Particle();
        p.x = mouse.x + (Math.random() - 0.5) * 20;
        p.y = mouse.y + (Math.random() - 0.5) * 20;
        p.speedY = Math.random() * 1.2 + 0.8;
        p.size = Math.random() * 8 + 8;
        particles.push(p);
        if (particles.length > count + 20) {
          particles.shift();
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  );
}
