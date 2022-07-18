import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      console.log("ssss1");
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log("ssss2");
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
      console.log("ssss3");
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
      console.log("ssss4");
    };
  }, []);

  const sendPing = () => {
    socket.emit('ping',{message: "test masok"});
    console.log("ssss5");
  }

  return (
    <div>
      <p>Connected: { '' + isConnected }</p>
      <p>Last pong: { lastPong || '-' }</p>
      <button onClick={ sendPing }>Send ping</button>
    </div>
  );
}

export default Chat;