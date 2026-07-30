import React from 'react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { ScrollToTop } from '../components/ScrollToTop/ScrollToTop';
import { ScrollToTopOnNavigate } from './ScrollToTopOnNavigate';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';
import { useScroll } from './hooks/useScroll';
import { Providers } from './providers';
import { AppRoutes } from './routes';

export const App: React.FC = () => {
  const { themeMode, toggleTheme } = useTheme();
  const { toggleLanguage } = useLanguage();
  const isScrolled = useScroll(20);

  return (
    <Providers themeMode={themeMode}>
      <Header
        isScrolled={isScrolled}
        themeMode={themeMode}
        toggleTheme={toggleTheme}
        toggleLanguage={toggleLanguage}
      />
      <ScrollToTopOnNavigate />
      <AppRoutes />
      <Footer />
      <ScrollToTop />
    </Providers>
  );
};