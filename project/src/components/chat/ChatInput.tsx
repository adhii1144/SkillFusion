import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Paperclip, Smile } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
}

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t p-4 bg-white">
      <div className="flex items-center space-x-2">
        <button
          type="button"
          className="p-2 text-gray-500 hover:text-indigo-500 transition-colors"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={isLoading}
        />
        <button
          type="button"
          className="p-2 text-gray-500 hover:text-indigo-500 transition-colors"
        >
          <Smile className="w-5 h-5" />
        </button>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          disabled={!message.trim() || isLoading}
          className={`p-2 rounded-lg ${
            message.trim() && !isLoading
              ? 'bg-indigo-500 text-white'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>
    </form>
  );
};

export default ChatInput;