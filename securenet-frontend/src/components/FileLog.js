import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Dashboard.css'

function FileLog() {
  // State
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );
  const [stats, setStats] = useState({
    total: 0,
    safe: 0,
    suspicious: 0,
    dangerous: 0
  });
  
  // Toggle dark mode
const toggleDarkMode = () => {
  const newMode = !isDarkMode;
  setIsDarkMode(newMode);
  localStorage.setItem('darkMode', newMode);
  
  // Apply to body and container
  if (newMode) {
    document.body.classList.add('dark-mode');
    document.querySelector('.container-fluid').classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
    document.querySelector('.container-fluid').classList.remove('dark-mode');
  }
};

// Also update the initial effect to apply to container
useEffect(() => {
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    document.querySelector('.container-fluid')?.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
    document.querySelector('.container-fluid')?.classList.remove('dark-mode');
  }
}, [isDarkMode]);
  
  // Fetch logs from backend
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Make the actual API call to your Django backend
        const response = await axios.get('/api/file-logs/');
        console.log('API response status:', response.status);
        
        // Check if we have data in the response
        if (response.data) {
          console.log('API response data:', response.data);
          
          // For debugging - log the type and length
          console.log('Data type:', typeof response.data);
          if (Array.isArray(response.data)) {
            console.log('Data length:', response.data.length);
          } else if (typeof response.data === 'object') {
            console.log('Data keys:', Object.keys(response.data));
          }
          
          // Determine how to extract logs from the response
          let fetchedLogs = [];
          
          if (Array.isArray(response.data)) {
            // If response.data is already an array of logs
            fetchedLogs = response.data;
          } else if (response.data.results && Array.isArray(response.data.results)) {
            // If response is paginated
            fetchedLogs = response.data.results;
          } else if (typeof response.data === 'object') {
            // If response is an object, try to find an array of logs
            for (const key in response.data) {
              if (Array.isArray(response.data[key])) {
                fetchedLogs = response.data[key];
                break;
              }
            }
          }
          
          if (fetchedLogs.length > 0) {
            setLogs(fetchedLogs);
            
            // Calculate stats
            setStats({
              total: fetchedLogs.length,
              safe: fetchedLogs.filter(log => log.risk_level === 'safe').length,
              suspicious: fetchedLogs.filter(log => log.risk_level === 'suspicious').length,
              dangerous: fetchedLogs.filter(log => log.risk_level === 'dangerous').length
            });
            
            setError(null);
          } else {
            console.warn('No logs found in response');
            setLogs([]);
            setStats({
              total: 0,
              safe: 0,
              suspicious: 0,
              dangerous: 0
            });
          }
        } else {
          console.warn('Empty response from API');
          setError('No data received from the server');
          setLogs([]);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching logs:', err);
        setError('Failed to fetch logs. Please try again later.');
        setIsLoading(false);
      }
    };
    
    // Initial fetch
    fetchLogs();
    
    // Set up polling every 10 seconds
    const interval = setInterval(fetchLogs, 10000);
    
    // Clean up on unmount
    return () => clearInterval(interval);
  }, []);
  
  // Helper function for file names
  const getFileName = (path) => {
    if (!path) return '';
    const parts = path.split(/[/\\]/);
    return parts[parts.length - 1];
  };
  
  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  // ChatGPT integration
  const askChatGPT = async (log) => {
    try {
      // Get a pre-built prompt from the backend
      const response = await axios.get(`/api/file-logs/${log.id}/chatgpt_prompt/`);
      const prompt = response.data.prompt;
      
      // URL encode the prompt
      const encodedPrompt = encodeURIComponent(prompt);
      
      // Open ChatGPT in a new tab
      window.open(`https://chat.openai.com/?model=gpt-4o&prompt=${encodedPrompt}`, '_blank');
    } catch (err) {
      console.error('Error generating ChatGPT prompt:', err);
      
      // Fallback to local prompt generation
      const fileName = getFileName(log.file_path);
      
      let prompt = `Current Date and Time: ${new Date().toLocaleString()}\n`;
      prompt += `Current User's Login: joshking-vs\n\n`;
      prompt += `SECURITY ALERT DETAILS\n`;
      prompt += `=====================\n\n`;
      prompt += `Risk Level: ${log.risk_level?.toUpperCase() || 'UNKNOWN'}\n`;
      prompt += `Event Type: ${log.change_type?.toUpperCase() || 'UNKNOWN'}\n`;
      prompt += `File Name: ${fileName}\n`;
      prompt += `File Path: ${log.file_path}\n\n`;
      
      if (log.recommendation) {
        prompt += `Security Analysis:\n${log.recommendation}\n\n`;
      }
      
      prompt += `Based on this security alert, please provide:\n`;
      prompt += `1. An assessment of the potential risk and impact\n`;
      prompt += `2. Recommended immediate actions to address this issue\n`;
      prompt += `3. Long-term preventive measures to avoid similar security concerns`;
      
      // URL encode the fallback prompt
      const encodedPrompt = encodeURIComponent(prompt);
      
      // Open ChatGPT in a new tab
      window.open(`https://chat.openai.com/?model=gpt-4o&prompt=${encodedPrompt}`, '_blank');
    }
  };
  
  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h1 className="display-5 fw-bold text-primary">SecureNet</h1>
          <p className="lead">File Security Monitoring</p>
        </div>
        <div className="col-md-4 text-end">
          <div className="d-flex justify-content-end align-items-center">
            <div className="me-3">
              <span className="text-muted">
                <i className="bi bi-clock me-1"></i> {new Date().toLocaleString()}
              </span>
            </div>
            <button 
              className="btn btn-sm btn-outline-primary" 
              onClick={toggleDarkMode}
            >
              {isDarkMode ? 
                <><i className="bi bi-sun"></i> Light Mode</> : 
                <><i className="bi bi-moon"></i> Dark Mode</>
              }
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="row mb-4">
      <div className="col-md-3 mb-3">
        <div className="card stats-card shadow-sm h-100">
          <div className="card-body text-center">
            <h5 className="card-title text-primary">Total Events</h5>
            <h2 className="display-4 fw-bold text-primary">{stats.total}</h2>
          </div>
        </div>
      </div>
      <div className="col-md-3 mb-3">
        <div className="card stats-card shadow-sm h-100" style={{borderLeft: '6px solid var(--success-color)'}}>
          <div className="card-body text-center">
            <h5 className="card-title text-success">Safe</h5>
            <h2 className="display-4 fw-bold text-success">{stats.safe}</h2>
          </div>
        </div>
      </div>
      <div className="col-md-3 mb-3">
        <div className="card stats-card shadow-sm h-100" style={{borderLeft: '6px solid var(--warning-color)'}}>
          <div className="card-body text-center">
            <h5 className="card-title text-warning">Suspicious</h5>
            <h2 className="display-4 fw-bold text-warning">{stats.suspicious}</h2>
          </div>
        </div>
      </div>
      <div className="col-md-3 mb-3">
        <div className="card stats-card shadow-sm h-100" style={{borderLeft: '6px solid var(--danger-color)'}}>
          <div className="card-body text-center">
            <h5 className="card-title text-danger">Dangerous</h5>
            <h2 className="display-4 fw-bold text-danger">{stats.dangerous}</h2>
          </div>
        </div>
      </div>
    </div>
      
      {/* Logs table */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">File Activity Logs</h5>
          <div className="d-flex align-items-center">
            {isLoading ? (
              <>
                <div className="spinner-grow spinner-grow-sm text-primary me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span>Loading...</span>
              </>
            ) : (
              <>
                <div className="spinner-grow spinner-grow-sm text-success me-2" role="status">
                  <span className="visually-hidden">Active</span>
                </div>
                <span>Monitoring Active</span>
              </>
            )}
          </div>
        </div>
        <div className="card-body" >
          {error ? (
            <div className="alert alert-warning">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
              <div className="mt-2">
                <small>Using cached data if available...</small>
              </div>
            </div>
          ) : isLoading && logs.length === 0 ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading logs...</p>
            </div>
          ) : logs.length === 0 ? (
            <div className="alert alert-info">
              <i className="bi bi-info-circle me-2"></i>
              No logs found. New events will appear here as they occur.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>File</th>
                    <th>Event</th>
                    <th>Risk Level</th>
                    <th>Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                {logs.map(log => (
  <tr 
    key={log.id}
    className="log-entry"
    style={{
      borderLeft: `6px solid ${
        log.risk_level === 'dangerous' ? 'var(--danger-color)' : 
        log.risk_level === 'suspicious' ? 'var(--warning-color)' : 
        'var(--success-color)'
      }`,
      color: isDarkMode ? 'var(--text-color)' : 'inherit'
    }}
  >
    <td>
      <div className="fw-bold" style={{ color: isDarkMode ? 'var(--text-color)' : 'inherit' }}>{getFileName(log.file_path)}</div>
      <small className="text-muted" style={{ color: isDarkMode ? 'var(--text-color)' : 'inherit' }}>{log.file_path}</small>
    </td>
    <td>
      <span className={`badge ${
        log.change_type === 'created' ? 'bg-success' :
        log.change_type === 'deleted' ? 'bg-danger' :
        log.change_type === 'modified' ? 'bg-info' : 'bg-secondary'
      }`}>
        {log.change_type?.toUpperCase()}
      </span>
    </td>
    <td>
      <span className={`badge ${
        log.risk_level === 'dangerous' ? 'bg-danger' : 
        log.risk_level === 'suspicious' ? 'bg-warning text-dark' : 
        'bg-success'
      }`}>
        {log.risk_level?.toUpperCase()}
      </span>
    </td>
    <td style={{ color: isDarkMode ? 'var(--text-color)' : 'inherit' }}>{formatTime(log.timestamp)}</td>
    <td>
      {(log.risk_level === 'dangerous' || log.risk_level === 'suspicious') && (
        <button 
          className="btn btn-sm btn-outline-primary"
          onClick={() => askChatGPT(log)}
        >
          <i className="bi bi-chat-dots me-1"></i>
          Ask ChatGPT
        </button>
      )}
    </td>
  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileLog;