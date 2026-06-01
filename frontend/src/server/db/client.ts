import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { runMigrations } from "./migrate";

function normalizeEnv(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return value.trim();
}

export function getDatabasePath(): string {
  return normalizeEnv(process.env.DATABASE_PATH) ?? "./data/justgui.sqlite";
}

let dbInstance: Database.Database | null = null;

export function getDb(): Database.Database {
  if (dbInstance) return dbInstance;

  const dbPath = getDatabasePath();
  if (dbPath !== ":memory:") {
    mkdirSync(dirname(dbPath), { recursive: true });
  }

  dbInstance = new Database(dbPath);
  dbInstance.pragma("journal_mode = WAL");
  dbInstance.pragma("foreign_keys = ON");
  runMigrations(dbInstance);
  return dbInstance;
}

/** Reset singleton — for tests only. */
export function resetDbForTests(): void {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
}

export function initDbForTests(): Database.Database {
  resetDbForTests();
  process.env.DATABASE_PATH = ":memory:";
  return getDb();
}
