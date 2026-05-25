import { ENV } from "./env";

export const SITE_CONFIG = {
  linkedinUrl: ENV.LINKEDIN_URL,
  githubUrl: ENV.GITHUB_URL,
  instagramUrl: ENV.INSTAGRAM_URL,
} as const;