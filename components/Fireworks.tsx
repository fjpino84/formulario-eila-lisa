"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  top: number;
  delay: number;
  color: string;
}

const COLORS = ["#0d9488", "#7e22ce", "#f59e0b", "#ef4444", "#06b6d4", "#facc15"];

function makeBurst(seed: number): Particle[] {
  return Array.from({ length: 24 }, (_, i) => ({
    id: seed * 100 + i,
    left: 10 + Math.random() * 80,
    top: 10 + Math.random() * 50,
    delay: Math.random() * 1.2,
    color: COLORS[i % COLORS.length],
  }));
}

interface FireworksProps {
  onDone?: () => void;
}

export default function Fireworks({ onDone }: FireworksProps) {
  const [particles, setParticles] = useState<Particle[]>(() => [
    ...makeBurst(1),
    ...makeBurst(2),
    ...makeBurst(3),
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => onDone?.(), 4000);
    return () => clearTimeout(timeout);
  }, [onDone]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="firework-particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            backgroundColor: p.color,
          }}
        />
      ))}
      <div className="firework-banner">
        <p className="firework-banner-text">🎆 ¡100 Participantes! 🎆</p>
      </div>
      <style jsx>{`
        .firework-particle {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          opacity: 0;
          animation: firework-pop 1.4s ease-out forwards;
        }
        @keyframes firework-pop {
          0% {
            opacity: 0;
            transform: scale(0) translateY(0);
          }
          15% {
            opacity: 1;
            transform: scale(1.4) translateY(0);
          }
          100% {
            opacity: 0;
            transform: scale(0.4) translateY(60px);
          }
        }
        .firework-banner {
          position: absolute;
          top: 12%;
          left: 50%;
          transform: translateX(-50%);
          animation: firework-banner-in 0.6s ease-out forwards;
        }
        .firework-banner-text {
          font-size: 1.75rem;
          font-weight: 800;
          color: white;
          text-shadow:
            0 0 8px rgba(0, 0, 0, 0.5),
            0 2px 4px rgba(0, 0, 0, 0.3);
          white-space: nowrap;
        }
        @keyframes firework-banner-in {
          from {
            opacity: 0;
            transform: translateX(-50%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
