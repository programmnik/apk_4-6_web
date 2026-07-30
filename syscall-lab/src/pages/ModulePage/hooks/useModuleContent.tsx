import { useState, useEffect } from 'react';
import { loadModuleContent } from '../../../utils/loadModuleContent';

export const useModuleContent = (moduleId: string, language: string) => {
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);
            setError(false);

            const html = await loadModuleContent(moduleId, language);

            if (html) {
                setContent(html);
            } else {
                setError(true);
            }

            setLoading(false);
        };

        fetchContent();
    }, [moduleId, language]);

    return { content, loading, error };
};