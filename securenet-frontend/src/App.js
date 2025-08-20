import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import FileLog from './components/FileLog';
import PhishingChecker from './components/PhishingChecker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Dashboard.css';
import './App.css';


function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );
  
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };
  
  // Apply dark mode to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);
  
  return (
    <Router>
      <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
        <Navigation isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<HomePage isDarkMode={isDarkMode} />} />
          <Route path="/file-monitoring" element={<FileLog isDarkMode={isDarkMode} />} />
          <Route path="/phishing-detection" element={<PhishingChecker isDarkMode={isDarkMode} />} />
          <Route path="/email-security" element={
            <div className="container py-5 text-center">
              <h2>Email Security</h2>
              <p>This feature is coming soon!</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;