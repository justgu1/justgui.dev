import { createHash } from "node:crypto";

function normalizeEnv(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return value.trim();
}

export function getIpSalt(): string {
  return normalizeEnv(process.env.VISITOR_IP_SALT) ?? "justgui-dev-salt";
}

export function hashIp(ip: string): string {
  return createHash("sha256").update(`${getIpSalt()}:${ip}`).digest("hex");
}

export function resolveClientIp(
  clientAddress: string,
  forwardedFor: string | null
): string {
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  return clientAddress || "unknown";
}
