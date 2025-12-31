// Frontend Integration for Dynamic Template Visibility
// =====================================================

// Step 1: Add to apiConfig.js
// ----------------------------
// File: frontend/src/apiConfig.js

export const ENDPOINTS = {
    // ... existing endpoints
    RESUME: {
        TRACK_CREATE: `${API_BASE_URL}/api/resume/track/create`,
        TRACK_DOWNLOAD: (id) => `${API_BASE_URL}/api/resume/track/download/${id}`,
        STATS: `${API_BASE_URL}/api/resume/stats`,
        AVAILABLE_TEMPLATES: `${API_BASE_URL}/api/resume/available-templates`, // NEW
    },
    // ... rest of endpoints
};


// Step 2: Update Template Selection Component
// -------------------------------------------
// File: frontend/src/pages/TemplateSelection.jsx (or wherever you show templates)

import React, { useState, useEffect } from 'react';
import { getAuthHeaders, ENDPOINTS } from '../apiConfig';
import toast from 'react-hot-toast';

const TemplateSelection = () => {
    const [availableTemplates, setAvailableTemplates] = useState([]);
    const [templateLimit, setTemplateLimit] = useState(0);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);

    // All templates (1-30)
    const ALL_TEMPLATES = Array.from({ length: 30 }, (_, i) => i + 1);

    useEffect(() => {
        fetchAvailableTemplates();
    }, []);

    const fetchAvailableTemplates = async () => {
        try {
            setLoading(true);
            const response = await fetch(ENDPOINTS.RESUME.AVAILABLE_TEMPLATES, {
                method: 'GET',
                headers: getAuthHeaders()
            });

            const data = await response.json();

            if (response.ok) {
                setAvailableTemplates(data.templates);
                setTemplateLimit(data.template_limit);
                setUserInfo({
                    type: data.user_type,
                    plan: data.subscription_plan,
                    isAdmin: data.is_admin || false
                });

                // Show info to user
                if (!data.is_admin) {
                    toast.success(
                        `You can access ${data.total} templates (${data.subscription_plan} plan)`,
                        { duration: 3000 }
                    );
                }
            } else {
                toast.error('Failed to load templates');
            }
        } catch (error) {
            console.error('Error fetching templates:', error);
            toast.error('Error loading templates');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Choose Your Template
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {userInfo?.isAdmin ? (
                        'Admin: Access to all templates'
                    ) : (
                        <>
                            You can access <strong>{availableTemplates.length}</strong> templates
                            {' '}({userInfo?.plan} plan)
                        </>
                    )}
                </p>
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {availableTemplates.map((templateNum) => (
                    <TemplateCard
                        key={templateNum}
                        templateNumber={templateNum}
                        onSelect={() => handleSelectTemplate(templateNum)}
                    />
                ))}
            </div>

            {/* Upgrade Prompt (if not admin and has limited templates) */}
            {!userInfo?.isAdmin && availableTemplates.length < 30 && (
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                Want access to more templates?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Upgrade your plan to unlock all {ALL_TEMPLATES.length} professional templates
                            </p>
                        </div>
                        <button
                            onClick={() => {/* Show upgrade modal */ }}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                        >
                            Upgrade Plan
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const TemplateCard = ({ templateNumber, onSelect }) => {
    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl"
            onClick={onSelect}
        >
            {/* Template Preview */}
            <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-700 relative">
                <img
                    src={`/templates/template_${templateNumber}_preview.png`}
                    alt={`Template ${templateNumber}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = '/templates/placeholder.png';
                    }}
                />
                <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    #{templateNumber}
                </div>
            </div>

            {/* Template Info */}
            <div className="p-4">
                <h3 className="font-semibold text-gray-800 dark:text-white">
                    Template {templateNumber}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Professional Resume Template
                </p>
                <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                    Select Template
                </button>
            </div>
        </div>
    );
};

export default TemplateSelection;


// Step 3: Alternative - Filter Existing Template List
// ---------------------------------------------------
// If you already have a template selection component, just filter it:

const YourExistingTemplateComponent = () => {
    const [allTemplates] = useState([1, 2, 3, 4, 5, /* ... */ 30]);
    const [visibleTemplates, setVisibleTemplates] = useState([]);

    useEffect(() => {
        fetchAndFilterTemplates();
    }, []);

    const fetchAndFilterTemplates = async () => {
        try {
            const response = await fetch(ENDPOINTS.RESUME.AVAILABLE_TEMPLATES, {
                headers: getAuthHeaders()
            });
            const data = await response.json();

            if (response.ok) {
                // Filter to show only allowed templates
                const allowed = allTemplates.filter(
                    (num) => data.templates.includes(num)
                );
                setVisibleTemplates(allowed);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {visibleTemplates.map((templateNum) => (
                <TemplateCard key={templateNum} number={templateNum} />
            ))}
        </div>
    );
};
