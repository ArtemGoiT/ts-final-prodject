import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import EN from "./locales/en/translation.json"; // Исправлено на "translation.json"
import UA from "./locales/ua/translation.json"; // Исправлено на "translation.json"

// Интерфейс для ресурсов
interface Resources {
  [key: string]: {
    translation: typeof EN | typeof UA; // Ожидаем, что оба JSON имеют одинаковую структуру
  };
}

// Определяем ресурсы
const resources: Resources = {
  en: { translation: EN },
  ua: { translation: UA },
};

// Получаем сохранённый язык из localStorage или устанавливаем язык по умолчанию
const savedLang: string | null = localStorage.getItem("i18nextLng");
const userLang: string = navigator.language.slice(0, 2); // Получаем первые два символа из языка браузера
const lang: string = savedLang || (resources[userLang] ? userLang : "en");

// Инициализируем i18next
const initOptions: InitOptions = {
  resources,
  lng: lang,
  fallbackLng: "en", // Язык по умолчанию, если не найден
  debug: false, // Установите true для отладки
  interpolation: {
    escapeValue: false, // Не экранировать значения (React уже экранирует)
  },
};

i18n
  .use(LanguageDetector) // Используем детектор языка
  .use(initReactI18next) // Подключаем i18next к React
  .init(initOptions);

// Функция для форматирования даты
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString(lang === "ua" ? "uk-UA" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default i18n;
