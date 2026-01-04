import React from 'react';
import styled from "styled-components";

// --- CSS Styles ---
export const T16Css = `
@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  
  html {
    margin: 0 !important;
    padding: 0 !important;
    background-color: white !important;
    background: white !important;
  }
  
  body {
    margin: 0 !important;
    padding: 0 !important;
    background-color: white !important;
    background: white !important;
  }
  
  @page {
   size: A4 portrait;
   margin: 0;
  }
  
  .resume {
    width: 210mm !important;
    max-width: 210mm !important;
    height: auto !important;
    min-height: auto !important;
    margin: 0 !important;
    padding: 20px 30px !important;
    box-shadow: none !important;
    overflow: visible !important;
    background: white !important;
    background-color: white !important;
    page-break-inside: avoid !important;
  }
  
  .content {
    page-break-inside: auto !important;
  }
  
  .section {
    page-break-inside: avoid !important;
  }
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  -webkit-font-smoothing: antialiased;
}

.resume {
  width: 210mm;
  min-height: 297mm;
  overflow: hidden;
  background: white;
  margin: 20px auto;
  padding: 35px 40px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.header {
  margin-bottom: 25px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.name {
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 4px 0;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.job-title {
  font-size: 16px;
  color: #c44569;
  font-weight: 600;
  margin: 0 0 12px 0;
  text-transform: uppercase;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 10px;
  color: #555;
  margin-top: 10px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.contact-item i {
  font-size: 11px;
  color: #c44569;
}

.content {
  display: grid;
  grid-template-columns: 60% 35%; /* Adjusted for better balance */
  gap: 5%;
}

.section {
  margin-bottom: 22px;
}

.section-title {
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  color: #000;
  margin-bottom: 12px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 4px;
  letter-spacing: 0.5px;
}

.experience-item {
  margin-bottom: 16px;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3px;
}

.exp-title {
  font-size: 12px;
  font-weight: bold;
  color: #000;
}

.exp-date {
  font-size: 10px;
  color: #666;
  white-space: nowrap;
  margin-left: 8px;
}

.exp-location {
  font-size: 10px;
  font-style: italic;
  color: #666;
  margin-bottom: 6px;
}

.exp-description {
  font-size: 11px;
  line-height: 1.6;
  color: #444;
  text-align: justify;
}

.exp-description ul {
    padding-left: 15px;
    margin: 4px 0;
}

.exp-description li {
    margin-bottom: 2px;
}

.project-link a {
    font-size: 9px;
    color: #c44569;
    text-decoration: none;
}

/* Skills & Sidebar Styles */
.skill-item {
  margin-bottom: 12px;
}

.skill-name {
  font-size: 10px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.skill-bar {
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff6b9d, #c44569);
  border-radius: 3px;
}

.tools-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tool-item {
  font-size: 10px;
  color: #555;
  background: #f9f9f9;
  padding: 3px 6px;
  border-radius: 3px;
  border: 1px solid #eee;
}

.awards-list, .books-list {
  font-size: 10px;
  color: #555;
}

.award-item, .book-item {
  margin-bottom: 8px;
}

.award-title, .book-title {
  font-weight: bold;
  color: #333;
  display: block;
}
`;

// --- Helpers ---
const parseMarkdown = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
};

const StyledWrapper = styled.div`
  /* Import the CSS directly for PDF compatibility */
  ${T16Css}
`;

// --- Component ---
export const T16 = ({ jsonData }) => {
  // Safe Data Access with CORRECT field names from GetInfo
  const contact = jsonData.contactInfo || {};
  const workExp = jsonData.workExperience || [];
  const education = jsonData.education || [];
  const projects = jsonData.projects || [];
  const certificates = jsonData.certificates || []; // CORRECTED: was certifications
  const description = jsonData.Description?.UserDescription || ''; // CORRECTED: Description object

  // Skills extraction
  const hardSkills = jsonData.skills?.hardSkills
    ? jsonData.skills.hardSkills.split(',').map(s => s.trim()).filter(s => s)
    : [];

  const softSkills = jsonData.skills?.softSkills
    ? jsonData.skills.softSkills.split(',').map(s => s.trim()).filter(s => s)
    : [];

  // Languages from contactInfo
  const languagesStr = contact.Languages || '';
  const languages = languagesStr ? languagesStr.split(',').map(l => l.trim()).filter(l => l) : [];

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">

        {/* HEADER */}
        <div className="header">
          <div className="name">{contact.fullName || 'Your Name'}</div>
          <div className="job-title">{contact.jobTitle || 'Professional Title'}</div>

          <div className="contact-info">
            {contact.Location && (
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{contact.Location}</span>
              </div>
            )}
            {contact.emailAddress && (
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>{contact.emailAddress}</span>
              </div>
            )}
            {contact.phoneNumber && (
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>{contact.phoneNumber}</span>
              </div>
            )}
            {contact.linkedin && (
              <div className="contact-item">
                <i className="fab fa-linkedin"></i>
                <span>{contact.linkedin}</span>
              </div>
            )}
            {contact.portfolio && (
              <div className="contact-item">
                <i className="fas fa-globe"></i>
                <span>Portfolio</span>
              </div>
            )}
          </div>
        </div>

        {/* SUMMARY (Full Width Optional) */}
        {description && (
          <div className="section" style={{ marginBottom: '25px' }}>
            <div className="section-title">Profile</div>
            <div className="exp-description">{description}</div>
          </div>
        )}

        <div className="content">
          {/* LEFT COLUMN: Main Content (Experience, Projects) */}
          <div className="left-column">

            {/* WORK EXPERIENCE */}
            {workExp.length > 0 && (
              <div className="section">
                <div className="section-title">Professional Experience</div>
                {workExp.map((we, index) => (
                  <div key={`work-${index}`} className="experience-item">
                    <div className="exp-header">
                      <div className="exp-title">{we.jobTitle}</div>
                      <div className="exp-date">{we.WorkDuration}</div>
                    </div>
                    <div className="exp-location">{we.companyName}</div>
                    <div
                      className="exp-description"
                      dangerouslySetInnerHTML={{ __html: parseMarkdown(we.keyAchievements) }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* PROJECTS */}
            {projects.length > 0 && (
              <div className="section">
                <div className="section-title">Projects</div>
                {projects.map((proj, index) => (
                  <div key={`proj-${index}`} className="experience-item">
                    <div className="exp-header">
                      <div className="exp-title">{proj.projectTitle}</div>
                    </div>
                    <div
                      className="exp-description"
                      dangerouslySetInnerHTML={{ __html: parseMarkdown(proj.toolsTechUsed) }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Sidebar (Edu, Skills, Languages, etc.) */}
          <div className="right-column">

            {/* EDUCATION */}
            {education.length > 0 && (
              <div className="section">
                <div className="section-title">Education</div>
                {education.map((edu, index) => (
                  <div key={`edu-${index}`} className="experience-item">
                    <div className="exp-header">
                      <div className="exp-title">{edu.degreeName}</div>
                      <div className="exp-date">{edu.graduationYear}</div>
                    </div>
                    <div className="exp-location">{edu.institutionName}</div>
                    {edu.currentCGPA && <div className="exp-description">CGPA: {edu.currentCGPA}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* HARD SKILLS */}
            {hardSkills.length > 0 && (
              <div className="section">
                <div className="section-title">Hard Skills</div>
                {hardSkills.map((skill, idx) => (
                  <div key={idx} className="skill-item">
                    <div className="skill-name">{skill}</div>
                    <div className="skill-bar">
                      <div className="skill-fill" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SOFT SKILLS */}
            {softSkills.length > 0 && (
              <div className="section">
                <div className="section-title">Soft Skills</div>
                <div className="tools-grid">
                  {softSkills.map((skill, idx) => (
                    <div key={idx} className="tool-item">• {skill}</div>
                  ))}
                </div>
              </div>
            )}

            {/* LANGUAGES */}
            {languages.length > 0 && (
              <div className="section">
                <div className="section-title">Languages</div>
                {languages.map((lang, idx) => (
                  <div key={idx} className="skill-item">
                    <div className="skill-name">{lang}</div>
                    <div className="skill-bar">
                      <div className="skill-fill" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CERTIFICATIONS */}
            {certificates.length > 0 && (
              <div className="section">
                <div className="section-title">Certifications</div>
                <div className="awards-list">
                  {certificates.map((cert, idx) => (
                    <div key={idx} className="award-item">
                      <div className="award-title">{cert.certificateName}</div>
                      {cert.providerName && <span>{cert.providerName}</span>}
                      {cert.courseDuration && <span> • {cert.courseDuration}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};
