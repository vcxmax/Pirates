import MessageRegister from "./network/messageRegister.js";
import Chat from "./chat.js";

class ClientHandler {
    constructor(server, ws) {
        this.server = server;
        this.ws = ws;

        console.log('New client connected');

        this.initializeWebSocketEvents();
        Chat.getInstance().addClient(this); // Add client to chat instance
    }

    // Set up WebSocket event handlers
    initializeWebSocketEvents() {
        // Handle incoming messages
        this.ws.on('message', (message) => {
            this.receiveMessage(message);
        });

        // Handle client disconnection
        this.ws.on('close', () => {
           
        });

        // Handle errors
        this.ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    }

    // Handle incoming messages
    receiveMessage(message) {
        try {
            // Parse the incoming message as JSON
            const jsonMessage = JSON.parse(message); // Use `message` directly
            console.log('Received message:', jsonMessage);

            if ('id' in jsonMessage && Number.isInteger(jsonMessage.id)) {
                const messageId = jsonMessage.id;
                const messageHandler = MessageRegister.getInstance().getMessage(messageId);
                if (messageHandler) {
                    messageHandler.read(jsonMessage);
                } else {
                    console.error('No handler found for message ID:', messageId);
                }
            } else {
                console.error('Message does not have an ID:', jsonMessage);
            }
        } catch (error) {
            console.error('Failed to parse message:', error);
        }
    }

    sendMessage(message) {
        this.ws.send(JSON.stringify(message));
    }

}

export default ClientHandler;