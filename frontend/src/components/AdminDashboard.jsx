import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { ENDPOINTS, getAuthHeaders } from '../apiConfig';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddTemplate, setShowAddTemplate] = useState(false);
    const [newTemplate, setNewTemplate] = useState({ name: '', description: '', category: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, templatesRes] = await Promise.all([
                    fetch(ENDPOINTS.ADMIN.STATS, { headers: getAuthHeaders() }),
                    fetch(ENDPOINTS.ADMIN.TEMPLATES, { headers: getAuthHeaders() })
                ]);

                if (statsRes.ok) setStats(await statsRes.json());
                if (templatesRes.ok) setTemplates(await templatesRes.json());
            } catch (error) {
                console.error('Failed to fetch admin data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAddTemplate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(ENDPOINTS.ADMIN.TEMPLATES, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(newTemplate)
            });
            if (response.ok) {
                const added = await response.json();
                setTemplates([...templates, { ...newTemplate, _id: added.id }]);
                setShowAddTemplate(false);
                setNewTemplate({ name: '', description: '', category: '' });
            } else {
                const err = await response.json();
                alert(err.message);
            }
        } catch (error) {
            console.error('Add template failed:', error);
        }
    };

    if (loading) return <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#09090b] text-white p-8">
            <div className="max-w-7xl mx-auto pt-24">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Admin Control Center</h1>
                        <p className="text-gray-400">Manage templates and view system analytics</p>
                    </div>
                </div>

                {/* Platform Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="glassmorphism p-8 rounded-2xl border border-white/10">
                        <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Total Active Users</p>
                        <h3 className="text-4xl font-bold text-white">{stats?.total_users || 0}</h3>
                    </div>
                    <div className="glassmorphism p-8 rounded-2xl border border-white/10">
                        <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Total Resumes Generated</p>
                        <h3 className="text-4xl font-bold text-teal-400">{stats?.total_resumes || 0}</h3>
                    </div>
                    <div className="glassmorphism p-8 rounded-2xl border border-white/10">
                        <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Template Count</p>
                        <h3 className="text-4xl font-bold text-purple-400">{templates.length} / 20</h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Template Management */}
                    <div className="glassmorphism rounded-2xl border border-white/10 overflow-hidden">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h2 className="text-xl font-bold">Template Management</h2>
                            <button
                                onClick={() => setShowAddTemplate(true)}
                                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                            >
                                Add Template
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            {templates.map((template) => (
                                <div key={template._id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                    <div>
                                        <h4 className="font-semibold">{template.name}</h4>
                                        <p className="text-xs text-gray-400">{template.category}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="text-gray-400 hover:text-white text-sm">Edit</button>
                                        <button className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Usage Analytics */}
                    <div className="glassmorphism rounded-2xl border border-white/10 overflow-hidden">
                        <div className="p-6 border-b border-white/10">
                            <h2 className="text-xl font-bold">Top Templates</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-6">
                                {stats?.top_templates?.map((t, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium">Template {t._id}</span>
                                            <span className="text-sm text-gray-400">{t.count} uses</span>
                                        </div>
                                        <div className="w-full bg-white/5 rounded-full h-2">
                                            <div
                                                className="bg-teal-500 h-2 rounded-full"
                                                style={{ width: `${(t.count / (stats.total_resumes || 1)) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                                {(!stats?.top_templates || stats.top_templates.length === 0) && (
                                    <p className="text-center text-gray-500 py-10">No data available yet</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Template Modal Placeholder */}
                {showAddTemplate && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="max-w-md w-full glassmorphism p-8 rounded-2xl border border-white/10">
                            <h2 className="text-2xl font-bold mb-6">Add New Template</h2>
                            <form onSubmit={handleAddTemplate} className="space-y-4">
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                                    placeholder="Template Name"
                                    value={newTemplate.name}
                                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                                    required
                                />
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                                    placeholder="Category (e.g. Modern, Basic)"
                                    value={newTemplate.category}
                                    onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                                    required
                                />
                                <textarea
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white min-h-[100px]"
                                    placeholder="Description"
                                    value={newTemplate.description}
                                    onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                                />
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddTemplate(false)}
                                        className="flex-1 px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-teal-500 hover:bg-teal-600 px-4 py-3 rounded-xl font-bold transition-all"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
