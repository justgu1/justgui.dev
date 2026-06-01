CREATE TABLE IF NOT EXISTS visitors (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  ip_hash TEXT,
  user_agent TEXT,
  accept_language TEXT,
  first_path TEXT
);

CREATE TABLE IF NOT EXISTS visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visitor_id TEXT NOT NULL REFERENCES visitors(id),
  path TEXT NOT NULL,
  lang TEXT,
  ip_hash TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visitor_id TEXT REFERENCES visitors(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  lang TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS consent_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visitor_id TEXT NOT NULL REFERENCES visitors(id),
  analytics_granted INTEGER NOT NULL DEFAULT 0,
  ad_granted INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS a11y_preferences (
  visitor_id TEXT PRIMARY KEY REFERENCES visitors(id),
  prefs_json TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_visits_visitor_id ON visits(visitor_id);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_visitor_id ON contact_submissions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_consent_events_visitor_id ON consent_events(visitor_id);
