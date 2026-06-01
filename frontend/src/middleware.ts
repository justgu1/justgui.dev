import { defineMiddleware, sequence } from "astro:middleware";
import { LanguagesMiddleware } from "./middlewares/languages";
import { VisitorsMiddleware } from "./middlewares/visitors";

export const onRequest = defineMiddleware(
  sequence(VisitorsMiddleware, LanguagesMiddleware)
);
