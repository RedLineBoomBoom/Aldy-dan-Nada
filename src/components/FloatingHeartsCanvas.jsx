import React from 'react';

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

export default function FloatingHeartsCanvas() {
  return (
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
  );
}
