import React, { lazy, Suspense, useMemo } from 'react';
import { MDXComponents } from '../MDXComponents/MDXComponents';

interface MDXContentProps {
    moduleId: string;
    language: string;
}

export const MDXContent: React.FC<MDXContentProps> = ({ moduleId, language }) => {
    const Content = useMemo(() => {
        return lazy(() =>
            import(`../../../content/modules/${moduleId}/${language}.mdx`).catch(() => {
                if (language !== 'ru') {
                    return import(`../../../content/modules/${moduleId}/ru.mdx`);
                }
                throw new Error('Content not found');
            })
        );
    }, [moduleId, language]);

    return (
        <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', opacity: 0.6 }}>Загрузка...</div>}>
            <Content components={MDXComponents} />
        </Suspense>
    );
};