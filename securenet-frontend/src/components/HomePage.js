import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import your forms and feature components
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import URLScanner from "./URLScanner";


// 🏠 HomePage Component
function HomePage({ isDarkMode }) {
  return (
    <div className={`container-fluid py-4 full-page-bg ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="row mb-4">
        <div className="col-md-12 text-center">
          <h1 className="display-4 fw-bold text-primary mb-3 mt-5">
            <i className="bi bi-shield-check me-2 "></i>
            SecureNet Security Suite
          </h1>
          <p className="text-white mb-4 ">
            Comprehensive cybersecurity monitoring and protection for your
            digital assets
          </p>
          <p className="text-white mb-4">
            Current Date and Time: {new Date().toLocaleString()}
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="dashboard-features d-flex flex-wrap justify-content-center gap-3 mb-4">
        {/* File Monitoring */}
        <div className="col-md-3 mb-4">
          <div
            className={`card h-100 shadow-sm 
              bg-dark text-light border-secondary`}
          >
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="p-3 rounded-circle bg-primary text-white me-3">
                  <i className="bi bi-file-earmark-lock"></i>
                </div>
                <h4 className="card-title mb-0">File Monitoring</h4>
              </div>
              <p className="card-text">
                Monitor file system changes in real-time and detect suspicious
                activity on your device.
              </p>
              <Link to="/file-monitoring" className="btn btn-primary">
                <i className="bi bi-arrow-right-circle me-1"></i>
                Open File Monitor
              </Link>
            </div>
          </div>
        </div>

        {/* Phishing Detection */}
        <div className="col-md-3 mb-4">
          <div
            className={`card h-100 shadow-sm bg-dark text-light border-secondary
            `}
          >
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="p-3 rounded-circle bg-warning text-dark me-3">
                  <i className="bi bi-globe"></i>
                </div>
                <h4 className="card-title mb-0">Phishing Detection</h4>
              </div>
              <p className="card-text">
                Analyze incoming messages to identify and flag potential
                phishing attempts or suspicious content.
              </p>
              <Link
                to="/phishing-detection"
                className="btn btn-warning text-dark"
              >
                <i className="bi bi-arrow-right-circle me-1"></i>
                Message Security Check
              </Link>
            </div>
          </div>
        </div>

        

        {/* 🆕 Clone-Site Detection */}
        <div className="col-md-3 mb-4">
          <div
            className={`card h-100 shadow-sm 
              bg-dark text-light border-secondary`}
          >
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="p-3 rounded-circle bg-danger text-white me-3">
                  <i className="bi bi-exclamation-triangle"></i>
                </div>
                <h4 className="card-title mb-0">Clone-Site Detection</h4>
              </div>
              <p className="card-text">
                Detect fraudulent websites that mimic real ones to steal
                credentials or trick users.
              </p>
              <Link to="/URL-scanner" className="btn btn-danger">
                <i className="bi bi-arrow-right-circle me-1"></i>
                Detect Clone Sites
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Security Status */}
      <div className="row">
        <div className="col-md-12">
          <div
            className={`card shadow-sm 
              bg-dark text-light border-secondary`}
          >
            <div className="card-body">
              <h4 className="card-title">Security Status</h4>
              <div className="d-flex justify-content-between my-4">
                <div className="text-center px-3">
                  <div className="display-6 text-success mb-2">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <h5>System Protected</h5>
                  <p className="text-muted small">All monitors active</p>
                </div>
                <div className="text-center px-3">
                  <div className="display-6 text-primary mb-2">
                    <i className="bi bi-activity"></i>
                  </div>
                  <h5>Monitoring Active</h5>
                  <p className="text-muted small">Real-time protection</p>
                </div>
                <div className="text-center px-3">
                  <div className="display-6 text-warning mb-2">
                    <i className="bi bi-clock-history"></i>
                  </div>
                  <h5>Last Scan</h5>
                  <p className="text-muted small">
                    Today at {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 🌍 App Component with Router
function App() {
  return (
    
      <div>
        {/* 🧭 Navigation Bar */}
        {/* <header>
          <nav>
            <Link to="/">Home</Link> | <Link to="/login">Login</Link> |{" "}
            <Link to="/signup">Signup</Link> |{" "}
          </nav>
        </header> */}

        <main>
          <Routes>
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<HomePage isDarkMode={false} />} />
            <Route path="/url-scanner" element={<URLScanner />} />
            {/* 🆕 Route for Clone-Site Detection */}
          </Routes>
        </main>

        <footer>
          <p>
            &copy; {new Date().getFullYear()} SecureNet.ai — Web Threat Detection
          </p>
        </footer>

        <ToastContainer position="top-right" autoClose={4000} />
      </div>
    
  );
}

export default App;
