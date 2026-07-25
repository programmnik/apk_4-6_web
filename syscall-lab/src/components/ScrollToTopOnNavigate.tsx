import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTopOnNavigate = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Если есть якорь (#modules, #about) — прокручиваем к нему
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }
    }

    // Иначе прокручиваем наверх
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname, hash]);

  return null;
};