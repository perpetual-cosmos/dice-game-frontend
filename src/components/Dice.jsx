import styled, { keyframes } from 'styled-components';

const rollAnimation = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.2); }
  100% { transform: rotate(360deg) scale(1); }
`;

const DiceContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
`;

const Die = styled.div`
  position: relative;
  width: 4rem;
  height: 4rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  animation: ${props => props.$isRolling ? rollAnimation : 'none'} 1s linear;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dot = styled.div`
  position: absolute;
  width: 0.8rem;
  height: 0.8rem;
  background-color: #${props => props.color};
  border-radius: 50%;
`;

// Dot positions for each dice value [x, y] in percentages
const dotPositions = {
  1: [[50, 50]],
  2: [[20, 20], [80, 80]],
  3: [[20, 20], [50, 50], [80, 80]],
  4: [[20, 20], [20, 80], [80, 20], [80, 80]],
  5: [[20, 20], [20, 80], [80, 20], [80, 80], [50, 50]],
  6: [[20, 20], [20, 80], [50, 20], [50, 80], [80, 20], [80, 80]],
};

const Dice = ({ values, isRolling }) => {
  return (
    <DiceContainer>
      {values.map((value, index) => (
        <Die key={index} $isRolling={isRolling}>
          {dotPositions[value]?.map(([x, y], i) => (
            <Dot
              key={i}
              color={index === 0 ? 'FF6B6B' : '4ECDC4'}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
        </Die>
      ))}
    </DiceContainer>
  );
};

export default Dice;
