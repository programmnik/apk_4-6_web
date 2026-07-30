import styled from 'styled-components';
import type { ImageZoomConfig } from './types/ImageZoom.types';

interface OverlayContainerProps {
  $isActive: boolean;
}

interface ExpandedImageProps {
  $scale: number;
  $config: ImageZoomConfig;
}

export const OverlayContainer = styled.div<OverlayContainerProps>`
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
  animation: ${({ $isActive }) => ($isActive ? 'fadeIn 0.3s ease' : 'none')};

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

export const CloseButton = styled.button`
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

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const ExpandedImage = styled.img<ExpandedImageProps>`
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

  ${({ $config, $scale }) =>
    $config.enableHoverScale &&
    `
    &:hover {
      transform: scale(${$scale * ($config.hoverScaleFactor || 1.02)});
    }
  `}

  filter: ${({ theme }) =>
    theme.background === '#0b1120' || theme.background === '#141d2b'
      ? 'invert(1) brightness(0.9)'
      : 'invert(0)'};
`;