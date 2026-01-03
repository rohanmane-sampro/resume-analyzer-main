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
const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>;

// --- CSS String ---
export const T22Css = `
@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
  body {
    font-family: 'Open Sans', 'Arial', sans-serif;
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
  font-family: 'Open Sans', 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
}

.resume {
  width: 210mm;
  min-height: 297mm;
  background: white;
  margin: 20px auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
}

/* Header Area */
.header-container {
  padding: 40px 45px 30px;
  border-bottom: 2px solid #2980b9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 25px;
  flex: 1;
}

.profile-img-box {
  width: 110px;
  height: 110px;
  border-radius: 6px; /* Soft square */
  overflow: hidden;
  border: 1px solid #ddd;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  flex-shrink: 0;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header-text {
  display: flex;
  flex-direction: column;
}

.name {
  font-family: 'Merriweather', serif; /* Serif for Name */
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 5px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.job-title {
  font-size: 14px;
  color: #2980b9; /* Accent Color */
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 12px;
}

.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  font-size: 11px;
  color: #555;
  min-width: 200px;
}

.contact-pill {
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-icon {
  color: #2980b9;
}

/* Main Body Layout */
.content-grid {
  display: flex;
  flex: 1;
}

/* Sidebar (Left) */
.sidebar {
  width: 32%;
  background-color: #fafafa; /* Very light grey, almost white */
  padding: 30px 25px 40px 45px;
  border-right: 1px solid #eee;
}

/* Main (Right) */
.main-area {
  width: 68%;
  padding: 30px 45px 40px 30px;
}

/* Typography & Sections */
.section {
  margin-bottom: 30px;
  page-break-inside: avoid;
}

.section-head {
  font-family: 'Merriweather', serif;
  font-size: 14px;
  font-weight: 700;
  color: #2c3e50;
  text-transform: uppercase;
  margin-bottom: 15px;
  padding-bottom: 5px;
  border-bottom: 2px solid #2980b9; /* Short accent line */
  display: inline-block;
  min-width: 50px;
}

.full-divider {
  width: 100%;
  height: 1px;
  background: #eee;
  margin-top: -16px;
  margin-bottom: 15px;
  z-index: 0;
}

.summary-text {
  font-size: 11px;
  line-height: 1.7;
  color: #444;
  text-align: justify;
}

/* Items (Experience, Edu) */
.entry-item {
  margin-bottom: 20px;
  page-break-inside: avoid;
}

.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}

.entry-title {
  font-size: 13px;
  font-weight: 700;
  color: #2c3e50;
}

.entry-org {
  font-size: 12px;
  color: #2980b9; /* Accent */
  font-weight: 600;
  margin-bottom: 2px;
}

.entry-date {
  font-size: 10px;
  color: #7f8c8d;
  font-weight: 600;
  white-space: nowrap;
}

.entry-desc {
  font-size: 11px;
  line-height: 1.6;
  color: #444;
}

.entry-desc ul {
  margin: 5px 0;
  padding-left: 18px;
}

.entry-desc li {
  margin-bottom: 4px;
}

/* Projects - Clean Modern Look */
.project-entry {
  margin-bottom: 20px;
  page-break-inside: avoid;
}

.project-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.project-title {
  font-size: 13px;
  font-weight: 700;
  color: #2c3e50;
}

.project-link {
  font-size: 10px;
  color: #2980b9;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid #bdc3c7;
  padding: 1px 6px;
  border-radius: 10px;
  transition: all 0.2s;
}

.project-stack {
  font-size: 10px;
  color: #7f8c8d;
  font-family: monospace;
  margin-bottom: 6px;
  background: #f4f6f7;
  padding: 2px 6px;
  display: inline-block;
  border-radius: 3px;
}

/* Sidebar Specifics */
.edu-item {
  margin-bottom: 20px;
}

.edu-degree {
  font-size: 12px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 3px;
}

.edu-school {
  font-size: 11px;
  font-style: italic;
  color: #555;
  margin-bottom: 2px;
}

.edu-meta {
  font-size: 10px;
  color: #7f8c8d;
}

/* Skills - Outlined Chips */
.skill-group {
  margin-bottom: 15px;
}

.skill-label {
  font-size: 11px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 6px;
  display: block;
}

.skill-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.skill-tag {
  font-size: 10px;
  color: #34495e;
  border: 1px solid #bdc3c7;
  padding: 3px 8px;
  border-radius: 12px; /* Pill shape */
  background: white;
}

.lang-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: 11px;
  color: #444;
  border-bottom: 1px dashed #ddd;
  padding-bottom: 2px;
}

.cert-item {
  margin-bottom: 12px;
}

.cert-title {
  font-size: 11px;
  font-weight: 700;
  color: #2c3e50;
  display: block;
}

.cert-meta {
  font-size: 10px;
  color: #7f8c8d;
}
`;

const StyledWrapper = styled.div`
  ${props => props.cssContent}
`;

export const T22 = ({ jsonData }) => {
  // Parsing
  const contact = jsonData.contactInfo || {};
  const hardSkills = jsonData.skills?.hardSkills
    ? (Array.isArray(jsonData.skills.hardSkills) ? jsonData.skills.hardSkills : jsonData.skills.hardSkills.split(',').filter(Boolean))
    : [];
  const softSkills = jsonData.skills?.softSkills
    ? (Array.isArray(jsonData.skills.softSkills) ? jsonData.skills.softSkills : jsonData.skills.softSkills.split(',').filter(Boolean))
    : [];
  const languages = contact.Languages
    ? (Array.isArray(contact.Languages) ? contact.Languages : contact.Languages.split(',').filter(Boolean))
    : [];
  const portfolioUrl = contact.portfolio || contact.github || '';

  return (
    <StyledWrapper cssContent={T22Css}>
      <div className="resume">
        {/* Header */}
        <div className="header-container">
          <div className="header-left">
            {contact.profileImage && (
              <div className="profile-img-box">
                <img src={contact.profileImage} alt="Profile" className="profile-img" />
              </div>
            )}
            <div className="header-text">
              <div className="name">{contact.fullName || 'Your Name'}</div>
              <div className="job-title">{contact.jobTitle || 'Professional Title'}</div>
            </div>
          </div>

          <div className="header-right">
            {contact.emailAddress && (
              <div className="contact-pill">
                {contact.emailAddress} <span className="contact-icon"><MailIcon /></span>
              </div>
            )}
            {contact.phoneNumber && (
              <div className="contact-pill">
                {contact.phoneNumber} <span className="contact-icon"><PhoneIcon /></span>
              </div>
            )}
            {contact.Location && (
              <div className="contact-pill">
                {contact.Location} <span className="contact-icon"><MapPinIcon /></span>
              </div>
            )}
            {contact.linkedin && (
              <div className="contact-pill">
                {contact.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')} <span className="contact-icon"><LinkedinIcon /></span>
              </div>
            )}
            {portfolioUrl && (
              <div className="contact-pill">
                {portfolioUrl.replace(/^https?:\/\//, '')} <span className="contact-icon"><GlobeIcon /></span>
              </div>
            )}
          </div>
        </div>

        <div className="content-grid">
          {/* Left Sidebar */}
          <div className="sidebar">

            {/* Education */}
            {jsonData.education && jsonData.education.length > 0 && (
              <div className="section">
                <div className="section-head">Education</div>
                {jsonData.education.map((edu, index) => (
                  <div key={`edu-${index}`} className="edu-item">
                    <div className="edu-degree">{edu.degreeName}</div>
                    <div className="edu-school">{edu.institutionName}</div>
                    <div className="edu-meta">
                      {edu.graduationYear}
                      {edu.currentCGPA && ` | GPA: ${edu.currentCGPA}`}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {(hardSkills.length > 0 || softSkills.length > 0) && (
              <div className="section">
                <div className="section-head">Skills</div>
                {hardSkills.length > 0 && (
                  <div className="skill-group">
                    <span className="skill-label">Technical</span>
                    <div className="skill-chips">
                      {hardSkills.map((skill, i) => (
                        <span key={i} className="skill-tag">{skill.trim()}</span>
                      ))}
                    </div>
                  </div>
                )}
                {softSkills.length > 0 && (
                  <div className="skill-group">
                    <span className="skill-label">Professional</span>
                    <div className="skill-chips">
                      {softSkills.map((skill, i) => (
                        <span key={i} className="skill-tag">{skill.trim()}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div className="section">
                <div className="section-head">Languages</div>
                {languages.map((lang, i) => (
                  <div key={i} className="lang-row">
                    <span>{lang.trim()}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Certifications */}
            {jsonData.certificates && jsonData.certificates.length > 0 && (
              <div className="section">
                <div className="section-head">Certificates</div>
                {jsonData.certificates.map((cert, index) => (
                  <div key={index} className="cert-item">
                    <span className="cert-title">{cert.certificateName}</span>
                    <div className="cert-meta">
                      {cert.providerName}
                      {cert.year && ` • ${cert.year}`}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Main Content */}
          <div className="main-area">

            {/* Profile */}
            {jsonData.Description?.UserDescription && (
              <div className="section">
                <div className="section-head">Profile</div>
                <div className="full-divider"></div>
                <div className="summary-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(jsonData.Description.UserDescription) }} />
              </div>
            )}

            {/* Experience */}
            {jsonData.workExperience && jsonData.workExperience.length > 0 && (
              <div className="section">
                <div className="section-head">Experience</div>
                <div className="full-divider"></div>
                {jsonData.workExperience.map((we, index) => (
                  <div key={`exp-${index}`} className="entry-item">
                    <div className="entry-header">
                      <div className="entry-title">{we.jobTitle}</div>
                      <div className="entry-date">{we.WorkDuration}</div>
                    </div>
                    <div className="entry-org">
                      {we.companyName} {we.Location && ` | ${we.Location}`}
                    </div>
                    <div className="entry-desc" dangerouslySetInnerHTML={{ __html: parseMarkdown(we.keyAchievements) }} />
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {jsonData.projects && jsonData.projects.length > 0 && (
              <div className="section">
                <div className="section-head">Projects</div>
                <div className="full-divider"></div>
                {jsonData.projects.map((proj, index) => (
                  <div key={`proj-${index}`} className="project-entry">
                    <div className="project-top">
                      <div className="project-title">{proj.projectTitle || proj.name}</div>
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="project-link">
                          Link <LinkIcon />
                        </a>
                      )}
                    </div>
                    {proj.toolsTechUsed && (
                      <div className="project-stack">
                        {proj.toolsTechUsed}
                      </div>
                    )}
                    <div className="entry-desc" dangerouslySetInnerHTML={{ __html: parseMarkdown(proj.description) }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};
