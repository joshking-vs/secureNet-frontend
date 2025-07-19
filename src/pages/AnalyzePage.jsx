import React, { useState } from "react";
import AnalyzeForm from "../components/AnalyzeForm";
import FeedbackForm from "../components/FeedbackForm";

export default function AnalyzePage() {
  const [result, setResult] = useState(null);

  const handleAnalyze = async (sms) => {
    const res = await fetch("http://localhost:5000/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: sms }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div>
      <h2>Analyze SMS</h2>
      <AnalyzeForm onAnalyze={handleAnalyze} />
      {result && (
        <div>
          <p><strong>Result:</strong> {result.threatType}</p>
          <FeedbackForm analysis={result} />
        </div>
      )}
    </div>
  );
}
