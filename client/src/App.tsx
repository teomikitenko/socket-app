import { useState, useEffect } from "react";
import { socket } from "./socket-io";
import "./App.css";

type RestoredMsgs = {
  content:string
}

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [restoredMsgs, setRestoredMsgs] = useState<RestoredMsgs[]>([]);
  const [value, setValue] = useState<string>();

  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();
    socket.on("restored_data", (msgs) => {
      setRestoredMsgs(msgs);
    });
    socket.on("chat", (message: string) => {
      setMessages((msg) => [...msg, message]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const msg = formdata.get("chat_message");
    console.log(`current message ${msg}`);
    socket.emit("chat", msg);
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          name="chat_message"
          onChange={(e) => setValue(e.target.value)}
          type="text"
          value={value}
        />
        <button type="submit">Send messages</button>
      </form>
      <h1>Chat</h1>
      {restoredMsgs.length > 0 &&
        restoredMsgs.map((m) => <p key={m.content} className="chat_messages">{m.content}</p>)}   {/* if i changed db then need change logic */}
      {messages &&
        messages?.map((m) => (
          <p key={m} className="chat_messages">
            {m}
          </p>
        ))}
    </>
  );
}

export default App;
