import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import GameOverPage from './pages/GameOverPage';
import { SocketContext, socket } from './context/socket';

function App() {
  useEffect(() => {
    socket.connect();
    return () => socket.disconnect();
  }, []);
  return (
   
  );
}

export default App;