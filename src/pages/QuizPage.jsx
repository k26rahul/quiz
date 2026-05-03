import React, { useState } from 'react';
import Layout from '../components/Layout';
import QuizEngine from '../components/QuizEngine';

const QuizPage = ({ data, title, subtitle }) => {
  const [isLearningMode, setIsLearningMode] = useState(false);

  React.useEffect(() => {
    document.title = `JS Quiz: ${title}`;
  }, [title]);

  const rightContent = (
    <div className="flex items-center gap-3 bg-stone-100 px-4 py-2 rounded-full border border-stone-200">
      <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">Learning Mode</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          className="sr-only peer" 
          checked={isLearningMode}
          onChange={(e) => setIsLearningMode(e.target.checked)}
        />
        <div className="w-10 h-5 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
      </label>
    </div>
  );

  return (
    <Layout title={title} subtitle={subtitle} rightContent={rightContent}>
      <QuizEngine 
        questions={data} 
        isLearningMode={isLearningMode} 
        setIsLearningMode={setIsLearningMode} 
      />
    </Layout>
  );
};

export default QuizPage;
