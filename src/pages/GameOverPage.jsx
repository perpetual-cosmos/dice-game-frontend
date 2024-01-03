import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem;
  min-height: 100vh;
  background: linear-gradient(45deg, #485461 0%, #28313b 100%);
  color: white;
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
        <p>Total Rolls: {/* Add roll count from state */}</p>
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