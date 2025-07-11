import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import GameOverPage from './pages/GameOverPage';
import LeaderboardPage from './pages/LeaderboardPage';
import { SocketContext, socket } from './context/socket';

function App() {
  useEffect(() => {
    socket.connect();
    return () => socket.disconnect();
  }, []);
  return (
    <SocketContext.Provider value={socket}>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/game/:roomId" element={<GamePage />} />
        <Route path="/game-over" element={<GameOverPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </Router>
    </SocketContext.Provider>
  );
}

export default App;