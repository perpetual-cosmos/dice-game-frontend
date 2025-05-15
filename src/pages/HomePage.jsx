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
  font-family: 'Luckiest Guy', 'Quicksand', cursive, sans-serif;
  font-size: clamp(2.5rem, 7vw, 4rem);
  margin-bottom: 2rem;
  text-shadow: 2px 4px 12px #0008, 0 2px 0 #fff2;
  letter-spacing: 2px;
  text-align: center;
  z-index: 1;
`;

const GlassCard = styled.div`
  background: rgba(255,255,255,0.13);
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31,38,135,0.18);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1.5px solid rgba(255,255,255,0.18);
  padding: 2.5rem 2rem 2rem 2rem;
  margin: 2rem 0 1.5rem 0;
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

const Button = styled.button`
  padding: 1.1rem 2.2rem;
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  background: linear-gradient(90deg, #ffb347 0%, #ffcc33 100%);
  color: #222;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 18px 0 #0002, 0 1.5px 4px #0001;
  margin: 0.7rem 0;
  width: 100%;
  max-width: 350px;
  transition: all 0.2s cubic-bezier(.4,2,.6,1);
  &:hover {
    background: linear-gradient(90deg, #ffcc33 0%, #ffb347 100%);
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 8px 32px 0 #0003;
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