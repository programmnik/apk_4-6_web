import React, { useCallback } from 'react';
import { ArrowUp } from 'phosphor-react';
import { useScrollVisibility } from './hooks/useScrollVisibility';
import { Button } from './ScrollToTop.styles';

export const ScrollToTop: React.FC = () => {
  const isVisible = useScrollVisibility(400);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Button
      $visible={isVisible}
      onClick={scrollToTop}
      aria-label="Прокрутить вверх"
      title="Прокрутить вверх"
    >
      <ArrowUp size={24} />
    </Button>
  );
};