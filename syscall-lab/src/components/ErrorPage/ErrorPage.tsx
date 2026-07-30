import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRedirectTimer } from '../../hooks/useRedirectTimer';
import { getDeclension } from '../../utils/declension';
import {
    Container,
    IconWrapper,
    Title as DefaultTitle,
    Subtitle,
    Description,
    Button,
} from './ErrorPage.styles';

export interface ErrorPageProps {
    /** Иконка (React-компонент) */
    icon?: React.ReactNode;
    /** Заголовок */
    title: string;
    /** Подзаголовок */
    subtitle: string;
    /** Описание ошибки */
    description: string;
    /** Ключ для перевода времени (с параметром {{seconds}}) */
    descriptionTimeKey: string;
    /** Текст на кнопке */
    buttonText: string;
    /** Путь для редиректа */
    redirectPath?: string;
    /** Время до редиректа в секундах */
    redirectSeconds?: number;
    /** Полная высота (100vh) или нет */
    fullHeight?: boolean;
    /** Кастомный компонент для заголовка*/
    TitleComponent?: React.ComponentType<{ children: React.ReactNode }>;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
    icon,
    title,
    subtitle,
    description,
    descriptionTimeKey,
    buttonText,
    redirectPath = '/',
    redirectSeconds = 10,
    fullHeight = false,
    TitleComponent,
}) => {
    const { t } = useTranslation();
    const { seconds } = useRedirectTimer(redirectSeconds, redirectPath);

    const secondsText = getDeclension(
        seconds,
        t('declension.one'),
        t('declension.two-four'),
        t('declension.moreThanFour')
    );

    const Title = TitleComponent || DefaultTitle;

    return (
        <Container $fullHeight={fullHeight}>
            {icon && <IconWrapper>{icon}</IconWrapper>}

            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>

            <Description>
                {description}
                <br />
                {t(descriptionTimeKey, { seconds: secondsText })}
            </Description>

            <Button to={redirectPath}>
                {buttonText}
            </Button>
        </Container>
    );
};