import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import QuizPage from './pages/QuizPage';
import GuidePage from './pages/GuidePage';

// Data imports
import basicQuizData from './data/js-quiz-basic.json';
import advancedQuizData from './data/js-quiz-advanced.json';
import fundamentalsGuideData from './data/js-guide-fundamentals.json';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/basic-quiz" 
          element={
            <QuizPage 
              data={basicQuizData} 
              title="Basic Quiz" 
              subtitle="50 Fundamental Questions" 
            />
          } 
        />
        <Route 
          path="/advanced-quiz" 
          element={
            <QuizPage 
              data={advancedQuizData} 
              title="Advanced Quiz" 
              subtitle="50 Advanced Concepts" 
            />
          } 
        />
        <Route 
          path="/fundamentals-guide" 
          element={
            <GuidePage 
              data={fundamentalsGuideData} 
              title="Fundamentals Guide" 
              subtitle="25 Core Concepts Explained" 
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
