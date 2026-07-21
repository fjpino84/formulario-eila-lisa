"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import ChallengeCheckboxes from "@/components/ChallengeCheckboxes";
import { REQUIRED_SELECTIONS } from "@/lib/contest";

interface FormState {
  fullName: string;
  company: string;
  position: string;
  phone: string;
  email: string;
}

const INITIAL_STATE: FormState = {
  fullName: "",
  company: "",
  position: "",
  phone: "",
  email: "",
};

export default function ContestForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [selected, setSelected] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isComplete =
    form.fullName.trim() !== "" &&
    form.company.trim() !== "" &&
    form.position.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.email.trim() !== "" &&
    selected.length === REQUIRED_SELECTIONS;

  function updateField(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isComplete || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/participants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          company: form.company,
          position: form.position,
          phone: form.phone,
          email: form.email,
          selectedAnswers: selected,
        }),
      });

      if (!res.ok) {
        throw new Error("No se pudo enviar la participación");
      }

      router.push("/contests/gracias");
    } catch {
      setError("Ocurrió un error al enviar tu participación. Inténtalo de nuevo.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Participa Ahora</h2>
        <div className="mt-3 border-b border-gray-200" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Nombre Completo</label>
          <input
            type="text"
            required
            placeholder="Ej: Juan Pérez"
            value={form.fullName}
            onChange={updateField("fullName")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Empresa</label>
          <input
            type="text"
            required
            placeholder="Nombre de tu organización"
            value={form.company}
            onChange={updateField("company")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Cargo</label>
          <input
            type="text"
            required
            placeholder="Tu puesto actual"
            value={form.position}
            onChange={updateField("position")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="tel"
            required
            placeholder="+56 9 ..."
            value={form.phone}
            onChange={updateField("phone")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            required
            placeholder="email@empresa.com"
            value={form.email}
            onChange={updateField("email")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
          />
        </div>
      </div>

      <ChallengeCheckboxes selected={selected} onChange={setSelected} />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={!isComplete || submitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-800 px-6 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        <span>▷</span>
        {submitting ? "Enviando..." : "Enviar Participación"}
      </button>
    </form>
  );
}
