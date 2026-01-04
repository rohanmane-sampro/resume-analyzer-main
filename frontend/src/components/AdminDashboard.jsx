import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '../AuthContext';
import { ThemeContext } from './ThemeContext';
import Switch from './Switch';
import { ENDPOINTS, getAuthHeaders } from '../apiConfig';
import {
    Users, FileText, Download, Activity, Shield,
    Edit2, Check, X, LogOut, Settings, BarChart3,
    Database, Layers, Menu, ChevronLeft, ChevronRight,
    Search, Filter, Save, ToggleLeft as Toggle, ArrowUpRight
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import StatsCard from './StatsCard';
import UserTable from './UserTable';
import ManageUsers from './ManageUsers';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const { isDark, setIsDark } = useContext(ThemeContext);
    const [activeTab, setActiveTab] = useState('overview');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [loading, setLoading] = useState(true);

    // Data states
    const [metrics, setMetrics] = useState(null);
    const [usersList, setUsersList] = useState([]);
    const [templateAnalytics, setTemplateAnalytics] = useState([]);
    const [trends, setTrends] = useState([]);
    const [systemSettings, setSystemSettings] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const headers = getAuthHeaders();
                const [metricsRes, usersRes, templatesRes, trendsRes, settingsRes] = await Promise.all([
                    fetch(ENDPOINTS.ADMIN.STATS, { headers }),
                    fetch(ENDPOINTS.ADMIN.USERS, { headers }),
                    fetch(ENDPOINTS.ADMIN.TEMPLATE_ANALYTICS, { headers }),
                    fetch(ENDPOINTS.ADMIN.RESUME_TRENDS, { headers }),
                    fetch(ENDPOINTS.ADMIN.SETTINGS, { headers })
                ]);

                if (metricsRes.ok) setMetrics(await metricsRes.json());
                if (usersRes.ok) setUsersList((await usersRes.json()).users);
                if (templatesRes.ok) setTemplateAnalytics((await templatesRes.json()).template_usage);
                if (trendsRes.ok) setTrends((await trendsRes.json()).trends);
                if (settingsRes.ok) setSystemSettings(await settingsRes.json());
            } catch (error) {
                console.error('Admin data fetch error:', error);
                toast.error('Failed to synchronize administration data');
            } finally {
                setLoading(false);
            }
        };

        if (user?.role === 'admin') {
            fetchAllData();
        }
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                    <p className="text-slate-400 font-medium animate-pulse">Initializing Secure Admin Portal...</p>
                </div>
            </div>
        );
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <OverviewTab metrics={metrics} trends={trends} templateAnalytics={templateAnalytics} />;
            case 'all-users': return <UserTable users={usersList} />;
            case 'manage-users': return <ManageUsers users={usersList} setUsers={setUsersList} />;
            case 'resume-analytics': return <ResumeAnalyticsTab trends={trends} templateAnalytics={templateAnalytics} metrics={metrics} />;


            default: return <OverviewTab metrics={metrics} trends={trends} templateAnalytics={templateAnalytics} />;
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] flex text-slate-900 dark:text-slate-100 transition-colors duration-300">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
                <div className="p-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
                    {!isSidebarCollapsed && (
                        <div className="flex items-center gap-2">
                            <Shield className="text-teal-500" size={24} />
                            <span className="font-black text-xl tracking-tighter">SAMPRO<span className="text-teal-500">ADMIN</span></span>
                        </div>
                    )}
                    <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500">
                        {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                <nav className="p-4 space-y-2 mt-4">
                    <SidebarItem icon={<BarChart3 />} label="Dashboard Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} collapsed={isSidebarCollapsed} />
                    <SidebarItem icon={<Users />} label="All Users" active={activeTab === 'all-users'} onClick={() => setActiveTab('all-users')} collapsed={isSidebarCollapsed} />
                    <SidebarItem icon={<Shield />} label="Manage Users" active={activeTab === 'manage-users'} onClick={() => setActiveTab('manage-users')} collapsed={isSidebarCollapsed} />
                    <SidebarItem icon={<Activity />} label="Resume Analytics" active={activeTab === 'resume-analytics'} onClick={() => setActiveTab('resume-analytics')} collapsed={isSidebarCollapsed} />


                </nav>

                <div className="absolute bottom-4 left-0 right-0 p-4">
                    <button
                        onClick={logout}
                        className={`w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all font-semibold ${isSidebarCollapsed ? 'justify-center' : ''}`}
                    >
                        <LogOut size={20} />
                        {!isSidebarCollapsed && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} p-8`}>
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight capitalize">{activeTab.replace('-', ' ')}</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Admin Session: {user?.name}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            className="transition-transform hover:scale-110 active:scale-95 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
                            title="Toggle theme"
                            onClick={() => setIsDark(!isDark)}
                        >
                            <Switch />
                        </button>
                        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-2xl shadow-sm">
                            <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white font-bold">
                                {user?.name?.charAt(0) || 'A'}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

const SidebarItem = ({ icon, label, active, onClick, collapsed }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${active
            ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30'
            : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'} ${collapsed ? 'justify-center' : ''}`}
        title={collapsed ? label : ''}
    >
        {React.cloneElement(icon, { size: 22 })}
        {!collapsed && <span className="font-medium text-sm whitespace-nowrap">{label}</span>}
    </button>
);

// --- TABS COMPONENTS ---

const OverviewTab = ({ metrics, trends, templateAnalytics }) => {
    const COLORS = ['#14b8a6', '#8b5cf6', '#f59e0b', '#ef4444', '#3b82f6'];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Total Users" value={metrics?.total_users} icon={<Users className="text-blue-500" />} />
                <StatsCard title="Resumes Generated" value={metrics?.total_resumes} icon={<FileText className="text-purple-500" />} />
                <StatsCard title="Total Downloads" value={metrics?.total_downloads} icon={<Download className="text-green-500" />} />
                <StatsCard title="Download Velocity" value={metrics?.avg_downloads_per_user} icon={<Activity className="text-orange-500" />} subtitle="Avg. downloads/user" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-lg font-bold mb-6">Resume Creation Trends</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trends}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#fff' }}
                                />
                                <Line type="monotone" dataKey="count" stroke="#14b8a6" strokeWidth={3} dot={{ r: 4, fill: '#14b8a6' }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-lg font-bold mb-6">Popular Templates</h3>
                    <div className="h-[300px] flex items-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={templateAnalytics}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="usage_count"
                                    nameKey="_id"
                                >
                                    {templateAnalytics.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="w-1/3 space-y-2">
                            {templateAnalytics.slice(0, 5).map((t, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                                    <span className="text-slate-400 font-medium">T{t._id}</span>
                                    <span className="ml-auto font-bold">{t.usage_count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};





const ResumeAnalyticsTab = ({ trends, templateAnalytics, metrics }) => {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-bold mb-8">Generation Lifecycle Analytics</h3>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={trends}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    cursor={{ fill: '#f1f5f9', opacity: 0.1 }}
                                    contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: '#1e293b', color: '#fff' }}
                                />
                                <Bar dataKey="count" fill="#14b8a6" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h4 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">Top Templates</h4>
                        <div className="space-y-4">
                            {templateAnalytics.slice(0, 3).map((t, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="p-3 bg-teal-50 dark:bg-teal-500/10 rounded-xl text-teal-600 font-black text-sm">#{i + 1}</div>
                                    <div>
                                        <div className="font-bold">Template ID: {t._id}</div>
                                        <div className="text-xs text-slate-500">{t.usage_count} implementations</div>
                                    </div>
                                    <ArrowUpRight className="ml-auto text-slate-300" size={16} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-teal-500 p-8 rounded-3xl text-white shadow-xl shadow-teal-500/20 relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="font-black text-xs uppercase tracking-[.2em] opacity-80 mb-6">Efficiency Coefficient</h4>
                            <div className="text-5xl font-black mb-2">{(metrics?.total_resumes / metrics?.total_users || 0).toFixed(1)}</div>
                            <p className="text-teal-100 text-sm font-medium">Resumes per structural identity</p>
                        </div>
                        <Activity className="absolute -bottom-4 -right-4 text-white opacity-10 w-32 h-32" />
                    </div>
                </div>
            </div>
        </div>
    );
};




