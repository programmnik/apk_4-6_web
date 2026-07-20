import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import type { ModuleData } from '../../types';
import { FileText, VideoCamera, Code, BookOpen } from 'phosphor-react';

const ModulesSection = styled.section`
  padding: 80px 24px;
  background: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModulesContainer = styled.div`
  max-width: 1200px;
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 8px;
`;

const SectionSubtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 48px;
`;

const SectionGroup = styled.div`
  margin-bottom: 64px;
`;

const GroupTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 24px;
  padding-left: 16px;
  border-left: 3px solid ${({ theme }) => theme.accent};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ModuleCard = styled.a`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 16px;
  padding: 28px 24px;
  transition: all 0.3s ease;
  cursor: pointer;
  display: block;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadow};
    border-color: ${({ theme }) => theme.accent};
  }
`;

const ModuleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const ModuleNumber = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.accent};
  font-feature-settings: 'tnum';
`;

const ModuleTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 8px;
`;

const ModuleDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.5;
  margin-bottom: 16px;
`;

const ModuleFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.cardBorder};
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary};
  background: ${({ theme }) => theme.background};
  padding: 4px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Duration = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary};
  white-space: nowrap;
`;

const tagIcons: Record<string, React.ReactNode> = {
  'Теория': <FileText size={14} />,
  'Theory': <FileText size={14} />,
  'Видео': <VideoCamera size={14} />,
  'Video': <VideoCamera size={14} />,
  'Код': <Code size={14} />,
  'Code': <Code size={14} />,
  'Заключение': <BookOpen size={14} />,
  'Conclusion': <BookOpen size={14} />
};

interface ModulesProps {
  sectionKeys: string[];
  modulesBySection: Record<string, ModuleData[]>;
}

export const Modules: React.FC<ModulesProps> = ({
  sectionKeys,
  modulesBySection
}) => {
  const { t } = useTranslation();

  const sectionTitles: Record<string, string> = {
    basics: 'sections.basics',
    interception: 'sections.interception',
    modern: 'sections.modern',
    conclusion: 'sections.conclusion'
  };

  return (
    <ModulesSection id="modules">
      <ModulesContainer>
        <SectionTitle>{t('header.nav.modules')}</SectionTitle>
        <SectionSubtitle>
            Последовательное изучение материала от основ до современных методов
        </SectionSubtitle>

        {sectionKeys.map((sectionKey) => (
            <SectionGroup key={sectionKey}>
            <GroupTitle>{t(sectionTitles[sectionKey] || sectionKey)}</GroupTitle>
            <Grid>
                {modulesBySection[sectionKey]?.map((module) => (
                <ModuleCard key={module.id} href={`/module/${module.id}`}>
                    <ModuleHeader>
                    <ModuleNumber>{module.id}</ModuleNumber>
                    </ModuleHeader>
                    <ModuleTitle>{module.title}</ModuleTitle>
                    <ModuleDescription>{module.description}</ModuleDescription>
                    <ModuleFooter>
                    <Tags>
                        {module.tags.map((tag) => (
                        <Tag key={tag}>
                            {tagIcons[tag]}
                            {tag}
                        </Tag>
                        ))}
                    </Tags>
                    <Duration>⏱ {module.duration}</Duration>
                    </ModuleFooter>
                </ModuleCard>
                ))}
            </Grid>
            </SectionGroup>
        ))}
      </ModulesContainer>
    </ModulesSection>
  );
};