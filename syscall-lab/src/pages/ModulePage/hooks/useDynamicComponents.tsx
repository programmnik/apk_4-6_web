import { useEffect, useRef, useCallback, type RefObject } from 'react';
import { createRoot } from 'react-dom/client';
import { VideoPlayer } from '../../../components/VideoPlayer/VideoPlayer';
import { FileDownload } from '../../../components/FileDownload/FileDownload';

export const useDynamicComponents = (
    containerRef: RefObject<HTMLDivElement | null>,
    content: string
) => {
    const processedRef = useRef<boolean>(false);
    const rootsRef = useRef<Map<Element, any>>(new Map());
    const timeoutRef = useRef<number | null>(null);

    const process = useCallback(() => {
        if (processedRef.current) return;

        const container = containerRef.current;
        if (!container) return;

        const hasWrappers = container.querySelectorAll('.video-wrapper, .file-download-wrapper');
        if (hasWrappers.length > 0) {
            processedRef.current = true;
            return;
        }

        // Видео
        const videos = container.querySelectorAll('.video-player');
        videos.forEach((el) => {
            const src = el.getAttribute('data-src');
            if (src) {
                const wrapper = document.createElement('div');
                wrapper.className = 'video-wrapper';
                const parent = el.parentNode;
                if (parent) {
                    parent.replaceChild(wrapper, el);
                    const root = createRoot(wrapper);
                    root.render(
                        <VideoPlayer
                            src={src}
                            poster={el.getAttribute('data-poster') || undefined}
                            title={el.getAttribute('data-title') || undefined}
                        />
                    );
                    rootsRef.current.set(wrapper, root);
                }
            }
        });

        // Файлы
        const files = container.querySelectorAll('.file-download');
        files.forEach((el) => {
            const fileUrl = el.getAttribute('data-file-url');
            if (fileUrl) {
                const wrapper = document.createElement('div');
                wrapper.className = 'file-download-wrapper';
                const parent = el.parentNode;
                if (parent) {
                    parent.replaceChild(wrapper, el);
                    const root = createRoot(wrapper);
                    root.render(
                        <FileDownload
                            fileUrl={fileUrl}
                            fileName={el.getAttribute('data-file-name') || undefined}
                            fileType={el.getAttribute('data-file-type') as any || undefined}
                            fileSize={parseInt(el.getAttribute('data-file-size') || '0') || undefined}
                            description={el.getAttribute('data-description') || undefined}
                            showDownloadButton={el.getAttribute('data-show-download') !== 'false'}
                        />
                    );
                    rootsRef.current.set(wrapper, root);
                }
            }
        });

        processedRef.current = true;
    }, [containerRef]);

    useEffect(() => {
        if (!content) return;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        processedRef.current = false;

        timeoutRef.current = window.setTimeout(() => {
            process();
        }, 100);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [content, process]);

    useEffect(() => {
        return () => {
            rootsRef.current.forEach((root) => {
                try {
                    root.unmount();
                } catch (e) { }
            });
            rootsRef.current.clear();
        };
    }, []);
};