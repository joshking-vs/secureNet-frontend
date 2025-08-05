import React from 'react';
// Remove the .js extension from the import
import FileLog from './components/FileLog';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Dashboard.css';

function App() {
  return (
    <div className="App">
      <FileLog />
    </div>
  );
}

export default App;