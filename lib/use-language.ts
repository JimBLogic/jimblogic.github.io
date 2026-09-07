"use client";

import { useEffect, useState } from "react";
import { readSavedLanguage, rememberLanguage, type Language } from "./local-preferences";

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("en");
  useEffect(() => {
    const saved = readSavedLanguage(window);
    if (!saved) return;
    const timer = window.setTimeout(() => setLanguage(saved), 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => { document.documentElement.lang = language; }, [language]);

  const chooseLanguage = (next: Language) => {
    setLanguage(next);
    rememberLanguage(window, next);
  };
  return [language, chooseLanguage] as const;
}
