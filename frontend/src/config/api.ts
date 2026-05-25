import { ENV } from "./env";

export const API_CONFIG = {
  baseUrl: ENV.API_URL,

  endpoints: {
    projects: "/projects",
  },
} as const;