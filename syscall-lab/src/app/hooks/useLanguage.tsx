import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = useCallback(() => {
        const nextLang = i18n.language === 'ru' ? 'en' : 'ru';
        i18n.changeLanguage(nextLang);
    }, [i18n]);

    return { currentLanguage: i18n.language, toggleLanguage };
};