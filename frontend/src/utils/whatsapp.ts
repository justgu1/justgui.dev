export function normalizeWhatsAppNumber(number: string): string {
  return number.replace(/\D/g, "");
}

export function buildWhatsAppUrl(number: string, message: string): string {
  const clean = normalizeWhatsAppNumber(number);
  if (!clean) return "https://wa.me/";
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${clean}${query}`;
}
