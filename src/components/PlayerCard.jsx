import styled from 'styled-components';

const Card = styled.div`
  background: ${props => props.$isActive ? 'rgba(52, 152, 219, 0.2)' : 'rgba(44, 62, 80, 0.4)'};
  padding: 1.5rem;
  border-radius: 10px;
  border: 2px solid ${props => props.$isActive ? '#3498db' : 'transparent'};
  color: white;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StatItem = styled.div`
  margin: 0.5rem 0;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const PlayerCard = ({ player, isCurrentPlayer }) => {
  return (
    <Card $isActive={isCurrentPlayer}>
      <h3>{player.name}</h3>
      <div style={{ fontSize: '2rem', margin: '1rem 0' }}>
        {player.score} pts
      </div>
      <div>
        <StatItem>
          🎲 Rolls: {player.rollCount}
        </StatItem>
        <StatItem>
          ✨ Doubles: {player.doublesCount}
        </StatItem>
      </div>
      {isCurrentPlayer && (
        <div style={{ marginTop: '1rem', color: '#3498db' }}>
          Your turn!
        </div>
      )}
    </Card>
  );
};

export default PlayerCard;