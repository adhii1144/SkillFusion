import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Plus, Check, UserPlus, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { connectionService } from "../services/connection";
import type { User } from "../types";

interface UserCardProps {
  user: User;
  onRequestSent?: (userId: number) => void;
}

const UserCard = ({ user, onRequestSent }: UserCardProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const handleConnect = async () => {
    if (user.connected || requestSent) return;

    setIsConnecting(true);

    try {
      const senderId = 15; // Replace with actual logged-in user's ID
      const receiverId = Number(user.id);

      if (isNaN(receiverId)) {
        throw new Error("Invalid user ID");
      }

      // Send the connection request
      await connectionService.sendRequest(senderId, receiverId);

      // Send the notification
      const message = `Hi ${user.username}, let's connect!`;
      await connectionService.sendNotification(senderId, receiverId, message);

      setRequestSent(true);
      toast.success(`Connection request and notification sent to ${user.username}`);
      if (onRequestSent) onRequestSent(receiverId);
    } catch (error: any) {
      toast.error(error.message || "Failed to send connection request");
    } finally {
      setIsConnecting(false);
    }
  };

  const getConnectionStatus = () => {
    if (user.connected) {
      return {
        text: "Connected",
        icon: <Check className="w-4 h-4" />,
        className: "bg-green-500 text-white",
      };
    }
    if (requestSent) {
      return {
        text: "Request Sent",
        icon: <UserPlus className="w-4 h-4" />,
        className: "bg-yellow-500 text-white",
      };
    }
    if (isConnecting) {
      return {
        text: "Connecting...",
        icon: (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <UserPlus className="w-4 h-4" />
          </motion.div>
        ),
        className: "bg-gray-500 text-white",
      };
    }
    return {
      text: "Connect",
      icon: <Plus className="w-4 h-4" />,
      className: "bg-indigo-500 text-white hover:bg-indigo-600",
    };
  };

  const skillColors = {
    expert: "bg-green-100 text-green-800",
    intermediate: "bg-blue-100 text-blue-800",
    beginner: "bg-yellow-100 text-yellow-800",
    default: "bg-gray-100 text-gray-800",
  };

  const getSkillColor = (level: string) => {
    return skillColors[level.toLowerCase()] || skillColors.default;
  };

  const status = getConnectionStatus();

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 w-full md:w-105"
      whileHover={{ y: -4 }}
    >
      <div className="p-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar || "https://via.placeholder.com/150"}
              alt={user.username || "User Avatar"}
              className="w-20 h-20 rounded-full object-cover shadow-md"
            />
            <div>
              <h3 className="text-xl font-semibold text-indigo-500">{user.username || "Anonymous"}</h3>
              <p className="text-gray-600 text-sm">{user.title || "No title available"}</p>
              <div className="flex items-center text-gray-500 text-sm mt-2">
                <MapPin className="w-5 h-5 mr-2" />
                {user.address || "Location not specified"}
              </div>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <Mail className="w-5 h-5 mr-2" />
                {user.email || "Email not provided"}
              </div>
            </div>
          </div>
          <button
            onClick={handleConnect}
            disabled={isConnecting || user.connected || requestSent}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${status.className}`}
          >
            {status.icon}
            <span className="ml-2">{status.text}</span>
          </button>
        </div>
        <div className="mt-6">
          <p className="text-gray-600">{user.bio || "No bio available"}</p>
        </div>
        {user.skills && user.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {user.skills.map((skill, index) => (
              <div
                key={index}
                className={`px-3 py-1 rounded-full text-xs font-medium ${getSkillColor(skill.level)}`}
              >
                {skill.name} - {skill.level}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UserCard;
