interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  hintClassName?: string;
  highlight?: boolean;
}

export default function StatCard({ label, value, hint, hintClassName, highlight }: StatCardProps) {
  return (
    <div
      className={`rounded-xl border p-6 shadow-sm ${
        highlight ? "border-teal-200 bg-teal-50" : "border-gray-200 bg-white"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      {hint && <p className={`mt-2 text-xs ${hintClassName ?? "text-gray-500"}`}>{hint}</p>}
    </div>
  );
}
