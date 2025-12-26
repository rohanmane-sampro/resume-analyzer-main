
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
import UserDashboard from './components/UserDashboard.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import { useAuth } from './AuthContext';

const App = () => {
  const { user, loading: authLoading } = useAuth();
  const { isDark } = useContext(ThemeContext)
  const [loading, setLoading] = useState(true);
  const [views, setViews] = useState(0);

  useEffect(() => {
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

  if (loading || authLoading) {
    return <Loader />;
  }

  const isAdmin = user?.role === 'admin';

  return (
    <div>
      <Toaster />
      <Routes>
        {/* Public & Role-Based Entry */}
        <Route path="/" element={
          isAdmin
            ? <Navigate to="/admin" replace />
            : <FrontPage views={views} />
        } />

        {/* Auth Routes */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" replace />} />

        {/* User Protected Routes - Redirect Admin to Admin Dashboard */}
        <Route
          path="/dashboard"
          element={isAdmin ? <Navigate to="/admin" replace /> : (user ? <UserDashboard /> : <Navigate to="/login" />)}
        />
        <Route
          path="/FileUploadPage"
          element={isAdmin ? <Navigate to="/admin" replace /> : (user ? <FileUploadPage /> : <Navigate to="/login" />)}
        />
        <Route
          path="/GetInfo"
          element={isAdmin ? <Navigate to="/admin" replace /> : (user ? <GetInfo /> : <Navigate to="/login" />)}
        />
        <Route
          path="/Preview"
          element={isAdmin ? <Navigate to="/admin" replace /> : (user ? <PreviewPage /> : <Navigate to="/login" />)}
        />
        <Route
          path="/Result"
          element={isAdmin ? <Navigate to="/admin" replace /> : (user ? <Result /> : <Navigate to="/login" />)}
        />
        <Route
          path="/ResumeAnalyze"
          element={isAdmin ? <Navigate to="/admin" replace /> : (user ? <ResumeAnalyze /> : <Navigate to="/login" />)}
        />

        {/* Admin Isolation: Admin can access ONLY /admin */}
        <Route
          path="/admin/*"
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/" replace />}
        />

        {/* Other Routes */}
        <Route path="/AboutUs" element={isAdmin ? <Navigate to="/admin" replace /> : <AboutUs />} />
        <Route path="/VarifyMail" element={<GoogleVarification />} />
        <Route path="/HTML-PDF" element={isAdmin ? <Navigate to="/admin" replace /> : <HtmlToPdfConverter />} />
        <Route path="/ViewTemplates" element={isAdmin ? <Navigate to="/admin" replace /> : <ViewTemplates />} />
        <Route path="/Features" element={isAdmin ? <Navigate to="/admin" replace /> : <Features />} />

        {/* Catch-all for Admin */}
        {isAdmin && <Route path="*" element={<Navigate to="/admin" replace />} />}
      </Routes>
    </div>
  );
}

export default App;