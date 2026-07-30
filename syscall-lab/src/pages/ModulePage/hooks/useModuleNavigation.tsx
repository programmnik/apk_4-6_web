import { useMemo } from 'react';

const TOTAL_MODULES = 10;

export const useModuleNavigation = (moduleId: string) => {
    return useMemo(() => {
        const moduleNumber = parseInt(moduleId);

        const prevId = moduleNumber > 0
            ? String(moduleNumber - 1).padStart(2, '0')
            : null;

        const nextId = moduleNumber < TOTAL_MODULES
            ? String(moduleNumber + 1).padStart(2, '0')
            : null;

        return { prevId, nextId, currentNumber: moduleNumber };
    }, [moduleId]);
};