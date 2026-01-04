import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from './ThemeContext.jsx';
import Switch from './Switch.jsx';
import { useAuth } from '../AuthContext';
import { LogIn, UserPlus, LogOut, User, ChevronDown, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isDark, setIsDark } = useContext(ThemeContext);
    const { user, logout } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleTheme = () => {
        setIsDark(!isDark);
    };

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        navigate('/');
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

            {/* Navigation Links - Desktop (Hidden for Admin) */}
            {user?.role !== 'admin' && (
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
            )}


            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
                {/* Auth Buttons or User Menu */}
                {!user ? (
                    /* Not Logged In - Show Login/Signup Buttons */
                    <div className="hidden sm:flex items-center gap-2">
                        <button
                            className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 font-medium rounded-full transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
                            onClick={() => navigate('/login')}
                        >
                            <LogIn size={18} />
                            <span>Login</span>
                        </button>
                        <button
                            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-teal-500/25 transition-all hover:-translate-y-0.5"
                            onClick={() => navigate('/signup')}
                        >
                            <UserPlus size={18} />
                            <span>Sign Up</span>
                        </button>
                    </div>
                ) : (
                    /* Logged In - Show User Menu */
                    <div className="relative">
                        <button
                            className="flex items-center gap-2 px-3 py-2 bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-600 transition-all shadow-sm"
                            onClick={() => setShowUserMenu(!showUserMenu)}
                        >
                            <div className="w-8 h-8 bg-gradient-to-tr from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">
                                    {user.name?.charAt(0).toUpperCase() || 'U'}
                                </span>
                            </div>
                            <span className="hidden md:block text-sm font-medium text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                                {user.name || 'User'}
                            </span>
                            <ChevronDown size={16} className={`text-slate-500 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 animate-fade-in">
                                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user.name}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                                    {user.role === 'admin' && (
                                        <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full">
                                            Admin
                                        </span>
                                    )}
                                </div>

                                {user.role !== 'admin' && (
                                    <>
                                        <button
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                            onClick={() => { navigate('/dashboard'); setShowUserMenu(false); }}
                                        >
                                            <LayoutDashboard size={18} />
                                            <span>Dashboard</span>
                                        </button>
                                    </>
                                )}

                                <div className="border-t border-slate-100 dark:border-slate-700 mt-1 pt-1">
                                    <button
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                        onClick={handleLogout}
                                    >
                                        <LogOut size={18} />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Mobile Login Button */}
                {!user && (
                    <button
                        className="sm:hidden flex items-center justify-center w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full shadow-lg"
                        onClick={() => navigate('/login')}
                    >
                        <LogIn size={20} />
                    </button>
                )}

                {/* Theme Toggle */}
                <button
                    className="transition-transform hover:scale-110 active:scale-95 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Toggle theme"
                    onClick={handleTheme}
                >
                    <Switch />
                </button>
            </div>

            {/* Click outside to close menu */}
            {showUserMenu && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                />
            )}
        </nav>
    );
};

export default Navbar;
