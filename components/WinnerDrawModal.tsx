"use client";

import { useEffect, useState } from "react";

interface WinnerDrawModalProps {
  phase: "spinning" | "revealed";
  winner: { fullName: string; company: string } | null;
  error: string | null;
  onClose: () => void;
}

const SAMPLE_NAMES = [
  "Ana Torres",
  "Diego Ferrocchio",
  "Luciana Tesón",
  "Paula Barnatan",
  "Francisco Pino",
  "Camila Rojas",
  "Martín Silva",
  "Valentina Gómez",
  "Sebastián Muñoz",
  "Josefa Contreras",
  "Rodrigo Vidal",
  "Constanza Reyes",
];

function useSpinningName(active: boolean): string {
  const [name, setName] = useState(SAMPLE_NAMES[0]);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setName(SAMPLE_NAMES[Math.floor(Math.random() * SAMPLE_NAMES.length)]);
    }, 90);
    return () => clearInterval(interval);
  }, [active]);

  return name;
}

export default function WinnerDrawModal({ phase, winner, error, onClose }: WinnerDrawModalProps) {
  const spinningName = useSpinningName(phase === "spinning");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
        {phase === "spinning" && (
          <>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
              Eligiendo ganador…
            </p>
            <div className="spin-window mt-4 flex items-center justify-center rounded-xl bg-gray-50">
              <span className="spin-name text-xl font-bold text-gray-800">{spinningName}</span>
            </div>
          </>
        )}

        {phase === "revealed" && (
          <>
            {error ? (
              <>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-2xl">
                  ⚠️
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">No se pudo elegir</h3>
                <p className="mt-2 text-sm text-gray-600">{error}</p>
              </>
            ) : (
              <>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-3xl">
                  🏆
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-amber-600">
                  ¡Tenemos un ganador!
                </p>
                <h3 className="mt-2 text-2xl font-extrabold text-gray-900">{winner?.fullName}</h3>
                <p className="mt-1 text-sm text-gray-600">{winner?.company}</p>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-lg bg-teal-800 px-4 py-2.5 text-sm font-semibold text-white"
            >
              Cerrar
            </button>
          </>
        )}
      </div>

      <style jsx>{`
        .spin-window {
          height: 4rem;
          overflow: hidden;
        }
        .spin-name {
          animation: spin-fade 0.09s linear;
        }
        @keyframes spin-fade {
          from {
            opacity: 0.3;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
