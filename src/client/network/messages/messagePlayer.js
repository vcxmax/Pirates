import Message from './message.js';

class MessagePlayer extends Message {

    static id = 2;

    // eslint-disable-next-line no-unused-vars
    read(message, client) {
        
    }

    getId() {
        return MessagePlayer.id;
    }

}

export default MessagePlayer;