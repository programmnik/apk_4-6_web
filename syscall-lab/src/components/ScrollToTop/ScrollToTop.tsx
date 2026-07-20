import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowUp } from 'phosphor-react';

const Button = styled.button<{ $visible: boolean }>`
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 999;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.accent};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'scale(1)' : 'scale(0.8)')};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  box-shadow: 0 4px 20px rgba(108, 99, 255, 0.3);

  &:hover {
    transform: ${({ $visible }) => ($visible ? 'scale(1.05)' : 'scale(0.8)')};
    background: ${({ theme }) => theme.accentHover};
  }
`;

export const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button $visible={visible} onClick={scrollToTop} aria-label="Scroll to top">
      <ArrowUp size={24} />
    </Button>
  );
};