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
  API_URL: required(import.meta.env.PUBLIC_API_URL, "PUBLIC_API_URL"),

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

  GA4_MEASUREMENT_ID: optional(import.meta.env.PUBLIC_GA4_MEASUREMENT_ID),

  META_PIXEL_ID: optional(import.meta.env.PUBLIC_META_PIXEL_ID),

  CV_URL: optional(import.meta.env.PUBLIC_CV_URL),
} as const;

export const IS_PRODUCTION = ENV.APP_ENV === "production";
