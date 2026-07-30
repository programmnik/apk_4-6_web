import { useEffect } from 'react';

export const useEscapeKey = (isActive: boolean, onEscape: () => void) => {
    useEffect(() => {
        if (!isActive) return;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onEscape();
            }
        };

        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isActive, onEscape]);
};