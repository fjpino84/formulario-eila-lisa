import { createClient, type Client } from "@libsql/client";
import path from "node:path";
import fs from "node:fs";

declare global {
  var __contestDb: Client | undefined;
}

function createConnection(): Client {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (url) {
    return createClient({ url, authToken });
  }

  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return createClient({ url: `file:${path.join(dataDir, "contest.db")}` });
}

export function getDb(): Client {
  if (!global.__contestDb) {
    global.__contestDb = createConnection();
  }
  return global.__contestDb;
}

let schemaReady: Promise<void> | null = null;

export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = getDb().execute(`
      CREATE TABLE IF NOT EXISTS participants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        company TEXT NOT NULL,
        position TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        selected_answers TEXT NOT NULL,
        is_valid INTEGER NOT NULL,
        is_winner INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `).then(() => undefined);
  }
  return schemaReady;
}

export interface ParticipantRow {
  id: number;
  full_name: string;
  company: string;
  position: string;
  phone: string;
  email: string;
  selected_answers: string;
  is_valid: number;
  is_winner: number;
  created_at: string;
}
