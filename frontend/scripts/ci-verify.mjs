#!/usr/bin/env node
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import waitOn from "wait-on";
import { rm } from "node:fs/promises";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const baseUrl = process.env.SEO_BASE_URL ?? "http://127.0.0.1:4321";

function run(command, args, env = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      stdio: "inherit",
      shell: true,
      env: { ...process.env, ...env },
    });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else
        reject(new Error(`${command} ${args.join(" ")} exited with ${code}`));
    });
  });
}

let preview;
try {
  preview = spawn(
    "yarn",
    ["preview", "--host", "127.0.0.1", "--port", "4321"],
    {
      cwd: root,
      stdio: "pipe",
      shell: true,
      detached: true,
      env: {
        ...process.env,
        // Lighthouse SEO should validate indexable production markup.
        // Tracking scripts remain disabled unless IDs are set.
        PUBLIC_APP_ENV: "production",
        PUBLIC_SITE_URL: baseUrl,
      },
    }
  );

  await waitOn({ resources: [`tcp:4321`], timeout: 120_000 });

  await run("node", ["scripts/validate-seo.mjs"], {
    SEO_BASE_URL: baseUrl,
  });
  await run("yarn", ["test:e2e"], {
    CI: "true",
    PLAYWRIGHT_BASE_URL: baseUrl,
    PLAYWRIGHT_SKIP_WEBSERVER: "1",
  });
  await run("yarn", ["test:a11y"]);
  await run("yarn", ["lighthouse"]);
  console.log("CI verify completed successfully.");
} finally {
  // Keep CI clean: Lighthouse writes reports and a manifest in cwd.
  // We ignore errors because files may not exist depending on failures.
  await Promise.allSettled([
    rm(path.join(root, ".lighthouseci"), { recursive: true, force: true }),
    rm(path.join(root, "manifest.json"), { force: true }),
  ]);

  if (preview?.pid) {
    try {
      process.kill(-preview.pid, "SIGTERM");
    } catch (error) {
      // ignore if already exited
      if (error?.code !== "ESRCH") throw error;
    }
  }
}
