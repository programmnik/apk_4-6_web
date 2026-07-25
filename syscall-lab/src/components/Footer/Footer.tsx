import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { GithubLogo, TelegramLogo } from 'phosphor-react';

const FooterSection = styled.footer`
  min-width: 260px; 
  padding: 48px 24px 32px;
  background: ${({ theme }) => theme.backgroundSecondary};
  border-top: 1px solid ${({ theme }) => theme.cardBorder};
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const FooterColumn = styled.div``;

const FooterTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 8px;
`;

const FooterText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
`;

const AuthorText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 4px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 12px;
`;

const SocialLink = styled.a`
  padding: 8px;
  border-radius: 8px;
  color: ${({ theme }) => theme.textSecondary};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.cardBorder};
    color: ${({ theme }) => theme.accent};
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.cardBorder};
  margin: 16px 0;
`;

const Copyright = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary};
  opacity: 0.7;
  text-align: center;
`;

const UniversityLink = styled.a`
  padding-right: 8px;
  padding-bottom: 8px;
  padding-left: 8px;
  border-radius: 8px;
  color: ${({ theme }) => theme.textSecondary};
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.cardBorder};
    color: ${({ theme }) => theme.accent};
    opacity: 0.6;
  }
`;

const LogoSmall = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;



export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <FooterSection id="about">
      <FooterInner>
        <FooterGrid>
          <FooterColumn>
            <FooterTitle>{t('footer.university')}</FooterTitle>
            <FooterText>{t('footer.department')}</FooterText>
            <AuthorText>{t('footer.author')}</AuthorText>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>{t('ui.socialNetworks')}</FooterTitle>
            <SocialLinks>
              <SocialLink href="https://github.com/programmnik" target="_blank" aria-label="GitHub">
                <GithubLogo size={24} />
              </SocialLink>
              <SocialLink href="https://t.me/nikitashmatko" target="_blank" aria-label="Telegram">
                <TelegramLogo size={24} />
              </SocialLink>
              <UniversityLink 
                href="https://www.bstu.by/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <LogoSmall src={`${baseUrl}brstu-logo.svg`} alt="БрГТУ" />
              </UniversityLink>
            </SocialLinks>
          </FooterColumn>
        </FooterGrid>
        <Divider />
        <Copyright>
          © 2026 {t('footer.copyright')} {t('footer.license')}
        </Copyright>
      </FooterInner>
    </FooterSection>
  );
};