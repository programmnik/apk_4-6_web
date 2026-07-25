import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { X } from 'phosphor-react';

// Конфигурация зума
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

const DEFAULT_CONFIG: ImageZoomConfig = {
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

// Типы для styled-компонентов
interface OverlayContainerProps {
  $isActive: boolean;
}

interface ExpandedImageProps {
  $scale: number;
  $config: ImageZoomConfig;
}

// Стили
const OverlayContainer = styled.div<OverlayContainerProps>`
  display: ${({ $isActive }) => ($isActive ? 'flex' : 'none')};
  position: fixed;
  inset: 0;
  background: rgba(45, 45, 45, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 9999;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  animation: ${({ $isActive }) => $isActive ? 'fadeIn 0.3s ease' : 'none'};

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.92);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const CloseButton = styled.button`
  position: fixed;
  top: 30px;
  right: 30px;
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10000;
  backdrop-filter: blur(4px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
    border-color: rgba(255, 255, 255, 0.6);
  }

  @media (max-width: 768px) {
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
  }
`;

const ExpandedImage = styled.img<ExpandedImageProps>`
  width: 100vw;
  height: auto;
  max-width: ${({ $config }) => $config.maxWidth || 90}vw;
  max-height: ${({ $config }) => $config.maxHeight || 90}vh;
  transform: scale(${({ $scale }) => $scale});
  transform-origin: center center;
  border-radius: ${({ $config }) => $config.borderRadius || 12}px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.9);
  cursor: default;
  object-fit: contain;
  transition: transform 0.3s ease;
  user-select: none;
  background: #d9d9d9;
  padding: ${({ $config }) => $config.backgroundPadding || 8}px;

  ${({ $config, $scale }) => $config.enableHoverScale && `
    &:hover {
      transform: scale(${$scale * ($config.hoverScaleFactor || 1.02)});
    }
  `}

  filter: ${({ theme }) => 
    theme.background === '#0b1120' || theme.background === '#141d2b'
      ? 'invert(1) brightness(0.9)' 
      : 'invert(0)'
  };
  transition: filter 0.3s ease;
`;

// Props компонента
interface ImageZoomProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  config?: ImageZoomConfig;
  alt?: string;
}

// Основной компонент
export const ImageZoom: React.FC<ImageZoomProps> = ({
  isOpen,
  imageSrc,
  onClose,
  config = DEFAULT_CONFIG,
  alt = 'Увеличенное изображение',
}) => {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  // Блокировка скролла
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Закрытие по Escape
  useEffect(() => {
    if (!mergedConfig.closeOnEsc) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose, mergedConfig.closeOnEsc]);

  // Закрытие по клику на оверлей
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (mergedConfig.closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose, mergedConfig.closeOnOverlayClick]);

  if (!isOpen) return null;

  return (
    <>
      <CloseButton onClick={onClose} aria-label="Закрыть">
        <X size={24} weight="bold" />
      </CloseButton>
      <OverlayContainer 
        $isActive={isOpen}
        onClick={handleOverlayClick}
      >
        <ExpandedImage 
          src={imageSrc} 
          alt={alt}
          $scale={mergedConfig.scale || 2.5}
          $config={mergedConfig}
          onClick={(e) => e.stopPropagation()}
        />
      </OverlayContainer>
    </>
  );
};

// Хук для использования ImageZoom
export const useImageZoom = (config?: ImageZoomConfig) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  const open = useCallback((src: string) => {
    // Преобразуем путь в абсолютный URL
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

  const ZoomComponent = useCallback(() => (
    <ImageZoom
      isOpen={isOpen}
      imageSrc={imageSrc}
      onClose={close}
      config={config}
    />
  ), [isOpen, imageSrc, close, config]);

  return {
    open,
    close,
    isOpen,
    ZoomComponent,
    imageSrc,
  };
};