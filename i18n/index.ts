import type en from "./locales/en.json";
export type { Locale } from "./config";
export { defaultLocale, supportedLocales, parseLocale } from "./config";
import type { Locale } from "./config";
import { defaultLocale } from "./config";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./locales/en.json").then((m) => m.default),
  ru: () => import("./locales/ru.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const load = dictionaries[locale];
  if (!load) return dictionaries[defaultLocale]();
  return load();
}
