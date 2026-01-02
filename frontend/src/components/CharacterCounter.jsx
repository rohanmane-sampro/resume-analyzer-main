import React from 'react';

/**
 * CharacterCounter Component
 * Displays character count with visual feedback for form inputs
 * Shows warning when approaching limit and error when exceeded
 */
const CharacterCounter = ({ current, max, className = '' }) => {
    const percentage = (current / max) * 100;
    const remaining = max - current;

    // Determine color based on usage
    let colorClass = 'text-gray-500';
    if (percentage >= 100) {
        colorClass = 'text-red-600 font-bold';
    } else if (percentage >= 90) {
        colorClass = 'text-orange-500 font-semibold';
    } else if (percentage >= 75) {
        colorClass = 'text-yellow-600';
    }

    return (
        <div className={`text-xs mt-1 ${colorClass} ${className}`}>
            {current}/{max} characters
            {percentage >= 90 && remaining > 0 && (
                <span className="ml-2">({remaining} remaining)</span>
            )}
            {percentage >= 100 && (
                <span className="ml-2 text-red-600">⚠️ Limit exceeded! Content may not fit on one page.</span>
            )}
        </div>
    );
};

/**
 * ItemLimitWarning Component
 * Shows warning when approaching or exceeding maximum item count
 */
export const ItemLimitWarning = ({ current, max, itemName, className = '' }) => {
    if (current < max) return null;

    return (
        <div className={`bg-yellow-50 border-l-4 border-yellow-400 p-3 mt-2 ${className}`}>
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                        <strong>Maximum {itemName} reached ({current}/{max})</strong>
                        <br />
                        To ensure your resume fits on one page, we recommend limiting to {max} {itemName.toLowerCase()}.
                        {current > max && ' Please remove some items.'}
                    </p>
                </div>
            </div>
        </div>
    );
};

/**
 * OnePageTip Component
 * Shows helpful tip about one-page resume limits
 */
export const OnePageTip = ({ className = '' }) => {
    return (
        <div className={`bg-blue-50 border-l-4 border-blue-400 p-3 mb-4 ${className}`}>
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3">
                    <p className="text-sm text-blue-700">
                        <strong>💡 One-Page Resume Tip:</strong> Keep your resume concise to fit on a single A4 page.
                        We've set recommended limits for each section to help you create a professional, focused resume.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CharacterCounter;
