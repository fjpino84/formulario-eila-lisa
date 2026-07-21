export interface Participant {
  id: number;
  fullName: string;
  company: string;
  position: string;
  phone: string;
  email: string;
  isValid: boolean;
  isWinner: boolean;
}

interface ParticipantTableProps {
  participants: Participant[];
}

export default function ParticipantTable({ participants }: ParticipantTableProps) {
  if (participants.length === 0) {
    return <p className="px-6 py-10 text-center text-sm text-gray-500">Sin participantes que mostrar.</p>;
  }

  return (
    <>
      {/* Móvil: tarjetas apiladas */}
      <div className="divide-y divide-gray-100 md:hidden">
        {participants.map((p) => (
          <div key={p.id} className="flex gap-3 px-4 py-4">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-semibold text-purple-700">
              {initials(p.fullName)}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-gray-900">{p.fullName}</p>
                <ValidBadge isValid={p.isValid} />
              </div>
              <p className="text-sm text-gray-700">
                {p.position} · {p.company}
              </p>
              <p className="mt-1 truncate text-xs text-gray-500">{p.phone}</p>
              <p className="truncate text-xs text-gray-500">{p.email}</p>
              {p.isWinner && (
                <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  🏆 Winner
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: tabla */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">Company</th>
              <th className="px-6 py-3 font-semibold">Position</th>
              <th className="px-6 py-3 font-semibold">Contact</th>
              <th className="px-6 py-3 font-semibold">Valid Answers</th>
              <th className="px-6 py-3 font-semibold">Winner</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p) => (
              <tr key={p.id} className="border-b border-gray-100 last:border-0">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-xs font-semibold text-purple-700">
                      {initials(p.fullName)}
                    </span>
                    <span className="font-medium text-gray-900">{p.fullName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">{p.company}</td>
                <td className="px-6 py-4 text-gray-700">{p.position}</td>
                <td className="px-6 py-4 text-gray-500">
                  <div>{p.phone}</div>
                  <div>{p.email}</div>
                </td>
                <td className="px-6 py-4">
                  <ValidBadge isValid={p.isValid} />
                </td>
                <td className="px-6 py-4">
                  {p.isWinner && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                      🏆 Winner
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ValidBadge({ isValid }: { isValid: boolean }) {
  return isValid ? (
    <span className="inline-flex flex-shrink-0 items-center gap-1 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
      ✓ Yes
    </span>
  ) : (
    <span className="inline-flex flex-shrink-0 items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
      ✕ No
    </span>
  );
}

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
