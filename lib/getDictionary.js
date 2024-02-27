import 'server-only';

const dictionaries = {
  en: () => import("../locales/en.json").then((module) => module.default),
  fr: () => import("../locales/fr.json").then((module) => module.default)
};

export const getDictionary = async (locale) =>
  dictionaries[locale]?.() ?? dictionaries.en();
