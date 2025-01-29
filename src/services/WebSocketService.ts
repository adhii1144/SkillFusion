import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
  private client: Client;

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws', // The WebSocket server URL
      connectHeaders: {},
      onConnect: () => {
        console.log('WebSocket connected');
        this.client.subscribe('/topic/connection-notifications', this.onMessageReceived);
      },
      onStompError: (frame) => {
        console.error('Error in WebSocket connection', frame);
      },
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'), // Connect to the WebSocket endpoint
    });
  }

  connect() {
    this.client.activate();
  }

  disconnect() {
    this.client.deactivate();
  }

  // Handle incoming messages from the WebSocket server
  private onMessageReceived(message: any) {
    const messageBody = JSON.parse(message.body);
    alert(messageBody.content); // Show a notification or update UI based on the content
  }

  // Send a message (this can be used for sending messages or notifications)
  sendMessage(message: string) {
    this.client.publish({ destination: '/app/notify', body: JSON.stringify({ content: message }) });
  }
}

export const webSocketService = new WebSocketService();
