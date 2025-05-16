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
  background: rgba(255,255,255,0.13);
  padding: 2rem 1.5rem;
  border-radius: 16px;
  margin: 2rem 0;
  max-width: 600px;
  width: 100%;
  font-size: clamp(1.1rem, 2.5vw, 1.25rem);
  box-shadow: 0 2px 8px rgba(44,62,80,0.10);
  z-index: 1;
`;

const RoomCard = styled.div`
  margin: 1rem 0;
  color: #fff;
  background: #34495e;
  padding: 1.2rem 1rem;
  border-radius: 10px;
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 8px rgba(44,62,80,0.15);
`;

const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  max-width: 350px;
  margin: 1rem 0;
  gap: 0.5rem;
  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
`;

const Input = styled.input`
  padding: 0.9rem;
  border-radius: 8px;
  border: none;
  font-size: 1.1rem;
  width: 100%;
  margin-bottom: 0.5rem;
  box-shadow: 0 2px 8px #0001;
  background: rgba(255,255,255,0.7);
  color: #222;
  @media (min-width: 600px) {
    margin-bottom: 0;
    width: auto;
    min-width: 180px;
  }
`;

const CopyButton = styled.button`
  margin-left: 0.5rem;
  padding: 0.3rem 1rem;
  border-radius: 8px;
  border: none;
  background: linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%);
  color: #fff;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: linear-gradient(90deg, #8f94fb 0%, #4e54c8 100%);
    transform: scale(1.07);
  }
`;

const Feedback = styled.div`
  color: #2ecc71;
  margin-top: 0.5rem;
  font-size: 1.1rem;
`;

const ErrorMsg = styled.div`
  color: #e74c3c;
  margin-top: 0.5rem;
  font-size: 1.1rem;
`;

const HomePage = () => {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const [roomId, setRoomId] = useState('');
  const [createdRoomId, setCreatedRoomId] = useState('');
  const [copyMsg, setCopyMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [playerName, setPlayerName] = useState(localStorage.getItem('playerName') || '');

  const handleCreateRoom = () => {
    if (!playerName.trim()) {
      setError('Please enter your name.');
      return;
    }
    localStorage.setItem('playerName', playerName.trim());
    setLoading(true);
    setError('');
    setCreatedRoomId('');
    setCopyMsg('');
    if (!socket.connected) {
      setError('Not connected to server. Please try again.');
      setLoading(false);
      return;
    }
    socket.emit('create-room', (id) => {
      setLoading(false);
      if (!id) {
        setError('Failed to create room. Please try again.');
        return;
      }
      setCreatedRoomId(id);
      setCopyMsg('');
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(createdRoomId);
    setCopyMsg('Copied!');
  };

  const handleJoinRoom = () => {
    if (!playerName.trim()) {
      setError('Please enter your name.');
      return;
    }
    localStorage.setItem('playerName', playerName.trim());
    if (roomId.trim()) {
      navigate(`/game/${roomId.trim().toUpperCase()}`);
    }
  };

  return (
    <Container>
      {/* Floating dice for background effect */}
      <FloatingDice style={{ top: '8%', left: '4%' }} />
      <FloatingDice style={{ top: '70%', left: '80%', fontSize: '6rem' }} />
      <FloatingDice style={{ top: '50%', left: '60%', fontSize: '10rem' }} />
      <Title>Two Dice Roll</Title>
      <GlassCard>
        <InputRow>
          <Input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
            aria-label="Enter your name"
            maxLength={16}
          />
        </InputRow>
        <InputRow>
          <Input
            type="text"
            placeholder="Enter Room ID to Join"
            value={roomId}
            onChange={e => setRoomId(e.target.value)}
            aria-label="Enter Room ID to Join"
          />
          <Button onClick={handleJoinRoom} style={{ background: 'linear-gradient(90deg, #8e44ad 0%, #6dd5ed 100%)', color: '#fff' }} aria-label="Join Room">
            Join Room
          </Button>
        </InputRow>
        <Button onClick={handleCreateRoom} style={{ background: 'linear-gradient(90deg, #2980b9 0%, #6dd5ed 100%)', color: '#fff' }} aria-label="Create Room">
          {loading ? 'Creating Room...' : 'Create Room'}
        </Button>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        {createdRoomId && (
          <RoomCard>
            <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Room ID:</div>
            <div style={{ fontSize: '1.7rem', fontWeight: 'bold', letterSpacing: '2px' }}>{createdRoomId}</div>
            <CopyButton onClick={handleCopy} aria-label="Copy Room ID">Copy</CopyButton>
            {copyMsg && <Feedback>{copyMsg}</Feedback>}
          </RoomCard>
        )}
      </GlassCard>
      <RulesList>
        <h2 style={{fontSize: 'clamp(1.3rem, 4vw, 2rem)', textAlign: 'center', fontFamily: 'Luckiest Guy, Quicksand, cursive, sans-serif'}}>Game Rules</h2>
        <li>🎲 Roll two dice and accumulate points</li>
        <li>💥 Rolling doubles doubles your points!</li>
        <li>🤞 Rolling a 7 switches players</li>
        <li>🏆 First to 100 points wins</li>
      </RulesList>
      <Button onClick={() => navigate('/game')} aria-label="Start New Game" style={{ background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', color: '#fff' }}>
        Start New Game
      </Button>
      <Button onClick={() => navigate('/leaderboard')} aria-label="View Leaderboard" style={{ background: 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)', color: '#222' }}>
        View Leaderboard
      </Button>
    </Container>
  );
};

export default HomePage;