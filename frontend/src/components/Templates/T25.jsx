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
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>;
const LinkedinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>;
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>;
const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>;

// --- CSS String ---
export const T25Css = `
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
  display: grid;
  grid-template-columns: 270px 1fr;
}

/* SIDEBAR STYLES */
.sidebar {
  background-color: #1a3a2a;
  color: white !important;
  padding: 30px 25px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.sidebar * {
  color: white !important;
}

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 10px;
}

.profile-photo {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255,255,255,0.2);
  margin-bottom: 15px;
}

.name {
  font-size: 26px;
  font-weight: bold;
  margin: 0 0 5px 0;
  line-height: 1.2;
  color: white !important;
}

.job-title {
  font-size: 14px;
  opacity: 0.9;
  font-style: italic;
  font-weight: 300;
  color: white !important;
}

.sidebar-section {
  margin-bottom: 15px;
}

.sidebar-title {
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(255,255,255,0.3);
  padding-bottom: 5px;
  margin-bottom: 12px;
  letter-spacing: 1px;
  color: white !important;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 11px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  word-break: break-all;
  color: white !important;
}

.contact-item svg {
  flex-shrink: 0;
  opacity: 0.8;
  stroke: white !important;
}

/* Sidebar List Items (Edu, Certs) */
.sidebar-item {
  margin-bottom: 12px;
}

.sidebar-item-title {
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 2px;
  color: white !important;
}

.sidebar-item-subtitle {
  font-size: 11px;
  opacity: 0.8;
  font-style: italic;
  color: white !important;
}

.sidebar-item-date {
  font-size: 10px;
  opacity: 0.6;
  margin-top: 2px;
  color: white !important;
}

/* Sidebar Skills - Chips */
.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.skill-chip {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  color: white !important;
}

/* MAIN CONTENT STYLES */
.main-content {
  padding: 40px 35px;
  color: #333;
}

.main-section {
  margin-bottom: 30px;
  page-break-inside: avoid;
}

.main-title {
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  color: #1a3a2a;
  border-bottom: 2px solid #1a3a2a;
  padding-bottom: 5px;
  margin-bottom: 15px;
  letter-spacing: 1px;
}

.profile-summary {
  font-size: 12px;
  line-height: 1.6;
  text-align: justify;
}

/* Experience & Projects */
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
  font-size: 14px;
  font-weight: bold;
  color: #000;
}

.entry-subtitle {
  font-size: 12px;
  font-weight: 600;
  color: #1a3a2a;
  font-style: italic;
  margin-bottom: 2px;
}

.entry-date {
  font-size: 11px;
  color: #666;
  font-weight: 600;
}

.entry-location {
  font-size: 10px;
  color: #888;
  margin-bottom: 5px;
}

.entry-description {
  font-size: 11px;
  line-height: 1.6;
}

.entry-description ul {
  padding-left: 18px;
  margin: 5px 0;
}

.entry-description li {
  margin-bottom: 3px;
}

/* Projects Specific */
.project-link {
  font-size: 11px;
  color: #1a3a2a;
  text-decoration: none;
  margin-left: 8px;
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

.tech-stack {
  font-size: 10px;
  color: #555;
  margin-top: 4px;
  font-family: monospace;
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 3px;
  display: inline-block;
}

.cert-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
`;

const StyledWrapper = styled.div`
  ${props => props.cssContent}
`;

export const T25 = ({ jsonData }) => {
  // Data Helpers
  const contact = jsonData.contactInfo || {};
  const skills = jsonData.skills?.hardSkills
    ? (Array.isArray(jsonData.skills.hardSkills) ? jsonData.skills.hardSkills : jsonData.skills.hardSkills.split(','))
    : [];
  const softSkills = jsonData.skills?.softSkills
    ? (Array.isArray(jsonData.skills.softSkills) ? jsonData.skills.softSkills : jsonData.skills.softSkills.split(','))
    : [];
  const allSkills = [...skills, ...softSkills].map(s => s.trim()).filter(Boolean);

  const languages = contact.Languages
    ? (Array.isArray(contact.Languages) ? contact.Languages : contact.Languages.split(','))
    : [];

  const portfolioUrl = contact.portfolio || contact.github || '';

  return (
    <StyledWrapper cssContent={T25Css}>
      <div className="resume">

        {/* --- LEFT SIDEBAR --- */}
        <aside className="sidebar">

          {/* Profile Header (Moved to Sidebar) */}
          <div className="profile-container">
            {contact.profileImage && (
              <img src={contact.profileImage} alt="Profile" className="profile-photo" />
            )}
            <h1 className="name">{contact.fullName || 'Your Name'}</h1>
            <div className="job-title">{contact.jobTitle || 'Professional Title'}</div>
          </div>

          {/* Contact Info */}
          <div className="sidebar-section">
            <div className="sidebar-title">Contact</div>
            <div className="contact-info">
              {contact.emailAddress && (
                <div className="contact-item">
                  <MailIcon /> <span>{contact.emailAddress}</span>
                </div>
              )}
              {contact.phoneNumber && (
                <div className="contact-item">
                  <PhoneIcon /> <span>{contact.phoneNumber}</span>
                </div>
              )}
              {contact.Location && (
                <div className="contact-item">
                  <MapPinIcon /> <span>{contact.Location}</span>
                </div>
              )}
              {portfolioUrl && (
                <div className="contact-item">
                  <GlobeIcon /> <span>{portfolioUrl.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
              {contact.linkedin && (
                <div className="contact-item">
                  <LinkedinIcon /> <span>{contact.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Education */}
          {jsonData.education && jsonData.education.length > 0 && (
            <div className="sidebar-section">
              <div className="sidebar-title">Education</div>
              {jsonData.education.map((edu, index) => (
                <div key={index} className="sidebar-item">
                  <div className="sidebar-item-title">{edu.degreeName}</div>
                  <div className="sidebar-item-subtitle">{edu.institutionName}</div>
                  <div className="sidebar-item-date">{edu.graduationYear}</div>
                  {edu.currentCGPA && <div className="sidebar-item-date">CGPA: {edu.currentCGPA}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {allSkills.length > 0 && (
            <div className="sidebar-section">
              <div className="sidebar-title">Skills</div>
              <div className="skill-list">
                {allSkills.map((skill, index) => (
                  <span key={index} className="skill-chip">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="sidebar-section">
              <div className="sidebar-title">Languages</div>
              <div className="skill-list">
                {languages.map((lang, index) => (
                  <span key={index} className="skill-chip">{lang.trim()}</span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications (Sidebar) */}
          {jsonData.certificates && jsonData.certificates.length > 0 && (
            <div className="sidebar-section">
              <div className="sidebar-title">Certifications</div>
              {jsonData.certificates.map((cert, index) => (
                <div key={index} className="sidebar-item">
                  <div className="sidebar-item-title">{cert.certificateName}</div>
                  <div className="sidebar-item-subtitle">{cert.providerName}</div>
                  {(cert.year || cert.courseDuration) && (
                    <div className="sidebar-item-date">
                      {cert.year} {cert.courseDuration ? `• ${cert.courseDuration}` : ''}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* --- MAIN CONTENT (RIGHT) --- */}
        <main className="main-content">

          {/* Summary */}
          {jsonData.Description?.UserDescription && (
            <section className="main-section">
              <h2 className="main-title">Profile</h2>
              <div className="profile-summary" dangerouslySetInnerHTML={{ __html: parseMarkdown(jsonData.Description.UserDescription) }} />
            </section>
          )}

          {/* Experience */}
          {jsonData.workExperience && jsonData.workExperience.length > 0 && (
            <section className="main-section">
              <h2 className="main-title">Professional Experience</h2>
              {jsonData.workExperience.map((exp, index) => (
                <div key={index} className="entry-item">
                  <div className="entry-header">
                    <div className="entry-title">{exp.jobTitle}</div>
                    <div className="entry-date">{exp.WorkDuration}</div>
                  </div>
                  <div className="entry-subtitle">{exp.companyName}</div>
                  {exp.Location && <div className="entry-location">{exp.Location}</div>}
                  <div className="entry-description" dangerouslySetInnerHTML={{ __html: parseMarkdown(exp.keyAchievements) }} />
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {jsonData.projects && jsonData.projects.length > 0 && (
            <section className="main-section">
              <h2 className="main-title">Projects</h2>
              {jsonData.projects.map((proj, index) => (
                <div key={index} className="entry-item">
                  <div className="entry-header">
                    <div className="entry-title">
                      {proj.projectTitle || proj.name}
                      {proj.link && (
                        <a href={proj.link} className="project-link" target="_blank" rel="noreferrer">
                          <LinkIcon /> Link
                        </a>
                      )}
                    </div>
                    {proj.duration && <div className="entry-date">{proj.duration}</div>}
                  </div>
                  <div className="entry-description" dangerouslySetInnerHTML={{ __html: parseMarkdown(proj.description) }} />
                  {proj.toolsTechUsed && (
                    <div className="tech-stack">{proj.toolsTechUsed}</div>
                  )}
                </div>
              ))}
            </section>
          )}

        </main>
      </div>
    </StyledWrapper>
  );
};
