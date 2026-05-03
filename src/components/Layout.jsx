import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ title, subtitle, children, rightContent }) => {
  return (
    <div className="min-h-screen pb-20 custom-scrollbar">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <Link to="/">
              <h1 className="text-xl font-extrabold text-stone-900 tracking-tight">
                JavaScript <span className="text-teal-600">{title}</span>
              </h1>
            </Link>
            <p className="text-xs text-stone-500 font-medium uppercase tracking-widest">
              {subtitle}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {rightContent}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 mt-12">
        {children}
      </main>
    </div>
  );
};

export default Layout;
