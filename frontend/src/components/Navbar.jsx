import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext.jsx';
import { useAuth } from '../AuthContext';
import Switch from './Switch.jsx';

const Navbar = () => {
    const navigate = useNavigate();
    const { isDark, setIsDark } = useContext(ThemeContext);
    const { user, logout } = useAuth();

    const handleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <nav className="w-full sampro-nav">
            <div className="w-full px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">S</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white">
                        SAMPRO <span className="text-teal-400">AI</span>
                    </h1>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-1">
                    {user?.role === 'admin' ? (
                        <>
                            <button className="sampro-nav-link text-teal-400 font-bold" onClick={() => navigate('/admin')}>
                                Admin Dashboard
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="sampro-nav-link" onClick={() => navigate('/')}>
                                Home
                            </button>
                            <button className="sampro-nav-link" onClick={() => navigate('/FileUploadPage')}>
                                Create Resume
                            </button>
                            <button className="sampro-nav-link" onClick={() => navigate('/ResumeAnalyze')}>
                                Analyze Resume
                            </button>
                            {user && (
                                <button className="sampro-nav-link" onClick={() => navigate('/dashboard')}>
                                    Dashboard
                                </button>
                            )}
                            <button className="sampro-nav-link" onClick={() => navigate('/Features')}>
                                Features
                            </button>
                            <button className="sampro-nav-link" onClick={() => navigate('/AboutUs')}>
                                About
                            </button>
                        </>
                    )}
                </div>

                {/* Left Side: Auth & Theme */}
                <div className="flex items-center gap-3">
                    <button
                        className="transition-transform hover:scale-110 mr-4"
                        title="Toggle dark/light mode"
                        onClick={handleTheme}
                    >
                        <Switch />
                    </button>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-gray-300 text-sm hidden lg:inline">Hi, {user.name.split(' ')[0]}</span>
                            <button
                                onClick={logout}
                                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm transition-all"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => navigate('/login')}
                                className="text-gray-300 hover:text-white px-4 py-2 text-sm transition-all"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate('/signup')}
                                className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all"
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
