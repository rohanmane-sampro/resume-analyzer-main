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
};
