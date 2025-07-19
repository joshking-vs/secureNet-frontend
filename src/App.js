import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnalyzePage from "./pages/AnalyzePage";
import FeedbackPage from "./pages/FeedbackPage";
import HistoryPage from "./pages/HistoryPage";
import FeedbackHistoryPage from './pages/FeedbackHistoryPage';



function App() {
  return (

    <Router>
      <div className="container">
        <h1>SMS Feedback System</h1>
         
        <Routes>
          <Route path="/" element={<AnalyzePage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/feedback-history" element={<FeedbackHistoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
