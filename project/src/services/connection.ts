import axios from 'axios';

export const connectionService = {
  // Send a connection request by passing the recipientId as an integer
  async sendRequest(recipientId: number) {
    try {
      await axios.post(`http://localhost:8080/api/connections/requests`, { recipientId });
    } catch (error) {
      throw new Error('Failed to send connection request');
    }
  },

  // Accept a connection request by passing the userId as an integer
  async acceptRequest(userId: number) {
    try {
      await axios.post(`http://localhost:8080/api/connections/requests/${userId}/accept`);
    } catch (error) {
      throw new Error('Failed to accept connection request');
    }
  },

  // Reject a connection request by passing the userId as an integer
  async rejectRequest(userId: number) {
    try {
      await axios.post(`http://localhost:8080/api/connections/requests/${userId}/reject`);
    } catch (error) {
      throw new Error('Failed to reject connection request');
    }
  },

  // Fetch a list of user connections (if applicable)
  async getConnections() {
    try {
      const response = await axios.get(`http://localhost:8080/api/connections`);
      return response.data; // This should return a list of UserDto or connection data
    } catch (error) {
      throw new Error('Failed to fetch connections');
    }
  },

  // Remove a connection by passing the userId as an integer
  async removeConnection(userId: number) {
    try {
      await axios.delete(`http://localhost:8080/api/connections/${userId}`);
    } catch (error) {
      throw new Error('Failed to remove connection');
    }
  },
};
