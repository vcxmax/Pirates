import path from 'path';
import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import ClientHandler from './clientHandler.js';
import AuthHandler from './authHandler.js';
import readline from 'readline';

class Server {
    constructor(port = 3000, host = '0.0.0.0') {
        this.port = port;
        this.host = host;

        this.app = express();
        this.server = http.createServer(this.app);
        this.wss = new WebSocket.Server({ server: this.server });

        this.authHandler = new AuthHandler();

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
    async start() {
        await this.authHandler.initialize();
        this.server.listen(this.port, this.host, () => {
            console.log(`Server is running on http://${this.host}:${this.port}`);
        });
    }

    // Close the server
    async close() {
        console.log("Credentials before saving:", this.authHandler.credentials);
        await this.authHandler.saveCredentials();
        this.wss.close(() => {
            console.log('WebSocket server closed');
        });
        this.server.close(() => {
            console.log('HTTP server closed');
        });
    }

    commandLine() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '> '
        });

        rl.prompt();

        rl.on('line', async (line) => {
            const input = line.trim();
            switch (input) {
                case 'exit':
                case 'quit':
                    console.log('Shutting down server...');
                    await this.close(); // <-- Now this works!
                    rl.close();
                    break;
                default:
                    console.log(`Unknown command: ${input}`);
                    rl.prompt();
            }
        });

        rl.on('close', () => {
            process.exit(0);
        });
    }
}

// Create and start the server
// eslint-disable-next-line no-undef
const server = new Server(process.env.PORT || 3000, '0.0.0.0');
server.start();
server.commandLine();