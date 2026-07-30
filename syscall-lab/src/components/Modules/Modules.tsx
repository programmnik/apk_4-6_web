import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { ModuleData } from '../../types';
import { ModuleCard } from '../ModuleCard/ModuleCard';
import {
  ModulesSection,
  ModulesContainer,
  SectionTitle,
  SectionSubtitle,
  SectionGroup,
  GroupTitle,
  Grid,
  EmptyState,
} from './Modules.styles';

interface ModulesProps {
  sectionKeys: string[];
  modulesBySection: Record<string, ModuleData[]>;
}

// Маппинг ключей секций на ключи переводов
const SECTION_TRANSLATIONS: Record<string, string> = {
  basics: 'sections.basics',
  interception: 'sections.interception',
  modern: 'sections.modern',
  conclusion: 'sections.conclusion',
};

export const Modules: React.FC<ModulesProps> = ({
  sectionKeys,
  modulesBySection,
}) => {
  const { t } = useTranslation();

  // Мемоизация заголовков секций
  const sectionTitles = useMemo(
    () =>
      sectionKeys.reduce(
        (acc, key) => ({
          ...acc,
          [key]: t(SECTION_TRANSLATIONS[key] || key),
        }),
        {} as Record<string, string>
      ),
    [sectionKeys, t]
  );

  // Проверка, есть ли модули
  const hasModules = useMemo(
    () => sectionKeys.some((key) => modulesBySection[key]?.length > 0),
    [sectionKeys, modulesBySection]
  );

  return (
    <ModulesSection id="modules">
      <ModulesContainer>
        <SectionTitle>{t('header.nav.modules')}</SectionTitle>
        <SectionSubtitle>{t('ui.studyPath')}</SectionSubtitle>

        {!hasModules && (
          <EmptyState>{t('ui.noModules') || 'Модули не найдены'}</EmptyState>
        )}

        {sectionKeys.map((sectionKey) => {
          const modules = modulesBySection[sectionKey];
          if (!modules || modules.length === 0) return null;

          return (
            <SectionGroup key={sectionKey}>
              <GroupTitle>{sectionTitles[sectionKey]}</GroupTitle>
              <Grid>
                {modules.map((module) => (
                  <ModuleCard key={module.id} module={module} />
                ))}
              </Grid>
            </SectionGroup>
          );
        })}
      </ModulesContainer>
    </ModulesSection>
  );
};