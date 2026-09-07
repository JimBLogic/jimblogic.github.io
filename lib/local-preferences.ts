export type Language = "en" | "es" | "ca";
export const LANGUAGE_KEY = "jimblogic-language";
export const LEGACY_FEED_KEY = "jimblogic-cyberdailylog-snapshot";

export function isLanguage(value: unknown): value is Language {
  return value === "en" || value === "es" || value === "ca";
}

export function readSavedLanguage(browser: Pick<Window, "localStorage">): Language | null {
  try {
    const value = browser.localStorage.getItem(LANGUAGE_KEY);
    return isLanguage(value) ? value : null;
  } catch { return null; }
}

// Called only from an explicit language selection.
export function rememberLanguage(browser: Pick<Window, "localStorage">, value: Language): boolean {
  if (!isLanguage(value)) return false;
  try { browser.localStorage.setItem(LANGUAGE_KEY, value); return true; }
  catch { return false; }
}

export function clearLocalPreferences(browser: Pick<Window, "localStorage" | "sessionStorage">): boolean {
  let completed = true;
  try { browser.localStorage.removeItem(LANGUAGE_KEY); } catch { completed = false; }
  try { browser.sessionStorage.removeItem(LEGACY_FEED_KEY); } catch { completed = false; }
  return completed;
}
