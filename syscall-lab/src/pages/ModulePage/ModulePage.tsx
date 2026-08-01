import React, { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'phosphor-react';
// import { ModuleNotFound } from '../ModuleNotFound/ModuleNotFound';
// import { ModuleLoading } from './ModuleLoading/ModuleLoading';
import { useModuleNavigation } from './hooks/useModuleNavigation';
import { useModuleMeta } from './hooks/useModuleMeta';
import {
  PageContainer,
  BackButton,
  ModuleTitle,
  ModuleMeta,
  MetaTag,
} from './ModulePage.styles';
import { ContentSkeleton } from '../../components/Loader';

const MDXContent = lazy(() => import('./MDXContent/MDXContent')
  .then(module => ({
    default: module.MDXContent
  }))
);
const ModuleNavigation = lazy(() => import('../../components/ModuleNavigation/ModuleNavigation')
  .then(module => ({
    default: module.ModuleNavigation
  }))
);

interface ModulePageParams {
  id: string;
  [key: string]: string | undefined;
}

export const ModulePage: React.FC = () => {
  const { id } = useParams<ModulePageParams>();
  const { t, i18n } = useTranslation();

  const moduleId = id || '01';
  const currentLanguage = i18n.language;

  const { title, tags, duration } = useModuleMeta(moduleId);
  const { prevId, nextId } = useModuleNavigation(moduleId);

  return (
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

      <Suspense fallback={<ContentSkeleton lines={8} withList />}>
        <MDXContent moduleId={moduleId} language={currentLanguage} />
      </Suspense>

      <Suspense fallback={<ContentSkeleton lines={1} />}>
        <ModuleNavigation prevId={prevId} nextId={nextId} />
      </Suspense>
    </PageContainer>
  );
};