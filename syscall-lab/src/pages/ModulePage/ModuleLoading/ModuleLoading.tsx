import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'phosphor-react';
import { PageContainer, BackButton } from '../ModulePage.styles'
import { LoadingContainer } from './ModuleLoading.styles';

export const ModuleLoading: React.FC = () => {
    const { t } = useTranslation();

    return (
        <PageContainer>
            <BackButton to="/">
                <ArrowLeft size={20} />
                {t('ui.allModules')}
            </BackButton>
            <LoadingContainer>{t('ui.loading') || 'Загрузка...'}</LoadingContainer>
        </PageContainer>
    );
};