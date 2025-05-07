class AuthUI {
    constructor(client) {
        if (AuthUI.instance) {
            return AuthUI.instance; // Return the existing instance if it exists
        }
        this.client = client; // Reference to the WebSocket client
        this.isRegister = false;

        // Cache DOM elements
        this.authContainer = document.getElementById("auth-container");
        this.gameContainer = document.getElementById("game-container");
        this.chatContainer = document.getElementById("chat-container");

        this.authTitle = document.getElementById("auth-title");
        this.authForm = document.getElementById("auth-form");
        this.authSubmit = document.getElementById("auth-submit");
        this.toggleRegister = document.getElementById("toggle-register");
        this.passwordRepeatGroup = document.getElementById("password-repeat-group");

        // Initialize event listeners
        this.initEventListeners();
        AuthUI.instance = this; // Store the instance for later use
    }

    static getInstance() {
        if (!AuthUI.instance) {
            AuthUI.instance = new AuthUI();
        }
        return AuthUI.instance;
    }

    initEventListeners() {
        // Toggle between Login and Register
        this.toggleRegister.addEventListener("click", () => this.toggleAuthMode());

        // Handle Login/Register Form Submission
        this.authForm.addEventListener("submit", (e) => this.handleFormSubmit(e));
    }

    toggleAuthMode() {
        this.isRegister = !this.isRegister;
        this.authTitle.textContent = this.isRegister ? "Register" : "Login";
        this.authSubmit.textContent = this.isRegister ? "Register" : "Login";
        this.passwordRepeatGroup.style.display = this.isRegister ? "block" : "none";
        this.toggleRegister.innerHTML = this.isRegister
            ? 'Already have an account? <span>Login</span>'
            : 'Don\'t have an account? <span>Register</span>';
    }

    async handleFormSubmit(e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const passwordRepeat = document.getElementById("password-repeat").value;

        if (this.isRegister && password !== passwordRepeat) {
            alert("Passwords do not match!");
            return;
        }

        const type = this.isRegister ? "register" : "login";

        // Create a JSON message
        const message = {
            id: 0, // Message ID for authentication (can be customized)
            type,
            username,
            password,
        };

        this.username = username; // Store the username for later use
        // Send the message to the server via WebSocket
        this.client.sendMessage(message);
    }

    handleServerResponse(message) {
        if (message.status == true) {
            this.authContainer.style.display = "none";
            this.chatContainer.style.display = "flex";
            this.client.username = this.username;
        } else {
            alert("Authentication failed!");
        }
    }
}

export default AuthUI;