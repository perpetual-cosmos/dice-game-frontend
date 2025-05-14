import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import Dice from '../components/Dice';
import PlayerCard from '../components/PlayerCard';
import GameControls from '../components/GameControls';
import { SocketContext } from '../context/socket';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';

const bgAnim = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const GameLayout = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(120deg, #232526 0%, #414345 50%, #6dd5ed 100%);
  background-size: 200% 200%;
  animation: ${bgAnim} 14s ease-in-out infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 2rem 0;
  overflow-x: hidden;
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

const Modal = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(44, 62, 80, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
const ModalContent = styled.div`
  background: #fff;
  color: #222;
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 #4e54c822;
  text-align: center;
  max-width: 90vw;
  font-family: 'Quicksand', 'Segoe UI', Arial, sans-serif;
`;

const RoomIdBadge = styled.div`
  position: fixed;
  top: 18px;
  right: 18px;
  background: rgba(44,62,80,0.92);
  color: #fff;
  font-size: 1.1rem;
  font-family: 'Quicksand', Arial, sans-serif;
  border-radius: 10px;
  box-shadow: 0 2px 8px #0002;
  padding: 0.7rem 1.2rem 0.7rem 1.2rem;
  z-index: 2000;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  user-select: all;
`;
const CopyBtn = styled.button`
  background: linear-gradient(90deg, #43cea2 0%, #185a9d 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.2rem 0.8rem;
  font-size: 1rem;
  font-weight: bold;
  margin-left: 0.5rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: linear-gradient(90deg, #185a9d 0%, #43cea2 100%);
    transform: scale(1.07);
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
  const [displayDiceValues, setDisplayDiceValues] = useState([1, 1]);
  const [modal, setModal] = useState(null);
  const [copyMsg, setCopyMsg] = useState('');

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId || '').then(() => {
      setCopyMsg('Copied!');
      setTimeout(() => setCopyMsg(''), 2000);
    }).catch(() => {
      setCopyMsg('Failed to copy.');
      setTimeout(() => setCopyMsg(''), 2000);
    });
  };

  useEffect(() => {
    const playerName = localStorage.getItem('playerName') || 'Player';
    
    socket.emit('join-game', {
      roomId: roomId || 'default',
      playerName
    });

    socket.on('game-state', (state) => {
      // Sort players to maintain consistent order
      const sortedPlayers = [...state.players].sort((a, b) => a.id.localeCompare(b.id));
      setGameState({ ...state, players: sortedPlayers });
      // If not rolling, update displayDiceValues to real values
      setDisplayDiceValues(state.diceValues);
    });

    socket.on('game-over', (winner) => {
      navigate('/game-over', { state: { winner } });
    });

    socket.on('room-ended', (msg) => {
      setModal(msg || 'Room has ended.');
      setTimeout(() => navigate('/'), 3000);
    });
    socket.on('join-error', (msg) => {
      setModal(msg || 'Could not join room.');
      setTimeout(() => navigate('/'), 3000);
    });
    socket.on('disconnect', () => {
      setModal('Disconnected from server. Please check your connection.');
    });

    return () => {
      socket.off('game-state');
      socket.off('game-over');
      socket.off('room-ended');
      socket.off('join-error');
      socket.off('disconnect');
    };
  }, [socket, roomId, navigate]);

  const handleRoll = () => {
    if (!isCurrentPlayer || isRolling) return;
    setIsRolling(true);
    // Start rolling animation: show random dice faces
    let rollInterval = setInterval(() => {
      setDisplayDiceValues([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ]);
    }, 100);
    socket.emit('roll-dice', roomId || 'default');
    setTimeout(() => {
      setIsRolling(false);
      clearInterval(rollInterval);
      // The real dice values will be set by the game-state event
    }, 1200);
  };

  // True only for the active player's client
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