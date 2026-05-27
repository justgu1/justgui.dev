import {
  defineConfig,
  devices,
  type PlaywrightTestConfig,
} from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:4321";

const config: PlaywrightTestConfig = {
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  ...(process.env.CI ? { workers: 1 } : {}),
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "no-js",
      testMatch: "**/no-js.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        javaScriptEnabled: false,
      },
    },
  ],
};

if (process.env.CI && !process.env.PLAYWRIGHT_SKIP_WEBSERVER) {
  config.webServer = {
    command: "yarn preview --host 127.0.0.1 --port 4321",
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
  };
}

export default defineConfig(config);
