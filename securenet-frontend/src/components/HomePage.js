import React from 'react';
import { Link } from 'react-router-dom';

function HomePage({ isDarkMode }) {
  return (
    <div className={`container py-4 ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="row mb-5">
        <div className="col-md-12 text-center">
          <h1 className="display-4 fw-bold text-primary mb-3">
            <i className="bi bi-shield-check me-2"></i>
            SecureNet Security Suite
          </h1>
          <p className="lead mb-4">Comprehensive cybersecurity monitoring and protection for your digital assets</p>
          <p className="text-muted mb-4">
            Current Date and Time: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
      
      <div className="row mb-5">
        <div className="col-md-4 mb-4">
          <div className={`card h-100 shadow-sm ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}>
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="p-3 rounded-circle bg-primary text-white me-3">
                  <i className="bi bi-file-earmark-lock"></i>
                </div>
                <h4 className="card-title mb-0">File Monitoring</h4>
              </div>
              <p className="card-text">Monitor file system changes in real-time and detect suspicious activity on your device.</p>
              <Link to="/file-monitoring" className="btn btn-primary">
                <i className="bi bi-arrow-right-circle me-1"></i>
                Open File Monitor
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className={`card h-100 shadow-sm ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}>
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="p-3 rounded-circle bg-warning text-dark me-3">
                  <i className="bi bi-globe"></i>
                </div>
                <h4 className="card-title mb-0">Phishing Detection</h4>
              </div>
              <p className="card-text">Analyze incoming messages to identify and flag potential phishing attempts or suspicious content before users engage with them.</p>
              <Link to="/phishing-detection" className="btn btn-warning text-dark">
                <i className="bi bi-arrow-right-circle me-1"></i>
                Message Security Check
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className={`card h-100 shadow-sm ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}>
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="p-3 rounded-circle bg-success text-white me-3">
                  <i className="bi bi-envelope-check"></i>
                </div>
                <h4 className="card-title mb-0">Email Security</h4>
              </div>
              <p className="card-text">Analyze email messages for threats, spam, and phishing attempts to protect your inbox.</p>
              <Link to="/email-security" className="btn btn-success">
                <i className="bi bi-arrow-right-circle me-1"></i>
                Scan Email
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-12">
          <div className={`card shadow-sm ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}>
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
                  <p className="text-muted small">Today at {new Date().toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;