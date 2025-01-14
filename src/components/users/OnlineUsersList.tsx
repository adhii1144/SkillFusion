import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import type { User } from '../../types';

interface OnlineUsersListProps {
  onSelectUser: (userId: string) => void;
}

const OnlineUsersList = ({ onSelectUser }: OnlineUsersListProps) => {
  const onlineUsers = useStore((state) => state.onlineUsers);
  const currentUser = useStore((state) => state.currentUser);

  const filteredUsers = onlineUsers.filter(user => user.id !== currentUser?.id);

  return (
    <div className="fixed right-4 top-20 w-64 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Online Users ({filteredUsers.length})</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <AnimatePresence>
          {filteredUsers.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
              className="p-4 cursor-pointer"
              onClick={() => onSelectUser(user.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <h4 className="font-medium text-sm">{user.name}</h4>
                  <p className="text-xs text-gray-500">{user.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {filteredUsers.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No users online
          </div>
        )}
      </div>
    </div>
  );
};

export default OnlineUsersList;