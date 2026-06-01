import { trackEvent } from "../utils/analytics";

function getLangFromPath(): string {
  const segment = window.location.pathname.split("/").filter(Boolean)[0];
  return segment === "pt" || segment === "es" ? segment : "en";
}

function readFormMessages(form: HTMLFormElement) {
  return {
    success:
      form.dataset.success ?? "Thanks! Your message was sent successfully.",
    error:
      form.dataset.error ?? "Could not send your message. Try again later.",
    validation:
      form.dataset.validation ??
      "Please fill in all fields with valid information.",
    unavailable:
      form.dataset.unavailable ?? "Contact form is temporarily unavailable.",
    sending: form.dataset.sending ?? "Sending…",
    submitLabel:
      form.querySelector<HTMLButtonElement>(".contact-submit")?.textContent ??
      "Send",
    messageMax: Number(form.dataset.messageMax ?? "512"),
    messageCounterTemplate: form.dataset.messageCounter ?? "{current} / {max}",
  };
}

function formatCounter(template: string, current: number, max: number): string {
  return template
    .replace("{current}", String(current))
    .replace("{max}", String(max));
}

function setFormState(
  form: HTMLFormElement,
  state: "idle" | "loading" | "success" | "error"
): void {
  form.dataset.state = state;
  form.setAttribute("aria-busy", state === "loading" ? "true" : "false");
}

function setFieldsDisabled(form: HTMLFormElement, disabled: boolean): void {
  form
    .querySelectorAll<
      HTMLInputElement | HTMLTextAreaElement
    >("input, textarea, button")
    .forEach((el) => {
      el.disabled = disabled;
    });
}

function setNotice(
  notice: HTMLElement | null,
  message: string,
  variant: "neutral" | "success" | "error"
): void {
  if (!notice) return;
  notice.textContent = message;
  notice.classList.remove(
    "contact-form-notice--success",
    "contact-form-notice--error"
  );
  if (variant === "success") {
    notice.classList.add("contact-form-notice--success");
    notice.setAttribute("role", "status");
  } else if (variant === "error") {
    notice.classList.add("contact-form-notice--error");
    notice.setAttribute("role", "alert");
  } else {
    notice.setAttribute("role", "status");
  }
}

function updateMessageCounter(
  form: HTMLFormElement,
  counter: HTMLElement | null,
  template: string,
  max: number
): void {
  if (!counter) return;
  const messageField = form.querySelector<HTMLTextAreaElement>(
    "#contact-form-message"
  );
  const current = messageField?.value.length ?? 0;
  counter.textContent = formatCounter(template, current, max);
  counter.classList.toggle("form-hint--limit", current >= max);
}

function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>("#contact-form");
  if (!form) return;

  const messages = readFormMessages(form);
  const notice = form.querySelector<HTMLElement>(".contact-form-notice");
  const counter = form.querySelector<HTMLElement>("[data-message-counter]");
  const submit = form.querySelector<HTMLButtonElement>(".contact-submit");
  const defaultSubmitLabel = submit?.textContent ?? messages.submitLabel;
  const messageField = form.querySelector<HTMLTextAreaElement>(
    "#contact-form-message"
  );

  const syncCounter = () => {
    updateMessageCounter(
      form,
      counter,
      messages.messageCounterTemplate,
      messages.messageMax
    );
  };

  messageField?.addEventListener("input", syncCounter);
  syncCounter();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (
      !name ||
      !email ||
      !message ||
      name.length > 128 ||
      email.length > 128 ||
      message.length > messages.messageMax
    ) {
      setFormState(form, "error");
      setNotice(notice, messages.validation, "error");
      return;
    }

    setFormState(form, "loading");
    setFieldsDisabled(form, true);
    if (submit) submit.textContent = messages.sending;
    setNotice(notice, "", "neutral");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Lang": getLangFromPath(),
        },
        body: JSON.stringify({ name, email, message }),
      });

      const payload = (await response.json()) as { message?: string };

      if (response.ok) {
        setFormState(form, "success");
        setNotice(notice, payload.message ?? messages.success, "success");
        trackEvent("form_submit", { location: "contact" });
        form.reset();
        syncCounter();
        setFieldsDisabled(form, false);
        if (submit) submit.textContent = defaultSubmitLabel;
      } else {
        setFormState(form, "error");
        setNotice(notice, payload.message ?? messages.error, "error");
        setFieldsDisabled(form, false);
        if (submit) submit.textContent = defaultSubmitLabel;
      }
    } catch {
      setFormState(form, "error");
      setNotice(notice, messages.error, "error");
      setFieldsDisabled(form, false);
      if (submit) submit.textContent = defaultSubmitLabel;
    }
  });
}

initContactForm();
