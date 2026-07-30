import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage/HomePage';
import { ModulePage } from '../pages/ModulePage/ModulePage';
import { NotFound } from '../pages/NotFound/NotFound';

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/modules" element={<HomePage />} />
            <Route path="/about" element={<HomePage />} />
            <Route path="/module/:id" element={<ModulePage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};