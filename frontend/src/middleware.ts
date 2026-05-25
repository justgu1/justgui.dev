import { defineMiddleware } from "astro:middleware";
import { LanguagesMiddleware } from "./middlewares/languages";

export const onRequest = defineMiddleware(
  LanguagesMiddleware
);