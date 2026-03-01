export type Locale = "en" | "ru";

export const defaultLocale: Locale = "ru";
export const supportedLocales: Locale[] = ["en", "ru"];

export function parseLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const preferred = acceptLanguage
    .split(",")
    .map((part) => {
      const [lang, q] = part.trim().split(";q=");
      return { lang: lang.trim().toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of preferred) {
    const short = lang.split("-")[0] as Locale;
    if (supportedLocales.includes(short)) return short;
  }

  return defaultLocale;
}
