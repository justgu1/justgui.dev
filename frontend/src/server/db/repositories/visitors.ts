import type Database from "better-sqlite3";
import { getDb } from "../client";

export type VisitorRecord = {
  id: string;
  created_at: string;
  ip_hash: string | null;
  user_agent: string | null;
  accept_language: string | null;
  first_path: string | null;
};

export function findVisitor(
  db: Database.Database,
  id: string
): VisitorRecord | undefined {
  return db.prepare("SELECT * FROM visitors WHERE id = ?").get(id) as
    | VisitorRecord
    | undefined;
}

export function createVisitor(
  db: Database.Database,
  input: {
    id: string;
    ipHash: string;
    userAgent: string | null;
    acceptLanguage: string | null;
    firstPath: string;
  }
): void {
  db.prepare(
    `INSERT INTO visitors (id, ip_hash, user_agent, accept_language, first_path)
     VALUES (?, ?, ?, ?, ?)`
  ).run(
    input.id,
    input.ipHash,
    input.userAgent,
    input.acceptLanguage,
    input.firstPath
  );
}

export function recordVisit(
  db: Database.Database,
  input: {
    visitorId: string;
    path: string;
    lang: string | null;
    ipHash: string;
  }
): void {
  db.prepare(
    `INSERT INTO visits (visitor_id, path, lang, ip_hash) VALUES (?, ?, ?, ?)`
  ).run(input.visitorId, input.path, input.lang, input.ipHash);
}

export function hasConsent(db: Database.Database, visitorId: string): boolean {
  const row = db
    .prepare("SELECT 1 FROM consent_events WHERE visitor_id = ? LIMIT 1")
    .get(visitorId);
  return Boolean(row);
}

export function ensureVisitor(input: {
  visitorId: string;
  ipHash: string;
  userAgent: string | null;
  acceptLanguage: string | null;
  path: string;
  lang: string | null;
}): { isNew: boolean } {
  const db = getDb();
  const existing = findVisitor(db, input.visitorId);
  if (existing) {
    recordVisit(db, {
      visitorId: input.visitorId,
      path: input.path,
      lang: input.lang,
      ipHash: input.ipHash,
    });
    return { isNew: false };
  }

  createVisitor(db, {
    id: input.visitorId,
    ipHash: input.ipHash,
    userAgent: input.userAgent,
    acceptLanguage: input.acceptLanguage,
    firstPath: input.path,
  });
  recordVisit(db, {
    visitorId: input.visitorId,
    path: input.path,
    lang: input.lang,
    ipHash: input.ipHash,
  });
  return { isNew: true };
}
