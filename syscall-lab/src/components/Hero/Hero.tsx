import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDown } from 'phosphor-react';
import {
  HeroSection,
  HeroContent,
  Greeting,
  Title,
  Description,
  Details,
  CtaButton,
} from './Hero.styles';

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  // Мемоизация перевода (опционально)
  const content = useMemo(
    () => ({
      greeting: t('hero.greeting'),
      title: t('hero.title'),
      description: t('hero.description'),
      details: t('hero.details'),
      cta: t('hero.cta'),
    }),
    [t]
  );

  // Обработчик скролла к секции
  const handleScrollToModules = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#modules');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSection>
      <HeroContent>
        <Greeting aria-label={t('hero.greeting')}>
          👋 {content.greeting}
        </Greeting>
        <Title>{content.title}</Title>
        <Description>{content.description}</Description>
        <Details>{content.details}</Details>
        <CtaButton
          href="#modules"
          onClick={handleScrollToModules}
          aria-label={t('hero.cta')}
          role="button"
        >
          {content.cta}
          <ArrowDown size={20} aria-hidden="true" />
        </CtaButton>
      </HeroContent>
    </HeroSection>
  );
};