import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router';
import { useState, useContext } from 'react';
import { SocketContext } from '../context/socket';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';

const bgAnim = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;


const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vw 4vw;
  min-height: 100vh;
  color: white;
  font-family: 'Quicksand', 'Segoe UI', Arial, sans-serif;
  background: linear-gradient(120deg, #1e3c72 0%, #2a5298 50%, #6dd5ed 100%);
  background-size: 200% 200%;
  animation: ${bgAnim} 12s ease-in-out infinite;
  overflow-x: hidden;
`;

const FloatingDice = styled(GiPerspectiveDiceSixFacesRandom)`
  position: absolute;
  opacity: 0.08;
  font-size: 8rem;
  pointer-events: none;
  z-index: 0;
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