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
  shadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
  blockquote_bg: '#f0f4ff',
  th_bg: '#f6f8fa',
  table_bg: '#ffffff',
  border_table: '#d0d7de',
  highlight: '#fef9e7',
  table_warm: '#dbeafe',
  table_cool: '#e2e0ff'
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
  shadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
  blockquote_bg: '#182547',
  th_bg: 'rgb(26, 39, 66)',
  table_bg: '#10172d',
  border_table: '#83888c',
  highlight: '#292641',
  table_warm: '#203456',
  table_cool: '#1b244e'
};