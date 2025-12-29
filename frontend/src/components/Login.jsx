import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const result = await login(email, password);
        setLoading(false);
        if (result.success) {
            // Check role and redirect accordingly
            if (result.user?.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } else {
            setError(result.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-100 to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4 transition-colors duration-300">
            <div className="max-w-md w-full glassmorphism p-8 rounded-2xl border border-white/10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back</h2>
                    <p className="text-gray-600 dark:text-gray-400">Login to your account</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-white/10 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all placeholder:text-gray-400"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-white/10 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all placeholder:text-gray-400"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Sign In'}
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 font-semibold">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
