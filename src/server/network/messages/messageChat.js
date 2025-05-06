import Message from '../message.js';
import Chat from '../../chat.js'; // Adjust the path as necessary

class MessageChat extends Message {
    read(message) {
        Chat.Instance.sendMessage(message);
    }

    getId() {
        return 'chat';
    }
}

export default MessageChat;