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