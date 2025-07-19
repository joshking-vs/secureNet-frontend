import React, { useEffect, useState } from "react";

export default function HistoryPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/history")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  return (
    <div>
      <h2>Message History</h2>
      {messages.map((msg) => (
        <div key={msg._id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
          <p><strong>Message:</strong> {msg.content}</p>
          <p><strong>Threat Type:</strong> {msg.threatType}</p>
          <p><strong>Date:</strong> {new Date(msg.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
