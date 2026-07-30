import React from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorPage } from '../../components/ErrorPage';
import { Title } from './NotFound.styles';

export const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ErrorPage
      title={t('errors.notFound.title')}
      subtitle={t('errors.notFound.subtitle')}
      description={t('errors.notFound.description')}
      descriptionTimeKey="errors.notFound.descriptionAboutTime"
      buttonText={t('errors.notFound.buttonTitle')}
      redirectPath="/"
      redirectSeconds={7}
      fullHeight={true}
      TitleComponent={Title}
    />
  );
};