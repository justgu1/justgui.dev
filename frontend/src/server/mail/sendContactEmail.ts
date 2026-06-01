import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type { SupportedLang } from "../../config/seo";
import { getMailConfig, isDevMailLogging, type MailConfig } from "./config";

export type ContactEmailInput = {
  name: string;
  email: string;
  message: string;
  lang: string;
};

const autoReplyMessages: Record<
  SupportedLang,
  { subject: string; body: (name: string) => string }
> = {
  en: {
    subject: "We received your message — justgui",
    body: (name) =>
      `Hi ${name},\n\nThank you for reaching out through justgui.dev. Your message was received and I'll get back to you as soon as possible.\n\nBest,\nGuilherme Santos`,
  },
  pt: {
    subject: "Recebemos sua mensagem — justgui",
    body: (name) =>
      `Olá ${name},\n\nObrigado por entrar em contato pelo justgui.dev. Sua mensagem foi recebida e retornarei o mais breve possível.\n\nAbraço,\nGuilherme Santos`,
  },
  es: {
    subject: "Recibimos tu mensaje — justgui",
    body: (name) =>
      `Hola ${name},\n\nGracias por contactarme a través de justgui.dev. Tu mensaje fue recibido y responderé lo antes posible.\n\nSaludos,\nGuilherme Santos`,
  },
};

function createTransportOptions(config: MailConfig): SMTPTransport.Options {
  const secure = config.port === 465;

  return {
    host: config.host,
    port: config.port,
    secure,
    requireTLS: !secure,
    auth: {
      user: config.user,
      pass: config.password,
    },
  };
}

function createTransport(config: MailConfig) {
  return nodemailer.createTransport(createTransportOptions(config));
}

function resolveAutoReplyLang(lang: string): SupportedLang {
  if (lang === "pt" || lang === "es") return lang;
  return "en";
}

export async function sendContactEmail(
  input: ContactEmailInput
): Promise<void> {
  const config = getMailConfig();
  const transport = createTransport(config);

  if (isDevMailLogging()) {
    try {
      await transport.verify();
    } catch (error) {
      console.error("[mail] SMTP verify failed:", error);
      throw error;
    }
  }

  const subject = `[justgui contact] ${input.name} (${input.lang})`;
  const text = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Language: ${input.lang}`,
    "",
    input.message,
  ].join("\n");

  try {
    await transport.sendMail({
      from: `"${config.fromName}" <${config.from}>`,
      to: config.contactTo,
      replyTo: input.email,
      subject,
      text,
    });
  } catch (error) {
    if (isDevMailLogging()) {
      console.error("[mail] sendMail to admin failed:", error);
    }
    throw error;
  }

  const replyLang = resolveAutoReplyLang(input.lang);
  const autoReply = autoReplyMessages[replyLang];

  try {
    await transport.sendMail({
      from: `"${config.fromName}" <${config.from}>`,
      to: input.email,
      subject: autoReply.subject,
      text: autoReply.body(input.name),
    });
  } catch (error) {
    if (isDevMailLogging()) {
      console.error("[mail] auto-reply failed (admin mail sent):", error);
    }
  }
}
