import React from 'react';
import { X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PricingModal = ({ onClose, userType }) => {
    const navigate = useNavigate();
    const isKnowledgeHub = userType === 'knowledge_hub';

    const plans = [
        {
            name: 'Basic',
            price: 'Free',
            features: ['3 Resume Templates', 'Basic Analysis', 'PDF Download'],
            color: 'bg-gray-100',
            btnColor: 'bg-gray-800',
            limit: 3
        },
        {
            name: 'Standard',
            price: '$9.99',
            period: '/mo',
            features: ['7 Resume Templates', 'Advanced Analysis', 'Priority Support', 'ATS Optimization'],
            color: 'bg-blue-50',
            btnColor: 'bg-blue-600',
            limit: 7,
            popular: true
        },
        {
            name: 'Premium',
            price: '$19.99',
            period: '/mo',
            features: ['20+ Resume Templates', 'Unlimited Analysis', '1-on-1 Consultation', 'Cover Letter Builder'],
            color: 'bg-purple-50',
            btnColor: 'bg-purple-600',
            limit: 20
        }
    ];

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className={`relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full overflow-hidden animate-in fade-in zoom-in duration-300 ${isKnowledgeHub ? 'max-w-xl' : 'max-w-5xl'}`}>

                {/* Header */}
                <div className={`text-center text-white relative ${isKnowledgeHub ? 'bg-gradient-to-r from-emerald-600 to-teal-600 p-6' : 'bg-gradient-to-r from-blue-600 to-purple-600 p-8'}`}>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                    <h2 className={`${isKnowledgeHub ? 'text-2xl' : 'text-3xl'} font-bold mb-2`}>{isKnowledgeHub ? 'Knowledge Hub Premium 🎓' : 'Upgrade Your Career 🚀'}</h2>
                    <p className="text-blue-50 dark:text-blue-100 max-w-xl mx-auto text-sm">
                        {isKnowledgeHub
                            ? 'Maximize your institutional access with our Premium plan.'
                            : 'Unlock premium templates and AI features to land your dream job faster.'}
                    </p>
                </div>

                {isKnowledgeHub ? (
                    /* Knowledge Hub Specific View - COMPACT */
                    <div className="p-8 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4">
                            <span className="text-2xl">💎</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                            Unlock All Resume Templates
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 max-w-md text-sm mb-6 leading-relaxed">
                            You are currently on a limited Knowledge Hub plan. To access all 30+ premium resume templates,
                            please upgrade to the <span className="font-bold text-emerald-600 dark:text-emerald-400">Knowledge Hub Premium</span> plan.
                        </p>
                        <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 w-full max-w-sm">
                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-3 text-sm">Premium Benefits</h4>
                            <ul className="space-y-2 text-left">
                                {['Access to all 30+ Premium Templates', 'Unlimited PDF Downloads', 'Advanced AI Resume Analysis', 'Priority Support'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                                        <Check size={16} className="text-emerald-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    /* Regular User View */
                    <div className="grid md:grid-cols-3 gap-6 p-8">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`relative rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-[1.02] cursor-default
                  ${plan.popular
                                        ? 'border-blue-500 shadow-xl scale-[1.01] dark:bg-slate-800'
                                        : 'border-slate-100 dark:border-slate-800 dark:bg-slate-800/50'
                                    }
                `}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        Most Popular
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{plan.name}</h3>
                                    <div className="flex justify-center items-baseline mb-1">
                                        <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
                                        {plan.period && <span className="text-slate-500 text-sm font-medium">{plan.period}</span>}
                                    </div>
                                    <p className="text-slate-500 text-sm">per user</p>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                            <Check size={16} className={`shrink-0 ${plan.popular ? 'text-blue-500' : 'text-slate-400'}`} />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => {
                                        alert(`You chose ${plan.name} plan. Payment integration coming soon!`);
                                        onClose();
                                    }}
                                    className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-md hover:shadow-lg ${plan.btnColor} hover:opacity-90 active:scale-95`}
                                >
                                    Choose {plan.name}
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 text-center text-xs text-slate-500">
                    <p>Secure payment • 24/7 Support</p>
                </div>
            </div>
        </div>
    );
};

export default PricingModal;
