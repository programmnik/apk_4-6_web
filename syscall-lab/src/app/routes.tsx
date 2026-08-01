import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader } from '../components/Loader';

const HomePage = lazy(() => import('../pages/HomePage/HomePage')
    .then(module => ({
        default: module.HomePage
    }))
);
const ModulePage = lazy(() => import('../pages/ModulePage/ModulePage')
    .then(module => ({
        default: module.ModulePage
    }))
);
const NotFound = lazy(() => import('../pages/NotFound/NotFound')
    .then(module => ({
        default: module.NotFound
    }))
);

export const AppRoutes: React.FC = () => {
    return (
        <Suspense fallback={<Loader fullScreen text="Загрузка страницы..." />}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/modules" element={<HomePage />} />
                <Route path="/about" element={<HomePage />} />
                <Route path="/module/:id" element={<ModulePage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};