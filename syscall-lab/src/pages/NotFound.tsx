import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    // Автоматическое перенаправление через 3 секунды
    const timer = setTimeout(() => {
      navigate('/');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container>
      <Title>404</Title>
      <Subtitle>Страница не найдена</Subtitle>
      <Description>
        Страница, которую вы ищете, не существует или была перемещена.
        <br />
        Вы будете перенаправлены на главную через 3 секунды.
      </Description>
      <Button onClick={() => navigate('/')}>
        Перейти на главную
      </Button>
    </Container>
  );
};