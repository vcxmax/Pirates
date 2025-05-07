import Message from '../message.js';

class MessageChat extends Message {

    static id = 1;

    read(message, client) {
        client.chat.appendMessage(message.username,  message.text);
    }

    getId() {
        return MessageChat.id;
    }
}

export default MessageChat;