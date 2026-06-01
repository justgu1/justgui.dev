function required(value: string | undefined, key: string): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

function optional(value: string | undefined): string | undefined {
  return value?.trim() || undefined;
}

export const ENV = {
  LINKEDIN_URL: required(
    import.meta.env.PUBLIC_LINKEDIN_URL,
    "PUBLIC_LINKEDIN_URL"
  ),

  GITHUB_URL: required(import.meta.env.PUBLIC_GITHUB_URL, "PUBLIC_GITHUB_URL"),

  INSTAGRAM_URL: required(
    import.meta.env.PUBLIC_INSTAGRAM_URL,
    "PUBLIC_INSTAGRAM_URL"
  ),

  APP_ENV: required(import.meta.env.PUBLIC_APP_ENV, "PUBLIC_APP_ENV"),

  SITE_URL: required(import.meta.env.PUBLIC_SITE_URL, "PUBLIC_SITE_URL"),

  GTM_CONTAINER_ID: optional(import.meta.env.PUBLIC_GTM_CONTAINER_ID),

  CV_URL: optional(import.meta.env.PUBLIC_CV_URL),

  WHATSAPP_NUMBER: required(
    import.meta.env.PUBLIC_WHATSAPP_NUMBER,
    "PUBLIC_WHATSAPP_NUMBER"
  ),
} as const;

export const IS_PRODUCTION = ENV.APP_ENV === "production";
