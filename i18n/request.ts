import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export type Locale = "ru" | "kz";
export const defaultLocale: Locale = "ru";
export const locales: Locale[] = ["ru", "kz"];

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value as Locale) ?? defaultLocale;

  return {
    locale,
    messages: {
      common: (await import(`../messages/${locale}/common.json`)).default,
      // dashboard: (await import(`../messages/${locale}/dashboard.json`)).default,
    },
  };
});