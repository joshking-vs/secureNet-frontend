// import './index.css';
import { useState } from 'react';
import { checkPhishing } from './phishingApi';

function PhishingChecker() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);

  const handleCheck = async () => {
    const res = await checkPhishing(message);
    setResult(res);
  };

  return (
    <div className="phishing-checker">
      <h2>Phishing Message Checker</h2>
      <textarea value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={handleCheck}>Analyze</button>
      {result && (
        <p>
          <strong>{result.verdict.toUpperCase()}</strong> ({(result.confidence * 100).toFixed(2)}%)
        </p>
      )}
    </div>
  );
}
export default PhishingChecker;
