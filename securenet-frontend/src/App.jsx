// src/App.jsx
import React from "react";
import "./App.css";
import URLScanner from "./components/URLScanner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

      {/* ✅ Toast container must be globally accessible */}
      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
}

export default App;

