import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext.jsx';
import Switch from './Switch.jsx';

const Navbar = () => {
    const navigate = useNavigate();
    const { isDark, setIsDark } = useContext(ThemeContext);

    const handleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <nav className="w-full px-8 py-4 sampro-nav">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
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
                    <button className="sampro-nav-link" onClick={() => navigate('/')}>
                        Home
                    </button>
                    <button className="sampro-nav-link" onClick={() => navigate('/FileUploadPage')}>
                        Create Resume
                    </button>
                    <button className="sampro-nav-link" onClick={() => navigate('/FileUploadPage')}>
                        Resume Analysis
                    </button>
                    <button className="sampro-nav-link" onClick={() => navigate('/Features')}>
                        Features
                    </button>
                    <button className="sampro-nav-link" onClick={() => navigate('/AboutUs')}>
                        About
                    </button>
                </div>

                {/* Theme Toggle */}
                <div className="flex items-center gap-3">
                    <button
                        className="transition-transform hover:scale-110"
                        title="Toggle dark/light mode"
                        onClick={handleTheme}
                    >
                        <Switch />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
