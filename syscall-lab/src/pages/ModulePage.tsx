import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ArrowLeft, ArrowRight, House } from 'phosphor-react';

const PageContainer = styled.div`
  padding: 120px 24px 80px;
  max-width: 900px;
  margin: 0 auto;
  background: ${({ theme }) => theme.background};
  min-height: 100vh;
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
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid ${({ theme }) => theme.cardBorder};
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

  &:hover {
    border-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.accent};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ModulePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const moduleId = id || '01';
  
  // Получаем данные из JSON
  const getModuleContent = (id: string) => {
    const title = t(`moduleContent.${id}.title`);
    const content = t(`moduleContent.${id}.content`);
    const tags = t(`modules.${id}.tags`, { returnObjects: true }) as string[];
    const duration = t(`modules.${id}.duration`);
    
    return { title, content, tags, duration };
  };

  const data = getModuleContent(moduleId);

  if (!data.content || data.content === `moduleContent.${moduleId}.content`) {
    return <div>Модуль не найден</div>;
  }

  const moduleNumber = parseInt(moduleId);
  const totalModules = 10;
  const prevId = moduleNumber > 1 ? String(moduleNumber - 1).padStart(2, '0') : null;
  const nextId = moduleNumber < totalModules ? String(moduleNumber + 1).padStart(2, '0') : null;

  return (
    <PageContainer>
      <BackButton to="/">
        <ArrowLeft size={20} />
        {t('header.nav.modules')}
      </BackButton>

      <ModuleTitle>{data.title}</ModuleTitle>
      
      <ModuleMeta>
        <MetaTag>📘 Модуль {moduleId}</MetaTag>
        {data.tags?.map((tag: string) => (
          <MetaTag key={tag}>🏷️ {tag}</MetaTag>
        ))}
        <MetaTag>⏱ {data.duration}</MetaTag>
      </ModuleMeta>

      <ModuleContent dangerouslySetInnerHTML={{ __html: data.content }} />

      <NavigationButtons>
        {prevId ? (
          <NavButton to={`/module/${prevId}`}>
            <ArrowLeft size={18} />
            {t('modules.01.title') ? 'Назад' : 'Back'}
          </NavButton>
        ) : (
          <div />
        )}
        
        <NavButton to="/">
          <House size={18} />
          {t('modules.01.title') ? 'Все модули' : 'All modules'}
        </NavButton>

        {nextId ? (
          <NavButton to={`/module/${nextId}`}>
            {t('modules.01.title') ? 'Вперед' : 'Forward'}
            <ArrowRight size={18} />
          </NavButton>
        ) : (
          <div />
        )}
      </NavigationButtons>
    </PageContainer>
  );
};