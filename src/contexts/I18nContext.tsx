import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, translations } from '../lib/i18n';

interface I18nContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const detectLanguage = (): SupportedLanguage => {
  // Check saved preference
  const saved = localStorage.getItem('convertly-language') as SupportedLanguage;
  if (saved && Object.keys(translations).includes(saved)) {
    return saved;
  }
  
  // Detect from browser
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('pt')) return 'pt';
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('ru')) return 'ru';
  
  return 'en'; // Default
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');

  useEffect(() => {
    setLanguageState(detectLanguage());
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('convertly-language', lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};