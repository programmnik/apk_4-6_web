import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRedirectTimer = (initialSeconds: number = 10, redirectPath: string = '/') => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate(redirectPath);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate, redirectPath]);

    return { seconds };
};