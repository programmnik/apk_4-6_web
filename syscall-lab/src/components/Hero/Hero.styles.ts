import styled from 'styled-components';

export const HeroSection = styled.section`
  min-height: 100vh;
  min-width: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 24px 60px;
  background: ${({ theme }) => theme.background};
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 80px 20px 40px;
  }

  @media (max-width: 480px) {
    padding: 60px 16px 30px;
    min-height: 90vh;
  }

  @media (max-width: 300px) {
    margin-top: 150px;
    padding: 0px 16px 40px;
  }
`;

export const HeroContent = styled.div`
  max-width: 900px;
  width: 100%;
  text-align: center;
  animation: fadeInUp 0.8s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Greeting = styled.p`
  font-size: clamp(20px, 4vw, 30px);
  font-weight: 500;
  color: ${({ theme }) => theme.accent};
  margin-bottom: 12px;
  letter-spacing: 0.5px;
`;

export const Title = styled.h1`
  font-size: clamp(32px, 6vw, 52px);
  font-weight: 700;
  line-height: 1.1;
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

export const Description = styled.p`
  font-size: clamp(16px, 2vw, 18px);
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 16px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
`;

export const Details = styled.p`
  font-size: clamp(14px, 1.5vw, 16px);
  color: ${({ theme }) => theme.textSecondary};
  opacity: 0.8;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

export const CtaButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 40px;
  border-radius: 12px;
  background: ${({ theme }) => theme.accent};
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.accentHover};
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(108, 99, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.accent};
    outline-offset: 2px;
  }

  @media (max-width: 480px) {
    padding: 14px 32px;
    font-size: 14px;
    width: 100%;
    justify-content: center;
  }
`;