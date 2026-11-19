import React, { useEffect, useRef } from 'react';

// Pre-defined romantic particles with randomized initial positions and animation timings
const PARTICLES = [
  { id: 1, left: '6%', size: 16, duration: 15, delay: 0, type: 'heart', opacity: 0.45, color: '#f43f5e' },
  { id: 2, left: '16%', size: 12, duration: 18, delay: 4, type: 'petal', opacity: 0.4, color: '#fb7185' },
  { id: 3, left: '26%', size: 20, duration: 16, delay: 8, type: 'heart', opacity: 0.5, color: '#f43f5e' },
  { id: 4, left: '36%', size: 10, duration: 21, delay: 2, type: 'sparkle', opacity: 0.35, color: '#fda4af' },
  { id: 5, left: '46%', size: 18, duration: 14, delay: 6, type: 'heart', opacity: 0.45, color: '#e11d48' },
  { id: 6, left: '56%', size: 14, duration: 17, delay: 1, type: 'petal', opacity: 0.4, color: '#fb7185' },
  { id: 7, left: '66%', size: 22, duration: 13, delay: 9, type: 'heart', opacity: 0.5, color: '#f43f5e' },
  { id: 8, left: '76%', size: 12, duration: 19, delay: 5, type: 'sparkle', opacity: 0.35, color: '#fda4af' },
  { id: 9, left: '86%', size: 16, duration: 16, delay: 7, type: 'heart', opacity: 0.45, color: '#fb7185' },
  { id: 10, left: '94%', size: 13, duration: 18, delay: 3, type: 'petal', opacity: 0.4, color: '#f43f5e' },
  { id: 11, left: '3%', size: 14, duration: 20, delay: 11, type: 'petal', opacity: 0.35, color: '#fda4af' },
  { id: 12, left: '51%', size: 11, duration: 22, delay: 12, type: 'sparkle', opacity: 0.35, color: '#f43f5e' },
];

const ICONS = ['❤️', '💖', '✨', '🌸', '💕'];

export default function FloatingHeartsCanvas() {
  const trailContainerRef = useRef(null);

  useEffect(() => {
    // Only enable mouse trail on desktop devices with fine pointer (mouse / trackpad)
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const container = trailContainerRef.current;
    if (!container) return;

    let lastSpawnTime = 0;

    const spawnParticle = (x, y, isClick = false) => {
      if (!container) return;

      // Limit max simultaneous active particles to 25 to protect performance
      if (container.childElementCount > 25) {
        container.firstElementChild?.remove();
      }

      const el = document.createElement('span');
      el.className = 'cursor-heart-particle';

      const icon = ICONS[Math.floor(Math.random() * ICONS.length)];
      el.textContent = icon;

      const size = isClick ? Math.random() * 8 + 16 : Math.random() * 6 + 13;
      const dx1 = (Math.random() - 0.5) * (isClick ? 50 : 25);
      const dx2 = dx1 * 1.8 + (Math.random() - 0.5) * 20;
      const rot1 = (Math.random() - 0.5) * 35;
      const rot2 = (Math.random() - 0.5) * 60;
      const duration = isClick ? 0.95 : 0.85;

      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.fontSize = `${size}px`;
      el.style.setProperty('--dx1', `${dx1}px`);
      el.style.setProperty('--dx2', `${dx2}px`);
      el.style.setProperty('--rot1', `${rot1}deg`);
      el.style.setProperty('--rot2', `${rot2}deg`);
      el.style.animationDuration = `${duration}s`;

      container.appendChild(el);

      el.addEventListener('animationend', () => el.remove(), { once: true });
    };

    const handleMouseMove = (e) => {
      const now = performance.now();
      // Throttle spawn to every 45ms for a buttery-smooth continuous trail without lag
      if (now - lastSpawnTime < 45) return;
      lastSpawnTime = now;

      spawnParticle(e.clientX, e.clientY, false);
    };

    const handleClick = (e) => {
      // Fun romantic burst of 4 particles on click
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          spawnParticle(
            e.clientX + (Math.random() - 0.5) * 20,
            e.clientY + (Math.random() - 0.5) * 20,
            true
          );
        }, i * 35);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {/* Ambient background drifting romantic particles */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      >
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="absolute block animate-particle-float"
            style={{
              left: p.left,
              bottom: '-40px',
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              opacity: p.opacity,
            }}
          >
            {p.type === 'heart' ? (
              <svg
                width={p.size}
                height={p.size}
                viewBox="0 0 24 24"
                fill={p.color}
                className="drop-shadow-xs"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : p.type === 'petal' ? (
              <svg
                width={p.size}
                height={p.size * 0.7}
                viewBox="0 0 24 16"
                fill={p.color}
              >
                <ellipse cx="12" cy="8" rx="10" ry="5" transform="rotate(30 12 8)" />
              </svg>
            ) : (
              <svg
                width={p.size * 0.8}
                height={p.size * 0.8}
                viewBox="0 0 24 24"
                fill={p.color}
              >
                <circle cx="12" cy="12" r="6" />
              </svg>
            )}
          </span>
        ))}
      </div>

      {/* High-performance desktop mouse cursor trail container */}
      <div
        ref={trailContainerRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none"
      />
    </>
  );
}
