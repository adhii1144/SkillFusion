import toast from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:8080/skill_fusion';

export const api = {
  searchUsers: async (query: string, filters: { bio?: string; location?: string }) => {
    try {
      const params = new URLSearchParams();
      if (query) params.append('query', query);
      if (filters.bio) params.append('bio', filters.bio);
      if (filters.location) params.append('location', filters.location);
    
        const token = localStorage.getItem('jwt');
        if (!token) {
          toast.error('No token found. Please log in!');
          return;
        }
      const response = await fetch(`http://localhost:8080/skill-fusion/users?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch users');
      return await response.json();
    } catch (error) {
      console.error('Error searching users:', error);
      toast.error('Error searching users. Please try again.');
      throw error;
    }
  },


  // Update user profile with new data
  async updateUserProfile(userId: string, data: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update profile');
      return await response.json();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile. Please try again.');
      throw error;
    }
  },

  // Upload a new profile image
  async uploadProfileImage(userId: string, file: File) {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_BASE_URL}/users/${userId}/avatar`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload image');
      return await response.json();
    } catch (error) {
      console.error('Error uploading profile image:', error);
      toast.error('Error uploading profile image. Please try again.');
      throw error;
    }
  },
};
