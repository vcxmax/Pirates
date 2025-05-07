import bcrypt from "bcrypt";
import fs from "fs/promises";

class AuthHandler {
    constructor() {
        this.credentialsFile = "./src/server/data/credentials.json"; // Path to the credentials file
        this.credentials = {}; // In-memory storage for credentials
    }

    // Load credentials from the file into memory
    async initialize() {
        try {
            const data = await fs.readFile(this.credentialsFile, "utf-8");
            this.credentials = JSON.parse(data);
            console.log("Credentials loaded into memory.");
        } catch (error) {
            if (error.code === "ENOENT") {
                // File does not exist, initialize with an empty object
                this.credentials = {};
                console.log("No credentials file found. Starting with an empty credentials list.");
            } else {
                throw error;
            }
        }
    }

    // Save credentials from memory to the file
    async saveCredentials() {
        const data = JSON.stringify(this.credentials, null, 2); // Pretty-print JSON
        await fs.writeFile(this.credentialsFile, data, "utf-8");
        console.log("Credentials saved to file.");
    }

    // Validate username and password
    #validateCredentials(username, password) {
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Alphanumeric and underscores, 3-20 characters
        const passwordRegex = /^.{6,50}$/; // Any character, 6-50 characters
        return usernameRegex.test(username) && passwordRegex.test(password);
    }

    // Handle user registration
    async register(username, password) {
        if (!this.#validateCredentials(username, password) || this.credentials[username]) {
            return false;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        this.credentials[username] = hashedPassword;
        return true;
    }

    // Handle user login
    async login(username, password) {
        if (!this.#validateCredentials(username, password)) {
            return false;
        }

        const hashedPassword = this.credentials[username];
        if (!hashedPassword) {
            return false;
        }

        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        if (!isPasswordValid) {
            return false;
        }
        return true;
    }
}

export default AuthHandler;