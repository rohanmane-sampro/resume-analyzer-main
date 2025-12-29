// API Configuration - Automated detection to prevent "Failed to fetch"
const getApiBase = () => {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;

    // In development, match the hostname (localhost vs 127.0.0.1) exactly as the browser sees it
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return `http://${hostname}:5000`;
    }

    // In production, fallback to current origin or relative path
    return window.location.origin.replace(/:\d+$/, ':5000');
};

export const API_BASE_URL = getApiBase();

export const ENDPOINTS = {
    ANALYZE_RESUME: `${API_BASE_URL}/analyze-resume`,
    PARSE_RESUME: `${API_BASE_URL}/parse-resume-with-ai`,
    ENHANCE_CONTENT: `${API_BASE_URL}/enhance-content`,
    CHATBOT: `${API_BASE_URL}/chatbot`,
    SUGGEST_IMPROVEMENTS: `${API_BASE_URL}/suggest-improvements`,
    GENERATE_KEYWORDS: `${API_BASE_URL}/generate-keywords`,
    COMPLETE_RESUME: `${API_BASE_URL}/complete-resume`,
    PROFILE_SUGGESTIONS: `${API_BASE_URL}/generate-profile-suggestions`,
    HEALTH: `${API_BASE_URL}/health`,
    GENERATE_PDF: `${API_BASE_URL}/generate-pdf`,
    AUTH: {
        LOGIN: `${API_BASE_URL}/api/auth/login`,
        REGISTER: `${API_BASE_URL}/api/auth/register`,
        ME: `${API_BASE_URL}/api/auth/me`,
    },
    RESUME: {
        TRACK_CREATE: `${API_BASE_URL}/api/resume/track/create`,
        TRACK_DOWNLOAD: (id) => `${API_BASE_URL}/api/resume/track/download/${id}`,
        STATS: `${API_BASE_URL}/api/resume/stats`,
    },
    ADMIN: {
        METRICS: `${API_BASE_URL}/api/admin/metrics`,
        USERS: `${API_BASE_URL}/api/admin/users`,
        UPDATE_USER: (id) => `${API_BASE_URL}/api/admin/users/${id}`,
        RESUME_TRENDS: `${API_BASE_URL}/api/admin/analytics/resume-trends`,
        TEMPLATE_ANALYTICS: `${API_BASE_URL}/api/admin/analytics/templates`,
        SETTINGS: `${API_BASE_URL}/api/admin/settings`,
    }
};

export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};
