import MessageChat from "./messages/messageChat.js";

class MessageRegister {
    constructor() {
        if (MessageRegister.instance) {
            return MessageRegister.instance;
        }
        this.#registerMessages();
    }

    #registerMessages() {
        this.messages = new Map();
        this.registerMessage(new MessageChat())
        // Add other messages here
    }

    static getInstance() {
        if (!MessageRegister.instance) {
            MessageRegister.instance = new MessageRegister();
        }
        return MessageRegister.instance;
    }

    registerMessage(message) {
        this.messages.set(message.getId(), message);
    }

    getMessage(id) {
        return this.messages.get(id);
    }
}

export default MessageRegister;