import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import QuizEngine from '../components/QuizEngine';
import manifest from '../data/manifest.json';

const QuizPage = () => {
  const { slug } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLearningMode, setIsLearningMode] = useState(false);

  useEffect(() => {
    const item = manifest.find(i => i.slug === slug);
    if (item) {
      setMeta(item);
      document.title = `${item.category} Quiz: ${item.title}`;
      
      fetch(`/data/${item.dataFile}`)
        .then(res => res.json())
        .then(data => {
          setQuizData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch quiz data:', err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!quizData || !meta) {
    return (
      <Layout title="Not Found" subtitle="Quiz not found">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-stone-800">Quiz not found</h2>
          <p className="text-stone-500 mt-2">The quiz you are looking for does not exist.</p>
        </div>
      </Layout>
    );
  }

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
        <div className="w-10 h-5 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
      </label>
    </div>
  );

  return (
    <Layout title={meta.title} subtitle={meta.description} rightContent={rightContent} prefix={meta.category}>
      <QuizEngine 
        questions={quizData} 
        isLearningMode={isLearningMode} 
        setIsLearningMode={setIsLearningMode} 
      />
    </Layout>
  );
};

export default QuizPage;
