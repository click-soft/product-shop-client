import { io } from 'socket.io-client';

const URL = process.env.REACT_APP_BACKEND_URL as string;

export const socket = io(URL, { transports: ['websocket'] });
