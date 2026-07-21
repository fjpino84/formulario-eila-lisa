import { NextRequest, NextResponse } from "next/server";
import { getDb, ensureSchema, ParticipantRow } from "@/lib/db";
import { isValidSubmission } from "@/lib/contest";
import { sendPushToAll } from "@/lib/push";

interface CreateParticipantBody {
  fullName: string;
  company: string;
  position: string;
  phone: string;
  email: string;
  selectedAnswers: string[];
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<CreateParticipantBody>;

  const { fullName, company, position, phone, email, selectedAnswers } = body;

  if (
    !fullName?.trim() ||
    !company?.trim() ||
    !position?.trim() ||
    !phone?.trim() ||
    !email?.trim() ||
    !Array.isArray(selectedAnswers)
  ) {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
  }

  const isValid = isValidSubmission(selectedAnswers);
  await ensureSchema();
  const db = getDb();

  const result = await db.execute({
    sql: `INSERT INTO participants (full_name, company, position, phone, email, selected_answers, is_valid)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [
      fullName.trim(),
      company.trim(),
      position.trim(),
      phone.trim(),
      email.trim(),
      JSON.stringify(selectedAnswers),
      isValid ? 1 : 0,
    ],
  });

  notifyNewSubmission(fullName.trim(), company.trim()).catch((error) =>
    console.error("Push notification failed:", error)
  );

  return NextResponse.json({ id: Number(result.lastInsertRowid), isValid }, { status: 201 });
}

async function notifyNewSubmission(fullName: string, company: string): Promise<void> {
  await sendPushToAll({
    title: "Nueva inscripción",
    body: `${fullName} (${company}) se acaba de inscribir.`,
  });

  const db = getDb();
  const totalRow = await db.execute("SELECT COUNT(*) as count FROM participants");
  const total = Number(totalRow.rows[0].count);

  if (total === 100) {
    await sendPushToAll({
      title: "🎉 ¡100 formularios completados!",
      body: "El concurso ya superó los 100 participantes.",
    });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.trim() ?? "";
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const pageSize = 10;

  await ensureSchema();
  const db = getDb();

  const totalRow = await db.execute("SELECT COUNT(*) as count FROM participants");
  const validRow = await db.execute("SELECT COUNT(*) as count FROM participants WHERE is_valid = 1");

  const whereClause = search ? "WHERE full_name LIKE ? OR company LIKE ?" : "";
  const params = search ? [`%${search}%`, `%${search}%`] : [];

  const filteredTotalRow = await db.execute({
    sql: `SELECT COUNT(*) as count FROM participants ${whereClause}`,
    args: params,
  });

  const rowsResult = await db.execute({
    sql: `SELECT * FROM participants ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    args: [...params, pageSize, (page - 1) * pageSize],
  });

  const rows = rowsResult.rows as unknown as ParticipantRow[];

  return NextResponse.json({
    participants: rows.map((row) => ({
      id: row.id,
      fullName: row.full_name,
      company: row.company,
      position: row.position,
      phone: row.phone,
      email: row.email,
      selectedAnswers: JSON.parse(row.selected_answers) as string[],
      isValid: row.is_valid === 1,
      isWinner: row.is_winner === 1,
      createdAt: row.created_at,
    })),
    total: Number(totalRow.rows[0].count),
    validCount: Number(validRow.rows[0].count),
    filteredTotal: Number(filteredTotalRow.rows[0].count),
    page,
    pageSize,
  });
}
