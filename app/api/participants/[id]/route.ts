import { NextRequest, NextResponse } from "next/server";
import { getDb, ensureSchema } from "@/lib/db";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const participantId = Number(id);

  if (!Number.isInteger(participantId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  await ensureSchema();
  await getDb().execute({
    sql: "DELETE FROM participants WHERE id = ?",
    args: [participantId],
  });

  return NextResponse.json({ ok: true });
}
