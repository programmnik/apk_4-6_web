import React from 'react';
import { useTranslation } from 'react-i18next';
import { Question } from 'phosphor-react';
import { ErrorPage } from '../../components/ErrorPage';

export const ModuleNotFound: React.FC = () => {
    const { t } = useTranslation();

    return (
        <ErrorPage
            icon={<Question size={70} weight="duotone" />}
            title={t('errors.moduleNotFound.title')}
            subtitle={t('errors.moduleNotFound.subtitle')}
            description={t('errors.moduleNotFound.description')}
            descriptionTimeKey="errors.moduleNotFound.descriptionAboutTime"
            buttonText={t('errors.moduleNotFound.buttonTitle')}
            redirectPath="/"
            redirectSeconds={10}
            fullHeight={false}
        />
    );
};