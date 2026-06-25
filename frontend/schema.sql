CREATE TABLE IF NOT EXISTS audit_requests (
  id             TEXT PRIMARY KEY,
  name           TEXT NOT NULL,
  company        TEXT,
  country        TEXT,
  industry       TEXT,
  process        TEXT NOT NULL,
  contact_method TEXT,
  email          TEXT,
  created_at     TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_audit_created_at ON audit_requests (created_at DESC);
