import { useRef, useCallback, useEffect } from 'react';

export const useContentZoom = (openZoom: (src: string) => void) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleContentMount = useCallback(
        (node: HTMLDivElement) => {
            containerRef.current = node;

            const handleZoomClick = (e: MouseEvent) => {
                const target = e.target as HTMLElement;
                const zoomElement = target.closest('.image-zoom');

                if (zoomElement) {
                    e.preventDefault();
                    e.stopPropagation();

                    const img = zoomElement.querySelector('img');
                    if (img) {
                        const src = zoomElement.getAttribute('data-src') || img.getAttribute('src');
                        if (src) {
                            openZoom(src);
                        }
                    }
                }
            };

            // Удаляем старый обработчик
            if ((node as any)._zoomHandler) {
                node.removeEventListener('click', (node as any)._zoomHandler, true);
            }

            node.addEventListener('click', handleZoomClick, true);
            (node as any)._zoomHandler = handleZoomClick;

            // Устанавливаем курсор
            const zoomElements = node.querySelectorAll('.image-zoom');
            zoomElements.forEach((el) => {
                (el as HTMLElement).style.cursor = 'zoom-in';
            });
        },
        [openZoom]
    );

    // Очистка
    useEffect(() => {
        return () => {
            if (containerRef.current) {
                const handler = (containerRef.current as any)._zoomHandler;
                if (handler) {
                    containerRef.current.removeEventListener('click', handler, true);
                }
            }
        };
    }, []);

    return { containerRef, handleContentMount };
};