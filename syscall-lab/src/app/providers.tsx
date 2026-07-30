import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/i18n';
import { lightTheme, darkTheme } from '../themes/theme';
import { GlobalStyle } from '../styles/global';

interface ProvidersProps {
    children: React.ReactNode;
    themeMode: 'light' | 'dark';
}

export const Providers: React.FC<ProvidersProps> = ({ children, themeMode }) => {
    const theme = themeMode === 'light' ? lightTheme : darkTheme;

    return (
        <I18nextProvider i18n={i18n}>
            <HashRouter>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    {children}
                </ThemeProvider>
            </HashRouter>
        </I18nextProvider>
    );
};