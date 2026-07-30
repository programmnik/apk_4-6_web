import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'phosphor-react';
import { useImageZoom } from '../../components/ImageZoom';
import { ModuleNavigation } from '../../components/ModuleNavigation';
import { ModuleNotFound } from '../ModuleNotFound/ModuleNotFound';
import { ModuleLoading } from './ModuleLoading/ModuleLoading';
import { ModuleContentRenderer } from './ModuleContentRenderer/ModuleContentRenderer';
import { useModuleContent } from './hooks/useModuleContent';
import { useDynamicComponents } from './hooks/useDynamicComponents';
import { useModuleNavigation } from './hooks/useModuleNavigation';
import { useModuleMeta } from './hooks/useModuleMeta';
import { useContentZoom } from './hooks/useContentZoom';
import {
  PageContainer,
  BackButton,
  ModuleTitle,
  ModuleMeta,
  MetaTag,
} from './ModulePage.styles';

interface ModulePageParams {
  id: string;
  [key: string]: string | undefined;
}

export const ModulePage: React.FC = () => {
  const { id } = useParams<ModulePageParams>();
  const { t, i18n } = useTranslation();

  const moduleId = id || '01';
  const currentLanguage = i18n.language;

  // Хуки
  const { content, loading, error } = useModuleContent(moduleId, currentLanguage);
  const { title, tags, duration } = useModuleMeta(moduleId);
  const { prevId, nextId } = useModuleNavigation(moduleId);

  // Зум
  const { open: openZoom, ZoomComponent } = useImageZoom({
    scale: 1,
    maxWidth: 90,
    maxHeight: 90,
    enableHoverScale: true,
    hoverScaleFactor: 1.05,
    borderRadius: 12,
    backgroundPadding: 8,
    closeOnEsc: true,
    closeOnOverlayClick: true,
  });

  // Обработка контента
  const { containerRef, handleContentMount } = useContentZoom(openZoom);
  useDynamicComponents(containerRef, content);

  // Рендеринг состояний
  if (error || (loading === false && !content)) {
    return <ModuleNotFound />;
  }

  if (loading) {
    return <ModuleLoading />;
  }

  return (
    <>
      <PageContainer>
        <BackButton to="/">
          <ArrowLeft size={20} />
          {t('ui.allModules')}
        </BackButton>

        <ModuleTitle>{title}</ModuleTitle>

        <ModuleMeta>
          <MetaTag>
            📘 {t('ui.module')} {moduleId}
          </MetaTag>
          {tags?.map((tag: string) => (
            <MetaTag key={tag}>🏷️ {tag}</MetaTag>
          ))}
          <MetaTag>⏱ {duration}</MetaTag>
        </ModuleMeta>

        <ModuleContentRenderer html={content} onContentMount={handleContentMount} />

        <ModuleNavigation prevId={prevId} nextId={nextId} />
      </PageContainer>
      <ZoomComponent />
    </>
  );
};