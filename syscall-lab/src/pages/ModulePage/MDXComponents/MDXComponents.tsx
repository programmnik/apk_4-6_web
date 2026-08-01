import type { MDXComponents as MDXComponentsType } from 'mdx/types';
import { useImageZoom } from '../../../components/ImageZoom';
import { VideoPlayer } from '../../../components/VideoPlayer/VideoPlayer';
import { FileDownload } from '../../../components/FileDownload/FileDownload';
import { ModuleContent } from '../ModulePage.styles';

// ИЗОБРАЖЕНИЕ С ЗУМОМ 

interface MDXImageProps {
    src: string;
    alt: string;
    zoomable?: boolean;
    caption?: string;
}

const MDXImage = ({ src, alt, zoomable = true, caption }: MDXImageProps) => {
    const { open, ZoomComponent } = useImageZoom({
        scale: 2,
        maxWidth: 90,
        maxHeight: 90,
        enableHoverScale: true,
        hoverScaleFactor: 1.05,
        borderRadius: 12,
        backgroundPadding: 8,
        closeOnEsc: true,
        closeOnOverlayClick: true,
    });

    const handleClick = () => {
        if (zoomable) {
            open(src);
        }
    };

    return (
        <>
            <figure style={{ margin: '20px auto', textAlign: 'center' }}>
                <img
                    src={src}
                    alt={alt}
                    onClick={handleClick}
                    style={{
                        display: 'block',
                        width: '100%',
                        maxWidth: '800px',
                        height: 'auto',
                        margin: '0 auto',
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        cursor: zoomable ? 'zoom-in' : 'default',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        if (zoomable) {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.25)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (zoomable) {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                        }
                    }}
                />
                {caption && (
                    <figcaption style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                        {caption}
                    </figcaption>
                )}
            </figure>
            <ZoomComponent />
        </>
    );
};

// КОМПОНЕНТЫ ДЛЯ MDX
// Используем ModuleContent как обертку, чтобы наследовать все стили

export const MDXComponents: MDXComponentsType = {
    // Оборачиваем весь контент в ModuleContent
    wrapper: ({ children }) => <ModuleContent>{children}</ModuleContent>,

    // Базовые элементы — они получат стили от ModuleContent через наследование
    h2: (props: any) => <h2 {...props} />,
    h3: (props: any) => <h3 {...props} />,
    p: (props: any) => <p {...props} />,
    ul: (props: any) => <ul {...props} />,
    ol: (props: any) => <ol {...props} />,
    code: (props: any) => <code {...props} />,
    pre: (props: any) => <pre {...props} />,
    blockquote: (props: any) => <blockquote {...props} />,
    table: (props: any) => <table {...props} />,
    th: (props: any) => <th {...props} />,
    td: (props: any) => <td {...props} />,
    img: (props: any) => <MDXImage {...props} />,

    // Кастомные компоненты
    Video: VideoPlayer,
    FileDownload: FileDownload,
    Image: MDXImage,
};