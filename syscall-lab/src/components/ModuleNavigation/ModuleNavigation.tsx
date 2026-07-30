import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, House } from 'phosphor-react';
import { NavigationButtons, NavButton } from './ModuleNavigation.styles';

interface ModuleNavigationProps {
    prevId: string | null;
    nextId: string | null;
}

export const ModuleNavigation: React.FC<ModuleNavigationProps> = ({ prevId, nextId }) => {
    const { t } = useTranslation();

    return (
        <NavigationButtons>
            {prevId ? (
                <NavButton to={`/module/${prevId}`}>
                    <ArrowLeft size={18} />
                    {t('ui.back')}
                </NavButton>
            ) : (
                <div />
            )}

            <NavButton to="/">
                <House size={18} />
                {t('ui.allModules')}
            </NavButton>

            {nextId ? (
                <NavButton to={`/module/${nextId}`}>
                    {t('ui.forward')}
                    <ArrowRight size={18} />
                </NavButton>
            ) : (
                <div />
            )}
        </NavigationButtons>
    );
};