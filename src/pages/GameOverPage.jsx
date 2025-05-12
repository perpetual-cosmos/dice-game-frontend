import styled, { keyframes } from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { SocketContext } from '../context/socket';
import { GiTrophyCup } from 'react-icons/gi';

const bgAnim = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const ConfettiAnim = keyframes`
  0% { transform: translateY(-100px) rotate(0deg); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translateY(600px) rotate(360deg); opacity: 0; }
`;

const BG = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(120deg, #f7971e 0%, #ffd200 50%, #43cea2 100%);
  background-size: 200% 200%;
  animation: ${bgAnim} 10s ease-in-out infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
`;

const FrostedPanel = styled.div`
  background: rgba(255,255,255,0.18);
  border-radius: 22px;
  box-shadow: 0 8px 32px 0 rgba(31,38,135,0.18);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 2px solid rgba(255,255,255,0.22);
  padding: 3rem 2.5rem 2.5rem 2.5rem;
  margin: 2.5rem 0 1.5rem 0;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

const WinnerName = styled.h2`
  font-size: clamp(2.2rem, 6vw, 3.2rem);
  font-family: 'Luckiest Guy', 'Quicksand', cursive, sans-serif;
  color: #ffb347;
  margin: 1.2rem 0 0.5rem 0;
  text-shadow: 2px 4px 12px #0006, 0 2px 0 #fff2;
  letter-spacing: 2px;
  text-align: center;
`;

const WinnerCode = styled.span`
  font-size: 1.3rem;
  color: #fff;
  background: #222;
  border-radius: 8px;
  padding: 0.2rem 0.7rem;
  margin-left: 0.7rem;
  font-family: 'Quicksand', Arial, sans-serif;
  font-weight: bold;
  letter-spacing: 1px;
`;

const Stats = styled.div`
  margin: 1.5rem 0 2rem 0;
  font-size: 1.2rem;
  color: #222;
  width: 100%;
  text-align: center;
`;

const Trophy = styled(GiTrophyCup)`
  font-size: 7rem;
  margin: 2rem 0 1rem 0;
  color: #ffd700;
  filter: drop-shadow(0 0 18px #ffb34788);
`;

const Button = styled.button`
  padding: 1.1rem 2.2rem;
  font-size: 1.2rem;
  background: linear-gradient(90deg, #43cea2 0%, #185a9d 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 18px 0 #0002, 0 1.5px 4px #0001;
  margin: 0.7rem 0.7rem 0 0;
  transition: all 0.2s cubic-bezier(.4,2,.6,1);
  &:hover {
    background: linear-gradient(90deg, #185a9d 0%, #43cea2 100%);
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 8px 32px 0 #0003;
  }
`;

const Confetti = styled.div`
  position: absolute;
  top: 0; left: 0; width: 100vw; height: 100vh;
  pointer-events: none;
  z-index: 2;
`;

const ConfettiPiece = styled.div`
  position: absolute;
  width: 18px; height: 18px;
  border-radius: 50%;
  opacity: 0.8;
  background: ${({ color }) => color};
  left: ${({ left }) => left};
  animation: ${ConfettiAnim} ${({ duration }) => duration}s linear;
  animation-delay: ${({ delay }) => delay}s;
`;

function getRandomColor() {
  const colors = ['#ffb347', '#43cea2', '#ffd200', '#8e44ad', '#4e54c8', '#f7971e', '#ff6b6b'];
  return colors[Math.floor(Math.random() * colors.length)];
}

const GameOverPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (state?.winner) {
      const stored = localStorage.getItem('latestWinners');
      let winners = stored ? JSON.parse(stored) : [];
      winners.unshift({ name: state.winner.name, id: state.winner.id, code: state.winner.code });
      winners = winners.slice(0, 3);
      localStorage.setItem('latestWinners', JSON.stringify(winners));
    }
  }, [state]);

  const handlePlayAgain = () => {
    if (roomId) {
      socket.emit('reset-game', roomId);
      navigate(`/game/${roomId}`);
    } else {
      navigate('/game');
    }
  };

  // Confetti pieces
  const confetti = Array.from({ length: 24 }).map((_, i) => (
    <ConfettiPiece
      key={i}
      color={getRandomColor()}
      left={`${Math.random() * 100}vw`}
      duration={1.8 + Math.random() * 1.2}
      delay={Math.random() * 0.7}
      style={{ top: `${-30 - Math.random() * 60}px` }}
    />
  ));

  return (
    <BG>
      <Confetti>{confetti}</Confetti>
      <FrostedPanel>
        <Trophy />
        <WinnerName>
          {state?.winner?.name || 'Unknown Player'}
          {state?.winner?.code && state?.winner?.code.trim() && (
            <WinnerCode>{state?.winner?.code}</WinnerCode>
          )}
          <div style={{ fontSize: '1.2rem', color: '#888', marginTop: '0.5rem' }}>Wins!</div>
        </WinnerName>
        <Stats>
          <p>Final Score: <b>{state?.winner?.score || 0}</b></p>
          <p>Total Rolls: {/* Add roll count from state */}</p>
        </Stats>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Button onClick={handlePlayAgain}>Play Again</Button>
          <Button onClick={() => navigate('/')}>Main Menu</Button>
        </div>
      </FrostedPanel>
    </BG>
  );
};

export default GameOverPage;