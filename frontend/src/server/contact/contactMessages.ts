import type { SupportedLang } from "../../config/seo";

export const CONTACT_NAME_MAX = 128;
export const CONTACT_EMAIL_MAX = 128;
export const CONTACT_MESSAGE_MAX = 512;

const messages = {
  en: {
    success: "Thanks! Your message was sent successfully.",
    error: "Could not send your message. Try again later.",
    validation: "Please fill in all fields with valid information.",
    unavailable: "Contact form is temporarily unavailable.",
  },
  pt: {
    success: "Obrigado! Sua mensagem foi enviada com sucesso.",
    error: "Não foi possível enviar sua mensagem. Tente novamente mais tarde.",
    validation: "Preencha todos os campos com informações válidas.",
    unavailable: "O formulário de contato está temporariamente indisponível.",
  },
  es: {
    success: "¡Gracias! Tu mensaje se envió correctamente.",
    error: "No se pudo enviar tu mensaje. Inténtalo de nuevo más tarde.",
    validation: "Completa todos los campos con información válida.",
    unavailable: "El formulario de contacto no está disponible temporalmente.",
  },
} as const;

export function resolveContactLang(header: string | null): SupportedLang {
  if (header === "pt" || header === "es") {
    return header;
  }
  return "en";
}

export function contactMessage(
  lang: SupportedLang,
  key: keyof (typeof messages)["en"]
): string {
  return messages[lang][key];
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateContactPayload(body: unknown): {
  name: string;
  email: string;
  message: string;
} | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const record = body as Record<string, unknown>;
  const name = String(record.name ?? "").trim();
  const email = String(record.email ?? "").trim();
  const message = String(record.message ?? "").trim();

  if (!name || !email || !message || !isValidEmail(email)) {
    return null;
  }

  if (
    name.length > CONTACT_NAME_MAX ||
    email.length > CONTACT_EMAIL_MAX ||
    message.length > CONTACT_MESSAGE_MAX
  ) {
    return null;
  }

  return { name, email, message };
}
