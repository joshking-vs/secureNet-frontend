import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isDarkMode, toggleDarkMode }) {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const handleToggleNav = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  return (
    // Use navbar-fixed custom class for always-on-top navbar
    <nav
      className={`navbar navbar-expand-lg  fixed-top  
        navbar-dark bg-dark" 
       mb-5`}
      /* 
        Bootstrap: navbar, navbar-expand-lg, navbar-dark/bg-dark or navbar-light/bg-light
        Custom: fixed-top (see Navigation.css)
        mb-4: margin bottom for spacing below navbar
      */
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
              <Link className="nav-link" to="/url-scanner" onClick={() => setIsNavExpanded(false)}>
                Clone Site Detection
              </Link>
            </li>
          </ul>
          {/* Light/Dark toggle button */}
          {/* <div className="d-flex">
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
          </div> */}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;