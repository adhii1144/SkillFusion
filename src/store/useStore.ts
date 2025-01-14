import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface ConnectionRequest {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    title: string;
  };
  timestamp: Date;
}

interface Store {
  currentUser: User | null;
  users: User[];
  onlineUsers: User[];
  connectionRequests: ConnectionRequest[];
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
  }>;
  setCurrentUser: (user: User | null) => void;
  updateCurrentUser: (user: User) => void;
  addUser: (user: User) => void;
  setOnlineUsers: (users: User[]) => void;
  addConnectionRequest: (request: ConnectionRequest) => void;
  removeConnectionRequest: (userId: string) => void;
  acceptConnection: (userId: string) => void;
  rejectConnection: (userId: string) => void;
  addNotification: (notification: { title: string; message: string }) => void;
  markNotificationAsRead: (id: string) => void;
  logout: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      currentUser: null,
      users: [],
      onlineUsers: [],
      connectionRequests: [],
      notifications: [],

      setCurrentUser: (user) => set({ currentUser: user }),
      
      updateCurrentUser: (user) => set((state) => ({
        currentUser: user,
        users: state.users.map((u) => (u.id === user.id ? user : u)),
      })),

      addUser: (user) => set((state) => ({
        users: [...state.users, user],
      })),

      setOnlineUsers: (users) => set({ onlineUsers: users }),

      addConnectionRequest: (request) => set((state) => ({
        connectionRequests: [request, ...state.connectionRequests],
      })),

      removeConnectionRequest: (userId) => set((state) => ({
        connectionRequests: state.connectionRequests.filter(
          (req) => req.sender.id !== userId
        ),
      })),

      acceptConnection: (userId) => set((state) => ({
        users: state.users.map((user) =>
          user.id === userId ? { ...user, connected: true } : user
        ),
        connectionRequests: state.connectionRequests.filter(
          (req) => req.sender.id !== userId
        ),
      })),

      rejectConnection: (userId) => set((state) => ({
        connectionRequests: state.connectionRequests.filter(
          (req) => req.sender.id !== userId
        ),
        users: state.users.map((user) =>
          user.id === userId ? { ...user, connected: false } : user
        ),
      })),

      addNotification: (notification) => set((state) => ({
        notifications: [
          {
            id: Date.now().toString(),
            ...notification,
            time: new Date().toISOString(),
            read: false,
          },
          ...state.notifications,
        ],
      })),

      markNotificationAsRead: (id) => set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
      })),

      logout: () => set({ currentUser: null, connectionRequests: [], notifications: [] }),
    }),
    {
      name: 'skill-share-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
      }),
    }
  )
);