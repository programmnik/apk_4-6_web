import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageContainer = styled.div`
  padding: 120px 24px 80px;
  max-width: 900px;
  margin: 0 auto;
  background: ${({ theme }) => theme.background};
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 100px 16px 60px;
  }

  @media (max-width: 480px) {
    padding: 80px 12px 40px;
  }
`;

export const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 14px;
  margin-bottom: 32px;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

export const ModuleTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

export const ModuleMeta = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`;

export const MetaTag = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary};
  background: ${({ theme }) => theme.cardBorder};
  padding: 4px 14px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ModuleContent = styled.div`
  font-size: 16px;
  line-height: 1.8;
  color: ${({ theme }) => theme.textSecondary};
  text-align: justify;

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    margin: 32px 0 16px;
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    margin: 24px 0 12px;
  }

  p {
    margin-bottom: 16px;
  }

  ul,
  ol {
    margin: 12px 0 16px 24px;
  }

  li {
    margin-bottom: 8px;
  }

  code {
    background: ${({ theme }) => theme.cardBorder};
    padding: 2px 8px;
    border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    color: ${({ theme }) => theme.accent};
  }

  pre {
    background: ${({ theme }) => theme.cardBorder};
    padding: 16px 20px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 16px 0;

    code {
      background: transparent;
      padding: 0;
      color: ${({ theme }) => theme.textSecondary};
      font-size: 14px;
    }
  }

  img[src$='.svg'] {
    display: block;
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
    height: auto;
    filter: ${({ theme }) =>
    theme.background === '#0b1120' ? 'invert(1) brightness(0.9)' : 'invert(0)'};
    transition: filter 0.3s ease;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 16px 0;
    background: ${({ theme }) => theme.table_bg};
    border: 1px solid ${({ theme }) => theme.border_table};
    border-radius: 8px;
    overflow: hidden;
  }

  th,
  td {
    border: 1px solid ${({ theme }) => theme.border_table};
    padding: 10px 14px;
    text-align: left;
    vertical-align: top;
  }

  th {
    background-color: ${({ theme }) => theme.th_bg};
    font-weight: 600;
  }

  blockquote {
    background: ${({ theme }) => theme.blockquote_bg};
    border-left: 6px solid #2c6b9c;
    margin: 20px 0;
    padding: 12px 20px;
    border-radius: 0 8px 8px 0;
  }

  .highlight {
    background-color: ${({ theme }) => theme.highlight};
  }

  .table-warm {
    background-color: ${({ theme }) => theme.table_warm};
  }

  .table-cool {
    background-color: ${({ theme }) => theme.table_cool};
  }

  .image-zoom {
    display: block;
    margin: 20px auto;
    max-width: 100%;
    transition: transform 0.3s ease;
    cursor: zoom-in;

    img {
      display: block;
      width: 100%;
      max-width: 800px;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      filter: ${({ theme }) =>
    theme.background === '#0b1120' || theme.background === '#141d2b'
      ? 'invert(1) brightness(0.9)'
      : 'invert(0)'};
    }

    &:hover {
      transform: scale(1.05);

      img {
        box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
      }
    }
  }

  .video-wrapper {
    position: relative;
    width: 100%;
    margin: 20px 0;
    border-radius: 12px;
    overflow: hidden;
  }

  .file-download-wrapper {
    display: block !important;
    width: 100% !important;
    margin: 16px 0 !important;
  }
`;