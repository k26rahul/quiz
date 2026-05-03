import React, { useEffect } from 'react';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';

const GuideEngine = ({ items }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [items]);

  // Group items by category
  const categories = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-8 sm:space-y-16">
      {Object.entries(categories).map(([category, items]) => (
        <section key={category} className="space-y-6">
          <div className="flex items-center gap-4 px-2">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-teal-600 whitespace-nowrap">
              {category}
            </h2>
            <div className="h-px w-full bg-stone-200"></div>
          </div>

          <div className="grid gap-4 sm:gap-6">
            {items.map((item) => (
              <div 
                key={item.id}
                className="bg-white p-5 sm:p-8 rounded-3xl shadow-sm border border-stone-200 hover:border-stone-300 transition-all group"
              >
                <h3 className="text-xl font-bold text-stone-900 mb-4 sm:mb-6 group-hover:text-teal-700 transition-colors">
                  {item.question}
                </h3>
                <div 
                  className="prose max-w-none break-words text-stone-700 leading-relaxed font-medium"
                  dangerouslySetInnerHTML={{ __html: marked.parse(item.markdown) }}
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default GuideEngine;
