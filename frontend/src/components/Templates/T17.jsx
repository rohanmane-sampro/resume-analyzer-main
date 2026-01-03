import React from 'react';
import styled from "styled-components";

// --- SVG ICONS (Gold Color matching the design) ---
const Icons = {
  email: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  location: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="13" /><circle cx="4" cy="4" r="2" /></svg>,
  github: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>,
  link: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>,
  globe: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
  education: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
  skills: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>,
  languages: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
  cert: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>,
  work: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
  folder: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>,
  user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
};

const parseMarkdown = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
};

const themeColor = '#C49B50'; // The Gold/Mustard color from the image reference

const StyledWrapper = styled.div`
  @media print {
    body { margin: 0; padding: 0; background-color: white !important; }
    @page { size: A4 portrait; margin: 0; }
    .resume { width: 100% !important; margin: 0 !important; box-shadow: none !important; }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  }

  body { font-family: 'Arial', sans-serif; background-color: #f5f5f5; color: #333; }

  .resume {
    width: 210mm;
    min-height: 297mm;
    background: white;
    margin: 20px auto;
    padding: 35px 40px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  /* --- HEADER --- */
  .header-container {
    display: flex;
    gap: 30px;
    margin-bottom: 30px;
    align-items: center;
  }

  .profile-photo {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    border: 3px solid #f0f0f0;
    background: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .profile-photo img { width: 100%; height: 100%; object-fit: cover; }
  .photo-placeholder { color: #bbb; width: 60%; height: 60%; }

  .header-text {
    flex: 1;
  }

  .name {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 32px;
    font-weight: 700;
    color: #000;
    margin: 0 0 5px 0;
  }

  .role {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 16px;
    font-style: italic;
    color: #444;
    margin: 0 0 15px 0;
  }

  .contact-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    font-size: 9px;
    color: #555;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .contact-item svg { width: 12px; height: 12px; color: ${themeColor}; }
  .contact-item a { color: #555; text-decoration: none; }

  /* --- COLUMNS --- */
  .content-row {
    display: flex;
    gap: 30px;
    flex: 1;
  }

  .sidebar {
    width: 32%;
    border-right: 1px solid #eee;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .main-content {
    width: 68%;
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  /* --- SECTIONS --- */
  .section-header {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    color: #000;
    border-bottom: 2px solid ${themeColor};
    padding-bottom: 5px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    letter-spacing: 0.5px;
  }
  .section-header svg { width: 14px; height: 14px; color: #000; }

  /* --- ITEMS --- */
  .edu-item, .cert-item { margin-bottom: 15px; }
  .edu-school { font-weight: bold; font-size: 10px; color: #000; }
  .edu-degree { font-style: italic; font-size: 10px; color: #444; margin: 2px 0; }
  .edu-meta { font-size: 9px; color: #666; }

  .skill-group { margin-bottom: 12px; }
  .skill-title { font-weight: bold; font-size: 10px; color: #000; margin-bottom: 4px; border-bottom: 1px solid #eee; padding-bottom: 2px;}
  .skill-list { font-size: 10px; line-height: 1.5; color: #444; }

  .lang-item { display: flex; justify-content: space-between; font-size: 10px; margin-bottom: 4px; }
  .lang-name { font-weight: bold; color: #333; }
  .lang-level { color: #666; }

  /* --- MAIN CONTENT ITEMS --- */
  .summary-text {
    font-size: 10px;
    line-height: 1.6;
    color: #333;
    text-align: justify;
  }

  .work-item, .project-item { margin-bottom: 18px; }
  
  .item-top-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 2px;
  }
  
  .item-title { font-weight: bold; font-size: 11px; color: #000; }
  .item-loc { font-style: italic; font-size: 10px; color: #666; }
  
  .item-sub-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 6px;
    font-size: 10px;
  }
  .item-role { font-weight: 600; color: #444; }
  .item-date { color: #666; }
  
  .item-desc { font-size: 10px; line-height: 1.5; color: #444; }
  .item-desc ul { margin: 0; padding-left: 15px; }
  .item-desc li { margin-bottom: 3px; }

  .tech-stack {
    margin-top: 4px;
    font-size: 9px;
    color: #666;
  }
  .tech-label { font-weight: bold; color: #000; margin-right: 4px; }
`;

export const T17 = ({ jsonData }) => {
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
  const certificates = jsonData.certificates || [];

  const workExpList = jsonData.workExperience?.map((we, index) => (
    <div key={`work-${index}`} className="work-item">
      <div className="item-top-row">
        <div className="item-title">{we.companyName}</div>
        <div className="item-loc">{we.Location}</div>
      </div>
      <div className="item-sub-row">
        <div className="item-role">{we.jobTitle}</div>
        <div className="item-date">{we.WorkDuration}</div>
      </div>
      <div className="item-desc" dangerouslySetInnerHTML={{ __html: parseMarkdown(we.keyAchievements || '') }} />
    </div>
  ));

  const projectList = jsonData.projects?.map((proj, index) => (
    <div key={`proj-${index}`} className="project-item">
      <div className="item-top-row">
        <div className="item-title">
          {proj.projectTitle || proj.name}
          {proj.link && (
            <a href={proj.link} target="_blank" rel="noreferrer" style={{ marginLeft: '8px', color: '#C49B50', textDecoration: 'none' }}>
              {Icons.link}
            </a>
          )}
        </div>
      </div>

      <div className="item-desc" dangerouslySetInnerHTML={{ __html: parseMarkdown(proj.description || '') }} />

      {proj.toolsTechUsed && (
        <div className="tech-stack">
          {proj.toolsTechUsed}
        </div>
      )}
    </div>
  ));

  const educationList = jsonData.education?.map((edu, index) => (
    <div key={`edu-${index}`} className="edu-item">
      <div className="edu-school">{edu.institutionName}</div>
      <div className="edu-degree">{edu.degreeName}</div>
      <div className="edu-meta">
        {edu.graduationYear}
        {edu.currentCGPA && <div>CGPA: {edu.currentCGPA}</div>}
      </div>
    </div>
  ));

  const certList = certificates.map((cert, index) => (
    <div key={`cert-${index}`} className="cert-item">
      <div className="edu-school">{cert.certificateName}</div>
      <div className="edu-meta">{cert.year || ''}</div>
    </div>
  ));

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">

        {/* HEADER */}
        <div className="header-container">
          <div className="profile-photo">
            {contact.profileImage ? (
              <img src={contact.profileImage} alt="Profile" />
            ) : (
              <div className="photo-placeholder">{Icons.user}</div>
            )}
          </div>

          <div className="header-text">
            <h1 className="name">{contact.fullName || 'Your Name'}</h1>
            <div className="role">{contact.jobTitle || 'Professional Title'}</div>

            <div className="contact-bar">
              {contact.emailAddress && <div className="contact-item">{Icons.email} {contact.emailAddress}</div>}
              {contact.phoneNumber && <div className="contact-item">{Icons.phone} {contact.phoneNumber}</div>}
              {contact.Location && <div className="contact-item">{Icons.location} {contact.Location}</div>}
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
        </div>

        <div className="content-row">

          {/* LEFT SIDEBAR */}
          <div className="sidebar">

            {/* EDUCATION */}
            {educationList && educationList.length > 0 && (
              <div>
                <div className="section-header">{Icons.education} Education</div>
                {educationList}
              </div>
            )}

            {/* CERTIFICATIONS (Requested) */}
            {certList && certList.length > 0 && (
              <div>
                <div className="section-header">{Icons.cert} Certifications</div>
                {certList}
              </div>
            )}

            {/* SKILLS (Split) */}
            {(hardSkills.length > 0 || softSkills.length > 0) && (
              <div>
                <div className="section-header">{Icons.skills} Skills</div>
                {hardSkills.length > 0 && (
                  <div className="skill-group">
                    <div className="skill-title">Technical</div>
                    <div className="skill-list">{hardSkills.map(s => s.trim()).join(', ')}</div>
                  </div>
                )}
                {softSkills.length > 0 && (
                  <div className="skill-group">
                    <div className="skill-title">Soft Skills</div>
                    <div className="skill-list">{softSkills.map(s => s.trim()).join(', ')}</div>
                  </div>
                )}
              </div>
            )}

            {/* LANGUAGES */}
            {languages.length > 0 && (
              <div>
                <div className="section-header">{Icons.languages} Languages</div>
                {languages.map((lang, i) => (
                  <div key={i} className="lang-item">
                    <span className="lang-name">{typeof lang === 'string' ? lang.trim() : (lang.name || lang)}</span>
                    <span className="lang-level">{typeof lang === 'object' ? (lang.level || '') : ''}</span>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* RIGHT MAIN CONTENT */}
          <div className="main-content">

            {/* SUMMARY (Requested) */}
            {jsonData.Description?.UserDescription && (
              <div>
                {/* Note: Original image didn't have this, but you requested it. Using 'User' icon as generic profile icon */}
                <div className="section-header">{Icons.user} Profile Summary</div>
                <div className="summary-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(jsonData.Description.UserDescription) }} />
              </div>
            )}

            {/* EXPERIENCE */}
            {workExpList && workExpList.length > 0 && (
              <div>
                <div className="section-header">{Icons.work} Work Experience</div>
                {workExpList}
              </div>
            )}

            {/* PROJECTS */}
            {projectList && projectList.length > 0 && (
              <div>
                <div className="section-header">{Icons.folder} Projects</div>
                {projectList}
              </div>
            )}

          </div>
        </div>

      </div>
    </StyledWrapper>
  );
};

export const T17Css = `
@media print {
  body { margin: 0; padding: 0; background-color: white !important; }
  @page { size: A4 portrait; margin: 0; }
  .resume { width: 100% !important; max-width: none !important; min-height: 297mm !important; margin: 0 !important; box-shadow: none !important; padding: 35px 40px !important; box-sizing: border-box !important; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
}

body { font-family: 'Arial', sans-serif; background-color: #f5f5f5; color: #333; }

.resume {
  width: 210mm;
  min-height: 297mm;
  background: white;
  margin: 20px auto;
  padding: 35px 40px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.header-container {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
  align-items: center;
}

.profile-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 3px solid #f0f0f0;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile-photo img { width: 100%; height: 100%; object-fit: cover; }
.photo-placeholder { color: #bbb; width: 60%; height: 60%; }

.header-text {
  flex: 1;
}

.name {
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: 32px;
  font-weight: 700;
  color: #000;
  margin: 0 0 5px 0;
  text-transform: none; /* Reset uppercase from previous T17 */
}

.role {
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: 16px;
  font-style: italic;
  color: #444;
  margin: 0 0 15px 0;
}

.contact-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 9px;
  color: #555;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 6px;
}
.contact-item svg { width: 12px; height: 12px; color: #C49B50; }
.contact-item a { color: #555; text-decoration: none; }

.content-row {
  display: flex;
  gap: 30px;
  flex: 1;
}

.sidebar {
  width: 32%;
  border-right: 1px solid #eee;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.main-content {
  width: 68%;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.section-header {
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  color: #000;
  border-bottom: 2px solid #C49B50;
  padding-bottom: 5px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 0.5px;
}
.section-header svg { width: 14px; height: 14px; color: #000; }

.edu-item, .cert-item { margin-bottom: 15px; }
.edu-school { font-weight: bold; font-size: 10px; color: #000; }
.edu-degree { font-style: italic; font-size: 10px; color: #444; margin: 2px 0; }
.edu-meta { font-size: 9px; color: #666; }

.skill-group { margin-bottom: 12px; }
.skill-title { font-weight: bold; font-size: 10px; color: #000; margin-bottom: 4px; border-bottom: 1px solid #eee; padding-bottom: 2px;}
.skill-list { font-size: 10px; line-height: 1.5; color: #444; }

.lang-item { display: flex; justify-content: space-between; font-size: 10px; margin-bottom: 4px; }
.lang-name { font-weight: bold; color: #333; }
.lang-level { color: #666; }

.summary-text {
  font-size: 10px;
  line-height: 1.6;
  color: #333;
  text-align: justify;
}

.work-item, .project-item { margin-bottom: 18px; }

.item-top-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 2px;
}

.item-title { font-weight: bold; font-size: 11px; color: #000; }
.item-loc { font-style: italic; font-size: 10px; color: #666; }

.item-sub-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 6px;
  font-size: 10px;
}
.item-role { font-weight: 600; color: #444; }
.item-date { color: #666; }

.item-desc { font-size: 10px; line-height: 1.5; color: #444; }
.item-desc ul { margin: 0; padding-left: 15px; }
.item-desc li { margin-bottom: 3px; }

.tech-stack {
  margin-top: 4px;
  font-size: 9px;
  color: #666;
}
.tech-label { font-weight: bold; color: #000; margin-right: 4px; }
`;
