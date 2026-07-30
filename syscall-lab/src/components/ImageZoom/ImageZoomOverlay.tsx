import React, { useCallback } from 'react';
import { X } from 'phosphor-react';
import { useBodyScrollLock } from './hooks/useBodyScrollLock';
import { useEscapeKey } from './hooks/useEscapeKey';
import { OverlayContainer, CloseButton, ExpandedImage } from './ImageZoom.styles';
import { type ImageZoomProps, DEFAULT_CONFIG } from './types/ImageZoom.types';

export const ImageZoom: React.FC<ImageZoomProps> = ({
  isOpen,
  imageSrc,
  onClose,
  config = DEFAULT_CONFIG,
  alt = 'Увеличенное изображение',
}) => {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  useBodyScrollLock(isOpen);
  useEscapeKey(isOpen && !!mergedConfig.closeOnEsc, onClose);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (mergedConfig.closeOnOverlayClick && e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose, mergedConfig.closeOnOverlayClick]
  );

  if (!isOpen) return null;

  return (
    <>
      <CloseButton onClick={onClose} aria-label="Закрыть">
        <X size={24} weight="bold" />
      </CloseButton>
      <OverlayContainer $isActive={isOpen} onClick={handleOverlayClick}>
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