import styled, { keyframes } from 'styled-components';

const shake = keyframes`
  0% { transform: translateX(0) rotate(0deg) scale(1); }
  10% { transform: translateX(-8px) rotate(-10deg) scale(1.08); }
  20% { transform: translateX(8px) rotate(10deg) scale(1.08); }
  30% { transform: translateX(-6px) rotate(-8deg) scale(1.05); }
  40% { transform: translateX(6px) rotate(8deg) scale(1.05); }
  50% { transform: translateX(-4px) rotate(-6deg) scale(1.03); }
  60% { transform: translateX(4px) rotate(6deg) scale(1.03); }
  70% { transform: translateX(-2px) rotate(-3deg) scale(1.01); }
  80% { transform: translateX(2px) rotate(3deg) scale(1.01); }
  90% { transform: translateX(0) rotate(0deg) scale(1); }
  100% { transform: translateX(0) rotate(0deg) scale(1); }
`;

const DiceContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
  justify-content: center;
`;

const Die = styled.div`
  width: 70px;
  height: 70px;
  background: linear-gradient(145deg, #fff 70%, #f0f0f0 100%);
  border-radius: 18px;
  box-shadow: 0 6px 24px rgba(44, 62, 80, 0.18), 0 1.5px 4px rgba(44, 62, 80, 0.10);
  border: 3px solid ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: ${props => props.$isRolling ? shake : 'none'} 1.2s cubic-bezier(.68,-0.55,.27,1.55);
  transition: border 0.3s;
`;

const Dot = styled.div`
  width: 13px;
  height: 13px;
  background: #222;
  border-radius: 50%;
  position: absolute;
`;

const dotPositions = [
  [ ["center", "center"] ],
  [ ["top-left"], ["bottom-right"] ],
  [ ["top-left"], ["center", "center"], ["bottom-right"] ],
  [ ["top-left"], ["top-right"], ["bottom-left"], ["bottom-right"] ],
  [ ["top-left"], ["top-right"], ["center", "center"], ["bottom-left"], ["bottom-right"] ],
  [ ["top-left"], ["top-right"], ["center-left"], ["center-right"], ["bottom-left"], ["bottom-right"] ],
];

const getDotStyle = (pos) => {
  const map = {
    "top-left": { top: '16%', left: '16%' },
    "top-right": { top: '16%', right: '16%' },
    "center-left": { top: '50%', left: '16%', transform: 'translateY(-50%)' },
    "center-right": { top: '50%', right: '16%', transform: 'translateY(-50%)' },
    "bottom-left": { bottom: '16%', left: '16%' },
    "bottom-right": { bottom: '16%', right: '16%' },
    "center": { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  };
  return map[pos] || {};
};

const Dice = ({ values, isRolling }) => {
  const colors = ['#FF6B6B', '#4ECDC4'];
  return (
    <DiceContainer>
      {values.map((value, index) => (
        <Die
          key={index}
          color={colors[index % colors.length]}
          $isRolling={isRolling}
        >
          {/* Render dots for dice face */}
          {dotPositions[value - 1].map((positions, i) => (
            positions.map((pos, j) => (
              <Dot key={i + '-' + j} style={getDotStyle(pos)} />
            ))
          ))}
        </Die>
      ))}
    </DiceContainer>
  );
};

export default Dice;