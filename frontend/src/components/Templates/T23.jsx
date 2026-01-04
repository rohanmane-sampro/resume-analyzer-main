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
const LinkedinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>;
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>;

// --- CSS String ---
export const T23Css = `
@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
  
  body {
    font-family: 'Georgia', 'Times New Roman', serif;
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
  font-family: 'Georgia', 'Times New Roman', serif;
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
  box-sizing: border-box;
}

.header {
  text-align: center;
  padding: 40px 50px 30px;
  border-bottom: 3px solid #000;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-pic-container {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 15px;
  border: 1px solid #ddd;
}

.profile-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.name {
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #000;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.job-title {
  font-size: 14px;
  font-style: italic;
  margin: 0 0 15px 0;
  color: #333;
}

.contact-info {
  display: flex;
  justify-content: center;
  gap: 15px;
  font-size: 11px;
  color: #333;
  flex-wrap: wrap;
  font-family: 'Arial', sans-serif;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.contact-link {
  color: #333;
  text-decoration: none;
}

.main-content {
  padding: 30px 50px 40px;
}

.section {
  margin-bottom: 25px;
  page-break-inside: avoid;
}

.section-title {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: #000;
  margin-bottom: 15px;
  padding-bottom: 5px;
  border-bottom: 2px solid #000;
  letter-spacing: 1.5px;
}

.profile-text {
  font-size: 11px;
  line-height: 1.6;
  color: #333;
  text-align: justify;
}

/* Experience & Projects */
.item-container {
  margin-bottom: 18px;
  page-break-inside: avoid;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 3px;
}

.item-title {
  font-weight: bold;
  font-size: 12px;
  color: #000;
}

.item-date {
  font-size: 10px;
  color: #666;
  white-space: nowrap;
  font-family: 'Arial', sans-serif;
}

.item-subtitle {
  font-size: 11px;
  color: #333;
  font-style: italic;
  margin-bottom: 3px;
}

.item-location {
  font-size: 10px;
  color: #666;
  margin-bottom: 6px;
  font-style: italic;
  font-family: 'Arial', sans-serif;
}

.item-description {
  font-size: 11px;
  line-height: 1.5;
  color: #333;
  text-align: justify;
}

.item-description ul {
  margin: 5px 0;
  padding-left: 20px;
}

.item-description li {
  margin-bottom: 4px;
}

.project-link {
  font-size: 10px;
  color: #000;
  text-decoration: none;
  margin-left: 5px;
  font-weight: normal;
}

.tech-stack {
  font-size: 10px;
  font-family: 'Arial', sans-serif;
  color: #555;
  margin-top: 3px;
  margin-bottom: 3px;
}

/* Skills - Chips Layout */
.skills-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-chip {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  color: #333;
  font-size: 10px;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
  font-family: 'Arial', sans-serif;
  -webkit-print-color-adjust: exact;
}

/* Languages */
.languages-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 11px;
  color: #333;
}

.language-item {
  font-family: 'Arial', sans-serif;
}

/* Certifications */
.cert-item {
  margin-bottom: 8px;
  font-size: 11px;
  color: #333;
}

.cert-title {
  font-weight: bold;
  color: #000;
}

.cert-details {
  font-style: italic;
  color: #555;
}
`;

const StyledWrapper = styled.div`
  ${props => props.cssContent}
`;

export const T23 = ({ jsonData }) => {
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
    <StyledWrapper cssContent={T23Css}>
      <div className="resume">

        {/* Header */}
        <div className="header">
          {contact.profileImage && (
            <div className="profile-pic-container">
              <img src={contact.profileImage} alt="Profile" className="profile-pic" />
            </div>
          )}
          <div className="name">{contact.fullName || 'Your Name'}</div>
          <div className="job-title">{contact.jobTitle || 'Professional Title'}</div>

          <div className="contact-info">
            {contact.Location && (
              <div className="contact-item">
                <MapPinIcon /> {contact.Location}
              </div>
            )}
            {contact.emailAddress && (
              <div className="contact-item">
                <MailIcon /> {contact.emailAddress}
              </div>
            )}
            {contact.phoneNumber && (
              <div className="contact-item">
                <PhoneIcon /> {contact.phoneNumber}
              </div>
            )}
            {contact.linkedin && (
              <div className="contact-item">
                <LinkedinIcon />
                <a href={contact.linkedin} className="contact-link" target="_blank" rel="noreferrer">
                  {contact.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
                </a>
              </div>
            )}
            {portfolioUrl && (
              <div className="contact-item">
                <GlobeIcon />
                <a href={portfolioUrl} className="contact-link" target="_blank" rel="noreferrer">
                  {portfolioUrl.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">

          {/* Profile */}
          {jsonData.Description?.UserDescription && (
            <div className="section">
              <div className="section-title">Profile</div>
              <div className="profile-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(jsonData.Description.UserDescription) }} />
            </div>
          )}

          {/* Professional Experience */}
          {jsonData.workExperience && jsonData.workExperience.length > 0 && (
            <div className="section">
              <div className="section-title">Professional Experience</div>
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

          {/* Projects (New Section) */}
          {jsonData.projects && jsonData.projects.length > 0 && (
            <div className="section">
              <div className="section-title">Projects</div>
              {jsonData.projects.map((proj, index) => (
                <div key={`proj-${index}`} className="item-container">
                  <div className="item-header">
                    <div className="item-title">
                      {proj.projectTitle || proj.name}
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="project-link">
                          [Link]
                        </a>
                      )}
                    </div>
                    {proj.duration && <div className="item-date">{proj.duration}</div>}
                  </div>

                  {proj.toolsTechUsed && (
                    <div className="tech-stack"><strong>Stack:</strong> {proj.toolsTechUsed}</div>
                  )}

                  <div className="item-description" dangerouslySetInnerHTML={{ __html: parseMarkdown(proj.description) }} />
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {jsonData.education && jsonData.education.length > 0 && (
            <div className="section">
              <div className="section-title">Education</div>
              {jsonData.education.map((edu, index) => (
                <div key={`edu-${index}`} className="item-container">
                  <div className="item-header">
                    <div className="item-title">{edu.degreeName}</div>
                    <div className="item-date">{edu.graduationYear}</div>
                  </div>
                  <div className="item-subtitle">{edu.institutionName}</div>
                  {edu.currentCGPA && (
                    <div className="item-description">CGPA: {edu.currentCGPA}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Skills (Redesigned) */}
          {allSkills.length > 0 && (
            <div className="section">
              <div className="section-title">Skills</div>
              <div className="skills-wrapper">
                {allSkills.map((skill, index) => (
                  <span key={`skill-${index}`} className="skill-chip">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications (New Section) */}
          {jsonData.certificates && jsonData.certificates.length > 0 && (
            <div className="section">
              <div className="section-title">Certifications</div>
              {jsonData.certificates.map((cert, index) => (
                <div key={`cert-${index}`} className="cert-item">
                  <span className="cert-title">{cert.certificateName}</span>
                  <span className="cert-details">
                    {' — '}{cert.providerName}
                    {cert.year && ` (${cert.year})`}
                    {cert.courseDuration && ` • ${cert.courseDuration}`}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="section">
              <div className="section-title">Languages</div>
              <div className="languages-list">
                {languages.map((lang, index) => (
                  <div key={`lang-${index}`} className="language-item">
                    • {lang.trim()}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </StyledWrapper>
  );
};
