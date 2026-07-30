export interface ImageZoomConfig {
    scale?: number;
    maxWidth?: number;
    maxHeight?: number;
    enableHoverScale?: boolean;
    hoverScaleFactor?: number;
    borderRadius?: number;
    backgroundPadding?: number;
    closeOnEsc?: boolean;
    closeOnOverlayClick?: boolean;
}

export interface ImageZoomProps {
    isOpen: boolean;
    imageSrc: string;
    onClose: () => void;
    config?: ImageZoomConfig;
    alt?: string;
}

export const DEFAULT_CONFIG: ImageZoomConfig = {
    scale: 2.5,
    maxWidth: 90,
    maxHeight: 90,
    enableHoverScale: true,
    hoverScaleFactor: 1.02,
    borderRadius: 12,
    backgroundPadding: 8,
    closeOnEsc: true,
    closeOnOverlayClick: true,
};