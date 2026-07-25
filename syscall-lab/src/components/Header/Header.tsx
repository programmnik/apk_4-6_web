import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Moon, Sun, Globe, List } from 'phosphor-react';

const HeaderContainer = styled.header<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 16px 24px;
  
  // Всегда прозрачный фон с эффектом стекла
  background: ${({ theme, $isScrolled }) =>
    $isScrolled 
      ? 'rgba(255, 255, 255, 0.15)'  // Светлая тема - полупрозрачный
      : 'rgba(255, 255, 255, 0)' // Начальное состояние - более прозрачный
    };
    
  // Эффект размытия (всегда включён)
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  
  // Рамка для стеклянного эффекта
  border-bottom: 1px solid ${({ theme, $isScrolled }) =>
    $isScrolled 
      ? 'rgba(255, 255, 255, 0.2)' 
      : 'rgba(255, 255, 255, 0)'};
  
  transition: all 0.3s ease;
  
  // Тень для глубины
  box-shadow: ${({ $isScrolled }) =>
    $isScrolled 
      ? '0 8px 32px rgba(0, 0, 0, 0.1)' 
      : 'none'};

  border-radius: 20px;

  margin: ${({ $isScrolled }) =>
    $isScrolled 
      ? '10px' 
      : '0px'};
`;

const HeaderInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 390px) {
    font-size: 14px;
  }
`;

const LogoIcon = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
  display: block;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  @media (max-width: 300px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

const IconButton = styled.button`
  padding: 8px;
  border-radius: 8px;
  color: ${({ theme }) => theme.textSecondary};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.cardBorder};
    color: ${({ theme }) => theme.accent};
  }
`;

const BurgerButton = styled.button`
  display: none;
  padding: 8px;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.backgroundSecondary};
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.cardBorder};
  gap: 16px;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavLink = styled.a`
  font-size: 16px;
  color: ${({ theme }) => theme.textSecondary};
  padding: 8px 0;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const baseUrl = import.meta.env.BASE_URL;

interface HeaderProps {
  isScrolled: boolean;
  themeMode: 'light' | 'dark';
  toggleTheme: () => void;
  toggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isScrolled,
  themeMode,
  toggleTheme,
  toggleLanguage
}) => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  return (
    <HeaderContainer $isScrolled={isScrolled}>
      <HeaderInner>
        <Logo href="#">
          <LogoIcon src={`${baseUrl}brstu-logo.svg`} alt="БрГТУ" />
          {t('header.title')}
        </Logo>

        <Nav>
          <NavLink href='#modules'>{t('header.nav.modules')}</NavLink>
          <NavLink href='#about'>{t('header.nav.about')}</NavLink>
        </Nav>

        <Controls>
          <IconButton onClick={toggleLanguage} title="Switch language">
            <Globe size={20} />
          </IconButton>
          <IconButton onClick={toggleTheme} title="Toggle theme">
            {themeMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </IconButton>
          <BurgerButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <List size={24} />
          </BurgerButton>
        </Controls>
      </HeaderInner>

      <MobileMenu $open={mobileMenuOpen}>
        <MobileNavLink href="#modules" onClick={() => setMobileMenuOpen(false)}>
          {t('header.nav.modules')}
        </MobileNavLink>
        <MobileNavLink href="#about" onClick={() => setMobileMenuOpen(false)}>
          {t('header.nav.about')}
        </MobileNavLink>
      </MobileMenu>
    </HeaderContainer>
  );
};