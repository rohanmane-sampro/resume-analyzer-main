import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import { ThemeContext } from "./ThemeContext.jsx";
import {
  Sparkles,
  Target,
  Zap,
  Shield,
  Users,
  Code,
  Palette,
  Brain
} from 'lucide-react';

const AboutUs = () => {
  const navigate = useNavigate();

  const technologies = [
    { name: "React.js", category: "Frontend" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Python Flask", category: "Backend" },
    { name: "Groq AI", category: "AI Processing" },
    { name: "PDF Generation", category: "Export" },
    { name: "React Router", category: "Navigation" }
  ];

  const highlights = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Intelligence",
      description: "Leveraging advanced AI to parse resumes, provide suggestions, and optimize content for ATS systems.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy First",
      description: "Your data is never stored or shared. All processing happens in real-time with complete privacy.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Create professional resumes in just 8-10 minutes with our streamlined, efficient workflow.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Beautiful Templates",
      description: "Professionally designed, ATS-optimized templates to showcase your skills perfectly.",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden selection:bg-teal-500 selection:text-white">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-[120px]" />
      </div>

      <Navbar />

      <div className="flex-1 relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 dark:bg-slate-800/50 border border-blue-200 dark:border-blue-800 backdrop-blur-sm mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">About SAMPRO AI</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
              AI-Powered Resume Builder <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                For Modern Professionals
              </span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              SAMPRO AI is a cutting-edge resume building platform that combines artificial intelligence
              with professional design to help you create the perfect resume in minutes.
            </p>
          </div>

          {/* Mission Section */}
          <div className="glass-card p-8 md:p-12 mb-16 bg-white/80 dark:bg-slate-800/80">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
            </div>

            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                We believe that everyone deserves access to professional resume-building tools without
                compromising on quality or privacy. Our mission is to democratize resume creation by
                providing a free, AI-powered platform that delivers professional results.
              </p>
              <p>
                Whether you're a fresh graduate, experienced professional, or career changer, SAMPRO AI
                helps you present your skills and experience in the best possible light.
              </p>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
              What Makes Us Different
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="glass-card p-6 hover:-translate-y-1 transition-transform duration-300 bg-white/70 dark:bg-slate-800/70"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${highlight.gradient} text-white mb-4 shadow-lg`}>
                    {highlight.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {highlight.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <div className="mb-16 glass-card p-8 md:p-12 bg-slate-900/5 text-slate-900 dark:bg-slate-800/50 dark:text-white border-none overflow-hidden relative">
            {/* Background enhancement for this card */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 opacity-50 z-0" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <Code className="w-8 h-8 text-teal-500" />
                <h2 className="text-3xl font-bold">Built With Modern Technology</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="bg-white/60 dark:bg-black/20 backdrop-blur-md rounded-xl p-4 border border-slate-200 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-black/30 transition-all duration-300 shadow-sm"
                  >
                    <p className="font-bold text-lg text-slate-800 dark:text-slate-100">{tech.name}</p>
                    <p className="text-teal-600 dark:text-teal-400 text-sm font-medium">{tech.category}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="glass-card p-8 text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-200 dark:border-purple-800">
              <div className="text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">30+</div>
              <div className="text-lg font-semibold text-slate-700 dark:text-slate-200">Professional Templates</div>
            </div>
            <div className="glass-card p-8 text-center bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-200 dark:border-blue-800">
              <div className="text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">100%</div>
              <div className="text-lg font-semibold text-slate-700 dark:text-slate-200">Free Forever</div>
            </div>
            <div className="glass-card p-8 text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-200 dark:border-green-800">
              <div className="text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">10m</div>
              <div className="text-lg font-semibold text-slate-700 dark:text-slate-200">To Complete</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative rounded-3xl overflow-hidden p-8 md:p-12 text-center shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

            <div className="relative z-10">
              <Users className="w-16 h-16 text-white/90 mx-auto mb-6" />
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Create Your Perfect Resume?
              </h2>
              <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto font-medium">
                Join thousands of professionals who have already built their dream resumes with SAMPRO AI.
              </p>
              <button
                onClick={() => navigate('/FileUploadPage')}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Get Started Now
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center text-slate-500 dark:text-slate-400">
            <p className="text-sm font-medium">
              © 2025 SAMPRO AI. All rights reserved. | Built with ❤️ for job seekers everywhere.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
