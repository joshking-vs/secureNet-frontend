
// src/components/URLScanner.js
import React, { useState } from 'react';
import axios from 'axios';
import './Scanner.css';

const URLScanner = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScan = async () => {
    if (!url) return setError('Please enter a valid URL.');

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/detect/?url=${encodeURIComponent(url)}`
      );
      setResult(response.data);
    } catch (err) {
      console.error('Error detecting site:', err);
      setError('Detection failed. Check backend or network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scanner-container">
      <h2>🔎 SecuraNet.ai — Clone Site Scanner</h2>
      <input
        type="text"
        placeholder="Enter URL to scan"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleScan} disabled={loading}>
        {loading ? 'Scanning...' : '📡 Scan URL'}
      </button>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <h3>🔐 Scan Result</h3>
          <p>
            <strong>Status:</strong>{' '}
            {result.status === 'flagged' ? (
              <span className="flagged">FLAGGED</span>
            ) : (
              <span className="safe">SAFE</span>
            )}
          </p>
          {result.reason && (
            <p>
              <strong>Reason:</strong> {result.reason}
            </p>
          )}
          {result.method && (
            <p>
              <strong>Detection Method:</strong> {result.method}
            </p>
          )}
          {result.reputation && (
            <p>
              <strong>Domain Reputation:</strong> {result.reputation}
            </p>
          )}
          {result.screenshot_url && (
            <div className="screenshot-preview">
              <strong>Screenshot:</strong>
              <img
                src={result.screenshot_url}
                alt="Screenshot preview"
                width="400"
              />
            </div>
          )}
          {result.message && (
            <p>
              <strong>Message:</strong> {result.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default URLScanner;
