import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Dice from '../components/Dice';
import PlayerCard from '../components/PlayerCard';
import GameControls from '../components/GameControls';
import { SocketContext } from '../context/socket';


const bgAnim = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;



const FloatingDice = styled(GiPerspectiveDiceSixFacesRandom)`
  position: absolute;
  opacity: 0.07;
  font-size: 8rem;
  pointer-events: none;
  z-index: 0;
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr 1fr;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin-top: 2.5rem;
  z-index: 1;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    gap: 1.5rem;
  }
`;
const GameLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 2rem;
  padding: 2rem;
  min-height: 100vh;
  background: #2c3e50;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
  }
`;

const GamePage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const [isRolling, setIsRolling] = useState(false);
  const [gameState, setGameState] = useState({
    players: [],
    diceValues: [1, 1],
    currentPlayer: null
  });

  useEffect(() => {
    const playerName = localStorage.getItem('playerName') || 'Player';
    
    socket.emit('join-game', {
      roomId: roomId || 'default',
      playerName
    });

    socket.on('game-state', (state) => {
      const sortedPlayers = [...state.players].sort((a, b) => a.id.localeCompare(b.id));
      setGameState({ ...state, players: sortedPlayers });
    });

    socket.on('game-over', (winner) => {
      navigate('/game-over', { state: { winner } });
    });

    return () => {
      socket.off('game-state');
      socket.off('game-over');
    };
  }, [socket, roomId, navigate]);

  const handleRoll = () => {
    if (!isCurrentPlayer || isRolling) return;
    setIsRolling(true);
    socket.emit('roll-dice', roomId || 'default');
    setTimeout(() => setIsRolling(false), 1000);
  };

  const isCurrentPlayer = socket.id === gameState.currentPlayer;

  return (
    <GameLayout>
      {gameState.players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
          isCurrentPlayer={player.id === gameState.currentPlayer}
        />
      ))}

      <div className="game-area">
        <Dice values={gameState.diceValues} isRolling={isRolling} />
        <GameControls
          onRoll={handleRoll}
          isRolling={isRolling}
          disabled={!isCurrentPlayer}
        />
      </div>
    </GameLayout>
  );
};

export default GamePage;