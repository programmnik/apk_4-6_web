import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: ${({ theme }) => theme.cardBg || '#f8f9fa'};
  border: 1px solid ${({ theme }) => theme.cardBorder || '#e9ecef'};
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: default;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    border-color: ${({ theme }) => theme.accent || '#007bff'};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding: 12px 16px;
  }
`;

export const FileIcon = styled.div<{ $color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: ${({ $color }) => $color || '#e9ecef'};
  color: #fff;
  flex-shrink: 0;

  svg {
    width: 28px;
    height: 28px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;

    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

export const FileInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const FileName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.text || '#212529'};
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const FileMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary || '#6c757d'};

  @media (max-width: 768px) {
    font-size: 12px;
    flex-wrap: wrap;
    gap: 6px;
  }
`;

export const FileDescription = styled.span`
  color: ${({ theme }) => theme.textSecondary || '#6c757d'};
  font-size: 13px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  background: ${({ theme }) => theme.accent || '#007bff'};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.accentHover || '#0056b3'};
    transform: scale(1.02);
    box-shadow: 0 4px 16px rgba(0, 123, 255, 0.3);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.accent || '#007bff'};
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 6px 14px;
    font-size: 13px;
    width: 100%;
    justify-content: center;
  }
`;