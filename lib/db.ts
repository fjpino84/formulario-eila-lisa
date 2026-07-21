import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";

const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, "contest.db");

declare global {
  var __contestDb: DatabaseSync | undefined;
}

function createConnection(): DatabaseSync {
  const db = new DatabaseSync(DB_PATH);
  db.exec(`
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
  `);
  return db;
}

export function getDb(): DatabaseSync {
  if (!global.__contestDb) {
    global.__contestDb = createConnection();
  }
  return global.__contestDb;
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
