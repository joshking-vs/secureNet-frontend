import { useState } from 'react';
import { checkPhishing } from './PhishingApi';

function PhishingChecker() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    setResult(null);
    const res = await checkPhishing(message);
    setResult(res);
    setLoading(false);
  };

  const getVerdictClass = (verdict) => {
    if (verdict === 'suspicious') return 'verdict-suspicious';
    if (verdict === 'not suspicious') return 'verdict-safe';
    return '';
  };

  return (
    <div className="phishing-checker">
      <h2>Phishing Message Checker</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Paste SMS or email content here..."
        rows={5}
        cols={50}
      />
      <br />
      <button onClick={handleCheck} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {loading && (
        <div className="spinner"></div>
      )}

      {result && !loading && (
        <p className={getVerdictClass(result.verdict)}>
          <strong>{result.verdict}</strong> (
          {(result.confidence * 100).toFixed(2)}% confidence)
        </p>
      )}
    </div>
  );
}

export default PhishingChecker;
