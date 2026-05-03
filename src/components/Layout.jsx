import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ title, subtitle, children, rightContent, prefix = "Study", showHomeButton = true }) => {
  return (
    <div className="min-h-screen pb-20 custom-scrollbar">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            {showHomeButton && (
              <Link 
                to="/" 
                className="w-10 h-10 flex items-center justify-center bg-stone-100 rounded-xl hover:bg-orange-100 hover:text-orange-600 transition-all group"
                title="Back to Hub"
              >
                <svg className="w-6 h-6 text-stone-400 group-hover:text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
            )}
            <div className="min-w-0">
              <h1 className="text-xl font-extrabold text-stone-900 tracking-tight">
                {prefix} <span className="text-orange-600">{title}</span>
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 mt-6 sm:mt-12">
        {(subtitle || rightContent) && (
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
            {subtitle && (
              <p className="text-base text-stone-500 font-medium leading-relaxed max-w-xl">
                {subtitle}
              </p>
            )}
            {rightContent && (
              <div className="flex-shrink-0 self-start">
                {rightContent}
              </div>
            )}
          </div>
        )}
        {children}
      </main>
    </div>
  );
};

export default Layout;
