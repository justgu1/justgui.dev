import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    include: ["src/**/*.test.ts"],
    env: {
      PUBLIC_LINKEDIN_URL: "https://linkedin.com/in/test",
      PUBLIC_GITHUB_URL: "https://github.com/test",
      PUBLIC_INSTAGRAM_URL: "https://instagram.com/test",
      PUBLIC_APP_ENV: "local",
      PUBLIC_SITE_URL: "http://localhost:4321",
      PUBLIC_CV_URL: "/cv/GuilhermeSantos-Curriculo-2026.pdf",
      PUBLIC_WHATSAPP_NUMBER: "5511976598853",
      SMTP_HOST: "smtp.example.com",
      SMTP_PORT: "465",
      SMTP_USER: "user@example.com",
      SMTP_PASSWORD: "secret",
      SMTP_FROM: "user@example.com",
      CONTACT_TO: "user@example.com",
      DATABASE_PATH: ":memory:",
      VISITOR_IP_SALT: "test-salt",
    },
  },
});
