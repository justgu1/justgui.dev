const SEARCH_ENGINE_BOT_PATTERN =
  /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|applebot|semrushbot|ahrefsbot|mj12bot|dotbot/i;

export function isSearchEngineBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return SEARCH_ENGINE_BOT_PATTERN.test(userAgent);
}
