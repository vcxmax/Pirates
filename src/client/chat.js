// Connect to the WebSocket server
const ws = new WebSocket(`ws://${window.location.host}`);

// DOM elements
const chat = document.getElementById('chat');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');

// Append a message to the chat
export const appendMessage = (message) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chat.appendChild(messageElement);
    chat.scrollTop = chat.scrollHeight; // Auto-scroll to the latest message
};

// Send a message when the "Send" button is clicked
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        ws.send(JSON.stringify({ type: 'chat', message })); // Send as JSON
        messageInput.value = ''; // Clear the input field
    }
});

// Send a message when the "Enter" key is pressed
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});