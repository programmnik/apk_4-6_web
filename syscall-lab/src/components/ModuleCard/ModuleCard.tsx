import React, { memo } from 'react';
import { FileText, VideoCamera, Code, BookOpen } from 'phosphor-react';
import type { ModuleData } from '../../types';
import {
    ModuleCard as StyledModuleCard,
    ModuleHeader,
    ModuleNumber,
    ModuleTitle,
    ModuleDescription,
    ModuleFooter,
    Tags,
    Tag,
    Duration,
} from './ModuleCard.styles';

// Маппинг тегов на иконки и цвета
const TAG_CONFIG: Record<string, { icon: React.ReactNode; type: string; }> = {
    'Теория': { icon: <FileText size={14} />, type: 'theory' },
    'Theory': { icon: <FileText size={14} />, type: 'theory' },
    'Видео': { icon: <VideoCamera size={14} />, type: 'video' },
    'Video': { icon: <VideoCamera size={14} />, type: 'video' },
    'Код': { icon: <Code size={14} />, type: 'code' },
    'Code': { icon: <Code size={14} />, type: 'code' },
    'Заключение': { icon: <BookOpen size={14} />, type: 'conclusion' },
    'Conclusion': { icon: <BookOpen size={14} />, type: 'conclusion' },
};

interface ModuleCardProps {
    module: ModuleData;
}

export const ModuleCard = memo(({ module }: ModuleCardProps) => {
    const { id, title, description, tags, duration } = module;

    return (
        <StyledModuleCard href={`#/module/${id}`} aria-label={`Module ${id}: ${title}`}>
            <ModuleHeader>
                <ModuleNumber>№{id}</ModuleNumber>
            </ModuleHeader>
            <ModuleTitle>{title}</ModuleTitle>
            <ModuleDescription>{description}</ModuleDescription>
            <ModuleFooter>
                <Tags>
                    {tags.map((tag) => {
                        const config = TAG_CONFIG[tag] || { icon: null, type: 'default' };
                        return (
                            <Tag key={tag} $type={config.type}>
                                {config.icon}
                                {tag}
                            </Tag>
                        );
                    })}
                </Tags>
                <Duration>⏱ {duration}</Duration>
            </ModuleFooter>
        </StyledModuleCard>
    );
});

ModuleCard.displayName = 'ModuleCard';