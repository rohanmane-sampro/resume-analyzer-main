import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FrontPage from './components/FrontPage.jsx';
import GetInfo from './components/GetInfo.jsx';
import Result from './components/Result.jsx';
import PreviewPage from './components/PreviewPage.jsx';
import AboutUs from './components/AboutUs.jsx';
import { Toaster } from "react-hot-toast";
import { ThemeContext } from './components/ThemeContext.jsx';
import GoogleVarification from './components/GoogleVarification.jsx';
import ViewTemplates from './components/ViewTemplates.jsx';
import HtmlToPdfConverter from './components/HmlToPdf.jsx'
import FileUploadPage from './components/FileUploadPage.jsx';
import Features from './components/Features.jsx';
import Loader from './components/Loader.jsx'
import ResumeAnalyze from './components/ResumeAnalyze.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Navbar from './components/Navbar.jsx';
import { AuthProvider, AuthContext } from './components/AuthContext.jsx';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loader />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppContent = () => {
  const { isDark } = useContext(ThemeContext)
  const [loading, setLoading] = useState(true);
  const [views, setViews] = useState(0);

  useEffect(() => {
    // Firebase URL should be set in environment variables
    const FIREBASE_URL = import.meta.env.VITE_FIREBASE_URL;

    if (FIREBASE_URL) {
      fetch(FIREBASE_URL)
        .then(res => res.json())
        .then(current => {
          const updated = (current || 0) + 1;

          fetch(FIREBASE_URL, {
            method: "PUT",
            body: JSON.stringify(updated),
          });

          setViews(updated);
        });
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<FrontPage views={views} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/VarifyMail" element={<GoogleVarification />} />
        <Route path="/HTML-PDF" element={<HtmlToPdfConverter />} />
        <Route path="/ViewTemplates" element={<ViewTemplates />} />
        <Route path="/Features" element={<Features />} />

        {/* Protected Routes */}
        <Route path="/FileUploadPage" element={<ProtectedRoute><FileUploadPage /></ProtectedRoute>} />
        <Route path="/GetInfo" element={<ProtectedRoute><GetInfo /></ProtectedRoute>} />
        <Route path="/Preview" element={<ProtectedRoute><PreviewPage /></ProtectedRoute>} />
        <Route path="/Result" element={<ProtectedRoute><Result /></ProtectedRoute>} />
        <Route path="/ResumeAnalyze" element={<ProtectedRoute><ResumeAnalyze /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><div className="p-10 text-center text-2xl dark:text-white">User Dashboard (Coming Soon)</div></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;