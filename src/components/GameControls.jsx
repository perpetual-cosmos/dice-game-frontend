import styled from 'styled-components';
import { FaDice, FaHome } from 'react-icons/fa';



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