
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { en, hi, bhoj } from './translations';
import { Language, TranslationKey } from './translations/index';

// Create a translations object with all languages
const translations = { en, hi, bhoj };

export interface TranslationContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  currentLang: Language;
  changeLanguage: (lang: Language) => void;
}

// Create the context
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [currentLang, setCurrentLang] = useState<Language>('en');

  // Translation function
  const t = (key: TranslationKey): string => {
    return translations[currentLang][key] || key;
  };

  // Change language function
  const changeLanguage = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('preferred-language', lang);
  };

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('preferred-language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'hi' || savedLang === 'bhoj')) {
      setCurrentLang(savedLang);
    }
  }, []);

  return (
    <TranslationContext.Provider 
      value={{ 
        lang: currentLang, 
        setLang: changeLanguage, 
        t,
        currentLang,
        changeLanguage
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook for accessing translations
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
