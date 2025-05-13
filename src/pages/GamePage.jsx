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

const FrostedPanel = styled.div`
  background: rgba(255,255,255,0.13);
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31,38,135,0.18);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1.5px solid rgba(255,255,255,0.18);
  padding: 2rem 1.2rem;
  margin-bottom: 1.5rem;
  z-index: 1;
`;

const DiceArea = styled(FrostedPanel)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 260px;
  margin: 0 auto 1.5rem auto;
  width: 100%;
  max-width: 420px;
  border: 2.5px solid #4e54c8;
  box-shadow: 0 4px 24px #4e54c822;
`;


const AnimatedPlayerCard = styled.div`
  transition: transform 0.3s cubic-bezier(.4,2,.6,1), box-shadow 0.3s;
  ${({ active }) => active && css`
    transform: scale(1.06) translateY(-8px);
    box-shadow: 0 8px 32px 0 #ffb34755, 0 1.5px 4px #0001;
    border: 2.5px solid #ffb347;
  `}
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
      {/* Floating dice for background effect */}
      <FloatingDice style={{ top: '8%', left: '4%' }} />
      <FloatingDice style={{ top: '70%', left: '80%', fontSize: '6rem' }} />
      <FloatingDice style={{ top: '50%', left: '60%', fontSize: '10rem' }} />
      {modal && (
        <Modal>
          <ModalContent>
            <h2>{modal}</h2>
            <p>You will be redirected to the home page.</p>
          </ModalContent>
        </Modal>
      )}
      {roomId && (
        <RoomIdBadge>
          Room Id: <b style={{ letterSpacing: '1px', fontSize: '1.13rem' }}>{roomId}</b>
          <CopyBtn onClick={handleCopyRoomId}>Copy</CopyBtn>
          {copyMsg && <span style={{ color: '#2ecc71', marginLeft: '0.5rem', fontSize: '0.98rem' }}>{copyMsg}</span>}
        </RoomIdBadge>
      )}
      <MainGrid>
        <div>
          {gameState.players.map((player) => (
            <AnimatedPlayerCard key={player.id} active={player.id === gameState.currentPlayer}>
              <PlayerCard
                player={player}
                isCurrentPlayer={player.id === gameState.currentPlayer}
                localPlayerId={socket.id}
              />
            </AnimatedPlayerCard>
          ))}
        </div>
        <DiceArea>
          <Dice values={displayDiceValues} isRolling={isRolling} />
          {/* Show message if only one player */}
          {gameState.players.length < 2 && (
            <div style={{
              color: '#fff',
              background: '#e67e22',
              padding: '1rem',
              borderRadius: '8px',
              margin: '1rem 0',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              boxShadow: '0 2px 8px #0002',
            }}>
              🕹️ You are alone here! Call one more player to start the game.
            </div>
          )}
          <GameControls
            onRoll={handleRoll}
            isRolling={isRolling}
            disabled={!isCurrentPlayer || gameState.players.length < 2}
          />
        </DiceArea>
        <div />
      </MainGrid>
    </GameLayout>
  );
};

export default GamePage;