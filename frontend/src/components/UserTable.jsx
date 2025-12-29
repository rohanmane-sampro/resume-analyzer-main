import React, { useState } from 'react';
import { Search, Filter, Database } from 'lucide-react';

const UserTable = ({ users }) => {
    const [filter, setFilter] = useState('All Users');
    const [search, setSearch] = useState('');

    const filteredUsers = users.filter(u => {
        const matchesSearch = u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase());

        let typeMatch = true;
        if (filter === 'Direct User') typeMatch = u.type === 'standard';
        if (filter === 'Knowledge Hub') typeMatch = u.type === 'knowledge_hub';
        if (filter === 'Guest Users') typeMatch = u.type === 'guest'; // Keeping existing logic if needed

        return matchesSearch && typeMatch;
    });

    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 justify-between items-center">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-4">
                    <Filter className="text-slate-400" size={18} />
                    <select
                        className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-2 px-4 focus:ring-2 focus:ring-teal-500 outline-none cursor-pointer"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option>All Users</option>
                        <option>Direct User</option>
                        <option>Knowledge Hub</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold">
                        <tr>
                            <th className="px-6 py-4">User Identity</th>
                            <th className="px-6 py-4">Role & Status</th>
                            <th className="px-6 py-4 text-center">Resumes</th>
                            <th className="px-6 py-4 text-center">Downloads (Used/Limit)</th>
                            <th className="px-6 py-4">Joined At</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {filteredUsers.map(u => (
                            <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">{u.email}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${u.role === 'admin' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400' : 'bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-400'}`}>
                                            {u.role}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${u.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}>
                                            {u.status}
                                        </span>
                                    </div>
                                    <div className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">{u.type.replace('_', ' ')}</div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="font-black text-lg">{u.resumes_created}</span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex flex-col items-center">
                                        <span className="font-bold text-slate-700 dark:text-slate-300">{u.downloads_used} / {u.download_limit}</span>
                                        <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                                            <div
                                                className="h-full bg-teal-500 rounded-full"
                                                style={{ width: `${Math.min((u.downloads_used / u.download_limit) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs">
                                    {new Date(u.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {filteredUsers.length === 0 && (
                <div className="p-12 text-center text-slate-500">
                    <Database size={48} className="mx-auto mb-4 opacity-20" />
                    <p>No user records found matching your criteria</p>
                </div>
            )}
        </div>
    );
};

export default UserTable;
