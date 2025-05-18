import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaMedal } from 'react-icons/fa';

const bgAnim = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
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