import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from './ThemeContext.jsx';
import Switch from './Switch.jsx';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isDark, setIsDark } = useContext(ThemeContext);

    const handleTheme = () => {
        setIsDark(!isDark);
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className="glass-nav w-full px-6 py-4 flex justify-between items-center relative z-50">
            {/* Logo Section */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
                <div className="w-10 h-10 bg-gradient-to-tr from-teal-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <span className="text-white font-bold text-xl">S</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    SAMPRO<span className="text-teal-500">.AI</span>
                </h1>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-1 bg-white/50 dark:bg-slate-800/50 p-1.5 rounded-full border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm shadow-sm opacity-100">
                <button className={`nav-pill ${isActive('/')}`} onClick={() => navigate('/')}>
                    Home
                </button>
                <button className={`nav-pill ${isActive('/FileUploadPage')}`} onClick={() => navigate('/FileUploadPage')}>
                    Create
                </button>
                <button className={`nav-pill ${isActive('/ResumeAnalyze')}`} onClick={() => navigate('/ResumeAnalyze')}>
                    Analyze
                </button>
                <button className={`nav-pill ${isActive('/Features')}`} onClick={() => navigate('/Features')}>
                    Features
                </button>
                <button className={`nav-pill ${isActive('/AboutUs')}`} onClick={() => navigate('/AboutUs')}>
                    About
                </button>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
                {/* Create Resume CTA - Only show if not on Create page to avoid redundancy, or always show for consistency */}
                <button
                    className="hidden lg:flex items-center justify-center px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-full shadow-lg hover:shadow-teal-500/20 transition-all hover:-translate-y-0.5"
                    onClick={() => navigate('/FileUploadPage')}
                >
                    Create Resume
                </button>

                <button
                    className="transition-transform hover:scale-110 active:scale-95 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Toggle theme"
                    onClick={handleTheme}
                >
                    <Switch />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
