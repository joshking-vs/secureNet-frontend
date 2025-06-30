import logo from './logo.svg';
import PhishingChecker from './components/PhishingChecker';
import './App.css';
import FileLog from './FileLog';

function App() {
  return (
    <div className="App">
      {/* <FileLog /> */}
      <PhishingChecker />
    </div>
  );
}


export default App;
