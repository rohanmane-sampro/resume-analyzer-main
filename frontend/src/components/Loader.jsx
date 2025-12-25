import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Sampro AI Logo Only */}
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-4xl">S</span>
        </div>
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
          SAMPRO <span className="text-teal-500">AI</span>
        </h1>
      </div>
    </div>
  );
};

export default Loader;