import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { ENDPOINTS, getAuthHeaders } from '../apiConfig';

const UserDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(ENDPOINTS.RESUME.STATS, {
                    headers: getAuthHeaders()
                });
                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-100 to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center text-slate-900 dark:text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-100 to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
            <div className="max-w-7xl mx-auto pt-24">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Welcome Back, {user?.name}</h1>
                        <p className="text-gray-400">Track your resume performance and creation stats</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <div className="glassmorphism p-8 rounded-2xl border border-white/10 hover:border-teal-500/50 transition-all">
                        <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Total Created</p>
                        <h3 className="text-4xl font-bold text-white">{stats?.total_created || 0}</h3>
                    </div>
                    <div className="glassmorphism p-8 rounded-2xl border border-white/10 hover:border-teal-500/50 transition-all">
                        <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Total Downloads</p>
                        <h3 className="text-4xl font-bold text-teal-400">{stats?.total_downloads || 0}</h3>
                    </div>
                </div>

                {/* Recent Resumes */}
                <div className="glassmorphism rounded-2xl border border-white/10 overflow-hidden">
                    <div className="p-6 border-b border-white/10 flex justify-between items-center">
                        <h2 className="text-xl font-bold">Your Resumes</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-gray-400 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">Template ID</th>
                                    <th className="px-6 py-4">Created Date</th>
                                    <th className="px-6 py-4">Downloads</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {stats?.resumes?.map((resume) => (
                                    <tr key={resume.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 font-medium text-white">{resume.template_id}</td>
                                        <td className="px-6 py-4 text-gray-400">
                                            {new Date(resume.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-xs">
                                                {resume.download_count} downloads
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-teal-400 hover:text-teal-300 font-medium">View Result</button>
                                        </td>
                                    </tr>
                                ))}
                                {(!stats?.resumes || stats.resumes.length === 0) && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                            No resumes created yet. Start building one!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
