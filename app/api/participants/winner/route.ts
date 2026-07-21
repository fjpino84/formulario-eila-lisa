import { NextResponse } from "next/server";
import { getDb, ParticipantRow } from "@/lib/db";

export async function POST() {
  const db = getDb();

  const eligible = db
    .prepare("SELECT * FROM participants WHERE is_valid = 1")
    .all() as unknown as ParticipantRow[];

  if (eligible.length === 0) {
    return NextResponse.json(
      { error: "No hay participantes válidos para sortear" },
      { status: 400 }
    );
  }

  const winner = eligible[Math.floor(Math.random() * eligible.length)];

  db.exec("UPDATE participants SET is_winner = 0");
  db.prepare("UPDATE participants SET is_winner = 1 WHERE id = ?").run(winner.id);

  return NextResponse.json({
    winner: {
      id: winner.id,
      fullName: winner.full_name,
      company: winner.company,
      position: winner.position,
      email: winner.email,
      phone: winner.phone,
    },
  });
}
