import React, { useEffect, useState } from 'react'

const App = () => {

  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [ws, setWs] = useState(null);
  const [count, setCount] = useState(0);

  //initialize websocket connection
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log("Connected to WebSocket Server!!!");
      //storing the instance of socket to ws- state variable to use it outside the useeffect hook or -> connection will be setup when the app will mount
      setWs(socket);
    };

    //data/response received from the server
    socket.onmessage = (e) => {
      //this response will be displayed on the UI -> server is sending this
      setResponse(e.data);
    };

    socket.onerror = (error) => {
      console.log("Socket error: ", error);
    };

    socket.onclose = () => {
      console.log("Connection is closed!!!");
    };

    //cleanup function
    return () => {
      //checks if connection is open, then close it
      if(socket) {
        socket.close();
      }
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if(ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message); //sending the client response to the server
      setMessage(''); // marking the input feild null after sending the data to server/after submit button click the input feild will be empty
      setCount((prev) => prev+1);
    }
    else {
      console.log("Socket connection is not working");
    }
  }


  return (
    <div>
      <h1>Ping-Pong Game </h1>
      <form onSubmit={submitHandler}>
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Enter "Ping"'
        />
        <button type='submit'>Submit</button>
      </form>
      <h1>Response from Server-{count}: <strong>{response}</strong></h1>
    </div>
  )
}

export default App