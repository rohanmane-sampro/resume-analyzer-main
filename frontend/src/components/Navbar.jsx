import React, { useContext, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ThemeContext } from './ThemeContext.jsx';
import { AuthContext } from './AuthContext.jsx';
import Switch from './Switch.jsx';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isDark, setIsDark } = useContext(ThemeContext);
    const { user, logout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                {user && (
                    <>
                        <button className={`nav-pill ${isActive('/dashboard')}`} onClick={() => navigate('/dashboard')}>
                            Dashboard
                        </button>
                        <button className={`nav-pill ${isActive('/FileUploadPage')}`} onClick={() => navigate('/FileUploadPage')}>
                            Create
                        </button>
                        <button className={`nav-pill ${isActive('/ResumeAnalyze')}`} onClick={() => navigate('/ResumeAnalyze')}>
                            Analyze
                        </button>
                    </>
                )}
                <button className={`nav-pill ${isActive('/Features')}`} onClick={() => navigate('/Features')}>
                    Features
                </button>
                <button className={`nav-pill ${isActive('/AboutUs')}`} onClick={() => navigate('/AboutUs')}>
                    About
                </button>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
                <button
                    className="transition-transform hover:scale-110 active:scale-95 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Toggle theme"
                    onClick={handleTheme}
                >
                    <Switch />
                </button>

                {user ? (
                    <div className="relative">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">
                                {user.name ? user.name[0].toUpperCase() : 'U'}
                            </div>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200 hidden sm:block">
                                {user.name}
                            </span>
                        </button>

                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 overflow-hidden">
                                <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Signed in as</p>
                                    <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{user.email}</p>
                                </div>
                                <button
                                    onClick={() => { navigate('/dashboard'); setIsMenuOpen(false); }}
                                    className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                                >
                                    Dashboard
                                </button>
                                <button
                                    onClick={() => { logout(); setIsMenuOpen(false); }}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link to="/login" className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium text-sm px-3 py-2">
                            Login
                        </Link>
                        <Link to="/signup" className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-full shadow-lg hover:shadow-teal-500/20 transition-all hover:-translate-y-0.5">
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
