import { useState, useEffect } from 'react';

export const useScrollVisibility = (threshold: number = 400) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > threshold);
        };

        let ticking = false;
        const handleScrollOptimized = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScrollOptimized, { passive: true });
        return () => window.removeEventListener('scroll', handleScrollOptimized);
    }, [threshold]);

    return isVisible;
};