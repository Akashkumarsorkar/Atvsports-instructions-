import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, LANGUAGES, TRANSLATIONS, TranslationDictionary, LanguageOption } from '../i18n/translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  currentLanguage: LanguageOption;
  t: TranslationDictionary;
  availableLanguages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'atv_sports_lang';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage;
      if (saved && TRANSLATIONS[saved]) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    if (TRANSLATIONS[lang]) {
      setLanguageState(lang);
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        // ignore
      }
    }
  };

  const currentLanguage = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = currentLanguage.dir;
  }, [language, currentLanguage.dir]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currentLanguage,
        t,
        availableLanguages: LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
