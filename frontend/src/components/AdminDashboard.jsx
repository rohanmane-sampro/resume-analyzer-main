import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { ENDPOINTS, getAuthHeaders } from '../apiConfig';
import { Users, FileText, Download, Activity, Shield, Edit2, Check, X, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from './Navbar';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [metrics, setMetrics] = useState(null);
    const [usersList, setUsersList] = useState([]);
    const [templateAnalytics, setTemplateAnalytics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingLimit, setEditingLimit] = useState(null);
    const [newLimit, setNewLimit] = useState('');

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const [metricsRes, usersRes, templatesRes] = await Promise.all([
                    fetch(ENDPOINTS.ADMIN.METRICS, { headers: getAuthHeaders() }),
                    fetch(ENDPOINTS.ADMIN.USERS, { headers: getAuthHeaders() }),
                    fetch(ENDPOINTS.ADMIN.TEMPLATE_ANALYTICS, { headers: getAuthHeaders() })
                ]);

                if (metricsRes.ok) setMetrics(await metricsRes.json());
                if (usersRes.ok) {
                    const data = await usersRes.json();
                    setUsersList(data.users);
                }
                if (templatesRes.ok) {
                    const data = await templatesRes.json();
                    setTemplateAnalytics(data.template_usage);
                }
            } catch (error) {
                console.error('Failed to fetch admin data:', error);
                toast.error('Failed to load system data');
            } finally {
                setLoading(false);
            }
        };

        if (user?.role === 'admin') {
            fetchAdminData();
        }
    }, [user]);

    const handleUpdateLimit = async (userId) => {
        if (!newLimit || isNaN(parseInt(newLimit))) {
            toast.error('Please enter a valid number');
            return;
        }

        try {
            const response = await fetch(ENDPOINTS.ADMIN.UPDATE_LIMIT(userId), {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({ limit: parseInt(newLimit) })
            });

            if (response.ok) {
                setUsersList(usersList.map(u =>
                    u.id === userId ? { ...u, download_limit: parseInt(newLimit) } : u
                ));
                setEditingLimit(null);
                setNewLimit('');
                toast.success('Limit updated successfully');
            } else {
                toast.error('Failed to update limit');
            }
        } catch (error) {
            toast.error('An error occurred');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-100 to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
            <Navbar />

            <div className="p-6 pt-24 max-w-7xl mx-auto">
                <div className="mb-10 flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                            <Shield className="text-teal-500" size={40} />
                            System Administrator
                        </h1>
                        <p className="text-gray-400">Production-level oversight and system-wide controls</p>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 bg-red-600/10 dark:bg-red-500/10 hover:bg-red-600/20 dark:hover:bg-red-500/20 text-red-600 dark:text-red-500 border border-red-200 dark:border-red-500/20 px-6 py-3 rounded-xl transition-all font-semibold"
                    >
                        <LogOut size={20} />
                        Exit System
                    </button>
                </div>

                {/* 1. System Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <MetricCard
                        title="Registered Users"
                        value={metrics?.total_users || 0}
                        icon={<Users className="text-blue-600 dark:text-blue-400" />}
                        subtitle="Total user base"
                    />
                    <MetricCard
                        title="Resumes Created"
                        value={metrics?.total_resumes || 0}
                        icon={<FileText className="text-purple-600 dark:text-purple-400" />}
                        subtitle="System-wide"
                    />
                    <MetricCard
                        title="Total Downloads"
                        value={metrics?.total_downloads || 0}
                        icon={<Download className="text-green-600 dark:text-green-400" />}
                        subtitle="Successful exports"
                    />
                    <MetricCard
                        title="Active Users"
                        value={metrics?.active_users || 0}
                        icon={<Activity className="text-orange-600 dark:text-orange-400" />}
                        subtitle="Last 7 days"
                    />
                </div>

                {/* 2. Main Analytics Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Management Table */}
                    <div className="lg:col-span-2 bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm dark:shadow-none">
                        <div className="p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
                            <h2 className="text-xl font-bold">User Access Management</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-gray-400 text-sm uppercase">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">User</th>
                                        <th className="px-6 py-4 font-medium">Activity</th>
                                        <th className="px-6 py-4 font-medium">Download Limit</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                    {usersList.map((u) => (
                                        <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-900 dark:text-white">{u.name}</div>
                                                <div className="text-xs text-slate-500 dark:text-gray-400">{u.email}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm">
                                                    <span className="text-teal-600 dark:text-teal-400 font-bold">{u.resumes_created}</span> resumes
                                                </div>
                                                <div className="text-xs text-slate-500 dark:text-gray-400">
                                                    <span className="text-blue-600 dark:text-blue-400">{u.downloads_used}</span> downloads used
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {editingLimit === u.id ? (
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="number"
                                                            className="w-16 bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/20 rounded px-2 py-1 text-sm outline-none text-slate-900 dark:text-white"
                                                            value={newLimit}
                                                            onChange={(e) => setNewLimit(e.target.value)}
                                                            autoFocus
                                                        />
                                                        <button onClick={() => handleUpdateLimit(u.id)} className="text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400">
                                                            <Check size={18} />
                                                        </button>
                                                        <button onClick={() => setEditingLimit(null)} className="text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400">
                                                            <X size={18} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 group">
                                                        <span className="text-sm font-medium text-slate-700 dark:text-gray-200">{u.download_limit} attempts</span>
                                                        <button
                                                            onClick={() => {
                                                                setEditingLimit(u.id);
                                                                setNewLimit(u.download_limit);
                                                            }}
                                                            className="opacity-0 group-hover:opacity-100 text-slate-400 dark:text-gray-500 hover:text-teal-500 transition-all"
                                                        >
                                                            <Edit2 size={14} />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${u.role === 'admin'
                                                    ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30'
                                                    : 'bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-500/30'
                                                    }`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Template Usage Statistics */}
                    <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col shadow-sm dark:shadow-none">
                        <div className="p-6 border-b border-slate-200 dark:border-white/10">
                            <h2 className="text-xl font-bold">Template Trends</h2>
                        </div>
                        <div className="p-6 flex-1 space-y-6">
                            {templateAnalytics.map((t, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-medium flex items-center gap-2 text-slate-600 dark:text-gray-300">
                                            <div className="w-2 h-2 rounded-full bg-teal-500" />
                                            {t._id}
                                        </span>
                                        <span className="text-sm text-slate-500 dark:text-gray-400 font-mono">{t.usage_count} uses</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-white/5 rounded-full h-3">
                                        <div
                                            className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full transition-all duration-1000"
                                            style={{ width: `${(t.usage_count / (metrics?.total_resumes || 1)) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                            {templateAnalytics.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-gray-500 italic">
                                    No template activity yet
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MetricCard = ({ title, value, icon, subtitle }) => (
    <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/10 relative overflow-hidden group shadow-sm dark:shadow-none transition-all">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
            {React.cloneElement(icon, { size: 64 })}
        </div>
        <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
                {icon}
            </div>
            <h4 className="text-slate-500 dark:text-gray-400 font-medium text-sm">{title}</h4>
        </div>
        <div className="text-4xl font-bold mb-1 text-slate-900 dark:text-white">{value}</div>
        <p className="text-slate-400 dark:text-gray-500 text-xs">{subtitle}</p>
    </div>
);

export default AdminDashboard;
