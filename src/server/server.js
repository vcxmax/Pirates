import path from 'path';
import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import ClientHandler from './clientHandler.js';

class Server {
    constructor(port = 3000, host = '0.0.0.0') {
        this.port = port;
        this.host = host;

        this.app = express();
        this.server = http.createServer(this.app);
        this.wss = new WebSocket.Server({ server: this.server });

        this.setupMiddleware();
        this.handleConnections();
    }

    // Set up middleware (e.g., static file serving)
    setupMiddleware() {
        const staticPath = path.resolve('src/client');
        console.log(`Serving static files from: ${staticPath}`);
        this.app.use(express.static(staticPath));
    }

    // Set up WebSocket event handlers
    handleConnections() {
        this.wss.on('connection', (ws) => {
            console.log('New client connected');
            new ClientHandler(this, ws);
        });
    }

    // Start the server
    start() {
        this.server.listen(this.port, this.host, () => {
            console.log(`Server is running on http://${this.host}:${this.port}`);
        });
    }

    // Close the server
    close() {
        this.wss.close(() => {
            console.log('WebSocket server closed');
        });
        this.server.close(() => {
            console.log('HTTP server closed');
        });
    }

    commandLine() {
        // listen to command line input
    }
}

// Create and start the server
// eslint-disable-next-line no-undef
const server = new Server(process.env.PORT || 3000, '0.0.0.0');
server.start();