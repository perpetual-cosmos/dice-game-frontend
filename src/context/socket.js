import { createContext } from 'react';
import { io } from 'socket.io-client';

export const socket = io(process.env.REACT_APP_SOCKET_URL || "https://dice-game-server.onrender.com", {
  autoConnect: false
});


export const SocketContext = createContext(socket);
