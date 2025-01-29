import React from 'react';
import { motion } from 'framer-motion';
import { Video, Phone, MoreVertical } from 'lucide-react';
import type { User } from '../../types';

interface ChatHeaderProps {
  recipient: User;
  onStartCall: () => void;
  onStartVideoCall: () => void;
  onClose: () => void;
}

const ChatHeader = ({ recipient, onStartCall, onStartVideoCall, onClose }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center space-x-3">
        <motion.img
          whileHover={{ scale: 1.1 }}
          src={recipient.avatar}
          alt={recipient.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-semibold">{recipient.name}</h3>
          <span className="text-sm text-green-500">Online</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartVideoCall}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Video className="w-5 h-5 text-gray-600" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartCall}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Phone className="w-5 h-5 text-gray-600" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </motion.button>
      </div>
    </div>
  );
};

export default ChatHeader;