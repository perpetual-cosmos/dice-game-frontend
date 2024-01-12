import styled, { keyframes } from 'styled-components';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';

const rollAnimation = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.2); }
  100% { transform: rotate(360deg) scale(1); }
`;



const Die = styled.div`
  font-size: 4rem;
  color: #${props => props.color};
  animation: ${props => props.$isRolling ? rollAnimation : 'none'} 1s linear;
`;

const Dice = ({ values, isRolling }) => {
  return (
    <DiceContainer>
      {values.map((value, index) => (
        <Die 
          key={index}
          color={index === 0 ? 'FF6B6B' : '4ECDC4'}
          $isRolling={isRolling}
        >
          <GiPerspectiveDiceSixFacesRandom style={{ transform: `rotate(${value * 60}deg)` }} />
          <span className="sr-only">Dice showing {value}</span>
        </Die>
      ))}
    </DiceContainer>
  );
};

export default Dice;