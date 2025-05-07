import Message from "../message.js";

class MessageAuth extends Message {
    static id = 0;

    read(message, server, client) {
        if (message.type && message.username && message.password) {
            this.#handleAuthAsync(message, server, client);
        } 
    }

    async #handleAuthAsync(message, server, client) {
        const { type, username, password } = message;
        
        let status = false;
        if (type === "login") {
            status = await server.authHandler.login(username, password);
        } else if (type === "register") {
            status = await server.authHandler.register(username, password);
        }
        if (status) {
            client.username = username;
        }
        client.sendMessage({ id: MessageAuth.id, type, status });
    }

    getId() {
        return MessageAuth.id;
    }
}

export default MessageAuth;