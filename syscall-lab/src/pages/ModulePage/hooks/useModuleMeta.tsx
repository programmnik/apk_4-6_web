import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useModuleMeta = (moduleId: string) => {
    const { t } = useTranslation();

    return useMemo(() => {
        const title = t(`modules.${moduleId}.title`);
        const tags = t(`modules.${moduleId}.tags`, { returnObjects: true }) as string[];
        const duration = t(`modules.${moduleId}.duration`);

        return { title, tags, duration };
    }, [t, moduleId]);
};