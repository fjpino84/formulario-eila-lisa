import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { getDb, ParticipantRow } from "@/lib/db";

export async function GET() {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM participants ORDER BY created_at DESC")
    .all() as unknown as ParticipantRow[];

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Participants");

  sheet.columns = [
    { header: "ID", key: "id", width: 8 },
    { header: "Nombre", key: "fullName", width: 25 },
    { header: "Empresa", key: "company", width: 22 },
    { header: "Cargo", key: "position", width: 20 },
    { header: "Teléfono", key: "phone", width: 18 },
    { header: "Correo", key: "email", width: 28 },
    { header: "Respuestas válidas", key: "isValid", width: 16 },
    { header: "Ganador", key: "isWinner", width: 12 },
    { header: "Fecha", key: "createdAt", width: 20 },
  ];
  sheet.getRow(1).font = { bold: true };

  for (const row of rows) {
    sheet.addRow({
      id: row.id,
      fullName: row.full_name,
      company: row.company,
      position: row.position,
      phone: row.phone,
      email: row.email,
      isValid: row.is_valid === 1 ? "Sí" : "No",
      isWinner: row.is_winner === 1 ? "Sí" : "No",
      createdAt: row.created_at,
    });
  }

  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(Buffer.from(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=participantes.xlsx",
    },
  });
}
