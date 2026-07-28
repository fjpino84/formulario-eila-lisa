"use client";

import { useState } from "react";
import Image from "next/image";
import { CHALLENGE_OPTIONS, REQUIRED_SELECTIONS } from "@/lib/contest";

interface ChallengeCheckboxesProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function ChallengeCheckboxes({ selected, onChange }: ChallengeCheckboxesProps) {
  const [showFullscreen, setShowFullscreen] = useState(false);

  function toggle(id: string) {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
      return;
    }
    if (selected.length >= REQUIRED_SELECTIONS) return;
    onChange([...selected, id]);
  }

  return (
    <div className="rounded-xl bg-gray-100 p-6">
      <h3 className="text-lg font-semibold text-teal-800">Desafío Técnico</h3>
      <p className="mt-2 text-sm text-gray-600">
        Analiza los siguientes hallazgos de una auditoría documental y{" "}
        <span className="font-semibold text-purple-700">
          selecciona exactamente {REQUIRED_SELECTIONS}
        </span>{" "}
        de las 5 opciones sospechosas.
      </p>

      <div className="mt-6 flex flex-col items-center text-center">
        <h4 className="text-base font-bold text-teal-800">Detecta el Fraude Visible</h4>
        <button
          type="button"
          onClick={() => setShowFullscreen(true)}
          className="mt-3 w-full max-w-sm cursor-zoom-in"
          aria-label="Ver boleta en pantalla completa"
        >
          <Image
            src="/boleta.png"
            alt="Boleta de ejemplo con datos ficticios"
            width={1080}
            height={907}
            className="h-auto w-full rounded-lg border border-gray-200 shadow-sm"
          />
        </button>
      </div>

      {showFullscreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowFullscreen(false)}
        >
          <button
            type="button"
            onClick={() => setShowFullscreen(false)}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
          >
            ×
          </button>
          <Image
            src="/boleta.png"
            alt="Boleta de ejemplo con datos ficticios"
            width={1080}
            height={907}
            className="max-h-full max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="mt-4 space-y-3">
        {CHALLENGE_OPTIONS.map((option) => {
          const checked = selected.includes(option.id);
          const disabled = !checked && selected.length >= REQUIRED_SELECTIONS;
          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border bg-white px-4 py-3 text-sm shadow-sm ${
                disabled ? "cursor-not-allowed opacity-50" : ""
              } ${checked ? "border-teal-600" : "border-gray-200"}`}
            >
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={() => toggle(option.id)}
                className="h-4 w-4 rounded border-gray-300 text-teal-700 focus:ring-teal-600"
              />
              <span className="text-gray-800">{option.label}</span>
            </label>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-gray-500">
        Seleccionados: {selected.length} de {REQUIRED_SELECTIONS}
      </p>
    </div>
  );
}
