/// <reference types="astro/client" />

type DataLayerEntry = Record<string, unknown> | unknown[];

interface Window {
  dataLayer?: DataLayerEntry[];
  gtag?: (...args: unknown[]) => void;
}

declare namespace App {
  interface Locals {
    visitorId?: string;
    showWelcome?: boolean;
  }
}
