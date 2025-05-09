import styled from 'styled-components';
import { FaDice, FaHome } from 'react-icons/fa';

const ControlsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  background: ${props => props.primary ? '#4ECDC4' : '#FF6B6B'};
  opacity: ${props => props.disabled ? 0.7 : 1};
  color: white;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
`;

const GameControls = ({ onRoll, isRolling, disabled }) => {
  return (
    <ControlsContainer>
      <Button 
        primary 
        onClick={onRoll}
        disabled={disabled || isRolling}
      >
        <FaDice />
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </Button>
      <Button onClick={() => window.location.href = '/'}>
        <FaHome />
        Quit Game
      </Button>
    </ControlsContainer>
  );
};

export default GameControls;