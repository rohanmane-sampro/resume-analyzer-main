
import React, { useContext, useEffect } from "react";
import Typed from "typed.js";
import Examplepages from './Examplepage.jsx'
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from "./ThemeContext.jsx";
import Switch from "./Switch.jsx";

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
  const handleFeatures = () => navigate('/Features');
  const handleAboutUs = () => navigate('/AboutUs');
  const handleAnalyze = () => navigate('/ResumeAnalyze');
  const handleTheme = () => setIsDark((prev) => !prev);

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

      {/* Navigation removed - using global Navbar */}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-12 pb-8 relative z-10 w-full max-w-7xl mx-auto">

        {/* Hero Text */}
        <div className="text-center max-w-4xl mx-auto mb-12 animate-float">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-sm font-semibold tracking-wide">
            ✨ The Next Gen Resume Builder
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight text-slate-900 dark:text-white">
            Build Your Future <br className="hidden md:block" /> with <span className="text-gradient-primary animate-title-glow">Intelligent AI</span>
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
        <div className="w-full relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {/* Glass Card Container for Templates */}
          <div className="glass-card overflow-hidden w-full">
            <div className="p-6 md:p-8 pb-0 flex justify-between items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white">Professional Templates</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base mt-1">Choose from our curated collection of high-performing designs</p>
              </div>
              <button onClick={handleViewTemplates} className="hidden md:flex items-center gap-2 px-6 py-2 rounded-full border border-teal-500/30 text-teal-600 dark:text-teal-400 font-bold hover:bg-teal-500 hover:text-white transition-all">
                View Gallery <span>→</span>
              </button>
            </div>
            <Examplepages />
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
