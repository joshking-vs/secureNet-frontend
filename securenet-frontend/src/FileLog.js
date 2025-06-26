import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FileLog() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch file logs from backend (using Axios)
    axios.get('/api/file-logs/')  // Adjust the endpoint if needed
      .then(response => {
        console.log( 'logs fetched', response.data);
        setLogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching file logs:', error);
      });
  }, []);  // The empty array ensures this runs only once (component mount)

  return (
    <div>
      <h1>File Activity Logs</h1>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            <strong>{log.change_type}</strong>: {log.file_path} at {log.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileLog;
