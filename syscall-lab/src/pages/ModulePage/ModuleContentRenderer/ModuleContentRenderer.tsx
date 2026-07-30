import { memo, useCallback } from 'react';
import { ModuleContent } from '../ModulePage.styles';

interface ModuleContentRendererProps {
    html: string;
    onContentMount: (element: HTMLDivElement) => void;
}

export const ModuleContentRenderer = memo(({ html, onContentMount }: ModuleContentRendererProps) => {
    const ref = useCallback(
        (node: HTMLDivElement | null) => {
            if (node) {
                onContentMount(node);
            }
        },
        [onContentMount]
    );

    return <ModuleContent ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
});

ModuleContentRenderer.displayName = 'ModuleContentRenderer';