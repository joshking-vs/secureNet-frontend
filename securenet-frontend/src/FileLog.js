import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FileLog() {
  const [logs, setLogs] = useState([]);
  const [displayedKeys, setDisplayedKeys] = useState(new Set());
  const [showOlder, setShowOlder] = useState(false);

  useEffect(() => {
    const fetchLogs = () => {
      axios.get('/api/file-logs/')
        .then(response => {
          const seen = new Set();
          const uniqueLogs = [];

          response.data.forEach(log => {
            const label = log.change_type.toLowerCase() === 'renamed' ? 'modified' : log.change_type;
            const key = `${log.file_path}-${label}`;

            if (!seen.has(key)) {
              seen.add(key);
              uniqueLogs.push(log);

              if (!displayedKeys.has(key)) {
                const displayLabel = log.change_type.toLowerCase() === 'renamed'
                  ? 'MODIFIED (RENAMED)'
                  : log.change_type.toUpperCase();

                toast.info(`${displayLabel}: ${log.file_path}`, {
                  position: "top-right",
                  autoClose: 5000,
                });

                displayedKeys.add(key);
              }
            }
          });

          uniqueLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          setLogs(uniqueLogs);
          setDisplayedKeys(new Set(seen));
        })
        .catch(error => {
          console.error('Error fetching logs:', error);
        });
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 3000);
    return () => clearInterval(interval);
  }, [displayedKeys]);

  const recentLogs = logs.slice(0, 5);
  const olderLogs = logs.slice(5);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-primary">📁 File Activity Logs</h2>

      {recentLogs.length === 0 ? (
        <div className="alert alert-info">No file activity recorded.</div>
      ) : (
        <div className="list-group mb-3">
          {recentLogs.map((log, index) => {
            const isRename = log.change_type.toLowerCase() === 'renamed';
            const label = isRename ? 'MODIFIED (RENAMED)' : log.change_type.toUpperCase();

            return (
              <div key={index} className="list-group-item">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className={`mb-1 text-uppercase ${isRename ? 'text-warning' : 'text-success'}`}>
                    {label}
                  </h5>
                  <small className="text-secondary">{new Date(log.timestamp).toLocaleString()}</small>
                </div>
                <p className="mb-1 text-muted small">{log.file_path}</p>
              </div>
            );
          })}
        </div>
      )}

      {olderLogs.length > 0 && (
        <div>
          <button
            className="btn btn-outline-secondary mb-2"
            onClick={() => setShowOlder(!showOlder)}
          >
            {showOlder ? 'Hide Older Logs' : `Show Older Logs (${olderLogs.length})`}
          </button>

          {showOlder && (
            <div className="list-group">
              {olderLogs.map((log, index) => {
                const isRename = log.change_type.toLowerCase() === 'renamed';
                const label = isRename ? 'MODIFIED (RENAMED)' : log.change_type.toUpperCase();

                return (
                  <div key={index} className="list-group-item">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className={`mb-1 text-uppercase ${isRename ? 'text-warning' : 'text-success'}`}>
                        {label}
                      </h5>
                      <small className="text-secondary">{new Date(log.timestamp).toLocaleString()}</small>
                    </div>
                    <p className="mb-1 text-muted small">{log.file_path}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FileLog;
