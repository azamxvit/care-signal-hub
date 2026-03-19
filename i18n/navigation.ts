"use client";

import { useTransition } from "react";

export type Locale = "ru" | "kz";

export const LOCALE_LABELS: Record<Locale, string> = {
  ru: "Рус",
  kz: "Қаз",
};

export function useLocale() {
  const [, startTransition] = useTransition();

  const locale =
    (typeof document !== "undefined"
      ? (document.cookie
          .split("; ")
          .find((r) => r.startsWith("locale="))
          ?.split("=")[1] as Locale)
      : undefined) ?? "ru";

  function switchLocale(next: Locale) {
    startTransition(() => {
      document.cookie = `locale=${next}; path=/; max-age=31536000; SameSite=Lax`;
      window.location.reload();
    });
  }

  return { locale, switchLocale };
}