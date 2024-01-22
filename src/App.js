import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messageRecieved, setMessageRecieved] = useState("");
  const [messageSerder, setMessageSender] = useState("");
  const sendMessage = () => {
    socket.emit("message", { message: message });
  };

  useEffect(() => {
    socket.on("message_rep", (data) => {
      setMessageRecieved(data.message);
      setMessageSender(socket.id);
    });
  }, []);

  return (
    <div className="App">
      <center>
        <h1>Socket.io</h1>
        <input
          type="text"
          placeholder="message..."
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>Send</button>

        <h2>
          {messageSerder}: {messageRecieved}
        </h2>
      </center>
    </div>
  );
}

export default App;
