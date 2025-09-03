import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // <-- NO Router import
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import Navigation from "./components/Navigation";
import FileLog from "./components/FileLog";
import URLScanner from "./components/URLScanner";
import PhishingChecker from "./components/PhishingChecker";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const handleAuth = () => {
    setIsAuthenticated(true);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    localStorage.setItem("darkMode", !isDarkMode);
  };

  return (
    <div>
      {isAuthenticated && <Navigation position="sticky-top" isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage onAuth={handleAuth} />
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <HomePage isDarkMode={isDarkMode} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {/* Direct feature routes */}
        <Route
          path="/file-monitoring"
          element={isAuthenticated ? <FileLog /> : <Navigate to="/" />}
        />
        <Route
          path="/phishing-detection"
          element={isAuthenticated ? <PhishingChecker /> : <Navigate to="/" />}
        />
        <Route
          path="/url-scanner"
          element={isAuthenticated ? <URLScanner /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;