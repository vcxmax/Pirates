class Message {
    // eslint-disable-next-line no-unused-vars
    read(message, client) {
        throw new Error('read() must be implemented in subclasses of Message');
    }

    getId() {
        throw new Error('getId() must be implemented in subclasses of Message');
    }
}

export default Message;