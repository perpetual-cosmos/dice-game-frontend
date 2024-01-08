import styled from 'styled-components';



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