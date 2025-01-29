import axios from "axios";

// Base API URL from environment variables
const apiUrl = import.meta.env.VITE_APP_API_URL;

export const connectionService = {
  // Sends a connection request to the backend
  sendRequest: async (senderId: number, receiverId: number) => {
    // Retrieve JWT token from local storage
    const token = localStorage.getItem("jwt");
    if (!token) throw new Error("User is not authenticated");

    // Sending POST request to the backend to connect sender and receiver
    const response = await axios.post(
      `${apiUrl}/api/connections/connect`,
      null, // No request body is needed since we're using query params
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          senderId,
          receiverId, // Pass senderId and receiverId as query parameters
        },
      }
    );

    return response.data; // Backend response: "Connection Request Sent!"
  },

  // Sends a notification from sender to receiver
  sendNotification: async (senderId: number, receiverId: number, message: string) => {
    // Retrieve JWT token from local storage
    const token = localStorage.getItem("jwt");
    if (!token) throw new Error("User is not authenticated");

    // Sending POST request to notify the receiver
    const response = await axios.post(
      `${apiUrl}/api/connections/sendNotification`,
      {
        senderId,
        receiverId,
        message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  },

  // Checks if a connection already exists between two users
  checkConnection: async (senderId: number, receiverId: number) => {
    // Retrieve JWT token from local storage
    const token = localStorage.getItem("jwt");
    if (!token) throw new Error("User is not authenticated");

    // Sending GET request to verify connection
    const response = await axios.get(`${apiUrl}/api/connections/checkConnection`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        senderId,
        receiverId,
      },
    });

    return response.data; // Boolean indicating if they are already connected
  },
};
