import MessageRegister from "./network/messageRegister.js";

class Client {
    constructor(serverUrl) {
        this.socket = new WebSocket(serverUrl);
        this.socket.addEventListener('open', () => this.onOpen())
        this.socket.addEventListener('message', (message) => this.receiveMessage(message));
    }

    onOpen() {

    }

    receiveMessage(message) {
        try {
            const jsonMessage = JSON.parse(message);
            console.log('Received message:', jsonMessage);
            if ('id' in jsonMessage && Number.isInteger(jsonMessage.id)) {
                const messageId = jsonMessage.id;
                const messageHandler = MessageRegister.getInstance().getMessage(messageId);
                if (messageHandler) {
                    try {
                        messageHandler.read(jsonMessage);
                    } catch (error) {
                        console.error('Failed to read message:', error);
                    }
                } else {
                    console.error('No handler found for message ID:', messageId);
                }
            } else {
                console.error('Message does not have an ID:', message);
            }
        } catch (error) {
            console.error('Failed to parse message:', error);
            return;
        }
    }

    sendMessage(message) {
        this.socket.send(JSON.stringify(message));
    }

}

const client = new Client(`ws://${window.location.hostname}:3000`);

// Example of user interaction
document.getElementById('startGameButton').addEventListener('click', () => {
    client.sendMessage('startGame', {});
});