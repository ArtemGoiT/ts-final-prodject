import i18, {InitOptions} from "i18next";
import { initReactI18next } from "react-i18next";
import  LanguageDetector  from "i18next-browser-languagedetector";
import EN from "./locales/en/translaction.json";
import UA from "./locales/ua/translaction.json";



interface Resources {
    [key:string]: {
        translation: typeof EN | typeof UA;
    };
}

const resources: Resources = {
    en: { translation: EN},
    ua: { translation: UA},
};

const savedLang: string | null = localStorage.getItem("i18nextLng");
const userLang: string = navigator.language.slice(0,2);
const lang: string = savedLang || (resources[userLang] ? userLang : "en");

const options: InitOptions = {
    resources,
    lng: lang,
    fallbackLng: "en",
    debug: false,
};

i18
.use(initReactI18next)
.use(LanguageDetector)
.init(options);

export const formatDate = (date: Date): string => {
    return date.toLocaleDateString(lang === "ua" ? "uk-UA" : "en-US",{
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};
export default i18;
