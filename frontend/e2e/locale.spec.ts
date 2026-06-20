import { expect, test } from "./fixtures";

const PT_ACCEPT = { "Accept-Language": "pt-BR,pt;q=0.9" };

test("redirects / to /pt when Accept-Language is pt-BR", async ({
  request,
}) => {
  const response = await request.get("/", {
    headers: PT_ACCEPT,
    maxRedirects: 0,
  });
  expect(response.status()).toBe(302);
  expect(response.headers().location).toMatch(/\/pt\/?$/);
});

test("redirects /en to /pt when Accept-Language is pt-BR", async ({
  request,
}) => {
  const response = await request.get("/en", {
    headers: PT_ACCEPT,
    maxRedirects: 0,
  });
  expect(response.status()).toBe(302);
  expect(response.headers().location).toMatch(/\/pt\/?$/);
});

test("keeps /en for Googlebot when Accept-Language is pt-BR", async ({
  request,
}) => {
  const response = await request.get("/en", {
    headers: {
      ...PT_ACCEPT,
      "User-Agent":
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    },
    maxRedirects: 0,
  });
  expect(response.status()).toBe(200);
});

test("keeps /pt when Accept-Language is en-US", async ({ request }) => {
  const response = await request.get("/pt", {
    headers: { "Accept-Language": "en-US,en;q=0.9" },
    maxRedirects: 0,
  });
  expect(response.status()).toBe(200);
});
