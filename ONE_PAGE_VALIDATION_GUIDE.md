# One-Page Resume Form Validation Implementation Guide

## Overview
This document provides instructions for implementing form validations in GetInfo.jsx to ensure all resume content fits on a single A4 page (210mm × 297mm).

## Components Created

### 1. CharacterCounter.jsx
Located at: `frontend/src/components/CharacterCounter.jsx`

**Components:**
- `CharacterCounter` - Shows character count with color-coded warnings
- `ItemLimitWarning` - Displays warning when max items reached
- `OnePageTip` - Shows helpful tip about one-page limits

### 2. ONE_PAGE_LIMITS Configuration
Added to GetInfo.jsx (lines 18-72)

Contains all recommended limits for one-page resumes.

### 3. sanitizeResumeData.js
Located at: `frontend/src/utils/sanitizeResumeData.js`

**Functions:**
- `sanitizeResumeData(importedData)` - Automatically truncates/limits imported data
- `formatWarningsMessage(warnings)` - Formats warnings for user display

## Handling Imported Resume Data

When users upload/import resume data (from HTML files, JSON, or other sources), the data must be sanitized to fit one-page limits.

### Step 1: Import the Sanitization Utility

Add to GetInfo.jsx imports:

```javascript
import { sanitizeResumeData, formatWarningsMessage } from '../utils/sanitizeResumeData';
```

### Step 2: Sanitize Data on Import

Find the data import/upload handler in GetInfo.jsx (likely in a `useEffect` or file upload handler) and wrap it:

```javascript
// Example: When loading data from uploaded file
const handleFileUpload = (uploadedData) => {
  // Sanitize the imported data
  const { sanitizedData, warnings, hasWarnings } = sanitizeResumeData(uploadedData);
  
  // Show warnings to user if data was truncated
  if (hasWarnings) {
    const warningMessage = formatWarningsMessage(warnings);
    toast.warning(warningMessage, {
      duration: 10000,
      position: 'top-center',
      style: {
        maxWidth: '600px',
        whiteSpace: 'pre-line'
      }
    });
  }
  
  // Set the sanitized data to form
  setFormData(sanitizedData);
  
  // Optionally, show a summary
  if (hasWarnings) {
    console.log('Data sanitization warnings:', warnings);
  }
};
```

### Step 3: Handle URL State Data

If data comes from navigation state (e.g., from FileUploadPage):

```javascript
// In GetInfo.jsx, find where UserjsonData is used
const location = useLocation();
const UserjsonData = location.state?.jsonData || null;

// Sanitize if data exists
useEffect(() => {
  if (UserjsonData) {
    const { sanitizedData, warnings, hasWarnings } = sanitizeResumeData(UserjsonData);
    
    if (hasWarnings) {
      const warningMessage = formatWarningsMessage(warnings);
      toast.warning(warningMessage, {
        duration: 10000,
        position: 'top-center',
        style: {
          maxWidth: '600px',
          whiteSpace: 'pre-line'
        }
      });
    }
    
    // Update form data with sanitized version
    setFormData(prevData => ({
      ...prevData,
      ...sanitizedData
    }));
  }
}, [UserjsonData]);
```

### Step 4: Sanitize Example Data

If using example/template data:

```javascript
// Find where ExampleJsonData is set
const [ExampleJsonData, setExampleJsonData] = useState(() => {
  const randomExample = JsonFiles[Math.floor(Math.random() * JsonFiles.length)];
  const { sanitizedData } = sanitizeResumeData(randomExample);
  return sanitizedData;
});
```

### Step 5: Add Warning Modal Component

Create a detailed warning modal for import warnings:

```javascript
const ImportWarningModal = ({ warnings, onClose, onAccept }) => {
  if (!warnings || warnings.length === 0) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-yellow-600 mb-4">
          ⚠️ Resume Data Adjusted for One-Page Format
        </h2>
        
        <p className="text-gray-700 mb-4">
          Your imported resume exceeded the recommended limits for a one-page resume. 
          We've automatically adjusted the following:
        </p>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <ul className="space-y-2">
            {warnings.map((warning, index) => (
              <li key={index} className="text-sm">
                <strong>{warning.field}:</strong>{' '}
                {warning.removed && `Removed ${warning.removed} item(s) (limit: ${warning.limit})`}
                {warning.truncated && `Truncated ${warning.truncated} characters (limit: ${warning.limit})`}
              </li>
            ))}
          </ul>
        </div>
        
        <p className="text-gray-600 text-sm mb-6">
          ✅ Your resume has been adjusted to fit on one A4 page. You can review and edit the content as needed.
        </p>
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Review Changes
          </button>
          <button
            onClick={onAccept}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
```

### Example: Complete Import Flow

```javascript
// In GetInfo.jsx
import { sanitizeResumeData, formatWarningsMessage } from '../utils/sanitizeResumeData';

const GetInfo = () => {
  const [showImportWarning, setShowImportWarning] = useState(false);
  const [importWarnings, setImportWarnings] = useState([]);
  
  // Handle data from file upload
  const handleDataImport = (importedData) => {
    const { sanitizedData, warnings, hasWarnings } = sanitizeResumeData(importedData);
    
    // Set sanitized data
    setFormData(sanitizedData);
    
    // Show warnings if any
    if (hasWarnings) {
      setImportWarnings(warnings);
      setShowImportWarning(true);
      
      // Also show toast notification
      toast.warning(
        `⚠️ Resume adjusted to fit one page. ${warnings.length} item(s) were truncated or removed.`,
        { duration: 5000 }
      );
    } else {
      toast.success('✅ Resume imported successfully!');
    }
  };
  
  return (
    <>
      {/* Your form content */}
      
      {/* Import warning modal */}
      {showImportWarning && (
        <ImportWarningModal
          warnings={importWarnings}
          onClose={() => setShowImportWarning(false)}
          onAccept={() => setShowImportWarning(false)}
        />
      )}
    </>
  );
};
```

## What Gets Sanitized

### Automatic Truncations:
- **Text fields** - Cut to character limits
- **Arrays** - Limited to max item counts
- **Excess items** - Removed (oldest/last items)

### Warning Details:
Users see exactly what was changed:
```
⚠️ Your imported resume data exceeded one-page limits. 
The following adjustments were made:

1. Work Experience: Removed 2 item(s) (had 5, limit is 3)
2. Work Experience #1 - keyAchievements: Truncated 150 characters (had 550, limit is 400)
3. Profile Description: Truncated 200 characters (had 800, limit is 600)
4. Projects: Removed 1 item(s) (had 3, limit is 2)

✅ Your resume has been adjusted to fit on one page. Please review and edit as needed.
```

## Implementation Steps

### Step 1: Add maxLength to Input Fields

For each text input in GetInfo.jsx, add the `maxLength` attribute:

```javascript
// Example: Full Name Input
<input
  type="text"
  maxLength={ONE_PAGE_LIMITS.fullName}  // Add this
  value={formData.contactInfo.fullName}
  onChange={(e) => handleInputChange("contactInfo", "fullName", e.target.value)}
/>
<CharacterCounter 
  current={formData.contactInfo.fullName?.length || 0}
  max={ONE_PAGE_LIMITS.fullName}
/>
```

### Step 2: Add Character Counters

Add `<CharacterCounter />` below each text input/textarea:

**Contact Information Section (Lines ~625-730):**
```javascript
// Full Name
<Suggestions
  label={<span>Full Name <span className="text-red-500">*</span></span>}
  value={formData.contactInfo.fullName}
  onChange={(val) => handleInputChange("contactInfo", "fullName", val.slice(0, ONE_PAGE_LIMITS.fullName))}
/>
<CharacterCounter 
  current={formData.contactInfo.fullName?.length || 0}
  max={ONE_PAGE_LIMITS.fullName}
/>

// Phone Number
<input
  type="tel"
  maxLength={ONE_PAGE_LIMITS.phoneNumber}
  value={formData.contactInfo.phoneNumber}
  onChange={(e) => handleInputChange("contactInfo", "phoneNumber", e.target.value)}
/>
<CharacterCounter 
  current={formData.contactInfo.phoneNumber?.length || 0}
  max={ONE_PAGE_LIMITS.phoneNumber}
/>

// Email
<input
  type="email"
  maxLength={ONE_PAGE_LIMITS.emailAddress}
  value={formData.contactInfo.emailAddress}
  onChange={(e) => handleInputChange("contactInfo", "emailAddress", e.target.value)}
/>
<CharacterCounter 
  current={formData.contactInfo.emailAddress?.length || 0}
  max={ONE_PAGE_LIMITS.emailAddress}
/>

// LinkedIn
<input
  type="text"
  maxLength={ONE_PAGE_LIMITS.linkedin}
  value={formData.contactInfo.linkedin}
  onChange={(e) => handleInputChange("contactInfo", "linkedin", e.target.value)}
/>
<CharacterCounter 
  current={formData.contactInfo.linkedin?.length || 0}
  max={ONE_PAGE_LIMITS.linkedin}
/>

// Portfolio
<input
  type="text"
  maxLength={ONE_PAGE_LIMITS.portfolio}
  value={formData.contactInfo.portfolio}
  onChange={(e) => handleInputChange("contactInfo", "portfolio", e.target.value)}
/>
<CharacterCounter 
  current={formData.contactInfo.portfolio?.length || 0}
  max={ONE_PAGE_LIMITS.portfolio}
/>

// Job Title
<Suggestions
  label={<span>Job Title <span className="text-red-500">*</span></span>}
  value={formData.contactInfo.jobTitle}
  onChange={(val) => handleInputChange("contactInfo", "jobTitle", val.slice(0, ONE_PAGE_LIMITS.jobTitle))}
/>
<CharacterCounter 
  current={formData.contactInfo.jobTitle?.length || 0}
  max={ONE_PAGE_LIMITS.jobTitle}
/>

// Location
<input
  type="text"
  maxLength={ONE_PAGE_LIMITS.Location}
  value={formData.contactInfo.Location}
  onChange={(e) => handleInputChange("contactInfo", "Location", e.target.value)}
/>
<CharacterCounter 
  current={formData.contactInfo.Location?.length || 0}
  max={ONE_PAGE_LIMITS.Location}
/>

// Languages
<input
  type="text"
  maxLength={ONE_PAGE_LIMITS.Languages}
  placeholder="e.g., English, Spanish, French (max 3-4)"
  value={formData.contactInfo.Languages}
  onChange={(e) => handleInputChange("contactInfo", "Languages", e.target.value)}
/>
<CharacterCounter 
  current={formData.contactInfo.Languages?.length || 0}
  max={ONE_PAGE_LIMITS.Languages}
/>
```

### Step 3: Add Profile/Summary Validation

```javascript
// Profile Description (Find textarea for UserDescription)
<textarea
  maxLength={ONE_PAGE_LIMITS.UserDescription}
  value={formData.Description.UserDescription}
  onChange={(e) => handleInputChange("Description", "UserDescription", e.target.value)}
  rows={4}
/>
<CharacterCounter 
  current={formData.Description.UserDescription?.length || 0}
  max={ONE_PAGE_LIMITS.UserDescription}
/>
<p className="text-xs text-gray-500 mt-1">
  Recommended: 3-4 sentences, ~100-120 words
</p>
```

### Step 4: Add Work Experience Limits

**Before the "Add Experience" button:**
```javascript
<ItemLimitWarning
  current={formData.workExperience.length}
  max={ONE_PAGE_LIMITS.maxWorkExperiences}
  itemName="Work Experiences"
/>
```

**Modify the "Add Experience" button:**
```javascript
<button
  onClick={addWorkExperience}
  disabled={formData.workExperience.length >= ONE_PAGE_LIMITS.maxWorkExperiences}
  className={`... ${formData.workExperience.length >= ONE_PAGE_LIMITS.maxWorkExperiences ? 'opacity-50 cursor-not-allowed' : ''}`}
>
  <Plus className="w-4 h-4" />
  Add Work Experience ({formData.workExperience.length}/{ONE_PAGE_LIMITS.maxWorkExperiences})
</button>
```

**For each work experience field:**
```javascript
// Job Title
<input
  maxLength={ONE_PAGE_LIMITS.workExperience.jobTitle}
  value={exp.jobTitle}
  onChange={(e) => handleWorkExperienceChange(index, "jobTitle", e.target.value)}
/>
<CharacterCounter 
  current={exp.jobTitle?.length || 0}
  max={ONE_PAGE_LIMITS.workExperience.jobTitle}
/>

// Company Name
<input
  maxLength={ONE_PAGE_LIMITS.workExperience.companyName}
  value={exp.companyName}
  onChange={(e) => handleWorkExperienceChange(index, "companyName", e.target.value)}
/>
<CharacterCounter 
  current={exp.companyName?.length || 0}
  max={ONE_PAGE_LIMITS.workExperience.companyName}
/>

// Location
<input
  maxLength={ONE_PAGE_LIMITS.workExperience.Location}
  value={exp.Location}
  onChange={(e) => handleWorkExperienceChange(index, "Location", e.target.value)}
/>
<CharacterCounter 
  current={exp.Location?.length || 0}
  max={ONE_PAGE_LIMITS.workExperience.Location}
/>

// Duration
<input
  maxLength={ONE_PAGE_LIMITS.workExperience.WorkDuration}
  value={exp.WorkDuration}
  onChange={(e) => handleWorkExperienceChange(index, "WorkDuration", e.target.value)}
/>
<CharacterCounter 
  current={exp.WorkDuration?.length || 0}
  max={ONE_PAGE_LIMITS.workExperience.WorkDuration}
/>

// Key Achievements
<textarea
  maxLength={ONE_PAGE_LIMITS.workExperience.keyAchievements}
  value={exp.keyAchievements}
  onChange={(e) => handleWorkExperienceChange(index, "keyAchievements", e.target.value)}
  rows={4}
/>
<CharacterCounter 
  current={exp.keyAchievements?.length || 0}
  max={ONE_PAGE_LIMITS.workExperience.keyAchievements}
/>
<p className="text-xs text-gray-500 mt-1">
  Recommended: 3-4 bullet points, ~60-80 words total
</p>
```

### Step 5: Add Project Limits

```javascript
<ItemLimitWarning
  current={formData.projects.length}
  max={ONE_PAGE_LIMITS.maxProjects}
  itemName="Projects"
/>

<button
  onClick={addProject}
  disabled={formData.projects.length >= ONE_PAGE_LIMITS.maxProjects}
  className={`... ${formData.projects.length >= ONE_PAGE_LIMITS.maxProjects ? 'opacity-50 cursor-not-allowed' : ''}`}
>
  <Plus className="w-4 h-4" />
  Add Project ({formData.projects.length}/{ONE_PAGE_LIMITS.maxProjects})
</button>

// For each project field:
<input
  maxLength={ONE_PAGE_LIMITS.projects.projectName}
  value={proj.projectName}
  onChange={(e) => handleProjectChange(index, "projectName", e.target.value)}
/>
<CharacterCounter 
  current={proj.projectName?.length || 0}
  max={ONE_PAGE_LIMITS.projects.projectName}
/>

<textarea
  maxLength={ONE_PAGE_LIMITS.projects.projectDescription}
  value={proj.projectDescription}
  onChange={(e) => handleProjectChange(index, "projectDescription", e.target.value)}
  rows={3}
/>
<CharacterCounter 
  current={proj.projectDescription?.length || 0}
  max={ONE_PAGE_LIMITS.projects.projectDescription}
/>
```

### Step 6: Add Education Limits

```javascript
<ItemLimitWarning
  current={formData.education.length}
  max={ONE_PAGE_LIMITS.maxEducation}
  itemName="Education Entries"
/>

<button
  onClick={addEducation}
  disabled={formData.education.length >= ONE_PAGE_LIMITS.maxEducation}
  className={`... ${formData.education.length >= ONE_PAGE_LIMITS.maxEducation ? 'opacity-50 cursor-not-allowed' : ''}`}
>
  <Plus className="w-4 h-4" />
  Add Education ({formData.education.length}/{ONE_PAGE_LIMITS.maxEducation})
</button>

// For each education field:
<input
  maxLength={ONE_PAGE_LIMITS.education.degreeName}
  value={edu.degreeName}
  onChange={(e) => handleEducationChange(index, "degreeName", e.target.value)}
/>
<CharacterCounter 
  current={edu.degreeName?.length || 0}
  max={ONE_PAGE_LIMITS.education.degreeName}
/>
```

### Step 7: Add Certificate Limits

```javascript
<ItemLimitWarning
  current={formData.certificates.length}
  max={ONE_PAGE_LIMITS.maxCertificates}
  itemName="Certificates"
/>

<button
  onClick={addCertificate}
  disabled={formData.certificates.length >= ONE_PAGE_LIMITS.maxCertificates}
  className={`... ${formData.certificates.length >= ONE_PAGE_LIMITS.maxCertificates ? 'opacity-50 cursor-not-allowed' : ''}`}
>
  <Plus className="w-4 h-4" />
  Add Certificate ({formData.certificates.length}/{ONE_PAGE_LIMITS.maxCertificates})
</button>
```

### Step 8: Add Skills Validation

```javascript
// Hard Skills
<input
  maxLength={ONE_PAGE_LIMITS.hardSkills}
  placeholder="e.g., Python, JavaScript, React (max 8-10 skills)"
  value={formData.skills.hardSkills}
  onChange={(e) => handleInputChange("skills", "hardSkills", e.target.value)}
/>
<CharacterCounter 
  current={formData.skills.hardSkills?.length || 0}
  max={ONE_PAGE_LIMITS.hardSkills}
/>

// Soft Skills
<input
  maxLength={ONE_PAGE_LIMITS.softSkills}
  placeholder="e.g., Leadership, Communication (max 6-8 skills)"
  value={formData.skills.softSkills}
  onChange={(e) => handleInputChange("skills", "softSkills", e.target.value)}
/>
<CharacterCounter 
  current={formData.skills.softSkills?.length || 0}
  max={ONE_PAGE_LIMITS.softSkills}
/>
```

### Step 9: Add One-Page Tip at Top of Form

Add this after the form header (around line 625):

```javascript
<OnePageTip />
```

## Testing

After implementation, test with:
1. Try to exceed character limits - should be prevented
2. Try to add more than max items - button should be disabled
3. Check color-coded warnings appear at 75%, 90%, 100%
4. Verify all data fits on one A4 page when previewed/downloaded

## Summary of Limits

- **Work Experiences:** Max 3
- **Projects:** Max 2
- **Education:** Max 2
- **Certificates:** Max 3
- **Profile Description:** 600 characters
- **Work Achievement:** 400 characters each
- **Project Description:** 300 characters each
- **Skills:** 200 characters (hard), 150 characters (soft)

These limits are carefully calculated to ensure all content fits comfortably on one A4 page across all 34 templates.
