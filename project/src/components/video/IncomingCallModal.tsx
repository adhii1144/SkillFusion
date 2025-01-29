import React from 'react';
import { motion } from 'framer-motion';
import { Phone, PhoneOff } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface IncomingCallModalProps {
  callerName: string;
  onAccept: () => void;
  onReject: () => void;
}

const IncomingCallModal = ({ callerName, onAccept, onReject }: IncomingCallModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-xl font-semibold mb-4">Incoming Call</h3>
        <p className="mb-6">{callerName} is calling you...</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onAccept}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <Phone className="w-5 h-5 mr-2" />
            Accept
          </button>
          <button
            onClick={onReject}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            <PhoneOff className="w-5 h-5 mr-2" />
            Reject
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default IncomingCallModal;