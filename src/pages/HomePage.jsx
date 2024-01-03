import styled from 'styled-components';
import { useNavigate } from 'react-router';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  min-height: 100vh;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background: #4CAF50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 1rem;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
`;

const RulesList = styled.ul`
  background: rgba(255,255,255,0.1);
  padding: 2rem;
  border-radius: 12px;
  margin: 2rem 0;
  max-width: 600px;
`;

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Two Dice Roll</Title>
      <RulesList>
        <h2>Game Rules</h2>
        <li>🎲 Roll two dice and accumulate points</li>
        <li>💥 Rolling doubles doubles your points!</li>
        <li>🤞 Rolling a 7 switches players</li>
        <li>🏆 First to 100 points wins</li>
      </RulesList>
      
      <Button onClick={() => navigate('/game')}>
        Start New Game
      </Button>
      
      <Button onClick={() => navigate('/leaderboard')}>
        View Leaderboard
      </Button>
    </Container>
  );
};

export default HomePage;