import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';

const QuizEngine = ({ questions, isLearningMode, setIsLearningMode }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    Prism.highlightAll();
  }, [questions, userAnswers, isSubmitted, isLearningMode, answeredQuestions]);

  const handleSelect = (questionId, optionId) => {
    if (isSubmitted || (isLearningMode && answeredQuestions[questionId])) return;
    
    setUserAnswers(prev => ({ ...prev, [questionId]: optionId }));
    
    if (isLearningMode) {
      setAnsweredQuestions(prev => ({ ...prev, [questionId]: true }));
    }
  };

  const submitQuiz = () => {
    if (!isSubmitted && Object.keys(userAnswers).length < questions.length) {
      if (!window.confirm("You haven't answered all questions. Show answers and feedback anyway?")) {
        return;
      }
    }

    let finalScore = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correct) {
        finalScore++;
      }
    });

    setScore(finalScore);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getScoreColor = () => {
    if (score > (questions.length * 0.8)) return 'text-green-600';
    if (score > (questions.length * 0.5)) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-10">
      {isSubmitted && (
        <div className="p-8 bg-white rounded-3xl shadow-xl border-2 border-teal-500 text-center revealed">
          <h2 className="text-2xl font-black text-stone-900 mb-2">Assessment Complete</h2>
          <div className={`text-6xl font-black mb-4 ${getScoreColor()}`}>
            {score} / {questions.length}
          </div>
          <p className="text-stone-500 max-w-xs mx-auto text-sm leading-relaxed mb-6">
            Review your answers below. The feedback sections contain key insights for each question.
          </p>
          <button 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
            className="text-teal-600 font-bold hover:underline text-sm uppercase tracking-widest"
          >
            Scroll to Top
          </button>
        </div>
      )}

      <div id="quiz-container" className="space-y-10">
        {questions.map((q, index) => {
          const isRevealed = isSubmitted || (isLearningMode && answeredQuestions[q.id]);
          const isSelected = userAnswers[q.id];

          return (
            <div 
              key={q.id}
              className={`bg-white p-8 rounded-3xl shadow-sm border ${isRevealed ? 'border-stone-300' : 'border-stone-200'} transition-all`}
            >
              <div className="mb-6">
                <span className="text-[10px] font-black uppercase text-teal-600 tracking-[0.2em] mb-2 block">
                  Question {index + 1} &middot; {q.topic}
                </span>
                <div 
                  className="prose max-w-none text-stone-900 text-lg leading-relaxed font-medium"
                  dangerouslySetInnerHTML={{ __html: marked.parse(q.text) }}
                />
              </div>

              <div className="space-y-3 mt-6">
                {q.options.map(opt => {
                  const isOptChecked = userAnswers[q.id] === opt.id;
                  let extraClasses = 'border-stone-200 bg-white';
                  let optionBoxContent = null;
                  let optionBoxClasses = 'w-6 h-6 rounded-full border-2 border-stone-300 mr-4 flex-shrink-0 flex items-center justify-center bg-white transition-all';

                  if (isRevealed) {
                    if (opt.id === q.correct) {
                      extraClasses = 'option-correct shadow-inner-sm ring-1 ring-green-200';
                      optionBoxContent = <span className="text-2xl leading-none text-green-600 font-black">✔</span>;
                      optionBoxClasses = 'w-8 h-8 mr-3 flex-shrink-0 flex items-center justify-center bg-transparent';
                    } else if (isOptChecked && opt.id !== q.correct) {
                      extraClasses = 'option-wrong ring-1 ring-red-200';
                      optionBoxContent = <span className="text-2xl leading-none text-red-600 font-black">✖</span>;
                      optionBoxClasses = 'w-8 h-8 mr-3 flex-shrink-0 flex items-center justify-center bg-transparent';
                    } else {
                      extraClasses = 'border-stone-100 bg-stone-50/50 option-faded grayscale-[0.5]';
                    }
                  } else if (isOptChecked) {
                    optionBoxContent = <div className="w-3 h-3 bg-white rounded-full"></div>;
                  }

                  return (
                    <label 
                      key={opt.id}
                      className={`option-label flex items-center p-5 border-2 rounded-2xl relative ${extraClasses} ${isRevealed ? 'option-disabled cursor-default' : ''}`}
                    >
                      <input 
                        type="radio" 
                        name={`question-${q.id}`}
                        value={opt.id}
                        className="option-input sr-only"
                        checked={isOptChecked}
                        onChange={() => handleSelect(q.id, opt.id)}
                        disabled={isRevealed}
                      />
                      <div className={`option-box ${optionBoxClasses}`}>
                        {optionBoxContent}
                      </div>
                      <span 
                        className="text-stone-800 font-medium prose-inline text-sm md:text-base"
                        dangerouslySetInnerHTML={{ __html: marked.parseInline(opt.text) }}
                      />
                    </label>
                  );
                })}
              </div>

              {isRevealed && (
                <div className="mt-8 p-6 bg-teal-50/50 border border-teal-100 rounded-2xl revealed">
                  <h4 className="text-xs font-black text-teal-800 mb-2 uppercase tracking-widest flex items-center gap-2">
                    Feedback
                  </h4>
                  <div 
                    className="prose max-w-none text-sm text-teal-900 leading-relaxed font-medium"
                    dangerouslySetInnerHTML={{ __html: marked.parse(q.feedback) }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!isSubmitted && (
        <div className="mt-16 flex justify-center">
          <button 
            onClick={submitQuiz}
            className="bg-stone-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-stone-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-stone-200 uppercase tracking-widest text-sm"
          >
            Submit Assessment
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizEngine;
