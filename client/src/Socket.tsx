import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../../common';

const URL = 'http://localhost:3000';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL);

export {socket}