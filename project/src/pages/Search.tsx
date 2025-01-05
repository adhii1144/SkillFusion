import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../services/api';
import UserCard from '../components/UserCard';
import type { User, SearchFilters } from '../types';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const data = await api.searchUsers(debouncedQuery, filters);
        setUsers(data);
      } catch (error) {
        toast.error('Failed to fetch users');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedQuery, filters]);

  const handleConnect = async (userId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, connected: !user.connected } : user
      )
    );

    const user = users.find((u) => u.id === userId);
    if (user) {
      toast.success(
        user.connected
          ? `Disconnected from ${user.username}`
          : `Connected with ${user.username}`
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search for names or bios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 bg-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </motion.div>

      <div className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="w-8 h-8 animate-spin text-indigo-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {users.map((user) => (
                <UserCard key={user.id} user={user} onConnect={handleConnect} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;