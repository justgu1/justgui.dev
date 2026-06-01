function normalizeEnv(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function required(value: string | undefined, key: string): string {
  const normalized = normalizeEnv(value);
  if (!normalized) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return normalized;
}

function optional(value: string | undefined): string | undefined {
  return normalizeEnv(value);
}

export type MailConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  from: string;
  fromName: string;
  contactTo: string;
};

export function getMailConfig(): MailConfig {
  return {
    host: required(process.env.SMTP_HOST, "SMTP_HOST"),
    port: Number(optional(process.env.SMTP_PORT) ?? "465"),
    user: required(process.env.SMTP_USER, "SMTP_USER"),
    password: required(process.env.SMTP_PASSWORD, "SMTP_PASSWORD"),
    from: required(process.env.SMTP_FROM, "SMTP_FROM"),
    fromName: optional(process.env.SMTP_FROM_NAME) ?? "justgui",
    contactTo: required(
      optional(process.env.CONTACT_TO) ?? optional(process.env.SMTP_FROM),
      "CONTACT_TO"
    ),
  };
}

export function isMailConfigured(): boolean {
  return Boolean(
    optional(process.env.SMTP_HOST) &&
    optional(process.env.SMTP_USER) &&
    optional(process.env.SMTP_PASSWORD) &&
    optional(process.env.SMTP_FROM) &&
    (optional(process.env.CONTACT_TO) || optional(process.env.SMTP_FROM))
  );
}

export function isDevMailLogging(): boolean {
  return optional(process.env.PUBLIC_APP_ENV) === "local";
}
