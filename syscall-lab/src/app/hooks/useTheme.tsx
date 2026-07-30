import { useState, useCallback } from 'react';

export const useTheme = () => {
    const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

    const toggleTheme = useCallback(() => {
        setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
    }, []);

    return { themeMode, toggleTheme }
}