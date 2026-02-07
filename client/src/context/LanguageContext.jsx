import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTranslation } from '../services/lingoService';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    // Auto-detect browser language with fallback
    const detectLanguage = () => {
        const stored = localStorage.getItem('atlas_language');
        if (stored && ['en', 'ar'].includes(stored)) return stored;

        const browserLang = navigator.language?.split('-')[0];
        return browserLang === 'ar' ? 'ar' : 'en';
    };

    const [currentLanguage, setCurrentLanguage] = useState(detectLanguage());

    // Persist language changes
    useEffect(() => {
        localStorage.setItem('atlas_language', currentLanguage);

        // Set document direction
        document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = currentLanguage;
    }, [currentLanguage]);

    // Translation function
    const t = (key, variables) => {
        return getTranslation(key, currentLanguage, variables);
    };

    const value = {
        currentLanguage,
        setLanguage: setCurrentLanguage,
        t,
        isRTL: currentLanguage === 'ar'
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;
