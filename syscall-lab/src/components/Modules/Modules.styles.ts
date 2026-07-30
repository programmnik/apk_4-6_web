import styled from 'styled-components';

export const ModulesSection = styled.section`
  min-width: 260px;
  padding: 80px 24px;
  background: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  scroll-margin-top: 80px;

  @media (max-width: 370px) {
    padding: 100px 16px;
  }
`;

export const ModulesContainer = styled.div`
  max-width: 1200px;
  width: 100%;
`;

export const SectionTitle = styled.h2`
  font-size: clamp(28px, 4vw, 32px);
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 8px;
`;

export const SectionSubtitle = styled.p`
  font-size: clamp(14px, 1.5vw, 16px);
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 48px;
`;

export const SectionGroup = styled.div`
  margin-bottom: 64px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const GroupTitle = styled.h3`
  font-size: clamp(18px, 2vw, 20px);
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 24px;
  padding-left: 16px;
  border-left: 3px solid ${({ theme }) => theme.accent};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 16px;
`;