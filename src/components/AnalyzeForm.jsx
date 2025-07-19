import React, { useState } from "react";

export default function AnalyzeForm({ onAnalyze }) {
  const [sms, setSms] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze(sms);
    setSms("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={sms} onChange={(e) => setSms(e.target.value)} placeholder="Paste SMS here" required />
      <button type="submit">Analyze</button>
    </form>
  );
}
