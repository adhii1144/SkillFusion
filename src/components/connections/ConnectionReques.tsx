import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, X } from 'lucide-react';
import Button from '../Button';
import { connectionService } from '../../services/connection';
import toast from 'react-hot-toast';

interface ConnectionRequestProps {
  request: {
    id: string; // ID of the connection request, not used in the frontend action
    sender: {
      id: number;  // This is an integer, updated to match backend
      name: string;
      avatar: string;
      title: string;
    };
  };
  onClose: () => void;
}

const ConnectionRequest = ({ request, onClose }: ConnectionRequestProps) => {
  const handleAccept = async () => {
    try {
      // Accept the request by passing the sender's id as an integer (matching backend)
      await connectionService.acceptRequest(request.sender.id);
      toast.success(`You are now connected with ${request.sender.name}`);
      onClose();
    } catch (error) {
      toast.error('Failed to accept connection request');
    }
  };

  const handleReject = async () => {
    try {
      // Reject the request by passing the sender's id as an integer
      await connectionService.rejectRequest(request.sender.id);
      toast.success('Connection request rejected');
      onClose();
    } catch (error) {
      toast.error('Failed to reject connection request');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-semibold">Connection Request</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={request.sender.avatar}
            alt={request.sender.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h4 className="font-medium text-lg">{request.sender.name}</h4>
            <p className="text-gray-600">{request.sender.title}</p>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button onClick={handleAccept} className="flex-1">
            <UserPlus size={18} className="mr-2" />
            Accept
          </Button>
          <Button
            variant="secondary"
            onClick={handleReject}
            className="flex-1"
          >
            <X size={18} className="mr-2" />
            Decline
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ConnectionRequest;
