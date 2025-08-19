import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MonitorControl({ isDarkMode }) {
  // State
  const [monitorStatus, setMonitorStatus] = useState('loading');
  const [directories, setDirectories] = useState([]);
  const [newDirectories, setNewDirectories] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // Get CSRF token
  const getCsrfToken = () => {
    const name = 'csrftoken';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
  };
  
  // Fetch monitor status
  useEffect(() => {
    fetchMonitorStatus();
    
    // Set up polling to refresh status every 10 seconds
    
    
    let intervalId;
    if (!isEditing) {
      intervalId = setInterval(fetchMonitorStatus, 10000);
    }
    // Clean up interval on component unmount
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isEditing]);
  
  const fetchMonitorStatus = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/file-management/monitor/status/');
      
      setMonitorStatus(response.data.status);
      
      if (response.data.monitored_paths) {
        setDirectories(response.data.monitored_paths);

        if (!newDirectories.trim()) {
        setNewDirectories(response.data.monitored_paths.map(p => p.path).join('\n'));
      }
      }
      
    } catch (err) {
      console.error('Error fetching monitor status:', err);
      setError('Failed to fetch monitor status');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Start monitor
  const startMonitor = async () => {
    try {
      setIsLoading(true);
      setMessage('');
      setError('');
      
      const response = await axios.post('/api/file-management/monitor/start/', {}, {
        headers: { 'X-CSRFToken': getCsrfToken() }
      });
      
      if (response.data.success) {
        setMessage('Monitor started successfully');
        setMonitorStatus('running');
        fetchMonitorStatus(); // Refresh status
      } else {
        setError(response.data.message || 'Failed to start monitor');
      }
    } catch (err) {
      console.error('Error starting monitor:', err);
      setError('Failed to start monitor');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Stop monitor
  const stopMonitor = async () => {
    try {
      setIsLoading(true);
      setMessage('');
      setError('');
      
      const response = await axios.post('/api/file-management/monitor/stop/', {}, {
        headers: { 'X-CSRFToken': getCsrfToken() }
      });
      
      if (response.data.success) {
        setMessage('Monitor stopped successfully');
        setMonitorStatus('stopped');
        fetchMonitorStatus(); // Refresh status
      } else {
        setError(response.data.message || 'Failed to stop monitor');
      }
    } catch (err) {
      console.error('Error stopping monitor:', err);
      setError('Failed to stop monitor');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Restart monitor
  const restartMonitor = async () => {
    try {
      setIsLoading(true);
      setMessage('');
      setError('');
      
      const response = await axios.post('/api/file-management/monitor/restart/', {}, {
        headers: { 'X-CSRFToken': getCsrfToken() }
      });
      
      if (response.data.success) {
        setMessage('Monitor restarted successfully');
        fetchMonitorStatus(); // Refresh status
      } else {
        setError(response.data.message || 'Failed to restart monitor');
      }
    } catch (err) {
      console.error('Error restarting monitor:', err);
      setError('Failed to restart monitor');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update directories
  const updateDirectories = async () => {
    try {
      setIsLoading(true);
      setMessage('');
      setError('');
      
      // Parse directories from textarea
      const dirList = newDirectories.split('\n')
        .map(dir => dir.trim())
        .filter(dir => dir !== '');
      
      if (dirList.length === 0) {
        setError('Please enter at least one directory');
        setIsLoading(false);
        return;
      }
      
      const response = await axios.post('/api/file-management/monitor/update-directories/', {
        directories: dirList
      }, {
        headers: {
          'X-CSRFToken': getCsrfToken(),
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        setMessage(response.data.message);
        fetchMonitorStatus(); // Refresh status
      } else {
        setError(response.data.message || 'Failed to update directories');
      }
    } catch (err) {
      console.error('Error updating directories:', err);
      setError('Failed to update directories');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Run scan
  const runScan = async () => {
    try {
      setIsLoading(true);
      setMessage('');
      setError('');
      
      const response = await axios.post('/api/file-management/monitor/run-scan/', {}, {
        headers: { 'X-CSRFToken': getCsrfToken() }
      });
      
      if (response.data.success) {
        setMessage('Scan started successfully');
      } else {
        setError(response.data.message || 'Failed to start scan');
      }
    } catch (err) {
      console.error('Error starting scan:', err);
      setError('Failed to start scan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`card mb-4 ${isDarkMode ? 'bg-dark text-light' : ''}`}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Monitor Control Panel</h5>
        <div>
          {monitorStatus === 'running' ? (
            <span className="badge bg-success">Running</span>
          ) : monitorStatus === 'stopped' ? (
            <span className="badge bg-danger">Stopped</span>
          ) : (
            <span className="badge bg-secondary">Loading...</span>
          )}
        </div>
      </div>
      <div className="card-body">
        {/* Status messages */}
        {message && (
          <div className="alert alert-success alert-dismissible fade show">
            <i className="bi bi-check-circle-fill me-2"></i>
            {message}
            <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
          </div>
        )}
        
        {error && (
          <div className="alert alert-danger alert-dismissible fade show">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
            <button type="button" className="btn-close" onClick={() => setError('')}></button>
          </div>
        )}
        
        {/* Control buttons */}
        <div className="mb-4">
          <h6 className="mb-3">Monitor Controls</h6>
          <div className="d-flex flex-wrap gap-2">
            {monitorStatus === 'running' ? (
              <>
                <button 
                  className="btn btn-danger"
                  onClick={stopMonitor} /* Now using the actual function */
                  disabled={isLoading}
                >
                  <i className="bi bi-stop-circle me-1"></i> Stop Monitor
                </button>
                <button 
                  className="btn btn-warning"
                  onClick={restartMonitor}
                  disabled={isLoading}
                >
                  <i className="bi bi-arrow-clockwise me-1"></i> Restart Monitor
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={runScan}
                  disabled={isLoading}
                >
                  <i className="bi bi-search me-1"></i> Run Scan Now
                </button>
              </>
            ) : (
              <button 
                className="btn btn-success"
                onClick={startMonitor}
                disabled={isLoading}
              >
                <i className="bi bi-play-circle me-1"></i> Start Monitor
              </button>
            )}
          </div>
        </div>
        
        {/* Directories */}
        <div className="mb-4">
          <h6 className="mb-3">Monitored Directories</h6>
          
          {/* Current directories */}
          {directories.length > 0 && (
            <div className="mb-3">
              <p className="small text-muted mb-2">Currently monitoring:</p>
              <ul className="list-group mb-3">
                {directories.map((dir, index) => (
                  <li key={index} className={`list-group-item ${isDarkMode ? 'bg-dark text-light border-secondary' : ''} ${dir.exists ? 'list-group-item-success' : 'list-group-item-danger'}`}>
                    {dir.exists ? (
                      <i className="bi bi-check-circle-fill me-2 text-success"></i>
                    ) : (
                      <i className="bi bi-x-circle-fill me-2 text-danger"></i>
                    )}
                    {dir.path}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Update directories */}
          <div>
            <p className="small text-muted mb-2">Enter directories to monitor (one per line):</p>
            <textarea
              className={`form-control mb-2 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
              rows="4"
              value={newDirectories}
              onChange={(e) => setNewDirectories(e.target.value)}
              onFocus={() => setIsEditing(true)}
              onBlur={() => setIsEditing(false)}
              placeholder="C:\Users\Username\Documents&#10;C:\Users\Username\Downloads"
            ></textarea>
            <button
              className="btn btn-primary"
              onClick={updateDirectories}
              disabled={isLoading}
            >
              <i className="bi bi-folder-plus me-1"></i> Update Directories
            </button>
          </div>
        </div>
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="text-center">
            <div className="spinner-border spinner-border-sm text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span className="ms-2">Processing...</span>
          </div>
        )}
      </div>
      
      {/* Refresh button */}
      <div className="card-footer text-center">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={fetchMonitorStatus}
          disabled={isLoading}
        >
          <i className="bi bi-arrow-repeat me-1"></i>
          Refresh Status
        </button>
      </div>
    </div>
  );
}

export default MonitorControl;