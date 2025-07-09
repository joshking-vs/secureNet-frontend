import logo from './logo.svg';
import './App.css';
import FileLog from './FileLog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BootstrapPractice from './test';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <FileLog />
      {/* <BootstrapPractice /> */}
    </div>
  );
}

export default App;
