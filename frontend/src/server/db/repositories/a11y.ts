import type Database from "better-sqlite3";
import { getDb } from "../client";

export function upsertA11yPreferences(
  db: Database.Database,
  input: { visitorId: string; prefsJson: string }
): void {
  db.prepare(
    `INSERT INTO a11y_preferences (visitor_id, prefs_json, updated_at)
     VALUES (?, ?, datetime('now'))
     ON CONFLICT(visitor_id) DO UPDATE SET
       prefs_json = excluded.prefs_json,
       updated_at = datetime('now')`
  ).run(input.visitorId, input.prefsJson);
}

export function saveA11yPreferences(input: {
  visitorId: string;
  prefsJson: string;
}): void {
  upsertA11yPreferences(getDb(), input);
}
