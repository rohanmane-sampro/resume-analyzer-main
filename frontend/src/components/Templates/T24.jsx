import React from 'react';
import styled from 'styled-components';

// --- Helpers ---
const parseMarkdown = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
};

// --- SVG Icons ---
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5-2.5-1.12 2.5-2.5 2.5z" /></svg>;
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>;
const LinkedinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>;
const GradIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" /></svg>;
const SkillsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.49l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" /></svg>;
const LangIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>;
const WorkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" /></svg>;
const ProjectIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" /></svg>;
const CertIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12,1L3,5v6c0,5.55,3.84,10.74,9,12c5.16-1.26,9-6.45,9-12V5L12,1z M12,11.99h7c-0.53,4.12-3.28,7.79-7,8.94V12H5V6.3 l7-3.11V11.99z" /></svg>;
const SummaryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>;

// --- CSS String ---
export const T24Css = `
@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
  
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: white !important;
  }
  
  @page {
   size: A4 portrait;
   margin: 0;
  }
  
  .resume {
    width: 210mm !important;
    min-height: 297mm !important;
    margin: 0 !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
}

body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

.resume {
  width: 210mm;
  min-height: 297mm;
  background: white;
  margin: 20px auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  position: relative;
}

.header {
  background: #3a3a3a;
  color: white;
  padding: 25px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-photo {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f5a623;
  margin-right: 20px;
}

.header-content {
  flex: 1;
}

.name {
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #f5a623 !important;
  text-transform: uppercase;
}

.job-title {
  font-size: 14px;
  margin: 0 0 15px 0;
  color: white !important;
  font-weight: 500;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 10px;
  color: white !important;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: white !important;
}

.contact-icon {
  color: #f5a623;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.contact-icon svg {
  fill: #f5a623 !important;
}

.main-content {
  padding: 25px 35px 30px;
}

.section {
  margin-bottom: 20px;
  page-break-inside: avoid;
}

.section-title {
  font-size: 13px;
  font-weight: bold;
  color: #000;
  margin-bottom: 12px;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  border-bottom: 2px solid #3a3a3a;
}

.section-icon {
  width: 20px;
  height: 20px;
  background: #3a3a3a;
  color: #f5a623;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
}

.section-icon svg {
  fill: #f5a623 !important;
}

.profile-text {
  font-size: 10px;
  line-height: 1.5;
  color: #333;
  text-align: justify;
}

/* Experience & Projects */
.item-container {
  margin-bottom: 15px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 3px;
}

.item-title {
  font-weight: bold;
  font-size: 11px;
  color: #000;
}

.item-date {
  font-size: 10px;
  color: #f5a623;
  font-weight: 600;
  white-space: nowrap;
}

.item-subtitle {
  font-size: 10px;
  color: #666;
  font-style: italic;
  margin-bottom: 2px;
}

.item-location {
  font-size: 9px;
  color: #999;
  margin-bottom: 4px;
}

.item-description {
  font-size: 10px;
  line-height: 1.5;
  color: #333;
  text-align: justify;
}

.item-description ul {
  margin: 3px 0;
  padding-left: 15px;
}

.item-description li {
  margin-bottom: 2px;
}

.project-link {
  font-size: 10px;
  color: #f5a623;
  text-decoration: none;
  margin-left: 5px;
}

.project-tech {
  font-size: 10px;
  color: #666;
  margin-top: 4px;
  font-style: italic;
}

/* Skills - Chips Layout */
.skills-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-chip {
  background-color: #3a3a3a !important;
  color: #fff !important;
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 500;
  border-left: 3px solid #f5a623;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}

/* Certifications */
.cert-item {
  margin-bottom: 8px;
  font-size: 10px;
}
.cert-title {
  font-weight: bold;
  color: #000;
}
.cert-meta {
  color: #666;
}

/* Languages */
.languages-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 10px;
  color: #333;
}
.language-item {
  font-weight: 500;
}
`;

const StyledWrapper = styled.div`
  ${props => props.cssContent}
`;

export const T24 = ({ jsonData }) => {
  // Safe Data Extraction
  const contact = jsonData.contactInfo || {};

  const hardSkills = jsonData.skills?.hardSkills
    ? (Array.isArray(jsonData.skills.hardSkills) ? jsonData.skills.hardSkills : jsonData.skills.hardSkills.split(',').filter(Boolean))
    : [];

  const softSkills = jsonData.skills?.softSkills
    ? (Array.isArray(jsonData.skills.softSkills) ? jsonData.skills.softSkills : jsonData.skills.softSkills.split(',').filter(Boolean))
    : [];

  const allSkills = [...hardSkills, ...softSkills];

  const languages = contact.Languages
    ? (Array.isArray(contact.Languages) ? contact.Languages : contact.Languages.split(',').filter(Boolean))
    : [];

  const portfolioUrl = contact.portfolio || contact.github || '';

  return (
    <StyledWrapper cssContent={T24Css}>
      <div className="resume">

        {/* Header */}
        <div className="header">
          <div className="header-content">
            <div className="name">{contact.fullName || 'Your Name'}</div>
            <div className="job-title">{contact.jobTitle || 'Job Title'}</div>

            <div className="contact-info">
              {contact.emailAddress && (
                <div className="contact-item">
                  <span className="contact-icon"><MailIcon /></span>
                  {contact.emailAddress}
                </div>
              )}
              {contact.phoneNumber && (
                <div className="contact-item">
                  <span className="contact-icon"><PhoneIcon /></span>
                  {contact.phoneNumber}
                </div>
              )}
              {contact.Location && (
                <div className="contact-item">
                  <span className="contact-icon"><MapPinIcon /></span>
                  {contact.Location}
                </div>
              )}
              {portfolioUrl && (
                <div className="contact-item">
                  <span className="contact-icon"><GlobeIcon /></span>
                  {portfolioUrl.replace(/^https?:\/\//, '')}
                </div>
              )}
              {contact.linkedin && (
                <div className="contact-item">
                  <span className="contact-icon"><LinkedinIcon /></span>
                  {contact.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
                </div>
              )}
            </div>
          </div>

          {contact.profileImage && (
            <img src={contact.profileImage} alt="Profile" className="profile-photo" />
          )}
        </div>

        {/* Main Content */}
        <div className="main-content">

          {/* Profile Summary */}
          {jsonData.Description?.UserDescription && (
            <div className="section">
              <div className="section-title">
                <span className="section-icon"><SummaryIcon /></span>
                PROFILE
              </div>
              <div className="profile-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(jsonData.Description.UserDescription) }} />
            </div>
          )}

          {/* Experience */}
          {jsonData.workExperience && jsonData.workExperience.length > 0 && (
            <div className="section">
              <div className="section-title">
                <span className="section-icon"><WorkIcon /></span>
                PROFESSIONAL EXPERIENCE
              </div>
              {jsonData.workExperience.map((we, index) => (
                <div key={`work-${index}`} className="item-container">
                  <div className="item-header">
                    <div className="item-title">{we.jobTitle}</div>
                    <div className="item-date">{we.WorkDuration}</div>
                  </div>
                  <div className="item-subtitle">{we.companyName}</div>
                  {we.Location && <div className="item-location">{we.Location}</div>}
                  <div className="item-description" dangerouslySetInnerHTML={{ __html: parseMarkdown(we.keyAchievements) }} />
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {jsonData.projects && jsonData.projects.length > 0 && (
            <div className="section">
              <div className="section-title">
                <span className="section-icon"><ProjectIcon /></span>
                PROJECTS
              </div>
              {jsonData.projects.map((proj, index) => (
                <div key={`proj-${index}`} className="item-container">
                  <div className="item-header">
                    <div className="item-title">
                      {proj.projectTitle || proj.name}
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="project-link">[Link]</a>
                      )}
                    </div>
                    {proj.duration && <div className="item-date">{proj.duration}</div>}
                  </div>
                  {proj.toolsTechUsed && <div className="project-tech">{proj.toolsTechUsed}</div>}
                  <div className="item-description" dangerouslySetInnerHTML={{ __html: parseMarkdown(proj.description) }} />
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {jsonData.education && jsonData.education.length > 0 && (
            <div className="section">
              <div className="section-title">
                <span className="section-icon"><GradIcon /></span>
                EDUCATION
              </div>
              {jsonData.education.map((edu, index) => (
                <div key={`edu-${index}`} className="item-container">
                  <div className="item-header">
                    <div className="item-title">{edu.degreeName}</div>
                    <div className="item-date">{edu.graduationYear}</div>
                  </div>
                  <div className="item-subtitle">{edu.institutionName}</div>
                  {edu.currentCGPA && <div className="item-description">CGPA: {edu.currentCGPA}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {allSkills.length > 0 && (
            <div className="section">
              <div className="section-title">
                <span className="section-icon"><SkillsIcon /></span>
                SKILLS
              </div>
              <div className="skills-wrapper">
                {allSkills.map((skill, index) => (
                  <span key={index} className="skill-chip">{skill.trim()}</span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {jsonData.certificates && jsonData.certificates.length > 0 && (
            <div className="section">
              <div className="section-title">
                <span className="section-icon"><CertIcon /></span>
                CERTIFICATIONS
              </div>
              {jsonData.certificates.map((cert, index) => (
                <div key={`cert-${index}`} className="cert-item">
                  <span className="cert-title">{cert.certificateName}</span>
                  <span className="cert-meta">
                    {' — '}{cert.providerName}
                    {cert.year && ` (${cert.year})`}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="section">
              <div className="section-title">
                <span className="section-icon"><LangIcon /></span>
                LANGUAGES
              </div>
              <div className="languages-list">
                {languages.map((lang, index) => (
                  <span key={index} className="language-item">• {lang.trim()}</span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </StyledWrapper>
  );
};
