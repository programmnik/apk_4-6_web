import React from 'react';
import { useTranslation } from 'react-i18next';
import { GithubLogo, TelegramLogo } from 'phosphor-react';
import {
  FooterSection,
  FooterInner,
  FooterGrid,
  FooterColumn,
  FooterTitle,
  FooterText,
  AuthorText,
  SocialLinks,
  SocialLink,
  Divider,
  Copyright,
  UniversityLink,
  LogoSmall,
} from './Footer.styles';

const baseUrl = import.meta.env.BASE_URL;

export const Footer: React.FC = () => {
  const { t } = useTranslation();

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
              <SocialLink
                href="https://github.com/programmnik"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GithubLogo size={24} />
              </SocialLink>

              <SocialLink
                href="https://t.me/nikitashmatko"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <TelegramLogo size={24} />
              </SocialLink>

              <UniversityLink
                href="https://www.bstu.by/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="БрГТУ"
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