import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyle } from './styles/global';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Modules } from './components/Modules/Modules';
import { Footer } from './components/Footer/Footer';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';
import { ModulePage } from './pages/ModulePage';
import { NotFound } from './pages/NotFound';
import { ScrollToTopOnNavigate } from './components/ScrollToTopOnNavigate';

const App: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(nextLang);
  };

  const getModule = (id: string) => ({
    id,
    title: t(`modules.${id}.title`),
    description: t(`modules.${id}.description`),
    tags: t(`modules.${id}.tags`, { returnObjects: true }) as string[],
    duration: t(`modules.${id}.duration`)
  });

  const modulesData = {
    '00': getModule('00'),
    '01': getModule('01'),
    '02': getModule('02'),
    '03': getModule('03'),
    '04': getModule('04'),
    '05': getModule('05'),
    '06': getModule('06'),
    '07': getModule('07'),
    '08': getModule('08'),
    '09': getModule('09'),
    '10': getModule('10')
  };

  const modulesBySection = {
    basics: [modulesData['00'], modulesData['01'], modulesData['02'], modulesData['03']],
    interception: [modulesData['04'], modulesData['05'], modulesData['06']],
    modern: [modulesData['07'], modulesData['08'], modulesData['09']],
    conclusion: [modulesData['10']]
  };

  const sectionKeys = ['basics', 'interception', 'modern', 'conclusion'];

  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  const HomePage = () => (
    <>
      <Hero />
      <Modules
        sectionKeys={sectionKeys}
        modulesBySection={modulesBySection}
      />
    </>
  );

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header
          isScrolled={isScrolled}
          themeMode={themeMode}
          toggleTheme={toggleTheme}
          toggleLanguage={toggleLanguage}
        />
        <ScrollToTopOnNavigate />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/modules" element={<HomePage />} /> 
          <Route path="/about" element={<HomePage />} />                
          <Route path="/module/:id" element={<ModulePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ScrollToTop />
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;