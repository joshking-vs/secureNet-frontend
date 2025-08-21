import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import FileLog from "./components/FileLog";
import PhishingChecker from "./components/PhishingChecker";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import URLScanner from "./components/URLScanner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Dashboard.css";
import "./App.css";

function App() {
  // ✅ Dark mode state (saved in localStorage)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  // ✅ Apply dark mode to <body>
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    
      <div className={`App ${isDarkMode ? "dark-mode" : ""}`}>
        {/* 🔹 Top Navigation */}
        <Navigation isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        {/* 🔹 Header */}
        <header className="text-center py-3">
          <h1>🛡️ SecureNet AI</h1>
          <p>Detect suspicious or cloned websites using AI-powered scanning</p>
          <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="/login">Login</Link> |{" "}
            <Link to="/signup">Signup</Link> |{" "}
            <Link to="/file-monitoring">File Monitoring</Link> |{" "}
            <Link to="/phishing-detection">Phishing Detection</Link> |{" "}
            <Link to="/url-scanner">URL Scanner</Link> |{" "}
          </nav>
        </header>

        {/* 🔹 Routes */}
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage isDarkMode={isDarkMode} />} />
            <Route
              path="/file-monitoring"
              element={<FileLog isDarkMode={isDarkMode} />}
            />
            <Route
              path="/phishing-detection"
              element={<PhishingChecker isDarkMode={isDarkMode} />}
            />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/url-scanner" element={<URLScanner />} />
          </Routes>
        </main>

        {/* 🔹 Footer */}
        <footer className="text-center py-3 mt-5">
          <p>
            &copy; {new Date().getFullYear()} SecureNet.ai — Web Threat Detection
          </p>
        </footer>

        {/* 🔹 Toasts */}
        <ToastContainer position="top-right" autoClose={4000} />
      </div>
    
  );
}

export default App;
