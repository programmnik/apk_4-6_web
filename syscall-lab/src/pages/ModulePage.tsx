import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ArrowLeft, ArrowRight, House, Question } from 'phosphor-react';
import { loadModuleContent } from '../utils/loadModuleContent';
import { useImageZoom } from '../components/ImageZoom/ImageZoomOverlay';

const PageContainer = styled.div`
  padding: 120px 24px 80px;
  max-width: 900px;
  margin: 0 auto;
  background: ${({ theme }) => theme.background};
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 100px 16px 60px;
  }

  @media (max-width: 480px) {
    padding: 80px 12px 40px;
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 14px;
  margin-bottom: 32px;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const ModuleTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

const ModuleMeta = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`;

const MetaTag = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary};
  background: ${({ theme }) => theme.cardBorder};
  padding: 4px 14px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ModuleContent = styled.div`
  font-size: 16px;
  line-height: 1.8;
  color: ${({ theme }) => theme.textSecondary};
  text-align: justify;

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    margin: 32px 0 16px;
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    margin: 24px 0 12px;
  }

  p {
    margin-bottom: 16px;
  }

  ul, ol {
    margin: 12px 0 16px 24px;
  }

  li {
    margin-bottom: 8px;
  }

  code {
    background: ${({ theme }) => theme.cardBorder};
    padding: 2px 8px;
    border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    color: ${({ theme }) => theme.accent};
  }

  pre {
    background: ${({ theme }) => theme.cardBorder};
    padding: 16px 20px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 16px 0;
    
    code {
      background: transparent;
      padding: 0;
      color: ${({ theme }) => theme.textSecondary};
      font-size: 14px;
    }
  }

  img[src$=".svg"] {
    display: block;
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
    height: auto;
    
    /* Инвертируем цвета для тёмной темы */
    filter: ${({ theme }) => 
      theme.background === '#0b1120' 
        ? 'invert(1) brightness(0.9)' 
        : 'invert(0)'
    };
    transition: filter 0.3s ease;
  }

  table {
      border-collapse: collapse;
      width: 100%;
      margin: 16px 0;
      background: ${({ theme }) => theme.table_bg};
      border: 1px solid ${({ theme }) => theme.border_table};
      border-radius: 8px;
      overflow: hidden;
  }
  th, td {
      border: 1px solid ${({ theme }) => theme.border_table};
      padding: 10px 14px;
      text-align: left;
      vertical-align: top;
  }
  th {
      background-color: ${({ theme }) => theme.th_bg};
      font-weight: 600;
  }

  blockquote {
      background: ${({ theme }) => theme.blockquote_bg};
      border-left: 6px solid #2c6b9c;
      margin: 20px 0;
      padding: 12px 20px;
      border-radius: 0 8px 8px 0;
  }

  .highlight {
      background-color: ${({ theme }) => theme.highlight};
  }

  .table-warm {
      background-color: ${({ theme }) => theme.table_warm};
  }

  .table-cool {
      background-color: ${({ theme }) => theme.table_cool};
  }

  .image-zoom {
    display: block;
    margin: 20px auto;
    max-width: 100%;
    transition: transform 0.3s ease;
    cursor: zoom-in;
    
    img {
      display: block;
      width: 100%;
      max-width: 800px;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      
      /* Инвертируем для тёмной темы */
      filter: ${({ theme }) => 
        theme.background === '#0b1120' || theme.background === '#141d2b'
          ? 'invert(1) brightness(0.9)' 
          : 'invert(0)'
      };
    }
    
    /* При наведении — увеличиваем */
    &:hover {
      transform: scale(1.05);
      
      img {
        box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
      }
    }
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid ${({ theme }) => theme.cardBorder};
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

const NavButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 10px;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;

  &:hover {
    border-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.accent};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow};
  }

  @media (max-width: 480px) {
    justify-content: center;
    padding: 10px 16px;
    font-size: 13px;
    white-space: normal;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 234px);
  padding: 40px 24px;
  text-align: center;
  background: ${({ theme }) => theme.background};
`;

const ErrorIcon = styled.div`
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
    0% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
    100% { transform: translateY(0px); }
  }
`;

const ErrorTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

const ErrorSubtitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 8px;
  max-width: 500px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ErrorDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
  opacity: 0.7;
  margin-bottom: 32px;
  max-width: 400px;
`;

const ErrorButton = styled(Link)`
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

  &:hover {
    background: ${({ theme }) => theme.accentHover};
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(108, 99, 255, 0.3);
  }
`;

// Компонент ошибки
const ModuleNotFound: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(10);

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
    <ErrorContainer>
      <ErrorIcon>
        <Question size={70} weight="duotone" />
      </ErrorIcon>
      <ErrorTitle>{t('errors.moduleNotFound.title')}</ErrorTitle>
      <ErrorSubtitle>{t('errors.moduleNotFound.subtitle')}</ErrorSubtitle>
      <ErrorDescription>
        {t('errors.moduleNotFound.description')}
        <br />
        {t('errors.moduleNotFound.descriptionAboutTime', { 
          seconds: getSecondsText(seconds)
        })}
      </ErrorDescription>
      <ErrorButton to="/">
        <House size={20} />
        {t('errors.moduleNotFound.buttonTitle')}
      </ErrorButton>
    </ErrorContainer>
  );
};

export const ModulePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);

  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const moduleId = id || '01';
  const currentLanguage = i18n.language;

  const title = t(`modules.${moduleId}.title`);
  const tags = t(`modules.${moduleId}.tags`, { returnObjects: true }) as string[];
  const duration = t(`modules.${moduleId}.duration`);

  // Используем хук для зума с кастомной конфигурацией
  const { open: openZoom, ZoomComponent } = useImageZoom({
    scale: 1,           // Увеличение в 2.5 раза
    maxWidth: 90,
    maxHeight: 90,
    enableHoverScale: true,
    hoverScaleFactor: 1.05,
    borderRadius: 12,
    backgroundPadding: 8,
    closeOnEsc: true,
    closeOnOverlayClick: true,
  });

  // Загрузка контента
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(false);
      
      const html = await loadModuleContent(moduleId, currentLanguage);
      
      if (html) {
        setContent(html);
      } else {
        setError(true);
      }
      setLoading(false);
    };

    fetchContent();
  }, [moduleId, currentLanguage]);

  // Настройка обработчиков для изображений
  useEffect(() => {
    if (!contentRef.current || loading || !content) {
      return;
    }

    const container = contentRef.current;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const zoomElement = target.closest('.image-zoom');
      
      if (zoomElement) {
        e.preventDefault();
        e.stopPropagation();
        
        const img = zoomElement.querySelector('img');
        if (img) {
          const src = zoomElement.getAttribute('data-src') || img.getAttribute('src');
          if (src) {
            openZoom(src); // Используем хук для открытия
          }
        }
      }
    };

    container.addEventListener('click', handleClick, true);

    // Устанавливаем курсор для всех .image-zoom
    const zoomElements = container.querySelectorAll('.image-zoom');
    zoomElements.forEach((el) => {
      (el as HTMLElement).style.cursor = 'zoom-in';
    });

    return () => {
      container.removeEventListener('click', handleClick, true);
    };
  }, [content, loading, openZoom]);

  // Обработка ошибок и загрузки
  if (error || (loading === false && !content)) {
    return <ModuleNotFound />;
  }

  if (loading) {
    return (
      <PageContainer>
        <BackButton to="/">
          <ArrowLeft size={20} />
          {t('ui.allModules')}
        </BackButton>
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#888' }}>
          {t('ui.loading') || 'Загрузка...'}
        </div>
      </PageContainer>
    );
  }

  const moduleNumber = parseInt(moduleId);
  const totalModules = 10;
  const prevId = moduleNumber > 0 ? String(moduleNumber - 1).padStart(2, '0') : null;
  const nextId = moduleNumber < totalModules ? String(moduleNumber + 1).padStart(2, '0') : null;

  return (
    <>
      <PageContainer>
        <BackButton to="/">
          <ArrowLeft size={20} />
          {t('ui.allModules')}
        </BackButton>

        <ModuleTitle>{title}</ModuleTitle>
        
        <ModuleMeta>
          <MetaTag>📘 {t('ui.module')} {moduleId}</MetaTag>
          {tags?.map((tag: string) => (
            <MetaTag key={tag}>🏷️ {tag}</MetaTag>
          ))}
          <MetaTag>⏱ {duration}</MetaTag>
        </ModuleMeta>

        <ModuleContent 
          ref={contentRef}
          dangerouslySetInnerHTML={{ __html: content }} 
        />

        <NavigationButtons>
          {prevId ? (
            <NavButton to={`/module/${prevId}`}>
              <ArrowLeft size={18} />
              {t('ui.back')}
            </NavButton>
          ) : (
            <div />
          )}
          
          <NavButton to="/">
            <House size={18} />
            {t('ui.allModules')}
          </NavButton>

          {nextId ? (
            <NavButton to={`/module/${nextId}`}>
              {t('ui.forward')}
              <ArrowRight size={18} />
            </NavButton>
          ) : (
            <div />
          )}
        </NavigationButtons>
      </PageContainer>
      <ZoomComponent />
    </>
  );
};