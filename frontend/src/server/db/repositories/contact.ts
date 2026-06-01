import type Database from "better-sqlite3";
import { getDb } from "../client";

export type ContactStatus = "pending" | "sent" | "failed";

export function insertContactSubmission(
  db: Database.Database,
  input: {
    visitorId: string | null;
    name: string;
    email: string;
    message: string;
    lang: string;
  }
): number {
  const result = db
    .prepare(
      `INSERT INTO contact_submissions (visitor_id, name, email, message, lang, status)
       VALUES (?, ?, ?, ?, ?, 'pending')`
    )
    .run(input.visitorId, input.name, input.email, input.message, input.lang);
  return Number(result.lastInsertRowid);
}

export function updateContactStatus(
  db: Database.Database,
  id: number,
  status: ContactStatus
): void {
  db.prepare("UPDATE contact_submissions SET status = ? WHERE id = ?").run(
    status,
    id
  );
}

export function createContactSubmission(input: {
  visitorId: string | null;
  name: string;
  email: string;
  message: string;
  lang: string;
}): number {
  return insertContactSubmission(getDb(), input);
}

export function markContactSent(id: number): void {
  updateContactStatus(getDb(), id, "sent");
}

export function markContactFailed(id: number): void {
  updateContactStatus(getDb(), id, "failed");
}
