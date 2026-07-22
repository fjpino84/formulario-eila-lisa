import { NextResponse } from "next/server";
import { getDb, ensureSchema, ParticipantRow } from "@/lib/db";

export async function GET() {
  await ensureSchema();
  const db = getDb();

  const totalRow = await db.execute("SELECT COUNT(*) as count FROM participants");
  const total = Number(totalRow.rows[0].count);

  const lastRow = await db.execute(
    "SELECT * FROM participants ORDER BY id DESC LIMIT 1"
  );
  const last = lastRow.rows[0] as unknown as ParticipantRow | undefined;

  return NextResponse.json({
    total,
    lastParticipant: last
      ? {
          id: last.id,
          fullName: last.full_name,
          company: last.company,
        }
      : null,
  });
}
