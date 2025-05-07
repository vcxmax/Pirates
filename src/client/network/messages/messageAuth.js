import Message from "../message.js";

class MessageAuth extends Message {
    static id = 0;

    read(message, client) {
       client.authUI.handleServerResponse(message);
    }

    getId() {
        return MessageAuth.id;
    }
}

export default MessageAuth;