import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Check, CheckCheck } from 'lucide-react';
import type { Message } from '../../services/chat';

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
}

const ChatMessage = ({ message, isCurrentUser }: ChatMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isCurrentUser
            ? 'bg-indigo-500 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <div className="flex items-center justify-end mt-1 space-x-1">
          <span className="text-xs opacity-75">
            {format(new Date(message.timestamp), 'HH:mm')}
          </span>
          {isCurrentUser && (
            message.read ? (
              <CheckCheck className="w-4 h-4 opacity-75" />
            ) : (
              <Check className="w-4 h-4 opacity-75" />
            )
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;