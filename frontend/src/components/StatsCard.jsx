import React from 'react';

const StatsCard = ({ title, value, icon, trend, subtitle }) => (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500">
        <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 group-hover:bg-teal-500/10 transition-colors">
                {icon}
            </div>
            <div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">{title}</h4>
                {subtitle && <p className="text-[10px] text-slate-500">{subtitle}</p>}
            </div>
        </div>
        <div className="text-3xl font-black">{value !== undefined ? value : '...'}</div>
        {trend && <div className="mt-2 text-[10px] font-bold text-teal-500 bg-teal-500/10 w-fit px-2 py-0.5 rounded uppercase tracking-tighter">{trend}</div>}
        <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform">
            {React.cloneElement(icon, { size: 100 })}
        </div>
    </div>
);

export default StatsCard;
