import WebSocket, { WebSocketServer } from "ws"; // Import WebSocket and WebSocketServer from the 'ws' library

// Creating a WebSocket server that listens on port 8080
const wss = new WebSocketServer({ port: 8080 });
console.log("WebSocket Server is running on port:8080");

// Event listener: Triggered when a client connects to the WebSocket server
wss.on('connection', (socket) => {
    console.log("Client connected with WS server!!!");

    // Event listener: Triggered when the server receives a message from a connected client
    socket.on('message', (message) => {
        console.log(`Received from client: ${message}`);

        // Check if the message from the client is "ping"
        if (message.toString().toLowerCase() === "ping") {
            // If the message is "ping", send back "pong" as a response
            socket.send("pong");
        } else {
            // If the message is anything else, send a custom response
            socket.send("kya h bhai"); // Example response for an unexpected message
        }
    });

    // Event listener: Triggered when the client closes the WebSocket connection
    socket.on('close', () => {
        console.log("Connection is closed!!!");
    });

    // Event listener: Triggered when an error occurs in the WebSocket connection
    socket.on('error', (error) => {
        console.log("WebSocket Error: ", error);
    });
});
