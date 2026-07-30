import React from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Globe, List } from 'phosphor-react';
import { useHeader } from './hooks/useHeader';
import {
  HeaderContainer,
  HeaderInner,
  Logo,
  LogoIcon,
  Nav,
  NavLink,
  Controls,
  IconButton,
  BurgerButton,
  MobileMenu,
  MobileNavLink,
} from './Header.styles';

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
  toggleLanguage,
}) => {
  const { t } = useTranslation();
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useHeader();

  return (
    <HeaderContainer $isScrolled={isScrolled}>
      <HeaderInner>
        <Logo href="#">
          <LogoIcon src={`${baseUrl}brstu-logo.svg`} alt="БрГТУ" />
          {t('header.title')}
        </Logo>

        <Nav>
          <NavLink href="#modules">{t('header.nav.modules')}</NavLink>
          <NavLink href="#about">{t('header.nav.about')}</NavLink>
        </Nav>

        <Controls>
          <IconButton onClick={toggleLanguage} title="Switch language">
            <Globe size={20} />
          </IconButton>
          <IconButton onClick={toggleTheme} title="Toggle theme">
            {themeMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </IconButton>
          <BurgerButton onClick={toggleMobileMenu}>
            <List size={24} />
          </BurgerButton>
        </Controls>
      </HeaderInner>

      <MobileMenu $open={mobileMenuOpen}>
        <MobileNavLink href="#modules" onClick={closeMobileMenu}>
          {t('header.nav.modules')}
        </MobileNavLink>
        <MobileNavLink href="#about" onClick={closeMobileMenu}>
          {t('header.nav.about')}
        </MobileNavLink>
      </MobileMenu>
    </HeaderContainer>
  );
};