import React from 'react';
import { Container, Spinner, Text } from './Loader.styles'

interface LoaderProps {
    /** Показывать на весь экран */
    fullScreen?: boolean;
    /** Дополнительный текст */
    text?: string;
}

export const Loader: React.FC<LoaderProps> = ({
    fullScreen = false,
    text = 'Загрузка...'
}) => {
    return (
        <Container $fullScreen={fullScreen}>
            <Spinner />
            <Text>{text}</Text>
        </Container>
    );
};