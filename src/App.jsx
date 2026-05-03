import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import QuizPage from './pages/QuizPage';
import GuidePage from './pages/GuidePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:slug" element={<QuizPage />} />
        <Route path="/guide/:slug" element={<GuidePage />} />
      </Routes>
    </Router>
  );
}

export default App;
