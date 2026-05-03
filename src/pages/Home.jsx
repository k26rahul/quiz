import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  React.useEffect(() => {
    document.title = 'JS Revision Hub';
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <main className="max-w-xs w-full space-y-3">
        <Link
          to="/basic-quiz"
          className="block bg-white p-5 rounded-2xl border border-stone-200 hover:border-teal-600 transition-colors"
        >
          <span className="font-bold text-stone-900">Basic Quiz</span>
        </Link>
        <Link
          to="/advanced-quiz"
          className="block bg-white p-5 rounded-2xl border border-stone-200 hover:border-teal-600 transition-colors"
        >
          <span className="font-bold text-stone-900">Advanced Quiz</span>
        </Link>
        <Link
          to="/fundamentals-guide"
          className="block bg-white p-5 rounded-2xl border border-stone-200 hover:border-teal-600 transition-colors"
        >
          <span className="font-bold text-stone-900">Fundamentals Guide</span>
        </Link>
      </main>
    </div>
  );
};

export default Home;
