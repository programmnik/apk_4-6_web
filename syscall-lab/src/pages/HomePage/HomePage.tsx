import React from 'react';
import { Hero } from '../../components/Hero/Hero';
import { Modules } from '../../components/Modules/Modules';
import { useModules } from './hooks/useModules';

export const HomePage: React.FC = () => {
    const { modulesBySection, sectionKeys } = useModules();

    return <>
        <Hero />
        <Modules
            sectionKeys={sectionKeys}
            modulesBySection={modulesBySection}
        />
    </>
};