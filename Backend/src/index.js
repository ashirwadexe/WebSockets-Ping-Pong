import WebSocket, { WebSocketServer } from "ws";

//Creating a websocket server which is running on port:8080
const wss = new WebSocketServer({ port: 8080 });
console.log("WebSocket Server is running on port:8080");

//Event listener: when a client/user connected to the server
wss.on('connection', (socket) => {
    console.log("Client connected with WS server!!!");

    //event listener: when server receives message from the client
    socket.on('message', (message) => {
        console.log(`Received from client: ${message}`);

        //if client send "ping" then server respond with "pong"
        if(message.toString() === "ping") {
            //here server is sending data to client
            socket.send("pong");
        }
        else {
            socket.send("kya h bhai")
        }
    });

    //event listener: whenever someone closes the connection
    socket.on('close', () => {
        console.log("Connection is closed!!!");
    });

    //event listener: whenever some error occurs in WSS connection/ handling error
    socket.on('error', (error) => {
        console.log("WebSocket Error: ", error);
    });
});

