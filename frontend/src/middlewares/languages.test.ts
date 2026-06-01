import { describe, expect, it, vi } from "vitest";
import { LanguagesMiddleware } from "./languages";

const LANG_COOKIE = "justgui_lang";

function createContext(options: {
  pathname: string;
  search?: string;
  acceptLanguage?: string;
  cookieLang?: string;
}) {
  const search = options.search ?? "";
  const url = new URL(`http://localhost:4321${options.pathname}${search}`);
  const cookieStore = new Map<string, string>();
  if (options.cookieLang) {
    cookieStore.set(LANG_COOKIE, options.cookieLang);
  }

  const redirect = vi.fn((location: string, status = 302) => {
    return new Response(null, { status, headers: { Location: location } });
  });

  const context = {
    url,
    request: new Request(url, {
      headers: options.acceptLanguage
        ? { "Accept-Language": options.acceptLanguage }
        : {},
    }),
    cookies: {
      get: (name: string) => {
        const value = cookieStore.get(name);
        return value !== undefined ? { value } : undefined;
      },
      set: (name: string, value: string) => {
        cookieStore.set(name, value);
      },
    },
    redirect,
  };

  return { context, redirect, cookieStore };
}

describe("LanguagesMiddleware", () => {
  it("redirects / to negotiated pt", async () => {
    const { context, redirect } = createContext({
      pathname: "/",
      acceptLanguage: "pt-BR,pt;q=0.9",
    });
    const next = vi.fn();

    await LanguagesMiddleware(context as never, next);

    expect(redirect).toHaveBeenCalledWith("/pt", 302);
    expect(next).not.toHaveBeenCalled();
  });

  it("redirects /en to /pt when browser prefers pt and no cookie", async () => {
    const { context, redirect } = createContext({
      pathname: "/en",
      acceptLanguage: "pt-BR,pt;q=0.9",
    });
    const next = vi.fn();

    await LanguagesMiddleware(context as never, next);

    expect(redirect).toHaveBeenCalledWith("/pt", 302);
    expect(next).not.toHaveBeenCalled();
  });

  it("keeps /pt when browser prefers en and no cookie", async () => {
    const { context, redirect, cookieStore } = createContext({
      pathname: "/pt",
      acceptLanguage: "en-US,en;q=0.9",
    });
    const next = vi.fn();

    await LanguagesMiddleware(context as never, next);

    expect(redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(cookieStore.get(LANG_COOKIE)).toBe("pt");
  });

  it("honors cookie over browser negotiation on /en", async () => {
    const { context, redirect } = createContext({
      pathname: "/en",
      acceptLanguage: "pt-BR,pt;q=0.9",
      cookieLang: "en",
    });
    const next = vi.fn();

    await LanguagesMiddleware(context as never, next);

    expect(redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it("allows /en when user previously chose pt via cookie", async () => {
    const { context, redirect, cookieStore } = createContext({
      pathname: "/en",
      acceptLanguage: "pt-BR,pt;q=0.9",
      cookieLang: "pt",
    });
    const next = vi.fn();

    await LanguagesMiddleware(context as never, next);

    expect(redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(cookieStore.get(LANG_COOKIE)).toBe("en");
  });

  it("strips legacy setLang query without changing path", async () => {
    const { context, redirect } = createContext({
      pathname: "/es",
      search: "?setLang=es",
    });
    const next = vi.fn();

    await LanguagesMiddleware(context as never, next);

    expect(redirect).toHaveBeenCalledWith("/es", 302);
    expect(next).not.toHaveBeenCalled();
  });
});
