/**
 * Data Sanitization Utility for One-Page Resume
 * 
 * This utility ensures imported resume data fits within one-page limits
 * by truncating text and limiting array items.
 */

import { ONE_PAGE_LIMITS } from '../components/GetInfo';

/**
 * Truncate text to maximum length
 */
const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (typeof text !== 'string') return String(text).slice(0, maxLength);
    return text.slice(0, maxLength);
};

/**
 * Sanitize contact information
 */
const sanitizeContactInfo = (contactInfo) => {
    if (!contactInfo) return {};

    return {
        fullName: truncateText(contactInfo.fullName, ONE_PAGE_LIMITS.fullName),
        phoneNumber: truncateText(contactInfo.phoneNumber, ONE_PAGE_LIMITS.phoneNumber),
        emailAddress: truncateText(contactInfo.emailAddress, ONE_PAGE_LIMITS.emailAddress),
        linkedin: truncateText(contactInfo.linkedin, ONE_PAGE_LIMITS.linkedin),
        portfolio: truncateText(contactInfo.portfolio, ONE_PAGE_LIMITS.portfolio),
        jobTitle: truncateText(contactInfo.jobTitle, ONE_PAGE_LIMITS.jobTitle),
        Location: truncateText(contactInfo.Location, ONE_PAGE_LIMITS.Location),
        Languages: truncateText(contactInfo.Languages, ONE_PAGE_LIMITS.Languages),
        profileImage: contactInfo.profileImage // Don't truncate image URL
    };
};

/**
 * Sanitize work experience array
 */
const sanitizeWorkExperience = (workExperience) => {
    if (!Array.isArray(workExperience)) return [];

    // Limit to max number of experiences
    return workExperience.slice(0, ONE_PAGE_LIMITS.maxWorkExperiences).map(exp => ({
        jobTitle: truncateText(exp.jobTitle, ONE_PAGE_LIMITS.workExperience.jobTitle),
        companyName: truncateText(exp.companyName, ONE_PAGE_LIMITS.workExperience.companyName),
        Location: truncateText(exp.Location, ONE_PAGE_LIMITS.workExperience.Location),
        WorkDuration: truncateText(exp.WorkDuration, ONE_PAGE_LIMITS.workExperience.WorkDuration),
        keyAchievements: truncateText(exp.keyAchievements, ONE_PAGE_LIMITS.workExperience.keyAchievements)
    }));
};

/**
 * Sanitize projects array
 */
const sanitizeProjects = (projects) => {
    if (!Array.isArray(projects)) return [];

    // Limit to max number of projects
    return projects.slice(0, ONE_PAGE_LIMITS.maxProjects).map(proj => ({
        projectName: truncateText(proj.projectName, ONE_PAGE_LIMITS.projects.projectName),
        projectDuration: truncateText(proj.projectDuration, ONE_PAGE_LIMITS.projects.projectDuration),
        projectDescription: truncateText(proj.projectDescription, ONE_PAGE_LIMITS.projects.projectDescription)
    }));
};

/**
 * Sanitize education array
 */
const sanitizeEducation = (education) => {
    if (!Array.isArray(education)) return [];

    // Limit to max number of education entries
    return education.slice(0, ONE_PAGE_LIMITS.maxEducation).map(edu => ({
        degreeName: truncateText(edu.degreeName, ONE_PAGE_LIMITS.education.degreeName),
        institutionName: truncateText(edu.institutionName, ONE_PAGE_LIMITS.education.institutionName),
        location: truncateText(edu.location, ONE_PAGE_LIMITS.education.location),
        graduationYear: truncateText(edu.graduationYear, ONE_PAGE_LIMITS.education.graduationYear)
    }));
};

/**
 * Sanitize certificates array
 */
const sanitizeCertificates = (certificates) => {
    if (!Array.isArray(certificates)) return [];

    // Limit to max number of certificates
    return certificates.slice(0, ONE_PAGE_LIMITS.maxCertificates).map(cert => ({
        certificateName: truncateText(cert.certificateName, ONE_PAGE_LIMITS.certificates.certificateName),
        providerName: truncateText(cert.providerName, ONE_PAGE_LIMITS.certificates.providerName),
        courseDuration: truncateText(cert.courseDuration, ONE_PAGE_LIMITS.certificates.courseDuration)
    }));
};

/**
 * Sanitize skills
 */
const sanitizeSkills = (skills) => {
    if (!skills) return { hardSkills: '', softSkills: '' };

    return {
        hardSkills: truncateText(skills.hardSkills, ONE_PAGE_LIMITS.hardSkills),
        softSkills: truncateText(skills.softSkills, ONE_PAGE_LIMITS.softSkills)
    };
};

/**
 * Sanitize description
 */
const sanitizeDescription = (description) => {
    if (!description) return { UserDescription: '' };

    return {
        UserDescription: truncateText(description.UserDescription, ONE_PAGE_LIMITS.UserDescription)
    };
};

/**
 * Main function to sanitize entire resume data
 * Returns sanitized data and warnings array
 */
export const sanitizeResumeData = (importedData) => {
    const warnings = [];

    // Sanitize contact info
    const originalContactInfo = importedData.contactInfo || {};
    const sanitizedContactInfo = sanitizeContactInfo(originalContactInfo);

    // Check for truncations in contact info
    Object.keys(ONE_PAGE_LIMITS).forEach(key => {
        if (key.startsWith('max')) return; // Skip max counts
        if (originalContactInfo[key] && originalContactInfo[key].length > ONE_PAGE_LIMITS[key]) {
            warnings.push({
                field: `Contact Info - ${key}`,
                original: originalContactInfo[key].length,
                limit: ONE_PAGE_LIMITS[key],
                truncated: originalContactInfo[key].length - ONE_PAGE_LIMITS[key]
            });
        }
    });

    // Sanitize work experience
    const originalWorkExp = importedData.workExperience || [];
    const sanitizedWorkExp = sanitizeWorkExperience(originalWorkExp);

    if (originalWorkExp.length > ONE_PAGE_LIMITS.maxWorkExperiences) {
        warnings.push({
            field: 'Work Experience',
            original: originalWorkExp.length,
            limit: ONE_PAGE_LIMITS.maxWorkExperiences,
            removed: originalWorkExp.length - ONE_PAGE_LIMITS.maxWorkExperiences
        });
    }

    // Check for text truncations in work experience
    originalWorkExp.slice(0, ONE_PAGE_LIMITS.maxWorkExperiences).forEach((exp, index) => {
        Object.keys(ONE_PAGE_LIMITS.workExperience).forEach(key => {
            if (exp[key] && exp[key].length > ONE_PAGE_LIMITS.workExperience[key]) {
                warnings.push({
                    field: `Work Experience #${index + 1} - ${key}`,
                    original: exp[key].length,
                    limit: ONE_PAGE_LIMITS.workExperience[key],
                    truncated: exp[key].length - ONE_PAGE_LIMITS.workExperience[key]
                });
            }
        });
    });

    // Sanitize projects
    const originalProjects = importedData.projects || [];
    const sanitizedProjects = sanitizeProjects(originalProjects);

    if (originalProjects.length > ONE_PAGE_LIMITS.maxProjects) {
        warnings.push({
            field: 'Projects',
            original: originalProjects.length,
            limit: ONE_PAGE_LIMITS.maxProjects,
            removed: originalProjects.length - ONE_PAGE_LIMITS.maxProjects
        });
    }

    // Sanitize education
    const originalEducation = importedData.education || [];
    const sanitizedEducation = sanitizeEducation(originalEducation);

    if (originalEducation.length > ONE_PAGE_LIMITS.maxEducation) {
        warnings.push({
            field: 'Education',
            original: originalEducation.length,
            limit: ONE_PAGE_LIMITS.maxEducation,
            removed: originalEducation.length - ONE_PAGE_LIMITS.maxEducation
        });
    }

    // Sanitize certificates
    const originalCertificates = importedData.certificates || [];
    const sanitizedCertificates = sanitizeCertificates(originalCertificates);

    if (originalCertificates.length > ONE_PAGE_LIMITS.maxCertificates) {
        warnings.push({
            field: 'Certificates',
            original: originalCertificates.length,
            limit: ONE_PAGE_LIMITS.maxCertificates,
            removed: originalCertificates.length - ONE_PAGE_LIMITS.maxCertificates
        });
    }

    // Sanitize skills
    const originalSkills = importedData.skills || {};
    const sanitizedSkills = sanitizeSkills(originalSkills);

    if (originalSkills.hardSkills && originalSkills.hardSkills.length > ONE_PAGE_LIMITS.hardSkills) {
        warnings.push({
            field: 'Hard Skills',
            original: originalSkills.hardSkills.length,
            limit: ONE_PAGE_LIMITS.hardSkills,
            truncated: originalSkills.hardSkills.length - ONE_PAGE_LIMITS.hardSkills
        });
    }

    if (originalSkills.softSkills && originalSkills.softSkills.length > ONE_PAGE_LIMITS.softSkills) {
        warnings.push({
            field: 'Soft Skills',
            original: originalSkills.softSkills.length,
            limit: ONE_PAGE_LIMITS.softSkills,
            truncated: originalSkills.softSkills.length - ONE_PAGE_LIMITS.softSkills
        });
    }

    // Sanitize description
    const originalDescription = importedData.Description || {};
    const sanitizedDescription = sanitizeDescription(originalDescription);

    if (originalDescription.UserDescription && originalDescription.UserDescription.length > ONE_PAGE_LIMITS.UserDescription) {
        warnings.push({
            field: 'Profile Description',
            original: originalDescription.UserDescription.length,
            limit: ONE_PAGE_LIMITS.UserDescription,
            truncated: originalDescription.UserDescription.length - ONE_PAGE_LIMITS.UserDescription
        });
    }

    // Return sanitized data and warnings
    return {
        sanitizedData: {
            selectedTemplate: importedData.selectedTemplate,
            contactInfo: sanitizedContactInfo,
            workExperience: sanitizedWorkExp,
            projects: sanitizedProjects,
            education: sanitizedEducation,
            certificates: sanitizedCertificates,
            skills: sanitizedSkills,
            Description: sanitizedDescription
        },
        warnings,
        hasWarnings: warnings.length > 0
    };
};

/**
 * Format warnings for display to user
 */
export const formatWarningsMessage = (warnings) => {
    if (!warnings || warnings.length === 0) {
        return null;
    }

    let message = '⚠️ Your imported resume data exceeded one-page limits. The following adjustments were made:\n\n';

    warnings.forEach((warning, index) => {
        if (warning.removed) {
            message += `${index + 1}. ${warning.field}: Removed ${warning.removed} item(s) (had ${warning.original}, limit is ${warning.limit})\n`;
        } else if (warning.truncated) {
            message += `${index + 1}. ${warning.field}: Truncated ${warning.truncated} characters (had ${warning.original}, limit is ${warning.limit})\n`;
        }
    });

    message += '\n✅ Your resume has been adjusted to fit on one page. Please review and edit as needed.';

    return message;
};

export default sanitizeResumeData;
