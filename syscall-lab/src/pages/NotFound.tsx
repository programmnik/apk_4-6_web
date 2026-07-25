import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 120px 24px 80px;
  background: ${({ theme }) => theme.background};
  text-align: center;
`;

const Title = styled.h1`
  font-size: 72px;
  font-weight: 700;
  color: ${({ theme }) => theme.accent};
  margin-bottom: 16px;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 32px;
`;

const Button = styled.button`
  padding: 12px 32px;
  border-radius: 10px;
  background: ${({ theme }) => theme.accent};
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.accentHover};
    transform: translateY(-2px);
  }
`;

export const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(7);

  useEffect(() => {
      const timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
  
      return () => clearInterval(timer);
    }, [navigate]);
    
  const getSecondsText = (count: number) => {
    if (count === 1) return '1 ' + t('declension.one');
    if (count >= 2 && count <= 4) return `${count} ${t('declension.two-four')}`;
    return `${count} ${t('declension.moreThanFour')}`;
  };

  return (
    <Container>
      <Title>{t('errors.notFound.title')}</Title>
      <Subtitle>{t('errors.notFound.subtitle')}</Subtitle>
      <Description>
        {t('errors.notFound.description')}
        <br />
        {t('errors.notFound.descriptionAboutTime', {
          seconds: getSecondsText(seconds)
        })}
      </Description>
      <Button onClick={() => navigate('/')}>
        {t('errors.notFound.buttonTitle')}
      </Button>
    </Container>
  );
};