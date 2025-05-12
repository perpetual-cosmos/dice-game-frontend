import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

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

const Trophy = styled.div`
  font-size: 8rem;
  margin: 2rem;
  filter: drop-shadow(0 0 10px rgba(255,215,0,0.5));
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
const GameOverPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  return (
    <ResultContainer>
      <h1>Game Over!</h1>
      <Trophy>🏆</Trophy>
      <h2>{state?.winner?.name || 'Unknown Player'} Wins!</h2>
      
      <div className="stats">
        <p>Final Score: {state?.winner?.score || 0}</p>
        <p>Total Rolls: {}</p>
      </div>

      <div className="actions">
        <button onClick={() => navigate('/game')}>
          Play Again
        </button>
        <button onClick={() => navigate('/')}>
          Main Menu
        </button>
      </div>
    </ResultContainer>
  );
};

export default GameOverPage;