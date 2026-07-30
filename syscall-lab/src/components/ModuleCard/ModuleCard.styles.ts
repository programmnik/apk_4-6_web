import styled from 'styled-components';

export const ModuleCard = styled.a`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 16px;
  padding: 28px 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: block;
  text-decoration: none;
  color: inherit;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadow};
    border-color: ${({ theme }) => theme.accent};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.accent};
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    padding: 20px 16px;
  }
`;

export const ModuleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const ModuleNumber = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.accent};
  font-feature-settings: 'tnum';
  background: ${({ theme }) => `${theme.accent}15`};
  padding: 2px 10px;
  border-radius: 20px;
`;

export const ModuleTitle = styled.h4`
  font-size: clamp(16px, 1.5vw, 18px);
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 8px;
  line-height: 1.3;
`;

export const ModuleDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.5;
  margin-bottom: 16px;
  flex: 1;
`;

export const ModuleFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.cardBorder};
`;

export const Tags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Tag = styled.span<{ $type?: string }>`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary};
  background: ${({ theme, $type }) => {
        if ($type === 'theory') return `${theme.accent}15`;
        if ($type === 'video') return '#ff6b6b15';
        if ($type === 'code') return '#4ecdc415';
        if ($type === 'conclusion') return '#ffd93d15';
        return theme.background;
    }};
  padding: 4px 12px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
`;

export const Duration = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary};
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 4px;
`;