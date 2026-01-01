import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import { ENDPOINTS } from '../apiConfig';

// Set up PDF.js worker - using the npm package's worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

/**
 * Parse PDF file and extract text
 */
async function parsePDF(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }

    return fullText;
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Failed to parse PDF file');
  }
}

/**
 * Parse DOCX file and extract text
 */
async function parseDOCX(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    console.error('DOCX parsing error:', error);
    throw new Error('Failed to parse DOCX file');
  }
}

/**
 * Extract email from text
 */
function extractEmail(text) {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = text.match(emailRegex);
  return matches ? matches[0] : '';
}

/**
 * Extract phone number from text
 */
function extractPhone(text) {
  // More comprehensive phone regex handling international formats
  const phoneRegex = /(?:(?:\+|00)?[1-9]\d{0,3}[\s.-]?)?(?:\(?\d{2,4}\)?[\s.-]?)?\d{3,4}[\s.-]?\d{3,4}(?:[\s.-]?\d{3,9})?/g;

  const matches = text.match(phoneRegex);
  if (!matches) return '';

  // Filter matches to find the most likely phone number (10-15 digits usually)
  for (const match of matches) {
    // Clean to just digits
    const digits = match.replace(/\D/g, '');
    // Check length (10-15 is standard for intl numbers)
    // Also avoid common date years like 2020-2025 (8 digits or range)
    if (digits.length >= 10 && digits.length <= 15) {
      // Basic check to avoid clearly wrong numbers (like 0000000000)
      if (!/^0+$/.test(digits)) {
        return match.trim();
      }
    }
  }
  return '';
}

/**
 * Extract location/address
 */
function extractLocation(text) {
  // 1. Look for explicit keywords first
  const keywordRegex = /(?:address|location|residence|city|place)[:\s]+([^,\n]+(?:,[\s\S]+?)?)(?=\n|$)/i;
  const keywordMatch = text.match(keywordRegex);
  if (keywordMatch && keywordMatch[1].trim().length > 3 && keywordMatch[1].trim().length < 100) {
    return keywordMatch[1].trim();
  }

  // 2. Look for City, State/Country patterns in first 20 lines
  const locationRegex = /\b([A-Z][a-zA-Z\s.-]+),\s*([A-Z][a-zA-Z\s.-]+)(?:,\s*([A-Z][a-zA-Z\s.-]+))?\b/;
  const lines = text.split('\n').slice(0, 20);

  for (let line of lines) {
    // Skip lines with email, or url
    if (line.includes('@') || line.match(/https?:\/\//)) continue;
    if (line.trim().length < 5) continue;

    const match = line.match(locationRegex);
    if (match) {
      // Ensure it's not a long sentence 
      if (line.split(/\s+/).length < 12) {
        return match[0].trim();
      }
    }
  }

  return '';
}

/**
 * Extract LinkedIn URL from text
 */
function extractLinkedIn(text) {
  const linkedinRegex = /(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?/gi;
  const matches = text.match(linkedinRegex);
  return matches ? matches[0] : '';
}

/**
 * Extract GitHub/Portfolio URL from text
 */
function extractPortfolio(text) {
  const githubRegex = /(https?:\/\/)?(www\.)?(github\.com|portfolio|.*\.com)\/[a-zA-Z0-9_-]+/gi;
  const matches = text.match(githubRegex);
  if (matches) {
    const filtered = matches.filter(url =>
      !url.toLowerCase().includes('linkedin') &&
      !url.toLowerCase().includes('@')
    );
    return filtered[0] || '';
  }
  return '';
}

/**
 * Extract name (usually first 1-2 lines)
 */
function extractName(text) {
  const lines = text.split('\n').filter(line => line.trim().length > 0);

  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i].trim();

    if (line.toLowerCase().match(/resume|curriculum|vitae|cv|profile|contact/)) {
      continue;
    }

    if (line.length >= 2 && line.length <= 50 &&
      !line.includes('@') &&
      !line.match(/\d{3}/) &&
      !line.match(/https?:\/\//i) &&
      line.match(/[a-zA-Z]/g) &&
      line.match(/[a-zA-Z]/g).length > line.length * 0.6) {

      return line
        .replace(/[|]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }
  }

  return '';
}

/**
 * Extract skills section
 */
function extractSkills(text) {
  const skillsRegex = /(?:skills?|technical skills?|technologies?|expertise|competencies)[:\s]+(.*?)(?=\n\n|education|experience|projects?|certification|$)/gis;
  const match = text.match(skillsRegex);

  if (match && match[1]) {
    let skillsText = match[1]
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/[•\-\*]/g, ',')
      .trim();

    skillsText = skillsText.split(',')
      .map(s => s.trim())
      .filter(s => s.length > 2 && s.length < 50)
      .join(', ');

    return skillsText;
  }

  return '';
}

/**
 * Extract education section
 */
function extractEducation(text) {
  const educationRegex = /(?:education|academic|qualification)[:\s]*\n+(.*?)(?=\n\n\n|experience|work|employment|skills?|projects?|certification|achievements|$)/gis;
  const match = text.match(educationRegex);

  if (match && match[1]) {
    const eduText = match[1];
    const lines = eduText.split('\n').map(l => l.trim()).filter(l => l);

    const education = [];
    let currentEdu = { institutionName: '', degreeName: '', graduationYear: '', currentCGPA: '' };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.match(/bachelor|master|phd|doctorate|diploma|b\.?tech|m\.?tech|b\.?e\.?|m\.?e\.?|bca|mca|b\.?sc|m\.?sc|b\.?a\.?|m\.?a\.?|degree|engineering|science|arts|commerce/i)) {
        if (currentEdu.degreeName || currentEdu.institutionName) {
          education.push({ ...currentEdu });
        }
        currentEdu = { institutionName: '', degreeName: line, graduationYear: '', currentCGPA: '' };
      }
      else if (line.match(/university|college|institute|school|iit|nit|academy/i) && line.length > 5) {
        currentEdu.institutionName = line;
      }
      else if (line.match(/\b(19|20)\d{2}\b/)) {
        const yearMatch = line.match(/\b(19|20)\d{2}\b/);
        currentEdu.graduationYear = yearMatch ? yearMatch[0] : '';

        const gradeMatch = line.match(/(\d+\.?\d*)\s*(?:cgpa|gpa|grade|%)/i);
        if (gradeMatch) {
          currentEdu.currentCGPA = gradeMatch[1];
        }
      }
      else if (line.match(/gpa|cgpa|grade|percentage|marks|score/i)) {
        const gradeMatch = line.match(/(\d+\.?\d*)\s*(?:\/\s*\d+)?/);
        if (gradeMatch && !currentEdu.currentCGPA) {
          currentEdu.currentCGPA = gradeMatch[1];
        }
      }
      else if (currentEdu.degreeName && !currentEdu.institutionName && line.length > 10) {
        currentEdu.institutionName = line;
      }
    }

    if (currentEdu.degreeName || currentEdu.institutionName) {
      education.push(currentEdu);
    }

    return education.length > 0 ? education : [{ institutionName: '', degreeName: '', graduationYear: '', currentCGPA: '' }];
  }

  return [{ institutionName: '', degreeName: '', graduationYear: '', currentCGPA: '' }];
}

/**
 * Extract work experience
 */
function extractExperience(text) {
  const expRegex = /(?:experience|employment|work\s+history|professional\s+experience)[:\s]*\n+(.*?)(?=\n\n\n|education|skills?|projects?|certification|achievements|$)/gis;
  const match = text.match(expRegex);

  if (match && match[1]) {
    const expText = match[1];
    const lines = expText.split('\n').map(l => l.trim()).filter(l => l);

    const experience = [];
    let currentExp = { jobTitle: '', companyName: '', WorkDuration: '', keyAchievements: '' };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.match(/\b(developer|engineer|manager|analyst|designer|consultant|architect|lead|senior|junior|intern|associate|specialist|executive|director|coordinator|assistant|administrator|officer|representative)\b/i) &&
        line.length < 100) {

        if (currentExp.jobTitle || currentExp.companyName) {
          experience.push({ ...currentExp });
        }

        const atMatch = line.match(/^(.+?)\s+(?:at|@|-)\s+(.+)$/i);
        if (atMatch) {
          currentExp = {
            jobTitle: atMatch[1].trim(),
            companyName: atMatch[2].trim(),
            WorkDuration: '',
            keyAchievements: ''
          };
        } else {
          currentExp = { jobTitle: line, companyName: '', WorkDuration: '', keyAchievements: '' };
        }
      }
      else if (currentExp.jobTitle && !currentExp.companyName &&
        line.length > 3 && line.length < 80 &&
        !line.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|present|current)\b/i) &&
        !line.match(/^[•\-\*]/) &&
        line.match(/[a-zA-Z]/)) {
        currentExp.companyName = line;
      }
      else if (line.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|present|current|\d{4})/i) &&
        line.match(/[-–—to|]/i)) {
        currentExp.WorkDuration = line;
      }
      else if (currentExp.jobTitle &&
        (line.match(/^[•\-\*]/) || line.length > 20) &&
        !line.match(/^(experience|employment|work|education|skills|projects)/i)) {
        const cleanLine = line.replace(/^[•\-\*]\s*/, '');
        if (cleanLine.length > 10) {
          currentExp.keyAchievements += (currentExp.keyAchievements ? '\n' : '') + cleanLine;
        }
      }
    }

    if (currentExp.jobTitle || currentExp.companyName) {
      experience.push(currentExp);
    }

    return experience.length > 0 ? experience : [{ jobTitle: '', companyName: '', WorkDuration: '', keyAchievements: '' }];
  }

  return [{ jobTitle: '', companyName: '', WorkDuration: '', keyAchievements: '' }];
}

/**
 * Main function to parse resume and extract structured data
 */
export async function parseResume(file) {
  try {
    let text = '';

    // Parse based on file type
    if (file.type === 'application/pdf') {
      text = await parsePDF(file);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.name.endsWith('.docx')) {
      text = await parseDOCX(file);
    } else if (file.type === 'application/msword' || file.name.endsWith('.doc')) {
      throw new Error('Old .doc format not supported. Please use .docx format.');
    } else {
      throw new Error('Unsupported file format. Please upload PDF or DOCX.');
    }

    console.log('Extracted text (first 500 chars):', text.substring(0, 500));

    // Extract structured data
    // Extract structured data using AI (Try first)
    try {
      console.log('Attempting AI parsing...');
      const response = await fetch(ENDPOINTS.PARSE_RESUME, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
        signal: AbortSignal.timeout(30000) // 30 seconds timeout for parsing
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          console.log('AI Parsing successful:', result.data);

          const aiData = result.data;

          // Hybrid Strategy: Fill in missing AI fields with local regex
          const localPhone = extractPhone(text);
          const localLocation = extractLocation(text);
          const localEmail = extractEmail(text);
          const localLinkedin = extractLinkedIn(text);
          const localPortfolio = extractPortfolio(text);

          /* Ensure contact info exists */
          if (!aiData.contactInfo) aiData.contactInfo = {};

          /* Fallback for missing fields */
          if (!aiData.contactInfo.phoneNumber) aiData.contactInfo.phoneNumber = localPhone;
          if (!aiData.contactInfo.Location) aiData.contactInfo.Location = localLocation;
          if (!aiData.contactInfo.emailAddress) aiData.contactInfo.emailAddress = localEmail;
          if (!aiData.contactInfo.linkedin) aiData.contactInfo.linkedin = localLinkedin;
          if (!aiData.contactInfo.portfolio) aiData.contactInfo.portfolio = localPortfolio;

          // Merge with default structure to ensure all keys exist
          const mergedData = {
            selectedTemplate: "1",
            contactInfo: {
              ...{ fullName: '', emailAddress: '', phoneNumber: '', linkedin: '', portfolio: '', jobTitle: '', Languages: '', Location: '', profileImage: '' },
              ...aiData.contactInfo
            },
            skills: { ...{ hardSkills: '', softSkills: '' }, ...aiData.skills },
            workExperience: Array.isArray(aiData.workExperience) ? aiData.workExperience : [],
            projects: Array.isArray(aiData.projects) ? aiData.projects : [],
            education: Array.isArray(aiData.education) ? aiData.education : [],
            certificates: Array.isArray(aiData.certificates) ? aiData.certificates : [],
            Description: { ...{ UserDescription: '' }, ...aiData.Description }
          };

          return {
            success: true,
            data: mergedData,
            rawText: text
          };
        }
      } else {
        console.warn('AI parsing failed, falling back to local regex');
      }
    } catch (aiError) {
      console.warn('AI parsing error:', aiError);
      // Continue to regex fallback
    }

    /**
     * Extract projects section
     */
    function extractProjects(text) {
      const projectRegex = /(?:projects|personal projects|technical projects)[:\s]*\n+(.*?)(?=\n\n\n|experience|education|skills|certification|achievements|$)/gis;
      const match = text.match(projectRegex);

      if (match && match[1]) {
        const projText = match[1];
        const lines = projText.split('\n').map(l => l.trim()).filter(l => l);
        const projects = [];
        let currentProj = { projectTitle: '', toolsTechUsed: '' };

        for (let line of lines) {
          // New project usually starts with a bullet or bold-like line
          if (line.match(/^[•\-\*]/) || line.length > 30) {
            if (currentProj.projectTitle) {
              projects.push({ ...currentProj });
              currentProj = { projectTitle: '', toolsTechUsed: '' };
            }

            // Try to split title and tech
            const techMatch = line.match(/^(.+?)(?:\s+[-–|:]\s+)(.+)$/);
            if (techMatch) {
              currentProj.projectTitle = techMatch[1].replace(/^[•\-\*]\s*/, '').trim();
              currentProj.toolsTechUsed = techMatch[2].trim();
            } else {
              currentProj.projectTitle = line.replace(/^[•\-\*]\s*/, '').trim();
            }
          } else if (currentProj.projectTitle && !currentProj.toolsTechUsed) {
            currentProj.toolsTechUsed = line;
          }
        }
        if (currentProj.projectTitle) projects.push(currentProj);
        return projects.length > 0 ? projects : [{ projectTitle: '', toolsTechUsed: '' }];
      }
      return [{ projectTitle: '', toolsTechUsed: '' }];
    }

    /**
     * Extract certifications section
     */
    function extractCertifications(text) {
      const certRegex = /(?:certifications?|licenses?|awards?)[:\s]*\n+(.*?)(?=\n\n\n|experience|education|skills|projects|achievements|$)/gis;
      const match = text.match(certRegex);

      if (match && match[1]) {
        const certText = match[1];
        const lines = certText.split('\n').map(l => l.trim()).filter(l => l);
        const certs = [];

        for (let line of lines) {
          const cleanLine = line.replace(/^[•\-\*]\s*/, '').trim();
          if (cleanLine.length > 5) {
            // Try to split name and provider
            const parts = cleanLine.split(/[-–|:]/);
            certs.push({
              certificateName: parts[0]?.trim() || cleanLine,
              providerName: parts[1]?.trim() || '',
              courseDuration: ''
            });
          }
        }
        return certs.length > 0 ? certs : [{ certificateName: '', courseDuration: '', providerName: '' }];
      }
      return [{ certificateName: '', courseDuration: '', providerName: '' }];
    }

    // Fallback: Local Regex Parsing
    console.log('Using local regex parser');
    const structuredData = {
      selectedTemplate: "1", // Default template
      contactInfo: {
        fullName: extractName(text),
        phoneNumber: extractPhone(text),
        emailAddress: extractEmail(text),
        linkedin: extractLinkedIn(text),
        portfolio: extractPortfolio(text),
        jobTitle: '',
        Languages: '',
        Location: extractLocation(text),
        profileImage: ''
      },
      skills: {
        hardSkills: extractSkills(text),
        softSkills: ''
      },
      workExperience: extractExperience(text),
      projects: extractProjects(text),
      education: extractEducation(text),
      certificates: extractCertifications(text),
      Description: {
        UserDescription: ''
      }
    };

    console.log('Parsed data (Local):', structuredData);

    return {
      success: true,
      data: structuredData,
      rawText: text
    };
  } catch (error) {
    console.error('Parse error:', error);
    return {
      success: false,
      error: error.message,
      data: null
    };
  }
}
