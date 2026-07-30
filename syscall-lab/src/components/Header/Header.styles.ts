import styled from 'styled-components';

export const HeaderContainer = styled.header<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 16px 24px;
  
  background: ${({ $isScrolled }) =>
        $isScrolled
            ? 'rgba(255, 255, 255, 0.15)'
            : 'rgba(255, 255, 255, 0)'
    };
    
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  
  border-bottom: 1px solid ${({ $isScrolled }) =>
        $isScrolled
            ? 'rgba(255, 255, 255, 0.2)'
            : 'rgba(255, 255, 255, 0)'
    };
  
  transition: all 0.3s ease;
  
  box-shadow: ${({ $isScrolled }) =>
        $isScrolled
            ? '0 8px 32px rgba(0, 0, 0, 0.1)'
            : 'none'
    };

  border-radius: 20px;
  margin: ${({ $isScrolled }) =>
        $isScrolled
            ? '10px'
            : '0px'
    };
`;

export const HeaderInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 390px) {
    font-size: 14px;
  }
`;

export const LogoIcon = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
  display: block;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled.a`
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  
  @media (max-width: 300px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

export const IconButton = styled.button`
  padding: 8px;
  border-radius: 8px;
  color: ${({ theme }) => theme.textSecondary};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.cardBorder};
    color: ${({ theme }) => theme.accent};
  }
`;

export const BurgerButton = styled.button`
  display: none;
  padding: 8px;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileMenu = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.backgroundSecondary};
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.cardBorder};
  gap: 16px;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const MobileNavLink = styled.a`
  font-size: 16px;
  color: ${({ theme }) => theme.textSecondary};
  padding: 8px 0;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;