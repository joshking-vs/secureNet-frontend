import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FileLog() {
  const [logs, setLogs] = useState([]);
  const [showOlder, setShowOlder] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalLog, setModalLog] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const seenKeysRef = useRef(new Set());
  const hasInitialized = useRef(false);
  const lastLogIdRef = useRef(null);

  useEffect(() => {
    const fetchLogs = () => {
      axios.get('/api/file-logs/')
        .then(response => {
          const seen = new Set();
          const uniqueLogs = [];

          response.data.forEach(log => {
            const timestampRounded = new Date(log.timestamp).toISOString().split('.')[0];
            const key = `${log.file_path}-${log.change_type}-${timestampRounded}`;

            if (!seen.has(key)) {
              seen.add(key);
              uniqueLogs.push(log);
            }
          });

          uniqueLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

          if (!hasInitialized.current) {
            seen.forEach(key => {
              seenKeysRef.current.add(key);
            });
            hasInitialized.current = true;
            
            // Show modal for most recent log on first load
            if (uniqueLogs.length > 0) {
              setModalLog(uniqueLogs[0]);
              setShowModal(true);
              lastLogIdRef.current = uniqueLogs[0].id;
            }
          } else {
            // Check for new logs and show modal for the most recent one only
            const newLogs = uniqueLogs.filter(log => {
              const timestampRounded = new Date(log.timestamp).toISOString().split('.')[0];
              const key = `${log.file_path}-${log.change_type}-${timestampRounded}`;
              return !seenKeysRef.current.has(key);
            });

            if (newLogs.length > 0) {
              // Show modal for the most recent new log
              setModalLog(newLogs[0]);
              setShowModal(true);
              
              // Show toast for all new logs
              newLogs.forEach(log => {
                const displayLabel = log.change_type.toLowerCase() === 'renamed'
                  ? 'MODIFIED (RENAMED)'
                  : log.change_type.toUpperCase();

                toast.info(`${displayLabel}: ${log.file_path}`, {
                  position: "top-right",
                  autoClose: 5000,
                });

                const timestampRounded = new Date(log.timestamp).toISOString().split('.')[0];
                const key = `${log.file_path}-${log.change_type}-${timestampRounded}`;
                seenKeysRef.current.add(key);
              });
            }
          }

          setLogs(uniqueLogs);
        })
        .catch(error => {
          console.error('Error fetching logs:', error);
        });
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 3000);
    return () => clearInterval(interval);
  }, []);

  const getRiskBadgeClass = (riskLevel) => {
    switch(riskLevel) {
      case 'dangerous': return 'bg-danger';
      case 'suspicious': return 'bg-warning text-dark';
      default: return 'bg-success';
    }
  };

  const getChangeTypeClass = (changeType) => {
    switch(changeType.toLowerCase()) {
      case 'created': return 'text-success';
      case 'deleted': return 'text-danger';
      case 'modified': return 'text-info';
      case 'renamed': return 'text-warning';
      default: return 'text-primary';
    }
  };

  const getChangeTypeIcon = (changeType) => {
    switch(changeType.toLowerCase()) {
      case 'created': return '📄';
      case 'deleted': return '🗑️';
      case 'modified': return '✏️';
      case 'renamed': return '🔄';
      default: return '📋';
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'all' || log.risk_level === filter;
    const matchesSearch = log.file_path.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.change_type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const recentLogs = filteredLogs.slice(0, 5);
  const olderLogs = filteredLogs.slice(5);

  const formatDisplayLabel = (changeType) => {
    return changeType.toLowerCase() === 'renamed' ? 'MODIFIED (RENAMED)' : changeType.toUpperCase();
  };

  const formatFilePath = (filePath) => {
    const parts = filePath.split(/[/\\]/);
    return parts[parts.length - 1]; // Just show filename
  };

  const formatFileDirectory = (filePath) => {
    const parts = filePath.split(/[/\\]/);
    return parts.slice(0, -1).join('/'); // Show directory path
  };

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-body bg-primary text-white">
              <h2 className="mb-0">
                <i className="fas fa-shield-alt me-2"></i>
                File Activity Monitor
              </h2>
              <p className="mb-0 opacity-75">Real-time file system monitoring and threat detection</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <label className="form-label fw-bold">Filter by Risk Level</label>
              <select 
                className="form-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="safe">Safe</option>
                <option value="suspicious">Suspicious</option>
                <option value="dangerous">Dangerous</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <label className="form-label fw-bold">Search Files</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by filename or action..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <h5 className="card-title text-primary">Total Events</h5>
              <h2 className="text-primary">{logs.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <h5 className="card-title text-success">Safe</h5>
              <h2 className="text-success">{logs.filter(l => l.risk_level === 'safe').length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <h5 className="card-title text-warning">Suspicious</h5>
              <h2 className="text-warning">{logs.filter(l => l.risk_level === 'suspicious').length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <h5 className="card-title text-danger">Dangerous</h5>
              <h2 className="text-danger">{logs.filter(l => l.risk_level === 'dangerous').length}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Logs */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom">
              <h5 className="mb-0 text-dark">Recent Activity</h5>
            </div>
            <div className="card-body">
              {recentLogs.length === 0 ? (
                <div className="alert alert-info border-0 shadow-sm">
                  <i className="fas fa-info-circle me-2"></i>
                  No file activity matching your filters.
                </div>
              ) : (
                <div className="row g-3">
                  {recentLogs.map((log, index) => (
                    <div key={index} className="col-12">
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                          <div className="row align-items-center">
                            <div className="col-md-1 text-center">
                              <span style={{ fontSize: '2rem' }}>{getChangeTypeIcon(log.change_type)}</span>
                            </div>
                            <div className="col-md-7">
                              <h6 className={`mb-1 ${getChangeTypeClass(log.change_type)}`}>
                                {formatDisplayLabel(log.change_type)}
                              </h6>
                              <p className="mb-1 fw-bold text-dark">{formatFilePath(log.file_path)}</p>
                              <small className="text-muted">{formatFileDirectory(log.file_path)}</small>
                            </div>
                            <div className="col-md-2 text-center">
                              <span className={`badge ${getRiskBadgeClass(log.risk_level)} px-3 py-2`}>
                                {log.risk_level ? log.risk_level.toUpperCase() : 'SAFE'}
                              </span>
                            </div>
                            <div className="col-md-2 text-end">
                              <small className="text-muted">
                                {new Date(log.timestamp).toLocaleString()}
                              </small>
                            </div>
                          </div>
                          {log.recommendation && (
                            <div className="mt-2 p-2 bg-light rounded">
                              <small className="text-muted">
                                <i className="fas fa-lightbulb me-1"></i>
                                {log.recommendation}
                              </small>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {olderLogs.length > 0 && (
                <div className="mt-4">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => setShowOlder(!showOlder)}
                  >
                    {showOlder ? 'Hide Older Logs' : `Show Older Logs (${olderLogs.length})`}
                  </button>

                  {showOlder && (
                    <div className="row g-3 mt-3">
                      {olderLogs.map((log, index) => (
                        <div key={index} className="col-12">
                          <div className="card border-0 shadow-sm h-100 opacity-75">
                            <div className="card-body">
                              <div className="row align-items-center">
                                <div className="col-md-1 text-center">
                                  <span style={{ fontSize: '1.5rem' }}>{getChangeTypeIcon(log.change_type)}</span>
                                </div>
                                <div className="col-md-7">
                                  <h6 className={`mb-1 ${getChangeTypeClass(log.change_type)}`}>
                                    {formatDisplayLabel(log.change_type)}
                                  </h6>
                                  <p className="mb-1 fw-bold text-dark">{formatFilePath(log.file_path)}</p>
                                  <small className="text-muted">{formatFileDirectory(log.file_path)}</small>
                                </div>
                                <div className="col-md-2 text-center">
                                  <span className={`badge ${getRiskBadgeClass(log.risk_level)} px-3 py-2`}>
                                    {log.risk_level ? log.risk_level.toUpperCase() : 'SAFE'}
                                  </span>
                                </div>
                                <div className="col-md-2 text-end">
                                  <small className="text-muted">
                                    {new Date(log.timestamp).toLocaleString()}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Most Recent Activity */}
      {showModal && modalLog && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="fas fa-bell me-2"></i>
                  Latest File Activity Alert
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row align-items-center mb-3">
                  <div className="col-2 text-center">
                    <span style={{ fontSize: '3rem' }}>{getChangeTypeIcon(modalLog.change_type)}</span>
                  </div>
                  <div className="col-10">
                    <h4 className={`mb-1 ${getChangeTypeClass(modalLog.change_type)}`}>
                      {formatDisplayLabel(modalLog.change_type)}
                    </h4>
                    <p className="mb-1 fw-bold text-dark fs-5">{formatFilePath(modalLog.file_path)}</p>
                    <small className="text-muted">{formatFileDirectory(modalLog.file_path)}</small>
                  </div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Risk Level:</strong>
                    <span className={`badge ${getRiskBadgeClass(modalLog.risk_level)} ms-2 px-3 py-2`}>
                      {modalLog.risk_level ? modalLog.risk_level.toUpperCase() : 'SAFE'}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <strong>Timestamp:</strong>
                    <span className="ms-2">{new Date(modalLog.timestamp).toLocaleString()}</span>
                  </div>
                </div>

                {modalLog.recommendation && (
                  <div className="alert alert-info border-0 shadow-sm">
                    <strong>Recommendation:</strong>
                    <p className="mb-0 mt-2">{modalLog.recommendation}</p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => setShowModal(false)}
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileLog;