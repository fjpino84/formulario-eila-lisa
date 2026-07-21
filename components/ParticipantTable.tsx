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
    <div className="overflow-x-auto">
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
                {p.isValid ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                    ✓ Yes
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                    ✕ No
                  </span>
                )}
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
