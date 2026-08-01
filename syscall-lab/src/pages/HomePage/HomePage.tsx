import React, { lazy, Suspense } from 'react';
import { useModules } from './hooks/useModules';
import { ContentSkeleton } from '../../components/Loader';

const Hero = lazy(() => import('../../components/Hero/Hero')
    .then(module => ({
        default: module.Hero
    }))
);
const Modules = lazy(() => import('../../components/Modules/Modules')
    .then(module => ({
        default: module.Modules
    }))
);


export const HomePage: React.FC = () => {
    const { modulesBySection, sectionKeys } = useModules();

    return <>
        <Suspense fallback={<ContentSkeleton lines={3} />}>
            <Hero />
        </Suspense>

        <Suspense fallback={<ContentSkeleton lines={5} withList />}>
            <Modules
                sectionKeys={sectionKeys}
                modulesBySection={modulesBySection}
            />
        </Suspense>

    </>
};