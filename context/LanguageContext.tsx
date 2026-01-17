// src/context/LanguageContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from "react";
import enTranslations from "../translations/en.json";
import arTranslations from "../translations/ar.json";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
});

const translations = {
  en: enTranslations,
  ar: arTranslations,
};

/**
 * Get nested translation value by dot-notation key
 * Example: t('home.heroTitle') or t('navigation.home')
 */
function getTranslation(obj: any, path: string): string {
  const keys = path.split(".");
  let value = obj;
  
  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key];
    } else {
      return path; // Return key if translation not found
    }
  }
  
  return typeof value === "string" ? value : path;
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Load language from localStorage or default to 'en'
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved === "en" || saved === "ar") ? saved : "en";
  });

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  // Translation function
  const t = useMemo(() => {
    return (key: string): string => {
      return getTranslation(translations[language], key);
    };
  }, [language]);

  // Change page direction automatically for RTL
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
