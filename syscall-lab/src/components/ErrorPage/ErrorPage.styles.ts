import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div<{ $fullHeight?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: ${({ $fullHeight }) => ($fullHeight ? '100vh' : 'calc(100vh - 234px)')};
  padding: 40px 24px;
  text-align: center;
  background: ${({ theme }) => theme.background};
`;

export const IconWrapper = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${({ theme }) => theme.cardBorder};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  color: ${({ theme }) => theme.accent};
  opacity: 0.6;
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-12px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 26px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

export const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 8px;
  max-width: 500px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
  opacity: 0.7;
  margin-bottom: 32px;
  max-width: 400px;
  line-height: 1.8;

  @media (max-width: 480px) {
    font-size: 13px;
    max-width: 100%;
  }
`;

export const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 36px;
  border-radius: 12px;
  background: ${({ theme }) => theme.accent};
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  text-decoration: none;
  border: none;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.accentHover};
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(108, 99, 255, 0.3);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.accent};
    outline-offset: 2px;
  }

  @media (max-width: 480px) {
    padding: 12px 24px;
    font-size: 14px;
    width: 100%;
    justify-content: center;
  }
`;