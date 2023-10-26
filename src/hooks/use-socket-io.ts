import { useEffect, useState } from 'react';
import { socket } from '../config/socket';

interface UseSocketIoArgs {
  receiveEventName: string;
  sendEventName?: string;
  onReceive: (args: any[]) => void;
  onError?: (error: any) => void;
}

const useSocketIo = (sockArgs: UseSocketIoArgs) => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onOrders(...args: any[]): void {
      try {
        sockArgs.onReceive(args);
      } catch (err) {
        sockArgs.onError?.(err);
      }
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on(sockArgs.receiveEventName, onOrders);
    socket.connect();
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off(sockArgs.receiveEventName, onOrders);
    };
  }, []);

  return { isConnected };
};

export default useSocketIo;
