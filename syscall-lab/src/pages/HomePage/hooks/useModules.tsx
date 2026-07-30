import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export interface Module {
    id: string;
    title: string;
    description: string;
    tags: string[];
    duration: string;
}

// Конфиг: список ID модулей 
const MODULE_IDS = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10'] as const;

// Маппинг: какая секция содержит какие модули
const SECTION_MAP = {
    basics: ['00', '01', '02', '03'],
    interception: ['04', '05', '06'],
    modern: ['07', '08', '09'],
    conclusion: ['10'],
} as const;

export const useModules = () => {
    const { t } = useTranslation();

    return useMemo(() => {
        // Фабрика создания модуля
        const createModule = (id: string): Module => ({
            id,
            title: t(`modules.${id}.title`),
            description: t(`modules.${id}.description`),
            tags: t(`modules.${id}.tags`, { returnObjects: true }) as string[],
            duration: t(`modules.${id}.duration`),
        });

        // Создаем все модули
        const modulesData = MODULE_IDS.reduce(
            (acc, id) => ({ ...acc, [id]: createModule(id) }),
            {} as Record<string, Module>
        );

        // Группируем по секциям
        const modulesBySection = Object.entries(SECTION_MAP).reduce(
            (acc, [sectionKey, moduleIds]) => ({
                ...acc,
                [sectionKey]: moduleIds.map((id) => modulesData[id]),
            }),
            {} as Record<string, Module[]>
        );

        return {
            modulesData,
            modulesBySection,
            sectionKeys: Object.keys(SECTION_MAP),
            moduleIds: MODULE_IDS,
        };
    }, [t]);
};