import React, { useEffect, useState } from "react";
import "../App.css";

function FeedbackHistoryPage() {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbackList(data))
      .catch((err) => console.error("Failed to fetch feedback:", err));
  }, []);

  return (
    <div className="container">
      <h2>🗂️ Feedback History</h2>
      {feedbackList.length === 0 ? (
        <p>No feedback submitted yet.</p>
      ) : (
        <ul className="history-list">
          {feedbackList.map((item) => (
            <li key={item._id} className="history-item">
              <p><strong>Message:</strong> {item.originalMessage}</p>
              <p><strong>Detected Threat:</strong> {item.detectedThreat}</p>
              <p><strong>User Feedback:</strong> {item.userFeedback}</p>
              <p><em>Submitted: {new Date(item.createdAt).toLocaleString()}</em></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FeedbackHistoryPage;
