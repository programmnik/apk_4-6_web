import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ArrowDown } from 'phosphor-react';

const HeroSection = styled.section`
  min-height: 100vh;
  min-width: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 24px 60px;
  background: ${({ theme }) => theme.background};
  position: relative;
  overflow: hidden;
  @media (max-width: 300px) {
    margin-top: 150px;
    padding: 0px 24px 60px;
  }
`;

const HeroContent = styled.div`
  max-width: 900px;
  text-align: center;
`;

const Greeting = styled.p`
  font-size: 30px;
  font-weight: 500;
  color: ${({ theme }) => theme.accent};
  margin-bottom: 12px;
  letter-spacing: 0.5px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Title = styled.h1`
  font-size: 52px;
  font-weight: 700;
  line-height: 1.1;
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Description = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 16px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Details = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.textSecondary};
  opacity: 0.8;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CtaButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 40px;
  border-radius: 12px;
  background: ${({ theme }) => theme.accent};
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.accentHover};
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(108, 99, 255, 0.3);
  }
`;

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <HeroSection>
      <HeroContent>
        <Greeting>👋 {t('hero.greeting')}</Greeting>
        <Title>{t('hero.title')}</Title>
        <Description>{t('hero.description')}</Description>
        <Details>{t('hero.details')}</Details>
        <CtaButton href="#modules">
          {t('hero.cta')}
          <ArrowDown size={20} />
        </CtaButton>
      </HeroContent>
    </HeroSection>
  );
};