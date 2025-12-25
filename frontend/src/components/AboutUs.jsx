import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
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
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Intelligence",
      description: "Leveraging advanced AI to parse resumes, provide suggestions, and optimize content for ATS systems.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy First",
      description: "Your data is never stored or shared. All processing happens in real-time with complete privacy.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Create professional resumes in just 8-10 minutes with our streamlined, efficient workflow.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Beautiful Templates",
      description: "6 professionally designed, ATS-optimized templates to showcase your skills perfectly.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Navbar */}
      <Navbar />

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-700 dark:text-blue-300 font-semibold">About SAMPRO AI</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-slate-800 dark:text-white">
              AI-Powered Resume Builder
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                For Modern Professionals
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              SAMPRO AI is a cutting-edge resume building platform that combines artificial intelligence
              with professional design to help you create the perfect resume in minutes.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-16 bg-white dark:bg-slate-800 rounded-3xl p-8 lg:p-12 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Our Mission</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              We believe that everyone deserves access to professional resume-building tools without
              compromising on quality or privacy. Our mission is to democratize resume creation by
              providing a free, AI-powered platform that delivers professional results.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Whether you're a fresh graduate, experienced professional, or career changer, SAMPRO AI
              helps you present your skills and experience in the best possible light.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-12">
              What Makes Us Different
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-200 dark:border-slate-700"
                >
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${highlight.color} text-white mb-4`}>
                    {highlight.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
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
          <div className="mb-16 bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 rounded-3xl p-8 lg:p-12 shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <Code className="w-8 h-8 text-teal-400" />
              <h2 className="text-3xl font-bold text-white">Built With Modern Technology</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <p className="text-white font-semibold text-lg">{tech.name}</p>
                  <p className="text-teal-300 text-sm">{tech.category}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-center text-white shadow-xl">
              <div className="text-5xl font-bold mb-2">6</div>
              <div className="text-lg font-semibold">Professional Templates</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-8 text-center text-white shadow-xl">
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-lg font-semibold">Free Forever</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-8 text-center text-white shadow-xl">
              <div className="text-5xl font-bold mb-2">8-10</div>
              <div className="text-lg font-semibold">Minutes to Complete</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 lg:p-12 shadow-2xl">
            <Users className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Create Your Perfect Resume?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have already built their dream resumes with SAMPRO AI.
            </p>
            <button
              onClick={() => navigate('/FileUploadPage')}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Get Started Now →
            </button>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center text-slate-600 dark:text-slate-400">
            <p className="text-sm">
              © 2025 SAMPRO AI. All rights reserved. | Built with ❤️ for job seekers everywhere.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
