import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MessageCircle, Video } from 'lucide-react';
import { connectionService } from '../../services/connection';
import { useStore } from '../../store/useStore';
import type { User } from '../../types';
import LoadingSpinner from '../LoadingSpinner';

interface ConnectionsListProps {
  onStartChat: (userId: string) => void;
  onStartVideoCall: (userId: string) => void;
}

const ConnectionsList = ({ onStartChat, onStartVideoCall }: ConnectionsListProps) => {
  const [connections, setConnections] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useStore((state) => state.currentUser);

  useEffect(() => {
    const fetchConnections = async () => {
      if (!currentUser) return;
      
      try {
        const data = await connectionService.getConnections();
        setConnections(data);
      } catch (error) {
        console.error('Failed to fetch connections:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConnections();
  }, [currentUser]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="text-center py-8">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No connections yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {connections.map((connection) => (
          <motion.div
            key={connection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={connection.avatar}
                  alt={connection.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{connection.name}</h3>
                  <p className="text-sm text-gray-600">{connection.title}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onStartChat(connection.id)}
                  className="p-2 text-gray-600 hover:text-indigo-500 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onStartVideoCall(connection.id)}
                  className="p-2 text-gray-600 hover:text-indigo-500 transition-colors"
                >
                  <Video className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ConnectionsList;