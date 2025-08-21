import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navigation({ isDarkMode, toggleDarkMode }) {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const handleToggleNav = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      } mb-4`}
    >
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand" to="/" onClick={() => setIsNavExpanded(false)}>
          <i className="bi bi-shield-check me-2 text-primary"></i>
          SecureNet
        </Link>

        {/* Mobile toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggleNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible menu */}
        <div
          className={`collapse navbar-collapse ${isNavExpanded ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => setIsNavExpanded(false)}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/file-monitoring" onClick={() => setIsNavExpanded(false)}>
                File Monitoring
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/phishing-detection" onClick={() => setIsNavExpanded(false)}>
                Phishing Detection
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/email-security" onClick={() => setIsNavExpanded(false)}>
                Email Security
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login" onClick={() => setIsNavExpanded(false)}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup" onClick={() => setIsNavExpanded(false)}>
                Signup
              </Link>
            </li>
          </ul>

          {/* Dark/Light toggle button */}
          <div className="d-flex">
            <button
              className={`btn btn-sm ${isDarkMode ? "btn-light" : "btn-dark"}`}
              onClick={toggleDarkMode}
            >
              {isDarkMode ? (
                <>
                  <i className="bi bi-sun"></i> Light
                </>
              ) : (
                <>
                  <i className="bi bi-moon"></i> Dark
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
