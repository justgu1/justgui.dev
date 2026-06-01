import type Database from "better-sqlite3";
import { getDb } from "../client";

export function insertConsentEvent(
  db: Database.Database,
  input: {
    visitorId: string;
    analyticsGranted: boolean;
    adGranted: boolean;
  }
): void {
  db.prepare(
    `INSERT INTO consent_events (visitor_id, analytics_granted, ad_granted)
     VALUES (?, ?, ?)`
  ).run(
    input.visitorId,
    input.analyticsGranted ? 1 : 0,
    input.adGranted ? 1 : 0
  );
}

export function recordConsent(input: {
  visitorId: string;
  analyticsGranted: boolean;
  adGranted: boolean;
}): void {
  insertConsentEvent(getDb(), input);
}
