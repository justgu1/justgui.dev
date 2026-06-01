import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { autoReplyMessages, resolveAutoReplyLang } from "./autoReplyMessages";
import {
  buildAutoReplyHtml,
  buildAutoReplyText,
} from "./contactAutoReplyTemplate";
import { getMailConfig, isDevMailLogging, type MailConfig } from "./config";

export type ContactEmailInput = {
  name: string;
  email: string;
  message: string;
  lang: string;
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

  if (isDevMailLogging()) {
    console.info("[mail] admin notification to:", config.contactTo);
  }

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
  const messages = autoReplyMessages[replyLang];
  const templateInput = {
    lang: replyLang,
    name: input.name,
    siteUrl: config.siteUrl,
    messages,
  };

  try {
    await transport.sendMail({
      from: `"${config.fromName}" <${config.from}>`,
      to: input.email,
      replyTo: config.contactTo,
      subject: messages.subject,
      text: buildAutoReplyText(templateInput),
      html: buildAutoReplyHtml(templateInput),
    });
  } catch (error) {
    if (isDevMailLogging()) {
      console.error("[mail] auto-reply failed (admin mail sent):", error);
    }
  }
}
