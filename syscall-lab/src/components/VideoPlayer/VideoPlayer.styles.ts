import styled from 'styled-components';

export const PlayerWrapper = styled.div`
  width: 100%;
  max-width: 800px;      
  margin: 30px auto;          
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  aspect-ratio: 16 / 9; 
  position: relative;   
`;

export const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
  }

  svg {
    width: 32px;
    height: 32px;
    fill: currentColor;
  }
`;