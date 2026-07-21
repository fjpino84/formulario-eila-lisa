import { NextResponse } from "next/server";
import { getDb, ensureSchema, ParticipantRow } from "@/lib/db";

export async function POST() {
  await ensureSchema();
  const db = getDb();

  const eligibleResult = await db.execute("SELECT * FROM participants WHERE is_valid = 1");
  const eligible = eligibleResult.rows as unknown as ParticipantRow[];

  if (eligible.length === 0) {
    return NextResponse.json(
      { error: "No hay participantes válidos para sortear" },
      { status: 400 }
    );
  }

  const winner = eligible[Math.floor(Math.random() * eligible.length)];

  await db.execute("UPDATE participants SET is_winner = 0");
  await db.execute({
    sql: "UPDATE participants SET is_winner = 1 WHERE id = ?",
    args: [winner.id],
  });

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
