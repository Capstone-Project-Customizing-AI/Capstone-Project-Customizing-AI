import { useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("explain");

  const sendMessage = async () => {
    if (!input) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages, mode }),
    });

    const data = await res.json();

    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", fontFamily: "Arial" }}>
      <h2>Chatbot /w Multiple System Prompts</h2>

      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="explain">Explain</option>
        <option value="summarize">Summarize</option>
        <option value="quiz">Quiz</option>
      </select>

      <div style={{ border: "1px solid #ccc", padding: 10, height: 400, overflowY: "scroll", marginTop: 10 }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.role}:</b> {msg.content}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "80%" }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;