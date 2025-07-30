import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import URLScanner from "./components/URLScanner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>🛡️ SecureNet AI</h1>
          <p>Detect suspicious or cloned websites using AI-powered scanning</p>

          {/* 🧭 Navigation Bar */}
          <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="/login">Login</Link> |{" "}
            <Link to="/signup">Signup</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<URLScanner />} />
          </Routes>
        </main>

        <footer>
          <p>&copy; {new Date().getFullYear()} SecureNet.ai — Web Threat Detection</p>
        </footer>

        <ToastContainer position="top-right" autoClose={4000} />
      </div>
    </Router>
  );
}

export default App;

