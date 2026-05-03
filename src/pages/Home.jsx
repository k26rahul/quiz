import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import manifest from '../data/manifest.json';

const Home = () => {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    document.title = 'Learning Hub';
    
    // Group manifest items by category
    const grouped = manifest.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
    setCategories(grouped);
  }, []);

  return (
    <Layout 
      title="Hub" 
      subtitle="Select a quiz or guide to start learning"
      prefix="Learning"
      showHomeButton={false}
    >
      <div className="space-y-12">
        {Object.entries(categories).map(([category, items]) => (
          <section key={category} className="space-y-6">
            <h2 className="text-sm font-black text-stone-400 uppercase tracking-[0.2em] border-b border-stone-200 pb-2">
              {category}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((item) => (
                <Link
                  key={item.slug}
                  to={`/${item.type}/${item.slug}`}
                  className="card-tangy group block"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      item.type === 'quiz' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.type}
                    </span>
                    <svg className="w-5 h-5 text-stone-300 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
