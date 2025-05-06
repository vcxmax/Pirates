import Message from '../message.js';
import { appendMessage } from '../../chat.js';

class MessageChat extends Message {
    read(message, client) {
        const chatText = message.text;
        appendMessage(chatText);
    }

    getId() {
        return 'chat';
    }
}

export default MessageChat;