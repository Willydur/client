import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messageRecieved, setMessageRecieved] = useState("");
  const [messageSerder, setMessageSender] = useState("");
  const [color, setColor] = useState("");

  const sendMessage = () => {
    socket.emit("message", { message: message });
  };

  const changeColor = () => {
    socket.emit("bgcolor", { message: message });
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
            if (event.target.value === "blue") {
              setColor(event.target.value);
            } else {
              setMessage(event.target.value);
            }
          }}
        />
        <button onClick={sendMessage}>send message</button>
        <button onClick={changeColor}>change color</button>

        <h2>
          {messageSerder}: {messageRecieved}
        </h2>
        <p>color : {color}</p>
        <p>message : {message}</p>
      </center>
    </div>
  );
}

export default App;
