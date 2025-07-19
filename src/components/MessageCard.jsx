import React from "react";

export default function MessageCard({ msg }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        marginBottom: "10px",
        padding: "10px",
        borderRadius: "6px",
        backgroundColor: "#fff",
      }}
    >
      <p><strong>Message:</strong> {msg.content}</p>
      <p><strong>Threat Type:</strong> {msg.threatType}</p>
      <p><strong>Date:</strong> {new Date(msg.timestamp).toLocaleString()}</p>
    </div>
  );
}
