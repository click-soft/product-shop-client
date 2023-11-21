import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_BACKEND_URL as string;

export const socket = io(URL, { transports: ['websocket'] });