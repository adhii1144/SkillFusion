import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useStore } from '../../store/useStore';
import { chatService, type Message } from '../../services/chat';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

interface ChatWindowProps {
  recipientId: string;
  onClose: () => void;
}

const ChatWindow = ({ recipientId, onClose }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = useStore((state) => state.currentUser);
  const recipient = useStore((state) => 
    state.users.find(user => user.id === recipientId)
  );

  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentUser) return;
      
      setIsLoading(true);
      try {
        const fetchedMessages = await chatService.fetchMessages(recipientId);
        setMessages(fetchedMessages);
      } catch (error) {
        toast.error('Failed to load messages');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [recipientId, currentUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!currentUser || !recipient) return;

    try {
      const newMessage = await chatService.sendMessage(recipientId, content);
      setMessages(prev => [...prev, newMessage]);
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const handleStartCall = () => {
    // Handle audio call
  };

  const handleStartVideoCall = () => {
    // Handle video call
  };

  if (!recipient || !currentUser) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl flex flex-col"
      style={{ height: '600px' }}
    >
      <ChatHeader
        recipient={recipient}
        onStartCall={handleStartCall}
        onStartVideoCall={handleStartVideoCall}
        onClose={onClose}
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        <AnimatePresence>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isCurrentUser={message.senderId === currentUser.id}
            />
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </motion.div>
  );
};

export default ChatWindow;