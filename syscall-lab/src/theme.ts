import type { Theme } from './types';

export const lightTheme: Theme = {
  background: '#f4f6fa',
  backgroundSecondary: '#ffffff',
  text: '#1a1a2e',
  textSecondary: '#4a4a6a',
  accent: '#6c63ff',
  accentHover: '#584fd4',
  cardBg: '#ffffff',
  cardBorder: 'rgba(0, 0, 0, 0.06)',
  shadow: '0 4px 24px rgba(0, 0, 0, 0.06)'
};

export const darkTheme: Theme = {
  background: '#0b1120',
  backgroundSecondary: '#141d2b',
  text: '#e8e8f0',
  textSecondary: '#a0a0c0',
  accent: '#8b83ff',
  accentHover: '#7a72ee',
  cardBg: '#141d2b',
  cardBorder: 'rgba(255, 255, 255, 0.06)',
  shadow: '0 4px 24px rgba(0, 0, 0, 0.3)'
};