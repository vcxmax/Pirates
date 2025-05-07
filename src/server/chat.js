class Chat {
    constructor() {
        if (Chat.instance) {
            return Chat.instance;
        }
        Chat.instance = this;
        this.clients = new Set();
    }

    static getInstance() {
        if (!Chat.instance) {
            Chat.instance = new Chat();
        }
        return Chat.instance;
    }

    addClient(client) {
        this.clients.add(client);
    }

    removeClient(client) {
        this.clients.delete(client);
    }

    sendMessage(message) {
        for (const client of this.clients) {
            client.sendMessage(message);
        }
    }
}

export default Chat;