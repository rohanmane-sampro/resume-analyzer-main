import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import {
    Sparkles,
    FileText,
    Zap,
    Shield,
    Download,
    Eye,
    Bot,
    Palette,
    Clock,
    CheckCircle,
    TrendingUp
} from 'lucide-react';

const Features = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <Sparkles className="w-8 h-8" />,
            title: "AI-Powered Resume Building",
            description: "Create professional resumes in 8-10 minutes with intelligent AI assistance guiding you through every step.",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: <FileText className="w-8 h-8" />,
            title: "Smart Resume Parsing",
            description: "Upload your existing PDF or DOCX resume and let our AI extract and structure the data automatically - completely free!",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: <Palette className="w-8 h-8" />,
            title: "6 Professional Templates",
            description: "Choose from high-performing, ATS-optimized templates designed by professionals to get you hired faster.",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: <Eye className="w-8 h-8" />,
            title: "Live Preview",
            description: "See your resume update in real-time as you enter information. Complete transparency and control over your content.",
            color: "from-orange-500 to-red-500"
        },
        {
            icon: <Bot className="w-8 h-8" />,
            title: "AI Assistant Bot",
            description: "Get smart, real-time suggestions to improve your content. The assistant helps you craft compelling descriptions.",
            color: "from-indigo-500 to-purple-500"
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "ATS Optimization",
            description: "All templates are optimized for Applicant Tracking Systems, ensuring your resume passes automated screenings.",
            color: "from-teal-500 to-green-500"
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "100% Privacy Guaranteed",
            description: "Your data is never saved or shared. We ensure full privacy and security for all your personal information.",
            color: "from-red-500 to-pink-500"
        },
        {
            icon: <Download className="w-8 h-8" />,
            title: "Multiple Export Formats",
            description: "Download your resume in PDF, HTML/CSS, or JSON format. Perfect for different use cases and platforms.",
            color: "from-yellow-500 to-orange-500"
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Auto-Fill with JSON",
            description: "Save time on future visits by using auto-filled JSON data. Skip re-entering information effortlessly.",
            color: "from-cyan-500 to-blue-500"
        },
        {
            icon: <CheckCircle className="w-8 h-8" />,
            title: "Proven Resume Structure",
            description: "Each section follows best practices backed by HR research and industry standards for maximum impact.",
            color: "from-pink-500 to-rose-500"
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: "Quick & Efficient",
            description: "Build a complete professional resume in just 8-10 minutes. Fast, stress-free, and highly efficient process.",
            color: "from-violet-500 to-purple-500"
        },
        {
            icon: <Palette className="w-8 h-8" />,
            title: "Light/Dark Theme",
            description: "Supports both light and dark themes with responsive layout for comfortable viewing on all screen sizes.",
            color: "from-slate-500 to-gray-500"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Navbar */}
            <Navbar />

            <div className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12 mt-8">
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-6">
                            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            <span className="text-purple-700 dark:text-purple-300 font-semibold">Powerful Features</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-slate-800 dark:text-white px-4">
                            Everything You Need to
                            <br />
                            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                                Build Your Perfect Resume
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto px-4">
                            Discover the powerful features that make SAMPRO AI the ultimate resume building platform.
                            AI-powered, ATS-optimized, and completely free.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative bg-white dark:bg-slate-800 rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-200 dark:border-slate-700"
                            >
                                {/* Icon with gradient background */}
                                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-lg lg:text-xl font-bold text-slate-800 dark:text-white mb-3">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm lg:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Hover effect gradient border */}
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 lg:p-12 shadow-2xl">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                            Ready to Build Your Dream Resume?
                        </h2>
                        <p className="text-lg sm:text-xl text-purple-100 mb-8">
                            Join thousands of professionals who have already created their perfect resume with SAMPRO AI.
                        </p>
                        <button
                            onClick={() => navigate('/FileUploadPage')}
                            className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-600 rounded-xl font-bold text-base sm:text-lg hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            Start Building Now →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
