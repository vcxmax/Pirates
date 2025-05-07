import Message from '../message.js';
import Chat from '../../chat.js'; // Adjust the path as necessary

class MessageChat extends Message {

    static id = 1;

    read(message) {
        Chat.getInstance().sendMessage(message);
    }

    getId() {
        return MessageChat.id;
    }
}

export default MessageChat;