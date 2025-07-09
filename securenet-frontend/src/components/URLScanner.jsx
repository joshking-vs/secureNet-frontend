import React, { useState } from 'react';
import axios from 'axios';
import './Scanner.css'; // Optional custom styles

const URLScanner = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // ✅ New state for confirmation message

  const handleScan = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    setSuccess(''); // ✅ Clear previous success message

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/detect/?url=${encodeURIComponent(url)}`
      );
      setResult(response.data);

      // ✅ Show confirmation based on status
      if (response.data.status === 'safe') {
        setSuccess('✅ Scan completed. No clone or threat detected.');
      } else if (response.data.status === 'flagged') {
        setSuccess('🚨 Clone site or malicious domain detected!');
      } else {
        setSuccess('⚠️ Scan completed. See result below.');
      }
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

      {/* ✅ Show success message */}
      {success && <div className="success-message">{success}</div>}

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

          {result.virustotal && (
            <p>
              <strong>VirusTotal:</strong> {result.virustotal.message}
            </p>
          )}

          {result.message && (
            <p>
              <strong>Message:</strong> {result.message}
            </p>
          )}

          {result.screenshot && (
            <div className="screenshot-preview">
              <strong>Screenshot:</strong>
              <img
                src={`http://127.0.0.1:8000/media/${result.screenshot}`}
                alt="Screenshot preview"
                width="400"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default URLScanner;
