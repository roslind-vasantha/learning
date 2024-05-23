import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function App() {
  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // alert(data);
      setReceivedMessage(data);
    });
  }, []);

  console.log(receivedMessage, "rec");

  return (
    <>
      <div className="card">
        <input onChange={(event) => setRoom(event.target.value)} />
        <button onClick={joinRoom}>Join room</button>
        <input
          placeholder="type a message..."
          onChange={(event) => setMessage(event.target.value)}
        />
        <button onClick={sendMessage}>Send message</button>
        <h1>Message: </h1>
        {receivedMessage}
      </div>
    </>
  );
}

export default App;
