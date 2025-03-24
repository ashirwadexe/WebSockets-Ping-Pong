import React, { useEffect, useState } from 'react'; // Import React and required hooks

const App = () => {

  // State to store the user's input message
  const [message, setMessage] = useState('');

  // State to store the response received from the WebSocket server
  const [response, setResponse] = useState('');

  // State to store the WebSocket instance, allowing it to be accessed outside useEffect
  const [ws, setWs] = useState(null);

  // State to count the number of messages sent (for UI display)
  const [count, setCount] = useState(0);

  // useEffect runs once when the component mounts, setting up the WebSocket connection
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080'); // Connect to WebSocket server

    // Event listener when connection is successfully established
    socket.onopen = () => {
      console.log("Connected to WebSocket Server!!!");
      // Save the WebSocket instance in state for further use
      setWs(socket);
    };

    // Event listener when a message is received from the server
    socket.onmessage = (e) => {
      console.log("Message from server:", e.data);
      // Store the received message in state to display in the UI
      setResponse(e.data);
    };

    // Event listener for WebSocket errors
    socket.onerror = (error) => {
      console.log("Socket error: ", error);
    };

    // Event listener when WebSocket connection is closed
    socket.onclose = () => {
      console.log("Connection is closed!!!");
    };

    // Cleanup function to close WebSocket connection when the component unmounts
    return () => {
      if(socket) { // Check if WebSocket instance exists before closing
        socket.close();
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

  // Function to handle message submission
  const submitHandler = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if WebSocket connection is open before sending the message
    if(ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message.toLocaleLowerCase()); // Send the input message to the server
      setMessage(''); // Clear the input field after submission
      setCount((prev) => prev + 1); // Increment message count for UI display
    }
    else {
      console.log("Socket connection is not working"); // Error handling if connection is not open
    }
  }

  return (
    <div>
      <h1>Ping-Pong Game </h1>
      
      {/* Form to send a message to the server */}
      <form onSubmit={submitHandler}>
        <input 
          type="text" 
          value={message} // Bind input value to message state
          onChange={(e) => setMessage(e.target.value)} // Update state when input changes
          placeholder='Enter "Ping"' // Placeholder hint for user
        />
        <button type='submit'>Submit</button>
      </form>

      {/* Display server response and count of messages sent */}
      <p>Response from Server - {count} : <strong>{response}</strong></p>
    </div>
  );
}

export default App;
