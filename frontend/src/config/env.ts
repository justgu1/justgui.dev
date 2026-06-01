function required(value: string | undefined, key: string): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

function optional(value: string | undefined): string | undefined {
  return value?.trim() || undefined;
}

/** Runtime Docker/Swarm env overrides build-time PUBLIC_* bake (SSR). */
function readPublicEnv(key: string): string | undefined {
  if (import.meta.env.SSR && typeof process !== "undefined") {
    const runtime = process.env[key];
    if (typeof runtime === "string" && runtime.trim()) {
      return runtime.trim();
    }
  }

  const baked = import.meta.env[key as keyof ImportMetaEnv];
  if (typeof baked === "string" && baked.trim()) {
    return baked.trim();
  }

  return undefined;
}

export const ENV = {
  LINKEDIN_URL: required(
    readPublicEnv("PUBLIC_LINKEDIN_URL"),
    "PUBLIC_LINKEDIN_URL"
  ),

  GITHUB_URL: required(readPublicEnv("PUBLIC_GITHUB_URL"), "PUBLIC_GITHUB_URL"),

  INSTAGRAM_URL: required(
    readPublicEnv("PUBLIC_INSTAGRAM_URL"),
    "PUBLIC_INSTAGRAM_URL"
  ),

  APP_ENV: required(readPublicEnv("PUBLIC_APP_ENV"), "PUBLIC_APP_ENV"),

  SITE_URL: required(readPublicEnv("PUBLIC_SITE_URL"), "PUBLIC_SITE_URL"),

  GTM_CONTAINER_ID: optional(readPublicEnv("PUBLIC_GTM_CONTAINER_ID")),

  CV_URL: optional(readPublicEnv("PUBLIC_CV_URL")),

  WHATSAPP_NUMBER: required(
    readPublicEnv("PUBLIC_WHATSAPP_NUMBER"),
    "PUBLIC_WHATSAPP_NUMBER"
  ),
} as const;

export const IS_PRODUCTION = ENV.APP_ENV === "production";
