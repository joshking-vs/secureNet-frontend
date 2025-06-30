import { useState } from 'react';
import { checkPhishing } from '../api/phishingApi';

function PhishingChecker() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);

  const handleCheck = async () => {
    const res = await checkPhishing(message);
    setResult(res);
  };

  return (
    <div>
      <h2>Phishing Message Checker</h2>
      <textarea value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={handleCheck}>Analyze</button>
      {result && (
        <p>
          <strong>{result.label.toUpperCase()}</strong> ({(result.score * 100).toFixed(2)}%)
        </p>
      )}
    </div>
  );
}
export default PhishingChecker;
