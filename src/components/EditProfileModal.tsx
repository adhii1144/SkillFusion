import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Loader } from "lucide-react";
import toast from "react-hot-toast";
import Input from "./Input";
import Button from "./Button";
import axios from "axios";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newData: any) => void;
  initialData: {
    username: string;
    title: string;
    email: string;
    mobile: string;
    bio: string;
    address: string;
    website: string;
  };
}

const EditProfileModal = ({ isOpen, onClose, onSave, initialData }: EditProfileModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
      setIsChanged(false);
    }
  }, [isOpen, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      setIsChanged(JSON.stringify(updatedData) !== JSON.stringify(initialData));
      return updatedData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChanged) {
      toast.info("No changes to update.");
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("User is not authenticated");
      }
      const apiUrl = import.meta.env.VITE_APP_API_URL
     
        const response = await axios.put(
        `${apiUrl}/skill-fusion/profile/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onSave(response.data);
      toast.success("Profile updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg h-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {isLoading ? (
          <div className="p-6 flex items-center justify-center">
            <Loader className="w-8 h-8 animate-spin text-indigo-500" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
            <Input
              label="Name"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Input
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <Input
              label="Email (Read-Only)"
              type="email"
              name="email"
              value={formData.email}
              readOnly
            />
            <Input
              label="Mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <Input
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />

            <div className="flex justify-end space-x-4 p-6 border-t">
              <Button variant="secondary" onClick={onClose} className="!w-auto">
                Cancel
              </Button>
              <Button type="submit" isLoading={isLoading} className="!w-auto" disabled={!isChanged}>
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

export default EditProfileModal;