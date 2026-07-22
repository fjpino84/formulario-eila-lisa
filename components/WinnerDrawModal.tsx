"use client";

interface WinnerDrawModalProps {
  phase: "spinning" | "revealed";
  winner: { fullName: string; company: string } | null;
  error: string | null;
  onClose: () => void;
}

export default function WinnerDrawModal({ phase, winner, error, onClose }: WinnerDrawModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
        {phase === "spinning" && (
          <>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
              Eligiendo ganador…
            </p>
            <div className="slot-window mt-4">
              <div className="slot-track">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="slot-item">
                    🎲
                  </div>
                ))}
              </div>
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
        .slot-window {
          height: 4rem;
          overflow: hidden;
          border-radius: 0.75rem;
          background: #f3f4f6;
        }
        .slot-track {
          display: flex;
          flex-direction: column;
          animation: slot-spin 0.6s linear infinite;
        }
        .slot-item {
          height: 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
        }
        @keyframes slot-spin {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-64rem);
          }
        }
      `}</style>
    </div>
  );
}
