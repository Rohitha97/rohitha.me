import "server-only";
import type { Locale } from "@/i18n.config";

const dictionaries = {
  en: () => import("@/messages/en.json").then((module) => module.default),
  jp: () => import("@/messages/jp.json").then((module) => module.default),
};
export const getDictionary = async (locale: Locale) => dictionaries[locale]();
