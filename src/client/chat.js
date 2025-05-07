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
            this.client.sendMessage({ id: MessageChat.id, username: this.client.username, text: message });
            this.messageInput.value = ''; // Clear the input field
        }
    }

    appendMessage(username, text) {
        const messageElement = document.createElement('div');
        messageElement.textContent = username + ': ' + text;
        this.chat.appendChild(messageElement);
        this.chat.scrollTop = this.chat.scrollHeight; // Auto-scroll to the latest message
    }
}

export default Chat;