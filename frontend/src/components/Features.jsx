import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import { ThemeContext } from "./ThemeContext.jsx";
import {
    Sparkles,
    FileText,
    Zap,
    Shield,
    Download,
    Eye,
    Palette,
    Clock,
    CheckCircle,
    TrendingUp
} from 'lucide-react';

const Features = () => {
    const navigate = useNavigate();
    // Assuming Navbar handles the actual navigation rendering, we just wrap the content.
    // However, if Navbar is the old one, we might need to manually ensure consistency.
    // For now, we update the main content area.

    const features = [
        {
            icon: <Sparkles className="w-6 h-6" />,
            title: "AI-Powered Builder",
            description: "Create professional resumes in minutes with intelligent AI guidance assisting you at every step.",
            gradient: "from-purple-500 to-indigo-500"
        },
        {
            icon: <FileText className="w-6 h-6" />,
            title: "Smart Resume Parsing",
            description: "Upload your existing PDF/DOCX and let our AI automatically extract and structure your data.",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: <Palette className="w-6 h-6" />,
            title: "Premium Templates",
            description: "Access high-performing, ATS-optimized templates designed by industry experts.",
            gradient: "from-emerald-500 to-teal-500"
        },
        {
            icon: <Eye className="w-6 h-6" />,
            title: "Live Real-time Preview",
            description: "See changes instantly as you type. Full control over your specific content layout.",
            gradient: "from-orange-500 to-red-500"
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "ATS Optimization",
            description: "Ensure your resume passes automated screenings with our ATS-friendly structures.",
            gradient: "from-pink-500 to-rose-500"
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "100% Privacy Focused",
            description: "Your data is yours. We never store or share your personal information. Completely secure.",
            gradient: "from-red-500 to-orange-500"
        },
        {
            icon: <Download className="w-6 h-6" />,
            title: "Multi-Format Export",
            description: "Download in PDF, HTML, or JSON. Perfect for all application portals.",
            gradient: "from-indigo-500 to-blue-500"
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Instant JSON Auto-Fill",
            description: "Save time on return visits by auto-filling data from your saved JSON file.",
            gradient: "from-yellow-500 to-amber-500"
        },
        {
            icon: <CheckCircle className="w-6 h-6" />,
            title: "Expert Proven Structure",
            description: "Layouts backed by HR research to maximize your chances of getting hired.",
            gradient: "from-cyan-500 to-teal-500"
        }
    ];

    return (
        <div className="flex flex-col min-h-screen relative overflow-x-hidden selection:bg-teal-500 selection:text-white">
            {/* Background Atmosphere - Consistent with FrontPage */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/30 dark:bg-indigo-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-200/30 dark:bg-teal-900/20 rounded-full blur-[120px]" />
            </div>

            <Navbar />

            <div className="flex-1 relative z-10 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    {/* Header Section */}
                    <div className="text-center mb-16 max-w-3xl mx-auto animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 dark:bg-slate-800/50 border border-purple-200 dark:border-purple-800 backdrop-blur-sm mb-6 shadow-sm">
                            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">New Power Features</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
                            Everything You Need to <br />
                            <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                                Build the Perfect Resume
                            </span>
                        </h1>

                        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                            Discover the suite of powerful tools designed to help you land your dream job faster.
                            Completely free, private, and AI-optimized.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="glass-card p-6 md:p-8 hover:-translate-y-1 transition-transform duration-300 group flex flex-col h-full bg-white/70 dark:bg-slate-800/80"
                            >
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    {feature.title}
                                </h3>

                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base flex-grow">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="relative rounded-3xl overflow-hidden p-8 md:p-12 text-center">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-900 dark:to-blue-900 opacity-90" />
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Ready to Upgrade Your Career?
                            </h2>
                            <p className="text-lg text-purple-100 mb-8">
                                Join thousands of professionals who have already built their standard-setting resumes.
                            </p>

                            <button
                                onClick={() => navigate('/FileUploadPage')}
                                className="px-8 py-4 bg-white text-purple-700 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                            >
                                Start Building Now
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Features;
