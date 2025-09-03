import React, { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import "./AuthForms.css";

function LandingPage({ onAuth }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    // Fullscreen container, flex column, aligns content center
    <div className="auth-fullscreen-container"> {/* Custom fullscreen class */}
      <div className="auth-card shadow d-flex flex-column justify-content-center align-items-center"> {/* Bootstrap: shadow, flex-column, center */}
        <div className="switcher-btns mb-4 d-flex justify-content-center"> {/* Bootstrap: margin-bottom, flex row-center */}
          <button
            className={`btn rounded-5 btn-outline-primary ${showLogin ? "active" : ""}`} // Bootstrap button
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
          <button
            className={`btn rounded-5 btn-outline-success ${!showLogin ? "active" : ""}`} // Bootstrap button
            onClick={() => setShowLogin(false)}
          >
            Signup
          </button>
        </div>
        {/* The Forms */}
        <div className="w-100"> {/* Bootstrap: 100% width */}
          {showLogin ? (
            <LoginForm onAuth={onAuth} />
          ) : (
            <SignupForm onAuth={onAuth} />
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;