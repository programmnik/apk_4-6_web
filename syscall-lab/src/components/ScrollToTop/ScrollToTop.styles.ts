import styled from 'styled-components';

export const Button = styled.button<{ $visible: boolean }>`
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 999;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.accent};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'scale(1)' : 'scale(0.8)')};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  box-shadow: 0 4px 20px rgba(108, 99, 255, 0.3);
  border: none;
  cursor: pointer;

  &:hover {
    transform: ${({ $visible }) => ($visible ? 'scale(1.1)' : 'scale(0.8)')};
    background: ${({ theme }) => theme.accentHover};
    box-shadow: 0 6px 30px rgba(108, 99, 255, 0.4);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.accent};
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    bottom: 24px;
    right: 24px;
    width: 44px;
    height: 44px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 480px) {
    bottom: 16px;
    right: 16px;
    width: 40px;
    height: 40px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;