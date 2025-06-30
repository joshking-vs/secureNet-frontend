// src/App.jsx
import './App.css';
import URLScanner from './components/URLScanner';

function App() {
  return (
    <div className="App">
      <header>
        <h1>🛡️ SecureNet AI</h1>
        <p>Detect suspicious or cloned websites using AI-powered scanning</p>
      </header>

      <main>
        <URLScanner />
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} SecureNet.ai — Web Threat Detection</p>
      </footer>
    </div>
  );
}

export default App;



