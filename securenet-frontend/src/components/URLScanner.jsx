
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Scanner.css';

const URLScanner = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [recentScans, setRecentScans] = useState([]);

  // ✅ Fetch recent logs on component mount
  useEffect(() => {
    const fetchRecentScans = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/recent-scans/');
        setRecentScans(res.data);
      } catch (err) {
        console.error('Could not load recent scans.', err);
      }
    };
    fetchRecentScans();
  }, []);

  const handleScan = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL.');
      toast.error("🚫 Invalid URL entered");
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    setSuccess('');

    toast.info("🔍 Starting scan...");

    try {
      const response = await axios.get(`http://127.0.0.1:8000/detect/?url=${encodeURIComponent(url)}`);
      const data = response.data;
      setResult(data);

      if (data.status === 'safe') {
        toast.success("✅ Site is safe.");
        setSuccess('✅ No threats found.');
      } else if (data.status === 'flagged') {
        toast.error("🚨 Malicious or clone site detected!");
        setSuccess('🚨 This site is suspicious!');
      } else {
        toast.warning("⚠️ Inconclusive scan. Check details.");
        setSuccess('⚠️ Check the scan result below.');
      }

      if (data.screenshot) {
        toast.success("🖼️ Screenshot captured.");
      }

      // ✅ Update scan history
      setRecentScans((prev) => [data, ...prev.slice(0, 9)]); // Keep last 10

    } catch (err) {
      console.error('Error:', err);
      setError('Detection failed. Backend may be offline.');
      toast.error("❌ Scan failed.");
    } finally {
      setLoading(false);
    }
  };

  const renderScanDetails = (scan, index) => (
    <div key={index} className="scan-entry">
      <h4>🔍 Scan #{index + 1}</h4>
      <p><strong>Status:</strong> <span className={scan.status === 'flagged' ? 'flagged' : 'safe'}>
        {scan.status.toUpperCase()}
      </span></p>
      {scan.reason && <p><strong>Reason:</strong> {scan.reason}</p>}
      {scan.method && <p><strong>Method:</strong> {scan.method}</p>}
      {scan.reputation && <p><strong>Reputation:</strong> {scan.reputation}</p>}
      {scan.google_safebrowsing && (
        <p>
          <strong>Google Safe Browsing:</strong>{' '}
          {scan.google_safebrowsing.status === 'flagged' ? '⚠️ Flagged' : '✅ Safe'}
        </p>
      )}
      {scan.virustotal && <p><strong>VirusTotal:</strong> {scan.virustotal.message}</p>}
      {scan.message && <p><strong>Message:</strong> {scan.message}</p>}
      {scan.screenshot && (
        <div className="screenshot-preview">
          <strong>Screenshot:</strong><br />
          <img
            src={`http://127.0.0.1:8000/media/${scan.screenshot}`}
            alt="Screenshot"
            width="300"
          />
        </div>
      )}
      <hr />
    </div>
  );

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
      {success && <p className="success-message">{success}</p>}

      {result && (
        <div className="result">
          <h3>🔐 Scan Result</h3>

          <p>
            <strong>Status:</strong>{' '}
            <span className={result.status === 'flagged' ? 'flagged' : 'safe'}>
              {result.status.toUpperCase()}
            </span>
          </p>

          {result.reason && <p><strong>Reason:</strong> {result.reason}</p>}
          {result.method && <p><strong>Detection Method:</strong> {result.method}</p>}
          {result.reputation && <p><strong>Domain Reputation:</strong> {result.reputation}</p>}

          {result.google_safebrowsing && (
            <p>
              <strong>Google Safe Browsing:</strong>{' '}
              {result.google_safebrowsing.status === 'flagged'
                ? '⚠️ Flagged'
                : '✅ Safe'}
            </p>
          )}

          {result.virustotal && (
            <p><strong>VirusTotal:</strong> {result.virustotal.message}</p>
          )}

          {result.message && <p><strong>Message:</strong> {result.message}</p>}

          {result.screenshot && (
            <div className="screenshot-preview">
              <strong>Screenshot:</strong><br />
              <img
                src={`http://127.0.0.1:8000/media/${result.screenshot}`}
                alt="Website Screenshot"
                width="400"
              />
            </div>
          )}
        </div>
      )}

      {recentScans.length > 0 && (
        <div className="recent-logs">
          <h3>📋 Recent Scans</h3>
          {recentScans.map(renderScanDetails)}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
};

export default URLScanner;


