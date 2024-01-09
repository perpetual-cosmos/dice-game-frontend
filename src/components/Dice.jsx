import styled, { keyframes } from 'styled-components';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';



const DiceContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
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