import { io } from 'socket.io-client';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import { createElement } from 'react';
import ConnectionToast from '../components/notifications/ConnectionToast';

const SOCKET_URL = 'http://localhost:8080';

class SocketService {
  socket;
  
  constructor() {
    this.socket = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: false
    });
    this.setupListeners();
  }

  private setupListeners() {
    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    this.socket.on('users:update', (users) => {
      useStore.getState().setOnlineUsers(users);
    });

    this.socket.on('connection:request', (request) => {
      useStore.getState().addConnectionRequest(request);
      toast.custom((t) => 
        createElement(ConnectionToast, {
          visible: t.visible,
          sender: request.sender
        })
      , {
        duration: 4000,
        position: 'top-right',
      });
    });

    this.socket.on('connection:accepted', (userId) => {
      useStore.getState().acceptConnection(userId);
      const user = useStore.getState().users.find(u => u.id === userId);
      if (user) {
        toast.success(`${user.name} accepted your connection request`);
      }
    });

    this.socket.on('connection:rejected', (userId) => {
      useStore.getState().rejectConnection(userId);
      const user = useStore.getState().users.find(u => u.id === userId);
      if (user) {
        toast.error(`${user.name} declined your connection request`);
      }
    });

    this.socket.on('connection:cancelled', (userId) => {
      useStore.getState().removeConnectionRequest(userId);
      const user = useStore.getState().users.find(u => u.id === userId);
      if (user) {
        toast.info(`${user.name} cancelled their connection request`);
      }
    });
  }

  public connect(userId: string) {
    this.socket.auth = { userId };
    this.socket.connect();
  }

  public disconnect() {
    this.socket.disconnect();
  }

  public sendConnectionRequest(userId: string) {
    this.socket.emit('connection:request', { to: userId });
  }

  public acceptConnectionRequest(userId: string) {
    this.socket.emit('connection:accept', { from: userId });
  }

  public rejectConnectionRequest(userId: string) {
    this.socket.emit('connection:reject', { from: userId });
  }

  public cancelConnectionRequest(userId: string) {
    this.socket.emit('connection:cancel', { to: userId });
  }
}

export const socketService = new SocketService();