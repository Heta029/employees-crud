import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationES from './es/translation';
import translationEN from './en/translation';
import detector from "i18next-browser-languagedetector";

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  }
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en", 
    keySeparator: false, 
    interpolation: {
      escapeValue: false 
    }
  }
  );

export default i18n;