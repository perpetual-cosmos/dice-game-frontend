import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaMedal } from 'react-icons/fa';

const bgAnim = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const BG = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(120deg, #43cea2 0%, #185a9d 50%, #f7971e 100%);
  background-size: 200% 200%;
  animation: ${bgAnim} 12s ease-in-out infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 4vw;
  overflow-x: hidden;
`;

const FrostedPanel = styled.div`
  background: rgba(255,255,255,0.18);
  border-radius: 22px;
  box-shadow: 0 8px 32px 0 rgba(31,38,135,0.18);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 2px solid rgba(255,255,255,0.22);
  padding: 2.5rem 2rem 2rem 2rem;
  margin: 2.5rem 0 1.5rem 0;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: clamp(2.2rem, 6vw, 3.2rem);
  font-family: 'Luckiest Guy', 'Quicksand', cursive, sans-serif;
  color: #ffd200;
  margin-bottom: 2rem;
  text-shadow: 2px 4px 12px #0006, 0 2px 0 #fff2;
  letter-spacing: 2px;
  text-align: center;
`;

const WinnerList = styled.ul`
  width: 100%;
  margin: 0 auto;
  padding: 0;
  list-style: none;
`;

const WinnerItem = styled.li`
  font-size: 1.2rem;
  margin: 1.2rem 0;
  padding: 1.2rem 1rem 1.2rem 1.5rem;
  border-radius: 12px;
  background: ${({ idx }) => idx === 0 ? 'rgba(255, 215, 0, 0.18)' : idx === 1 ? 'rgba(192,192,192,0.18)' : idx === 2 ? 'rgba(205,127,50,0.18)' : 'rgba(52, 152, 219, 0.15)'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px #0001;
  font-weight: ${({ idx }) => idx === 0 ? 'bold' : 'normal'};
  position: relative;
`;

const Medal = styled(FaMedal)`
  font-size: 2rem;
  margin-right: 1.2rem;
  color: ${({ idx }) => idx === 0 ? '#ffd700' : idx === 1 ? '#c0c0c0' : idx === 2 ? '#cd7f32' : '#888'};
  filter: drop-shadow(0 0 6px #fff8);
`;

const WinnerName = styled.span`
  font-size: 1.2rem;
  color: #222;
  font-family: 'Quicksand', Arial, sans-serif;
`;

const WinnerCode = styled.span`
  font-size: 1.1rem;
  color: #34495e;
  background: #fff6;
  border-radius: 8px;
  padding: 0.2rem 0.7rem;
  margin-left: 0.7rem;
`;

const WinnerId = styled.span`
  font-size: 1rem;
  color: #888;
  margin-left: 1.2rem;
`;

const LeaderboardPage = () => {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('latestWinners');
    if (stored) {
      setWinners(JSON.parse(stored));
    }
  }, []);

  return (
    <BG>
      <FrostedPanel>
        <Title>Latest Winners</Title>
        <WinnerList>
          {winners.length === 0 && <WinnerItem>No winners yet.</WinnerItem>}
          {winners.map((winner, idx) => (
            <WinnerItem key={idx} idx={idx}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Medal idx={idx} />
                <WinnerName>{winner.name || 'Unknown'}</WinnerName>
                {winner.code && winner.code.trim() && (
                  <WinnerCode>{winner.code}</WinnerCode>
                )}
              </div>
              <WinnerId>ID: {winner.id}</WinnerId>
            </WinnerItem>
          ))}
        </WinnerList>
      </FrostedPanel>
    </BG>
  );
};

export default LeaderboardPage; 