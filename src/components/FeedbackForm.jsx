import React, { useState } from "react";

export default function FeedbackForm({ analysis }) {
  const [userFeedback, setUserFeedback] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messageId: analysis.messageId,
        originalMessage: analysis.originalMessage,
        detectedThreat: analysis.threatType,
        userFeedback,
        comment,
      }),
    });

    if (res.ok) setSubmitted(true);
  };

  if (submitted) return <p>✅ Feedback submitted. Thank you!</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Was this analysis correct?
        <select value={userFeedback} onChange={(e) => setUserFeedback(e.target.value)} required>
          <option value="">--Select--</option>
          <option value="Correct">Correct</option>
          <option value="Incorrect">Incorrect</option>
        </select>
      </label>
      <textarea
        placeholder="Optional comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">Submit Feedback</button>
    </form>
  );
}
