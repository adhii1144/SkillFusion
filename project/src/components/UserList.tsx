import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import type { User } from '../types';

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://your-backend-url.com/api/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();

        // Filter only available users
        const availableUsers = data.filter((user: User) => user.available);
        setUsers(availableUsers);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle connecting with a user
  const handleConnect = (userId: string) => {
    console.log(`Connecting with user ID: ${userId}`);
    // Additional logic to handle user connection can be added here
  };

  return (
    <div className="space-y-8">
      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} onConnect={handleConnect} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
