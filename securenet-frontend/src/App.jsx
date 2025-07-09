// src/App.jsx
import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Optional styling
import URLScanner from "./components/URLScanner";

      <main>
        <URLScanner />
      </main>


function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDetect = async () => {
    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.get("http://127.0.0.1:8000/detect/", {
        params: { url },
      });
      setResult(response.data);
    } catch (err) {
      setError("Detection failed. Check backend or network.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>🛡️ SecureNet AI</h1>
        <p>Detect suspicious or cloned websites using AI-powered scanning</p>
      </header>

      <main>
        <div className="scanner-container">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL"
          />
          <button onClick={handleDetect} disabled={loading}>
            {loading ? "Scanning..." : "Run Detection"}
          </button>

          {error && <p className="error">{error}</p>}

          {result && (
            <div className="result">
              <h3>🔍 Detection Result</h3>
              <p>
                <strong>Status:</strong> {result.status}
              </p>
              {result.reason && (
                <p>
                  <strong>Reason:</strong> {result.reason}
                </p>
              )}
              {result.message && (
                <p>
                  <strong>Message:</strong> {result.message}
                </p>
              )}
              {result.screenshot_url && (
                <div className="screenshot-preview">
                  <strong>Screenshot:</strong>
                  <img
                    src={`http://127.0.0.1:8000/media/${result.screenshot_url}`}
                    alt="Screenshot"
                    width="400"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} SecureNet.ai — Web Threat Detection</p>
      </footer>
    </div>
  );
}

export default App;
