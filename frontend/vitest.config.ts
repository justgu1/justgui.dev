import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    include: ["src/**/*.test.ts"],
    env: {
      PUBLIC_API_URL: "http://localhost:8080",
      PUBLIC_LINKEDIN_URL: "https://linkedin.com/in/test",
      PUBLIC_GITHUB_URL: "https://github.com/test",
      PUBLIC_INSTAGRAM_URL: "https://instagram.com/test",
      PUBLIC_APP_ENV: "local",
      PUBLIC_SITE_URL: "http://localhost:4321",
    },
  },
});
