import Message from './message.js';

class MessagePlayer extends Message {

    // eslint-disable-next-line no-unused-vars
    read(message, client) {
        
    }

    getId() {
        return 'player';
    }

}

export default MessagePlayer;