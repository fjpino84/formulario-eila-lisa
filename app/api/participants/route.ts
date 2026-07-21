import { NextRequest, NextResponse } from "next/server";
import { getDb, ParticipantRow } from "@/lib/db";
import { isValidSubmission } from "@/lib/contest";

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
  const db = getDb();

  const stmt = db.prepare(`
    INSERT INTO participants (full_name, company, position, phone, email, selected_answers, is_valid)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    fullName.trim(),
    company.trim(),
    position.trim(),
    phone.trim(),
    email.trim(),
    JSON.stringify(selectedAnswers),
    isValid ? 1 : 0
  );

  return NextResponse.json({ id: result.lastInsertRowid, isValid }, { status: 201 });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.trim() ?? "";
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const pageSize = 10;

  const db = getDb();

  const totalRow = db.prepare("SELECT COUNT(*) as count FROM participants").get() as {
    count: number;
  };
  const validRow = db
    .prepare("SELECT COUNT(*) as count FROM participants WHERE is_valid = 1")
    .get() as { count: number };

  const whereClause = search ? "WHERE full_name LIKE ? OR company LIKE ?" : "";
  const params = search ? [`%${search}%`, `%${search}%`] : [];

  const filteredTotalRow = db
    .prepare(`SELECT COUNT(*) as count FROM participants ${whereClause}`)
    .get(...params) as { count: number };

  const rows = db
    .prepare(
      `SELECT * FROM participants ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`
    )
    .all(...params, pageSize, (page - 1) * pageSize) as unknown as ParticipantRow[];

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
    total: totalRow.count,
    validCount: validRow.count,
    filteredTotal: filteredTotalRow.count,
    page,
    pageSize,
  });
}
