import { useState, useCallback } from 'react';
import { ImageZoom } from '../ImageZoomOverlay';
import type { ImageZoomConfig } from '../types/ImageZoom.types';

export const useImageZoom = (config?: ImageZoomConfig) => {
    const [isOpen, setIsOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState('');

    const open = useCallback((src: string) => {
        let fullSrc = src;
        if (src.startsWith('/')) {
            fullSrc = window.location.origin + src;
        } else if (!src.startsWith('http')) {
            fullSrc = new URL(src, window.location.href).href;
        }
        setImageSrc(fullSrc);
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    const ZoomComponent = useCallback(
        () => (
            <ImageZoom
                isOpen={isOpen}
                imageSrc={imageSrc}
                onClose={close}
                config={config}
            />
        ),
        [isOpen, imageSrc, close, config]
    );

    return {
        open,
        close,
        isOpen,
        ZoomComponent,
        imageSrc,
    };
};