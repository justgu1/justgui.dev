import type { SupportedLang } from "../../config/seo";

export type AutoReplyMessages = {
  subject: string;
  preheader: string;
  greeting: (name: string) => string;
  body: string;
  cta: string;
  signature: string;
  siteLabel: string;
};

export const autoReplyMessages: Record<SupportedLang, AutoReplyMessages> = {
  en: {
    subject: "We received your message — justgui",
    preheader: "Your message arrived. I'll get back to you soon.",
    greeting: (name) => `Hi ${name},`,
    body: "Thank you for reaching out through justgui.dev. Your message was received and I'll get back to you as soon as possible.",
    cta: "Visit justgui.dev",
    signature: "Best,\nGuilherme Santos",
    siteLabel: "justgui.dev",
  },
  pt: {
    subject: "Recebemos sua mensagem — justgui",
    preheader: "Sua mensagem chegou. Retorno em breve.",
    greeting: (name) => `Olá ${name},`,
    body: "Obrigado por entrar em contato pelo justgui.dev. Sua mensagem foi recebida e retornarei o mais breve possível.",
    cta: "Visitar justgui.dev",
    signature: "Abraço,\nGuilherme Santos",
    siteLabel: "justgui.dev",
  },
  es: {
    subject: "Recibimos tu mensaje — justgui",
    preheader: "Tu mensaje llegó. Responderé pronto.",
    greeting: (name) => `Hola ${name},`,
    body: "Gracias por contactarme a través de justgui.dev. Tu mensaje fue recibido y responderé lo antes posible.",
    cta: "Visitar justgui.dev",
    signature: "Saludos,\nGuilherme Santos",
    siteLabel: "justgui.dev",
  },
};

export function resolveAutoReplyLang(lang: string): SupportedLang {
  if (lang === "pt" || lang === "es") return lang;
  return "en";
}
