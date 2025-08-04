// import './index.css';
import { useState } from 'react';
import { checkPhishing } from './phishingApi';
import { useState } from 'react';
import { checkPhishing } from '../api/phishingApi';

function PhishingChecker() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);

  const handleCheck = async () => {
    const res = await checkPhishing(message);
    setResult(res);
  };

  const getVerdictClass = (verdict) => {
    if (verdict === 'Suspicious') return 'verdict-suspicious';
    if (verdict === 'Not Suspicious') return 'verdict-safe';
    return '';
  };

  return (
   <div className="phishing-checker">
      <h2>Phishing Message Checker</h2>
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Paste SMS or email content here..."
        rows={5}
        cols={50}
      />
      <br />
      <button onClick={handleCheck}>Analyze</button>
      {result && (
        <p className={getVerdictClass(result.verdict)}>
          <strong>{result.verdict}</strong> ({(result.confidence * 100).toFixed(2)}% confidence)
        </p>
      )}
    </div> 
  );
}
export default PhishingChecker;
 