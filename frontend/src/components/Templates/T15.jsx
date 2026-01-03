import React from 'react';
import styled from "styled-components";

// --- Icons (White for Sidebar, Navy for Content) ---
const Icons = {
  email: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  location: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="13" /><circle cx="4" cy="4" r="2" /></svg>,
  github: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>,
  globe: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
  user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  briefcase: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
  gradCap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
  cert: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  award: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>,
  code: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  link: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
};

const parseMarkdown = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
};

// --- Colors ---
const colors = {
  navy: '#2c3e50',
  cream: '#fdfbf7',
  red: '#ef6e6e',
  textDark: '#333333',
  textLight: '#ffffff',
  textGrey: '#7f8c8d'
};

const StyledWrapper = styled.div`
  @media print {
    body { margin: 0; padding: 0; background-color: white !important; }
    @page { size: A4 portrait; margin: 0; }
    .resume { width: 100% !important; margin: 0 !important; box-shadow: none !important; }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  }

  body { font-family: 'Lato', 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #f5f5f5; color: ${colors.textDark}; }

  .resume {
    width: 210mm;
    min-height: 297mm;
    background: ${colors.cream};
    margin: 20px auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    display: flex;
    overflow: hidden;
  }

  /* --- LEFT SIDEBAR (NAVY) --- */
  .sidebar {
    width: 38%;
    background-color: ${colors.navy};
    color: ${colors.textLight};
    padding: 35px 25px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .sidebar * {
    color: inherit;
  }

  /* Header inside Sidebar */
  .header {
    margin-bottom: 10px;
    color: #ffffff;
  }

  .header h1 {
    color: #ffffff !important;
  }

  .name {
    font-size: 28px;
    font-weight: 800;
    margin: 0 0 5px 0;
    line-height: 1.1;
    color: #ffffff;
  }

  .job-title {
    font-size: 14px;
    color: #bdc3c7;
    font-weight: 400;
    margin: 0 0 20px 0;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* Contact Info - Explicitly White Text */
  .contact-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-size: 10px;
    color: #ffffff;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 10px;
    line-height: 1.3;
    color: #ffffff;
  }

  .contact-item svg {
    width: 12px;
    height: 12px;
    color: ${colors.red};
    flex-shrink: 0;
  }

  .contact-item a {
    color: #ffffff;
    text-decoration: none;
  }

  /* Sidebar Sections */
  .sidebar-section {
    margin-bottom: 20px;
  }

  .sidebar-title {
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    color: #ffffff;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
    padding-bottom: 8px;
  }
  
  .sidebar-title svg {
    width: 12px;
    height: 12px;
    color: #ffffff;
  }
  
  /* The Red Zigzag Pattern for Sidebar */
  .sidebar-title::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(135deg, ${colors.red} 25%, transparent 25%) -6px 0,
                linear-gradient(225deg, ${colors.red} 25%, transparent 25%) -6px 0,
                linear-gradient(315deg, ${colors.red} 25%, transparent 25%),
                linear-gradient(45deg, ${colors.red} 25%, transparent 25%);
    background-size: 6px 6px;
    opacity: 0.8;
  }

  .sidebar-content {
    font-size: 10px;
    line-height: 1.6;
    color: #ecf0f1;
  }

  .sidebar-section { color: #ffffff; }

  .edu-item { margin-bottom: 15px; }
  .edu-degree { font-weight: 700; color: #fff; font-size: 11px; }
  .edu-school { font-style: italic; color: #bdc3c7; }
  .edu-year { color: ${colors.red}; font-weight: 600; margin-top: 2px; }
  .edu-gpa { color: #bdc3c7; margin-top: 2px; }

  .lang-item { margin-bottom: 6px; display: flex; justify-content: space-between; color: #fff; }
  .lang-name { font-weight: 600; color: #fff; }

  /* --- RIGHT CONTENT (CREAM) --- */
  .main-content {
    width: 62%;
    padding: 35px 30px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .main-section {
    margin-bottom: 10px;
  }

  .main-title {
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    color: ${colors.textDark};
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
    padding-bottom: 8px;
  }

  /* The Red Zigzag Pattern for Main Content */
  .main-title::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(135deg, ${colors.red} 25%, transparent 25%) -6px 0,
                linear-gradient(225deg, ${colors.red} 25%, transparent 25%) -6px 0,
                linear-gradient(315deg, ${colors.red} 25%, transparent 25%),
                linear-gradient(45deg, ${colors.red} 25%, transparent 25%);
    background-size: 6px 6px;
  }

  .main-title svg { width: 14px; height: 14px; color: ${colors.textDark}; }

  /* Experience & Projects */
  .work-item { margin-bottom: 20px; }
  
  .work-header { margin-bottom: 4px; }
  .work-role { font-size: 12px; font-weight: 800; color: ${colors.textDark}; }
  .work-company { font-size: 11px; color: #555; margin-bottom: 2px; }
  .work-meta { font-size: 10px; color: #777; font-style: italic; }
  
  .work-desc { font-size: 10px; line-height: 1.5; color: #444; margin-top: 5px; }
  .work-desc ul { padding-left: 15px; margin: 0; }
  .work-desc li { margin-bottom: 3px; }

  /* Projects Specific */
  .proj-link a { color: ${colors.red}; text-decoration: none; margin-left: 5px; font-weight: 600; font-size: 9px; }
  .tech-stack {
    margin-top: 4px;
    font-size: 9px;
    color: #666;
    font-style: italic;
  }

  /* Skills - Rectangular Boxes (Chips Style matching visual) */
  .skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .skill-box {
    background-color: ${colors.red};
    color: white;
    font-size: 10px;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 4px; /* Slight radius for "Chips" look but keeping boxy feel */
    display: inline-block;
  }

  /* Certifications (Replaces Awards) */
  .cert-item { margin-bottom: 12px; }
  .cert-title { font-weight: 700; font-size: 11px; color: ${colors.textDark}; }
  .cert-issuer { font-size: 10px; color: #555; }
  .cert-year { font-size: 10px; color: #777; font-style: italic; }

`;

export const T15 = ({ jsonData }) => {
  const contact = jsonData.contactInfo || {};
  const education = jsonData.education || [];
  const workExp = jsonData.workExperience || [];
  const projects = jsonData.projects || [];
  const certificates = jsonData.certificates || [];
  const description = jsonData.Description?.UserDescription || '';

  const hardSkills = jsonData.skills?.hardSkills
    ? (Array.isArray(jsonData.skills.hardSkills) ? jsonData.skills.hardSkills : jsonData.skills.hardSkills.split(',').filter(Boolean))
    : [];

  const softSkills = jsonData.skills?.softSkills
    ? (Array.isArray(jsonData.skills.softSkills) ? jsonData.skills.softSkills : jsonData.skills.softSkills.split(',').filter(Boolean))
    : [];

  const languagesStr = contact.Languages || '';
  const languages = languagesStr ? (Array.isArray(languagesStr) ? languagesStr : languagesStr.split(',').filter(Boolean)) : [];

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">

        {/* --- LEFT SIDEBAR --- */}
        <div className="sidebar">

          {/* Header Area */}
          <div className="header">
            <h1 className="name">{contact.fullName || 'Brian T. Wayne'}</h1>
            <div className="job-title">{contact.jobTitle || 'Business Development'}</div>

            <div className="contact-section">
              {contact.emailAddress && (
                <div className="contact-item">
                  {Icons.email} {contact.emailAddress}
                </div>
              )}
              {contact.phoneNumber && (
                <div className="contact-item">
                  {Icons.phone} {contact.phoneNumber}
                </div>
              )}
              {contact.Location && (
                <div className="contact-item">
                  {Icons.location} {contact.Location}
                </div>
              )}
              {contact.linkedin && (
                <div className="contact-item">
                  {Icons.linkedin} <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                </div>
              )}
              {contact.github && (
                <div className="contact-item">
                  {Icons.github} <a href={contact.github} target="_blank" rel="noreferrer">GitHub</a>
                </div>
              )}
              {contact.portfolio && !contact.github && (
                <div className="contact-item">
                  {Icons.globe} <a href={contact.portfolio} target="_blank" rel="noreferrer">Portfolio</a>
                </div>
              )}
            </div>
          </div>

          {/* Profile Summary */}
          {description && (
            <div className="sidebar-section">
              <div className="sidebar-title">{Icons.user} Profile</div>
              <div className="sidebar-content" dangerouslySetInnerHTML={{ __html: parseMarkdown(description) }} />
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="sidebar-section">
              <div className="sidebar-title">{Icons.gradCap} Education</div>
              <div className="sidebar-content">
                {education.map((edu, index) => (
                  <div key={index} className="edu-item">
                    <div className="edu-degree">{edu.degreeName}</div>
                    <div className="edu-school">{edu.institutionName}</div>
                    <div className="edu-year">{edu.graduationYear}</div>
                    {edu.currentCGPA && <div className="edu-gpa">GPA: {edu.currentCGPA}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="sidebar-section">
              <div className="sidebar-title">{Icons.globe} Languages</div>
              <div className="sidebar-content">
                {languages.map((lang, index) => (
                  <div key={index} className="lang-item">
                    <span className="lang-name">{typeof lang === 'string' ? lang.trim() : (lang.name || lang)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* --- RIGHT MAIN CONTENT --- */}
        <div className="main-content">

          {/* Professional Experience */}
          {workExp.length > 0 && (
            <div className="main-section">
              <div className="main-title">{Icons.briefcase} Professional Experience</div>
              {workExp.map((we, index) => (
                <div key={index} className="work-item">
                  <div className="work-header">
                    <div className="work-role">{we.companyName}</div>
                    <div className="work-company">{we.jobTitle}</div>
                    <div className="work-meta">{we.WorkDuration} | {we.Location}</div>
                  </div>
                  <div className="work-desc">
                    <ul>
                      <li dangerouslySetInnerHTML={{ __html: parseMarkdown(we.keyAchievements) }} />
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="main-section">
              <div className="main-title">{Icons.code} Projects</div>
              {projects.map((proj, index) => (
                <div key={index} className="work-item">
                  <div className="work-header">
                    <div className="work-role">
                      {proj.title || proj.projectTitle}
                      {proj.link && (
                        <span className="proj-link">
                          <a href={proj.link} target="_blank" rel="noreferrer">{Icons.link} View Project</a>
                        </span>
                      )}
                    </div>
                  </div>
                  {(proj.technologies || proj.toolsTechUsed) && (
                    <div className="tech-stack">Tech: {proj.technologies || proj.toolsTechUsed}</div>
                  )}
                  <div className="work-desc" dangerouslySetInnerHTML={{ __html: parseMarkdown(proj.description) }} />
                </div>
              ))}
            </div>
          )}

          {/* Skills (Chips Style) */}
          {(hardSkills.length > 0 || softSkills.length > 0) && (
            <div className="main-section">
              <div className="main-title">{Icons.award} Skills</div>
              <div className="skills-grid">
                {hardSkills.map((skill, index) => (
                  <span key={`h-${index}`} className="skill-box">{skill.trim ? skill.trim() : skill}</span>
                ))}
                {softSkills.map((skill, index) => (
                  <span key={`s-${index}`} className="skill-box">{skill.trim ? skill.trim() : skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications (Replaces Awards) */}
          {certificates.length > 0 && (
            <div className="main-section">
              <div className="main-title">{Icons.cert} Certifications</div>
              {certificates.map((cert, index) => (
                <div key={index} className="cert-item">
                  <div className="cert-title">{cert.certificateName || cert.name}</div>
                  <div className="cert-issuer">{cert.issuer || cert.providerName}</div>
                  <div className="cert-year">{cert.year || cert.date}</div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </StyledWrapper>
  );
};

export const T15Css = `
@media print {
  body { margin: 0; padding: 0; background-color: white !important; }
  @page { size: A4 portrait; margin: 0; }
  .resume { width: 100% !important; margin: 0 !important; box-shadow: none !important; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
}

body { font-family: 'Lato', 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #f5f5f5; color: #333; }

.resume {
  width: 210mm;
  min-height: 297mm;
  background: #fdfbf7;
  margin: 20px auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
}

.sidebar {
  width: 38%;
  background-color: #2c3e50;
  color: #ffffff;
  padding: 35px 25px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.sidebar * {
  color: inherit;
}

.header {
  color: #ffffff;
}

.header h1 {
  color: #ffffff !important;
}

.name {
  font-size: 28px;
  font-weight: 800;
  margin: 0 0 5px 0;
  line-height: 1.1;
  color: #ffffff;
}

.job-title {
  font-size: 14px;
  color: #bdc3c7;
  font-weight: 400;
  margin: 0 0 20px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.contact-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 10px;
  color: #ffffff;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 1.3;
  color: #ffffff;
}

.contact-item svg {
  width: 12px;
  height: 12px;
  color: #ef6e6e;
  flex-shrink: 0;
}

.contact-item a { color: #ffffff; text-decoration: none; }

.sidebar-title {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  color: #ffffff;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  padding-bottom: 8px;
}

.sidebar-title svg {
  width: 12px;
  height: 12px;
  color: #ffffff;
}

.sidebar-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(135deg, #ef6e6e 25%, transparent 25%) -6px 0,
              linear-gradient(225deg, #ef6e6e 25%, transparent 25%) -6px 0,
              linear-gradient(315deg, #ef6e6e 25%, transparent 25%),
              linear-gradient(45deg, #ef6e6e 25%, transparent 25%);
  background-size: 6px 6px;
  opacity: 0.8;
}

.sidebar-content { font-size: 10px; line-height: 1.6; color: #ecf0f1; }

.sidebar-section { color: #ffffff; }

.edu-item { margin-bottom: 15px; }
.edu-degree { font-weight: 700; color: #fff; font-size: 11px; }
.edu-school { font-style: italic; color: #bdc3c7; }
.edu-year { color: #ef6e6e; font-weight: 600; margin-top: 2px; }
.edu-gpa { color: #bdc3c7; margin-top: 2px; }

.lang-item { margin-bottom: 6px; display: flex; justify-content: space-between; color: #fff; }
.lang-name { font-weight: 600; color: #fff; }

.main-content {
  width: 62%;
  padding: 35px 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.main-title {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  color: #333;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  padding-bottom: 8px;
}

.main-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(135deg, #ef6e6e 25%, transparent 25%) -6px 0,
              linear-gradient(225deg, #ef6e6e 25%, transparent 25%) -6px 0,
              linear-gradient(315deg, #ef6e6e 25%, transparent 25%),
              linear-gradient(45deg, #ef6e6e 25%, transparent 25%);
  background-size: 6px 6px;
}

.main-title svg { width: 14px; height: 14px; color: #333; }

.work-role { font-size: 12px; font-weight: 800; color: #333; }
.work-company { font-size: 11px; color: #555; margin-bottom: 2px; }
.work-meta { font-size: 10px; color: #777; font-style: italic; }
.work-desc { font-size: 10px; line-height: 1.5; color: #444; margin-top: 5px; }
.work-desc ul { padding-left: 15px; margin: 0; }

.proj-link a { color: #ef6e6e; text-decoration: none; margin-left: 5px; font-weight: 600; font-size: 9px; }
.tech-stack { margin-top: 4px; font-size: 9px; color: #666; font-style: italic; }

.skills-grid { display: flex; flex-wrap: wrap; gap: 8px; }
.skill-box {
  background-color: #ef6e6e;
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 4px;
  display: inline-block;
}

.cert-title { font-weight: 700; font-size: 11px; color: #333; }
.cert-issuer { font-size: 10px; color: #555; }
.cert-year { font-size: 10px; color: #777; font-style: italic; }
`;
