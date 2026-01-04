import React, { useState } from 'react';
import { Shield, Save, Search, Users, Zap, Filter, X } from 'lucide-react';
import { ENDPOINTS, getAuthHeaders } from '../apiConfig';
import toast from 'react-hot-toast';

const ManageUsers = ({ users, setUsers }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ download_limit: 0, template_limit: 0, resume_download_limit: 2, status: 'active' });
    const [search, setSearch] = useState('');
    const [planFilter, setPlanFilter] = useState('all');

    // Knowledge Hub Modal State
    const [showKnowledgeHubModal, setShowKnowledgeHubModal] = useState(false);
    const [knowledgeHubLimits, setKnowledgeHubLimits] = useState({
        basic: { templates: 3, downloads: 2 },
        standard: { templates: 7, downloads: 5 },
        enterprise: { templates: 15, downloads: 10 },
        premium: { templates: 30, downloads: 20 }
    });

    // Bulk Update States
    const [guestLimit, setGuestLimit] = useState({ templates: 3, downloads: 2 });

    const handleEdit = (u) => {
        setSelectedUser(u);
        setFormData({
            download_limit: u.download_limit,
            template_limit: u.template_limit,
            resume_download_limit: u.resume_download_limit || 2,
            status: u.status
        });
        setEditMode(true);
    };

    const handleSaveUser = async () => {
        try {
            const response = await fetch(ENDPOINTS.ADMIN.UPDATE_USER(selectedUser.id), {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...formData } : u));
                setEditMode(false);
                toast.success('User privileges updated');
            } else {
                toast.error('Privilege escalation failed');
            }
        } catch (error) {
            toast.error('Network security error');
        }
    };

    const handleBulkUpdate = async (type, limits, plan = null) => {
        const confirmMsg = `Update limits for ALL ${plan ? `Knowledge Hub ${plan}` : type.replace('_', ' ')} users?`;

        if (!confirm(confirmMsg)) return;

        try {
            // limits can be a single value (for guest) or object (for plans)
            const updateData = {};

            if (typeof limits === 'object') {
                if (limits.templates) updateData.template_limit = parseInt(limits.templates);
                if (limits.downloads) updateData.resume_download_limit = parseInt(limits.downloads);
            } else {
                updateData.template_limit = parseInt(limits);
            }

            const payload = {
                user_type: type,
                update_data: updateData
            };

            if (plan) payload.subscription_plan = plan.toLowerCase();

            const response = await fetch(ENDPOINTS.ADMIN.BULK_UPDATE_USERS, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                // Refresh local user list
                setUsers(users.map(u => {
                    if (u.type === type) {
                        const matchPlan = !plan || (u.subscription_plan === plan.toLowerCase());
                        if (matchPlan) {
                            return {
                                ...u,
                                ...(updateData.template_limit && { template_limit: updateData.template_limit }),
                                ...(updateData.resume_download_limit && { resume_download_limit: updateData.resume_download_limit })
                            };
                        }
                    }
                    return u;
                }));
            } else {
                toast.error('Bulk update failed');
            }
        } catch (error) {
            toast.error('Network error during bulk update');
        }
    };

    const filteredUsers = users.filter(u => {
        const matchesSearch = u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase());

        let matchesPlan = true;
        if (planFilter === 'all') {
            matchesPlan = true;
        } else if (planFilter === 'guest') {
            // Guest users are those NOT in knowledge_hub
            matchesPlan = u.type !== 'knowledge_hub';
        } else {
            // Specific KH plans must match type='knowledge_hub' AND the specific plan
            matchesPlan = u.type === 'knowledge_hub' && u.subscription_plan === planFilter;
        }

        return matchesSearch && matchesPlan;
    });

    return (
        <div className="space-y-8 relative">
            {/* Section 1: Group Policy Management */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                    onClick={() => setShowKnowledgeHubModal(true)}
                    className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-500/50 transition-all cursor-pointer group"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-2xl group-hover:bg-purple-500 group-hover:text-white transition-colors">
                            <Zap className="text-purple-500 group-hover:text-white" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white">Knowledge Hub Users</h4>
                            <p className="text-xs text-slate-500">Manage Subscription Plans</p>
                        </div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Configure template limits for Basic, Standard, Enterprise, and Premium tiers.</p>
                    <div className="text-purple-500 font-bold text-sm flex items-center gap-2">
                        Configure Plans →
                    </div>
                </div>

                <PolicyCard
                    title="Guest Users"
                    icon={<Users className="text-orange-500" />}
                    currentLimit={guestLimit}
                    onUpdate={(val) => handleBulkUpdate('guest', val)}
                    onChange={(val) => setGuestLimit(val)}
                    description="Limited access for non-registered or basic users."
                />
            </div>

            {/* Knowledge Hub Modal */}
            {showKnowledgeHubModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                            <h3 className="font-bold text-xl flex items-center gap-2">
                                <Zap className="text-purple-500" />
                                Knowledge Hub Plans
                            </h3>
                            <button onClick={() => setShowKnowledgeHubModal(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.entries(knowledgeHubLimits).map(([plan, limits]) => (
                                <div key={plan} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/30 transition-all bg-slate-50 dark:bg-slate-800/20">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="capitalize font-bold text-slate-700 dark:text-slate-300">{plan}</span>
                                    </div>
                                    <div className="space-y-3 mt-4">
                                        <div>
                                            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Templates</label>
                                            <input
                                                type="number"
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-bold focus:ring-2 focus:ring-purple-500 outline-none"
                                                value={limits.templates}
                                                onChange={(e) => setKnowledgeHubLimits({
                                                    ...knowledgeHubLimits,
                                                    [plan]: { ...limits, templates: e.target.value }
                                                })}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Downloads / Resume</label>
                                            <input
                                                type="number"
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-bold focus:ring-2 focus:ring-purple-500 outline-none"
                                                value={limits.downloads}
                                                onChange={(e) => setKnowledgeHubLimits({
                                                    ...knowledgeHubLimits,
                                                    [plan]: { ...limits, downloads: e.target.value }
                                                })}
                                            />
                                        </div>
                                        <button
                                            onClick={() => handleBulkUpdate('knowledge_hub', limits, plan.charAt(0).toUpperCase() + plan.slice(1))}
                                            className="w-full bg-purple-500 text-white p-2 rounded-lg font-bold text-sm hover:bg-purple-600 transition-colors mt-2"
                                        >
                                            Set Limits
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Section 2: Individual User Management */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm h-fit">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h3 className="font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                            <Shield className="text-teal-500" size={18} />
                            Individual User Override
                        </h3>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <div className="relative flex-1 sm:flex-none">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search user..."
                                    className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <select
                                    className="pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500 appearance-none cursor-pointer"
                                    value={planFilter}
                                    onChange={(e) => setPlanFilter(e.target.value)}
                                >
                                    <option value="all">All Users</option>
                                    <option value="guest">Guest Users</option>
                                    <option disabled>──────────</option>
                                    <option value="basic">KH Basic</option>
                                    <option value="standard">KH Standard</option>
                                    <option value="enterprise">KH Enterprise</option>
                                    <option value="premium">KH Premium</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="max-h-[600px] overflow-y-auto">
                        {filteredUsers.map(u => (
                            <div
                                key={u.id}
                                onClick={() => handleEdit(u)}
                                className={`p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all ${selectedUser?.id === u.id ? 'bg-teal-50 dark:bg-teal-500/10 border-l-4 border-l-teal-500' : ''}`}
                            >
                                <div>
                                    <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                                    <div className="text-xs text-slate-500">{u.email}</div>
                                    <div className="mt-1 flex gap-2">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 capitalize">
                                            {u.type || 'standard'}
                                        </span>
                                        {u.type === 'knowledge_hub' && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 capitalize">
                                                {u.subscription_plan || 'basic'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${u.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>{u.status}</div>
                                    <div className="text-sm font-bold text-teal-600 dark:text-teal-400">Downloads: {u.download_limit} | Templates: {u.template_limit}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl h-fit sticky top-8">
                    {editMode && selectedUser ? (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-teal-500 text-xl">
                                    {selectedUser.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-black text-lg leading-tight text-slate-900 dark:text-white">{selectedUser.name}</h3>
                                    <p className="text-xs text-slate-500">ID: {selectedUser.id}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Total Account Download Limit</label>
                                    <input
                                        type="number"
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900 dark:text-white font-bold"
                                        value={formData.download_limit}
                                        onChange={(e) => setFormData({ ...formData, download_limit: parseInt(e.target.value) })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Per-Resume Download Limit</label>
                                    <input
                                        type="number"
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900 dark:text-white font-bold"
                                        value={formData.resume_download_limit}
                                        onChange={(e) => setFormData({ ...formData, resume_download_limit: parseInt(e.target.value) })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Template Limit</label>
                                    <input
                                        type="number"
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900 dark:text-white font-bold"
                                        value={formData.template_limit}
                                        onChange={(e) => setFormData({ ...formData, template_limit: parseInt(e.target.value) })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Account Status</label>
                                    <select
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900 dark:text-white cursor-pointer"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="active">Active</option>
                                        <option value="disabled">Disabled</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button onClick={handleSaveUser} className="flex-1 bg-teal-500 text-white p-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/30">
                                    <Save size={18} />
                                    Save
                                </button>
                                <button onClick={() => setEditMode(false)} className="px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Shield className="mx-auto text-slate-200 dark:text-slate-800 mb-6" size={80} strokeWidth={1} />
                            <h4 className="font-bold text-slate-500">No User Selected</h4>
                            <p className="text-sm text-slate-400 mt-2">Select a user to modify their specific limits.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const PolicyCard = ({ title, icon, currentLimit, onUpdate, onChange, description }) => (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-teal-500/50 transition-all group h-full flex flex-col">
        <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl group-hover:bg-teal-500 group-hover:text-white transition-colors">
                {icon}
            </div>
            <div>
                <h4 className="font-bold text-slate-900 dark:text-white">{title}</h4>
                <p className="text-xs text-slate-500">Group Policy</p>
            </div>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-grow">{description}</p>

        <div className="space-y-4 mt-auto">
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Templates Limit</label>
                    <input
                        type="number"
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 text-center font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                        value={currentLimit.templates}
                        onChange={(e) => onChange({ ...currentLimit, templates: e.target.value })}
                    />
                </div>
                <div className="flex-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Downloads / Resume</label>
                    <input
                        type="number"
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 text-center font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                        value={currentLimit.downloads}
                        onChange={(e) => onChange({ ...currentLimit, downloads: e.target.value })}
                    />
                </div>
            </div>
            <button
                onClick={() => onUpdate(currentLimit)}
                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
            >
                Apply to All
            </button>
        </div>
    </div>
);

export default ManageUsers;
