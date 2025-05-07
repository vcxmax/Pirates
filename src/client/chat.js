import MessageChat from './network/messages/messageChat.js';

class Chat {
    constructor(client) {
        this.chat = document.getElementById('chat');
        this.messageInput = document.getElementById('message');
        this.sendButton = document.getElementById('send');
        this.client = client;
        this.attachEventListeners();
    }

    // Attach event listeners for input and button
    attachEventListeners() {
        this.sendButton.addEventListener('click', () => this.handleSendMessage());
        this.messageInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                this.handleSendMessage();
            }
        });
    }

    // Handle sending a message
    handleSendMessage() {
        const message = this.messageInput.value.trim();
        if (message) {
            const messageObject = {
                id: MessageChat.id, // Message type
                username: this.client.username,
                text: message,
            };

            this.client.sendMessage(messageObject); // Send as JSON
            this.messageInput.value = ''; // Clear the input field
        }
    }

    // Append a message to the chat
    appendMessage(username, text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');

        // Add username styling
        const usernameElement = document.createElement('span');
        usernameElement.classList.add('username');
        usernameElement.textContent = username;

        // Add message text
        const textElement = document.createElement('span');
        textElement.textContent = text;

        // Check if the message is from the client
        if (username === this.client.username) {
            messageElement.classList.add('client');
        } else {
            messageElement.classList.add('other');
        }

        messageElement.appendChild(usernameElement);
        messageElement.appendChild(textElement);
        this.chat.appendChild(messageElement);

        // Auto-scroll to the latest message
        this.chat.scrollTop = this.chat.scrollHeight;
    }
}

export default Chat;