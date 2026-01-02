
import React, { useContext, useEffect } from "react";
import Typed from "typed.js";
import Examplepages from './Examplepage.jsx'
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from "./ThemeContext.jsx";
import Navbar from "./Navbar.jsx";

const features = [
  "AI-powered analysis",
  "ATS-friendly templates",
  "Instant optimization",
  "Real-time preview",
  "Smart suggestions",
  "Privacy focussed"
];

const FrontPage = () => {
  const navigate = useNavigate();
  const { isDark, setIsDark } = useContext(ThemeContext);

  const handleContinue = () => navigate('/FileUploadPage');
  const handleViewTemplates = () => navigate('/ViewTemplates');

  useEffect(() => {
    const typed = new Typed("#hero-typing-text", {
      strings: features,
      typeSpeed: 40,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
      cursorChar: "|",
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden selection:bg-teal-500 selection:text-white">

      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/30 dark:bg-indigo-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-200/30 dark:bg-teal-900/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Use Shared Navbar with Auth */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-12 pb-8 relative z-10 w-full max-w-7xl mx-auto">

        {/* Hero Text */}
        <div className="text-center max-w-4xl mx-auto mb-12 animate-float">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-sm font-semibold tracking-wide">
            ✨ The Next Gen Resume Builder
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight text-slate-900 dark:text-white">
            Build Your Future <br className="hidden md:block" />with <span className="text-gradient-primary animate-title-glow">Intelligent AI</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Craft a professional resume in minutes. <br className="hidden sm:block" />
            <span className="font-semibold text-teal-600 dark:text-teal-400" id="hero-typing-text"></span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn-glow-primary w-full sm:w-auto" onClick={handleContinue}>
              Create My Resume
            </button>
            <button className="btn-outline-modern w-full sm:w-auto" onClick={handleViewTemplates}>
              View Templates
            </button>
          </div>
        </div>

        {/* Templates Showcase */}
        <div className="w-full relative animate-fade-in mt-16" style={{ animationDelay: '0.3s' }}>

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 px-2">
            <div>
              <div className="inline-block px-3 py-1 mb-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                Premium Collection
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Templates</span>
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-lg mt-2 max-w-2xl">
                Choose from our curated collection of high-performing designs that get you hired faster.
              </p>
            </div>
            <button onClick={handleViewTemplates} className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:shadow-lg hover:scale-105 transition-all text-sm">
              View All Templates <span>→</span>
            </button>
          </div>

          {/* Full Width Animation Container */}
          <div className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/50 dark:via-blue-900/5 to-transparent pointer-events-none" />

            <div className="py-10">
              <Examplepages />
            </div>
          </div>
        </div>

      </main>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden glass-nav fixed bottom-0 w-full p-4 flex justify-around border-t z-50">
        <button onClick={() => navigate('/')} className="flex flex-col items-center text-xs gap-1 text-teal-600 dark:text-teal-400">
          <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">🏠</div>
          <span>Home</span>
        </button>
        <button onClick={handleContinue} className="flex flex-col items-center text-xs gap-1 text-slate-500 dark:text-slate-400 hover:text-teal-500">
          <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">📄</div>
          <span>Create</span>
        </button>
        <button onClick={handleViewTemplates} className="flex flex-col items-center text-xs gap-1 text-slate-500 dark:text-slate-400 hover:text-teal-500">
          <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">🎨</div>
          <span>Templates</span>
        </button>
      </div>

    </div>
  );
};

export default FrontPage;
