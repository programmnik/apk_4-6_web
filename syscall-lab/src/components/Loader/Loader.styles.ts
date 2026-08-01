import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const Container = styled.div<{ $fullScreen?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  min-height: ${({ $fullScreen }) => ($fullScreen ? '100vh' : '200px')};
  background: ${({ theme }) => theme.background};
  gap: 20px;
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.cardBorder};
  border-top-color: ${({ theme }) => theme.accent};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const Text = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
  opacity: 0.7;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export const SkeletonLine = styled.div<{ $width?: string; $height?: string }>`
  height: ${({ $height }) => $height || '16px'};
  width: ${({ $width }) => $width || '100%'};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.cardBorder} 25%,
    ${({ theme }) => theme.backgroundSecondary} 50%,
    ${({ theme }) => theme.cardBorder} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

export const SkeletonContainer = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 0;
`;