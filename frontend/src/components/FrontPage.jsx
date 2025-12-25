

import React, { useContext, useEffect } from "react";
import Typed from "typed.js";
import { Eye } from 'lucide-react';
import Examplepages from './Examplepage.jsx'
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from "./ThemeContext.jsx";
// import { MdDarkMode } from "react-icons/md";
import Switch from "./Switch.jsx";

const features = [
  "AI-powered resume analysis with instant ATS compatibility scoring.",
  "Create professional resumes in minutes with intelligent formatting.",
  "Real-time suggestions to optimize your resume content for maximum impact.",
  "Choose from ATS-optimized templates designed by industry experts.",
  "Comprehensive resume analysis including keyword optimization and formatting checks.",
  "Smart content recommendations based on your industry and experience level.",
  "Export your resume in multiple formats: PDF, HTML/CSS, and JSON.",
  "Privacy-first approach — your data is never saved or shared.",
  "Live preview as you build — see changes in real-time.",
  "AI-powered content enhancement to make your achievements stand out.",
  "Supports multiple resume templates for different industries and roles.",
  "Mobile-responsive design with light/dark theme support."
];


const FrontPage = ({ views }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/FileUploadPage');
  };

  const handleViewTemplates = () => {
    navigate('/ViewTemplates');
  };

  const handleFeatures = () => {
    navigate('/Features');
  };

  const handleAboutUs = () => {
    navigate('/AboutUs');
  };

  const { isDark, setIsDark } = useContext(ThemeContext);

  const handleTheme = () => {
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    const typedMobile = new Typed("#mobile-typing-text", {
      strings: features,
      loop: true,
      typeSpeed: 20,
      backSpeed: 15,
      backDelay: 900,
      cursorChar: " ",
    });

    const typed = new Typed("#desktop-typing-text", {
      strings: features,
      loop: true,
      typeSpeed: 20,
      backSpeed: 15,
      backDelay: 900,
      cursorChar: " "
    });

    return () => {
      typedMobile.destroy();
      typed.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-center px-4">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex justify-between items-center w-full px-8 py-4 sampro-nav">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="text-2xl font-bold text-white">
            SAMPRO <span className="text-teal-400">AI</span>
          </h1>
        </div>

        <div className="flex items-center gap-1">
          <button className="sampro-nav-link active" onClick={() => window.location.href = '/'}>
            Home
          </button>
          <button className="sampro-nav-link" onClick={handleContinue}>
            Create Resume
          </button>
          <button className="sampro-nav-link" onClick={handleContinue}>
            Resume Analysis
          </button>
          <button className="sampro-nav-link" onClick={handleFeatures}>
            Features
          </button>
          <button className="sampro-nav-link" onClick={handleViewTemplates}>
            Templates
          </button>
          <button className="sampro-nav-link" onClick={handleAboutUs}>
            About
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="transition-transform hover:scale-110"
            title="Toggle dark/light mode"
            onClick={handleTheme}>
            <Switch />
          </button>
        </div>
      </nav>

      {/* Desktop Hero Section */}
      <div className="hidden md:flex flex-col items-center justify-center flex-1 mt-12 mb-8 sampro-hero">
        <div className="mb-8 text-center max-w-4xl px-4">
          <h1 className="text-5xl font-extrabold mb-6 text-slate-800 dark:text-white leading-tight">
            Master Your Career<br />with AI-Powered Resumes
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Experience the future of resume building. AI-powered analysis, ATS optimization, and professional templates powered by SamproAI.
          </p>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Start Your Journey</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">Select a mode to begin your AI-powered resume creation.</p>

            <div className="flex gap-4 justify-center">
              <button className="sampro-btn-primary" onClick={handleContinue}>
                Create Resume
              </button>
              <button className="sampro-btn-secondary" onClick={handleViewTemplates}>
                View Templates
              </button>
            </div>
          </div>
        </div>

        <Examplepages />

        <div className="mt-8 mb-8 px-6 py-4 sampro-card min-h-[80px] flex items-center justify-center max-w-4xl">
          <span id="desktop-typing-text" className="hidden md:inline-block text-base md:text-lg text-slate-700 dark:text-slate-200 font-normal"></span>
        </div>
      </div>


      {/* Mobile View */}
      <nav className="flex md:hidden justify-between items-center w-full px-6 py-4 sampro-nav">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <h1 className="text-xl font-bold text-white">
            SAMPRO <span className="text-teal-400">AI</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="transition-transform hover:scale-110"
            onClick={handleTheme}>
            <Switch />
          </button>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold" onClick={handleContinue}>
            Start
          </button>
        </div>
      </nav>

      {/* Mobile Hero Section */}
      <div className="md:hidden flex justify-center flex-col items-center flex-grow px-4 py-8 sampro-hero">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-slate-800 dark:text-white leading-tight">
            Master Your Career with AI-Powered Resumes
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 mb-6">
            AI-powered resume analysis and building for your success.
          </p>
        </div>

        <div className="w-full max-w-md px-4 py-3 sampro-card mb-6">
          <span id="mobile-typing-text" className="md:hidden text-sm sm:text-base text-slate-700 dark:text-slate-200 font-normal block min-h-[50px]"></span>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-md">
          <button
            onClick={handleContinue}
            className="sampro-btn-primary w-full"
          >
            Create Resume
          </button>
          <button
            onClick={handleViewTemplates}
            className="sampro-btn-secondary w-full"
          >
            View Templates
          </button>
        </div>
      </div>

      <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <button
          onClick={handleAboutUs}
          className="text-slate-600 dark:text-slate-300 px-6 py-2 sampro-card hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 font-medium"
        >
          About Us
        </button>
      </div>

      {/* <p className="text-sm sm:text-lg text-gray-500 font-semibold mb-4">       Here the desktop span are with mobile id
        <span id="mobile-typing-text" className="hidden md:inline-block text-xl md:text-2xl text-gray-800 h-6 mb-3 dark:text-white"></span>
      </p> */}
    </div>

  );
};

export default FrontPage;
