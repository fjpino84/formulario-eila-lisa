"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import StatCard from "@/components/StatCard";
import ParticipantTable, { Participant } from "@/components/ParticipantTable";
import PushNotificationsButton from "@/components/PushNotificationsButton";
import Fireworks from "@/components/Fireworks";
import WinnerDrawModal from "@/components/WinnerDrawModal";

interface ApiResponse {
  participants: Participant[];
  total: number;
  validCount: number;
  filteredTotal: number;
  page: number;
  pageSize: number;
}

const CONTEST_CLOSE_DATE = new Date("2026-08-15T23:59:59");

export default function AdminPageClient() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<ApiResponse | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [drawing, setDrawing] = useState(false);
  const [drawPhase, setDrawPhase] = useState<"spinning" | "revealed" | null>(null);
  const [drawWinner, setDrawWinner] = useState<{ fullName: string; company: string } | null>(null);
  const [drawError, setDrawError] = useState<string | null>(null);
  const [showFireworks, setShowFireworks] = useState(
    () => searchParams.get("celebrate") === "100"
  );
  const prevTotalRef = useRef<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (search) params.set("search", search);
    const res = await fetch(`/api/participants?${params.toString()}`);
    const json = (await res.json()) as ApiResponse;
    setData(json);
    setLoading(false);

    if (
      prevTotalRef.current !== null &&
      prevTotalRef.current < 100 &&
      json.total >= 100
    ) {
      setShowFireworks(true);
    }
    prevTotalRef.current = json.total;
  }, [page, search]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDrawWinner() {
    setDrawing(true);
    setDrawPhase("spinning");
    setDrawWinner(null);
    setDrawError(null);

    const MIN_SPIN_MS = 5000;
    const startedAt = Date.now();

    try {
      const res = await fetch("/api/participants/winner", { method: "POST" });
      const json = await res.json();

      const elapsed = Date.now() - startedAt;
      if (elapsed < MIN_SPIN_MS) {
        await new Promise((resolve) => setTimeout(resolve, MIN_SPIN_MS - elapsed));
      }

      if (!res.ok) {
        setDrawError(json.error ?? "No se pudo elegir un ganador");
      } else {
        setDrawWinner({ fullName: json.winner.fullName, company: json.winner.company });
        load();
      }
      setDrawPhase("revealed");
    } finally {
      setDrawing(false);
    }
  }

  const remainingDays = Math.max(
    0,
    Math.ceil((CONTEST_CLOSE_DATE.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );

  const totalPages = data ? Math.max(1, Math.ceil(data.filteredTotal / data.pageSize)) : 1;
  const validationRate =
    data && data.total > 0 ? ((data.validCount / data.total) * 100).toFixed(1) : "0.0";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {showFireworks && <Fireworks onDone={() => setShowFireworks(false)} />}

      {drawPhase && (
        <WinnerDrawModal
          phase={drawPhase}
          winner={drawWinner}
          error={drawError}
          onClose={() => setDrawPhase(null)}
        />
      )}

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-4xl">Contest Management</h1>
          <p className="mt-2 max-w-xl text-sm text-gray-600 sm:text-base">
            Manage participants, track valid submissions, and fairly select the contest
            winner for the LISA Insurtech Innovation Awards.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-shrink-0">
          <PushNotificationsButton />
          <a
            href="/api/participants/export"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700"
          >
            ⭳ Descargar Excel
          </a>
          <button
            onClick={handleDrawWinner}
            disabled={drawing}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-800 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            ✨ {drawing ? "Eligiendo..." : "Elegir Ganador al Azar"}
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Participants" value={String(data?.total ?? "—")} hint="Actualizado en vivo" />
        <StatCard
          label="Valid Submissions"
          value={String(data?.validCount ?? "—")}
          hint={`${validationRate}% validation rate`}
        />
        <StatCard
          label="Remaining Days"
          value={String(remainingDays).padStart(2, "0")}
          hint={remainingDays <= 7 ? "Closing soon" : undefined}
          hintClassName="text-red-500"
        />
        <StatCard label="Active Contest" value="Fraude Visible" hint="LISA Insurtech" highlight />
      </div>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <h2 className="text-lg font-bold text-gray-900">Participant Roster</h2>
          <input
            type="text"
            placeholder="Search by name or company..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm sm:w-72"
          />
        </div>

        {loading ? (
          <p className="px-6 py-10 text-center text-sm text-gray-500">Cargando...</p>
        ) : (
          <ParticipantTable participants={data?.participants ?? []} onDeleted={() => load()} />
        )}

        <div className="flex flex-col gap-3 border-t border-gray-100 px-4 py-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>
            {(data?.participants.length ?? 0) === 0 ? 0 : (page - 1) * (data?.pageSize ?? 10) + 1}
            –{(page - 1) * (data?.pageSize ?? 10) + (data?.participants.length ?? 0)} de{" "}
            {data?.filteredTotal ?? 0}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="rounded-md px-2 py-1 disabled:opacity-40"
            >
              ‹
            </button>
            <span className="rounded-md bg-teal-800 px-3 py-1 font-semibold text-white">{page}</span>
            <span>of {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="rounded-md px-2 py-1 disabled:opacity-40"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
