import React from 'react';
import styled from "styled-components";

// Helper: Inline SVGs
const Icons = {
  email: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  location: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="13" /><circle cx="4" cy="4" r="2" /></svg>,
  github: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>,
  link: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>,
  user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
};

const parseMarkdown = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
};

// Define the new primary color
const primaryColor = '#005f73'; // Deep Teal

const StyledWrapper = styled.div`
  @media print {
    body { margin: 0; padding: 0; background-color: white !important; }
    @page { size: A4; margin: 0; }
    .resume { width: 100% !important; box-shadow: none !important; margin: 0 !important; }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  }

  body { font-family: 'Roboto', 'Segoe UI', Helvetica, sans-serif; background-color: #eef2f5; }

  .resume {
    width: 210mm;
    min-height: 297mm;
    background: white;
    margin: 20px auto;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    position: relative;
    overflow: hidden;
  }

  /* --- HEADER SECTION --- */
  .hero-header {
    background: ${primaryColor};
    color: white;
    padding: 35px 40px;
    display: flex;
    align-items: center;
    gap: 30px;
  }

  .profile-photo {
    width: 100px;
    height: 100px;
    border-radius: 12px;
    background: ${primaryColor};
    overflow: hidden;
    border: 2px solid white;
    flex-shrink: 0;
  }
  .profile-photo img { width: 100%; height: 100%; object-fit: cover; }
  .photo-placeholder { color: rgba(255,255,255,0.7); display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; }

  .header-text { flex: 1; }
  .name { font-size: 32px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin: 0; line-height: 1; color: white !important; }
  .job-title { font-size: 14px; color: rgba(255,255,255,0.8) !important; margin-top: 5px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; }

  /* --- INFO BAR --- */
  .info-bar {
    background: #f4f4f4;
    padding: 15px 40px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    border-bottom: 1px solid #ddd;
  }

  .info-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    color: #444;
    font-weight: 600;
  }
  .info-item svg { width: 12px; height: 12px; color: ${primaryColor}; }
  .info-item a { color: #444; text-decoration: none; }

  /* --- LAYOUT GRID --- */
  .main-grid {
    display: grid;
    grid-template-columns: 65% 35%; 
    min-height: 500px;
  }

  .col-left {
    padding: 30px 40px;
    border-right: 1px solid #eee;
  }

  .col-right {
    padding: 30px 30px;
    background: #fff;
  }

  /* --- SECTIONS --- */
  .section { margin-bottom: 30px; }
  
  .section-title {
    font-size: 14px;
    font-weight: 900;
    text-transform: uppercase;
    color: ${primaryColor};
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .section-title::after {
    content: '';
    flex: 1;
    height: 2px;
    background: ${primaryColor};
    opacity: 0.2;
  }

  .profile-text { font-size: 10px; line-height: 1.6; color: #555; text-align: justify; }

  /* --- EXPERIENCE TIMELINE --- */
  .exp-item {
    margin-bottom: 20px;
    position: relative;
    padding-left: 15px;
    border-left: 2px solid #eee;
  }
  
  .exp-title { font-size: 12px; font-weight: 800; color: ${primaryColor}; }
  .exp-meta { font-size: 10px; color: #666; margin-bottom: 5px; font-weight: 500; }
  .exp-desc { font-size: 10px; line-height: 1.5; color: #444; }
  .exp-desc ul { margin: 5px 0 0 0; padding-left: 15px; }
  .exp-desc li { margin-bottom: 3px; }

  /* --- PROJECTS GRID --- */
  .projects-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }

  .project-card {
    background: #f9f9f9;
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #eee;
  }

  .proj-title { font-size: 11px; font-weight: bold; margin-bottom: 3px; display: block; color: ${primaryColor}; }
  .proj-link { font-size: 9px; color: #666; text-decoration: none; margin-bottom: 5px; display: block; }
  .proj-desc { font-size: 9px; line-height: 1.4; color: #555; margin-bottom: 5px; }
  
  .tech-tag {
    font-size: 8px;
    color: #fff !important;
    background: ${primaryColor};
    padding: 2px 5px;
    border-radius: 2px;
    display: inline-block;
  }

  /* --- RIGHT COL SPECIFICS --- */
  .edu-item { margin-bottom: 15px; }
  .edu-degree { font-size: 11px; font-weight: bold; color: ${primaryColor}; }
  .edu-school { font-size: 10px; color: #444; }
  .edu-year { font-size: 9px; color: #888; margin-top: 2px; }

  .skills-container { display: flex; flex-wrap: wrap; gap: 6px; }
  .skill-chip {
    font-size: 9px;
    font-weight: 600;
    color: ${primaryColor};
    border: 1px solid ${primaryColor};
    padding: 4px 8px;
    border-radius: 20px; /* Pill shape */
  }

  .lang-row {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    padding: 5px 0;
    border-bottom: 1px dashed #eee;
  }
  .lang-name { font-weight: bold; color: ${primaryColor}; }
  .lang-level { color: #777; }

  .cert-item { margin-bottom: 10px; font-size: 10px; }
  .cert-name { font-weight: bold; display: block; margin-bottom: 2px; color: ${primaryColor}; }
  .cert-date { font-size: 9px; color: #777; }
`;

export const T18 = ({ jsonData }) => {
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
    <div key={`work-${index}`} className="exp-item">
      <div className="exp-title">{we.jobTitle || 'Position'}</div>
      <div className="exp-meta">
        {we.companyName} | {we.Location} | {we.WorkDuration}
      </div>
      <div className="exp-desc" dangerouslySetInnerHTML={{ __html: parseMarkdown(we.keyAchievements || '') }} />
    </div>
  ));

  const projectList = jsonData.projects?.map((proj, index) => (
    <div key={`proj-${index}`} className="project-card">
      <div className="proj-title">{proj.projectTitle || proj.name}</div>
      {proj.link && <a href={proj.link} className="proj-link" target="_blank" rel="noreferrer">View Project ↗</a>}
      <div className="proj-desc" dangerouslySetInnerHTML={{ __html: parseMarkdown(proj.description || '') }} />
      {proj.toolsTechUsed && <span className="tech-tag">{proj.toolsTechUsed}</span>}
    </div>
  ));

  const educationList = jsonData.education?.map((edu, index) => (
    <div key={`edu-${index}`} className="edu-item">
      <div className="edu-degree">{edu.degreeName}</div>
      <div className="edu-school">{edu.institutionName}</div>
      <div className="edu-year">{edu.graduationYear} {edu.currentCGPA ? `| GPA: ${edu.currentCGPA}` : ''}</div>
    </div>
  ));

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">

        {/* HERO HEADER */}
        <div className="hero-header">
          <div className="profile-photo">
            {contact.profileImage ? (
              <img src={contact.profileImage} alt="Profile" />
            ) : (
              <div className="photo-placeholder">{Icons.user}</div>
            )}
          </div>
          <div className="header-text">
            <h1 className="name">{contact.fullName || 'Name'}</h1>
            <div className="job-title">{contact.jobTitle || 'Job Title'}</div>
          </div>
        </div>

        {/* INFO BAR */}
        <div className="info-bar">
          {contact.emailAddress && <div className="info-item">{Icons.email} {contact.emailAddress}</div>}
          {contact.phoneNumber && <div className="info-item">{Icons.phone} {contact.phoneNumber}</div>}
          {contact.Location && <div className="info-item">{Icons.location} {contact.Location}</div>}
          {contact.linkedin && (
            <div className="info-item">
              {Icons.linkedin} <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          )}
          {contact.github && (
            <div className="info-item">
              {Icons.github} <a href={contact.github} target="_blank" rel="noreferrer">GitHub</a>
            </div>
          )}
          {contact.portfolio && !contact.github && (
            <div className="info-item">
              {Icons.link} <a href={contact.portfolio} target="_blank" rel="noreferrer">Portfolio</a>
            </div>
          )}
        </div>

        {/* MAIN LAYOUT */}
        <div className="main-grid">

          {/* LEFT COLUMN (Narrative) */}
          <div className="col-left">

            {jsonData.Description?.UserDescription && (
              <div className="section">
                <div className="section-title">Professional Profile</div>
                <div className="profile-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(jsonData.Description.UserDescription) }} />
              </div>
            )}

            {workExpList && workExpList.length > 0 && (
              <div className="section">
                <div className="section-title">Experience</div>
                {workExpList}
              </div>
            )}

            {projectList && projectList.length > 0 && (
              <div className="section">
                <div className="section-title">Projects</div>
                <div className="projects-grid">
                  {projectList}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN (Details) */}
          <div className="col-right">

            {(hardSkills.length > 0 || softSkills.length > 0) && (
              <div className="section">
                <div className="section-title">Skills</div>
                <div className="skills-container">
                  {hardSkills.map((s, i) => <span key={`h-${i}`} className="skill-chip">{s.trim()}</span>)}
                  {softSkills.map((s, i) => <span key={`s-${i}`} className="skill-chip">{s.trim()}</span>)}
                </div>
              </div>
            )}

            {educationList && educationList.length > 0 && (
              <div className="section">
                <div className="section-title">Education</div>
                {educationList}
              </div>
            )}

            {certificates.length > 0 && (
              <div className="section">
                <div className="section-title">Certificates</div>
                {certificates.map((cert, i) => (
                  <div key={i} className="cert-item">
                    <span className="cert-name">{cert.certificateName}</span>
                    <span className="cert-date">{cert.year || ''}</span>
                  </div>
                ))}
              </div>
            )}

            {languages.length > 0 && (
              <div className="section">
                <div className="section-title">Languages</div>
                {languages.map((lang, i) => (
                  <div key={i} className="lang-row">
                    <span className="lang-name">{typeof lang === 'string' ? lang.trim() : (lang.name || lang)}</span>
                    <span className="lang-level">{typeof lang === 'object' ? (lang.level || '') : ''}</span>
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

export const T18Css = `
@media print {
  body { margin: 0; padding: 0; background-color: white !important; }
  @page { size: A4 portrait; margin: 0; }
  .resume { width: 210mm !important; max-width: 210mm !important; min-height: 297mm !important; margin: 0 !important; box-shadow: none !important; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
}

body { font-family: 'Roboto', 'Segoe UI', Helvetica, sans-serif; background-color: #eef2f5; }

.resume {
  width: 210mm;
  min-height: 297mm;
  background: white;
  margin: 20px auto;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
}

.hero-header {
  background: #005f73;
  color: white;
  padding: 35px 40px;
  display: flex;
  align-items: center;
  gap: 30px;
}

.profile-photo {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  background: #005f73;
  overflow: hidden;
  border: 2px solid white;
  flex-shrink: 0;
}
.profile-photo img { width: 100%; height: 100%; object-fit: cover; }
.photo-placeholder { color: rgba(255,255,255,0.7); display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; }

.header-text { flex: 1; }
.name { font-size: 32px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin: 0; line-height: 1; color: white !important; }
.job-title { font-size: 14px; color: rgba(255,255,255,0.8) !important; margin-top: 5px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; }

.info-bar {
  background: #f4f4f4;
  padding: 15px 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  border-bottom: 1px solid #ddd;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  color: #444;
  font-weight: 600;
}
.info-item svg { width: 12px; height: 12px; color: #005f73; }
.info-item a { color: #444; text-decoration: none; }

.main-grid {
  display: grid;
  grid-template-columns: 65% 35%;
  min-height: 500px;
}

.col-left {
  padding: 30px 40px;
  border-right: 1px solid #eee;
}

.col-right {
  padding: 30px 30px;
  background: #fff;
}

.section { margin-bottom: 30px; }

.section-title {
  font-size: 14px;
  font-weight: 900;
  text-transform: uppercase;
  color: #005f73;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-title::after {
  content: '';
  flex: 1;
  height: 2px;
  background: #005f73;
  opacity: 0.2;
}

.profile-text { font-size: 10px; line-height: 1.6; color: #555; text-align: justify; }

.exp-item {
  margin-bottom: 20px;
  position: relative;
  padding-left: 15px;
  border-left: 2px solid #eee;
}

.exp-title { font-size: 12px; font-weight: 800; color: #005f73; }
.exp-meta { font-size: 10px; color: #666; margin-bottom: 5px; font-weight: 500; }
.exp-desc { font-size: 10px; line-height: 1.5; color: #444; }
.exp-desc ul { margin: 5px 0 0 0; padding-left: 15px; }
.exp-desc li { margin-bottom: 3px; }

.projects-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.project-card {
  background: #f9f9f9;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #eee;
}

.proj-title { font-size: 11px; font-weight: bold; margin-bottom: 3px; display: block; color: #005f73; }
.proj-link { font-size: 9px; color: #666; text-decoration: none; margin-bottom: 5px; display: block; }
.proj-desc { font-size: 9px; line-height: 1.4; color: #555; margin-bottom: 5px; }

.tech-tag {
  font-size: 8px;
  color: #fff !important;
  background: #005f73;
  padding: 2px 5px;
  border-radius: 2px;
  display: inline-block;
}

.edu-item { margin-bottom: 15px; }
.edu-degree { font-size: 11px; font-weight: bold; color: #005f73; }
.edu-school { font-size: 10px; color: #444; }
.edu-year { font-size: 9px; color: #888; margin-top: 2px; }

.skills-container { display: flex; flex-wrap: wrap; gap: 6px; }
.skill-chip {
  font-size: 9px;
  font-weight: 600;
  color: #005f73;
  border: 1px solid #005f73;
  padding: 4px 8px;
  border-radius: 20px;
}

.lang-row {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  padding: 5px 0;
  border-bottom: 1px dashed #eee;
}
.lang-name { font-weight: bold; color: #005f73; }
.lang-level { color: #777; }

.cert-item { margin-bottom: 10px; font-size: 10px; }
.cert-name { font-weight: bold; display: block; margin-bottom: 2px; color: #005f73; }
.cert-date { font-size: 9px; color: #777; }
`;
