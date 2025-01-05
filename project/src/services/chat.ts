import { authService } from './auth';

const API_BASE_URL = 'http://localhost:8080/api';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export const chatService = {
  async fetchMessages(userId: string): Promise<Message[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/${userId}`, {
        headers: authService.getAuthHeaders(),
      });
      
      if (!response.ok) throw new Error('Failed to fetch messages');
      return await response.json();
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

  async sendMessage(receiverId: string, content: string): Promise<Message> {
    try {
      const response = await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: authService.getAuthHeaders(),
        body: JSON.stringify({ receiverId, content }),
      });
      
      if (!response.ok) throw new Error('Failed to send message');
      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  async markAsRead(messageId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/${messageId}/read`, {
        method: 'PUT',
        headers: authService.getAuthHeaders(),
      });
      
      if (!response.ok) throw new Error('Failed to mark message as read');
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw error;
    }
  }
};