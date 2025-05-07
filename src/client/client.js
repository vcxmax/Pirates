import MessageRegister from "./network/messageRegister.js";
import Chat from "./chat.js";

class Client {
    constructor(serverUrl) {
        this.socket = new WebSocket(serverUrl);
        this.username = Math.random().toString(36).substring(7); // Generate a random username

        // Attach WebSocket event listeners
        this.socket.addEventListener('open', () => this.onOpen());
        this.socket.addEventListener('message', (message) => this.receiveMessage(message));
        this.socket.addEventListener('error', (error) => this.onError(error));
        this.socket.addEventListener('close', () => this.onClose());
        this.chat = new Chat(this); // Integrate with Chat class
    }

    // Handle WebSocket connection open
    onOpen() {
        console.log('Connected to server');
    }

    // Handle incoming WebSocket messages
    receiveMessage(message) {
        try {
            const jsonMessage = JSON.parse(message.data); // Parse message data
            console.log('Received message:', jsonMessage);

            // Handle the message using MessageRegister
            if ('id' in jsonMessage && Number.isInteger(jsonMessage.id)) {
                const messageHandler = MessageRegister.getInstance().getMessage(jsonMessage.id);
                if (messageHandler) {
                    messageHandler.read(jsonMessage, this);
                } else {
                    console.error('No handler found for message ID:', jsonMessage.id);
                }
            } else {
                console.error('Message does not have an ID:', jsonMessage);
            }
        } catch (error) {
            console.error('Failed to parse message:', error);
        }
    }

    // Handle WebSocket errors
    onError(error) {
        console.error('WebSocket error:', error);
    }

    // Handle WebSocket connection close
    onClose() {
        console.log('WebSocket connection closed');
    }

    // Send a message to the server
    sendMessage(message) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        } else {
            console.warn('WebSocket is not open. Cannot send message.');
        }
    }
}

// Instantiate the client
new Client(`ws://${window.location.hostname}:3000`);