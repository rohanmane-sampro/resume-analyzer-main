import React from 'react';
import styled from "styled-components";

// Helper: Inline SVGs to remove external dependencies
const Icons = {
  email: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  location: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="13" /><circle cx="4" cy="4" r="2" /></svg>,
  github: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>,
  link: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>,
  globe: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
  cert: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>,
  briefcase: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
  gradCap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
  user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  code: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
};

const parseMarkdown = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
};

const StyledWrapper = styled.div`
  @media print {
    body { margin: 0; padding: 0; background-color: white !important; }
    @page { size: A4 portrait; margin: 0; }
    .resume { width: 100% !important; box-shadow: none !important; margin: 0 !important; }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  }

  body { font-family: 'Arial', sans-serif; background-color: #f5f5f5; }

  .resume {
    width: 210mm;
    min-height: 297mm;
    background: white;
    margin: 20px auto;
    display: flex;
    /* Box shadow removed as requested */
  }

  /* --- SIDEBAR --- */
  .sidebar {
    width: 180px;
    background: #2c3e50 !important;
    color: white !important;
    padding: 25px 20px;
    flex-shrink: 0;
  }

  .profile-photo {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: #34495e;
    margin: 0 auto 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 3px solid rgba(255,255,255,0.1);
  }

  .profile-photo img { width: 100%; height: 100%; object-fit: cover; }
  .photo-placeholder { color: #7f8c8d; width: 60px; height: 60px; }

  .sidebar-section { margin-bottom: 25px; }

  .sidebar-title {
    font-size: 11px;
    font-weight: bold;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    padding-bottom: 5px;
    letter-spacing: 0.5px;
    color: white !important;
  }
  .sidebar-title svg { width: 12px; height: 12px; stroke: white; }

  .sidebar-item {
    font-size: 9px;
    margin-bottom: 8px;
    color: #ecf0f1 !important;
    display: flex;
    align-items: center;
    gap: 8px;
    word-break: break-word;
  }
  .sidebar-item svg { width: 10px; height: 10px; min-width: 10px; opacity: 0.8; stroke: white; }
  .sidebar-item a { color: #ecf0f1 !important; text-decoration: none; }
  .sidebar-item span { color: #ecf0f1 !important; }

  /* --- CHIPS STYLE SKILLS --- */
  .skill-list { 
    display: flex; 
    flex-wrap: wrap; 
    gap: 6px; 
  }
  
  .skill-item { 
    font-size: 9px; 
    color: #ecf0f1 !important;
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 8px;
    border-radius: 4px;
    line-height: 1;
  }

  .language-item { margin-bottom: 8px; }
  .language-name { font-size: 10px; font-weight: bold; margin-bottom: 2px; color: white !important; }
  .language-level { font-size: 8px; color: #bdc3c7 !important; }

  .course-item { margin-bottom: 10px; }
  .course-title { font-size: 9px; font-weight: bold; margin-bottom: 2px; line-height: 1.2; color: white !important; }
  .course-org { font-size: 8px; color: #bdc3c7 !important; margin-bottom: 1px; }
  .course-date { font-size: 8px; color: #95a5a6 !important; }

  /* --- MAIN CONTENT --- */
  .main-content {
    flex: 1;
    padding: 30px 35px;
  }

  .header { margin-bottom: 25px; border-bottom: 2px solid #f0f0f0; padding-bottom: 15px; }
  .name { font-size: 24px; font-weight: bold; margin: 0 0 5px 0; color: #2c3e50; text-transform: uppercase; }
  .job-title { font-size: 14px; color: #7f8c8d; margin: 0; font-weight: 500; letter-spacing: 1px; }

  .section { margin-bottom: 25px; }

  .section-title {
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    color: #2c3e50;
    margin-bottom: 15px;
    padding-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid #2c3e50;
  }
  .section-title svg { width: 14px; height: 14px; }

  .profile-text { font-size: 10px; line-height: 1.6; color: #444; text-align: justify; margin-bottom: 10px; }

  .experience-item { margin-bottom: 15px; }
  .exp-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; }
  .exp-title { font-size: 11px; font-weight: bold; color: #000; }
  .exp-date { font-size: 10px; color: #7f8c8d; font-weight: 500; }
  
  .exp-company-row { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 10px; color: #555; font-style: italic; }
  
  .exp-description { font-size: 10px; line-height: 1.5; color: #444; }
  .exp-description ul { margin: 4px 0; padding-left: 15px; }
  .exp-description li { margin-bottom: 3px; }
  
  .tech-stack { 
    margin-top: 5px; 
    font-size: 9px; 
    color: #555; 
    font-family: 'Arial', sans-serif;
    background: #f0f0f0; 
    padding: 3px 6px; 
    display: inline-block; 
    border-radius: 4px;
    font-weight: 500;
  }
`;

export const T19 = ({ jsonData }) => {
  const contact = jsonData.contactInfo || {};

  // Data processing
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
    <div key={`work-${index}`} className="experience-item">
      <div className="exp-header">
        <div className="exp-title">{we.jobTitle || 'Position'}</div>
        <div className="exp-date">{we.WorkDuration || 'Dates'}</div>
      </div>
      <div className="exp-company-row">
        <span>{we.companyName || 'Company'}</span>
        <span>{we.Location || ''}</span>
      </div>
      <div className="exp-description" dangerouslySetInnerHTML={{ __html: parseMarkdown(we.keyAchievements || '') }} />
    </div>
  ));

  const projectList = jsonData.projects?.map((proj, index) => (
    <div key={`proj-${index}`} className="experience-item">
      <div className="exp-header">
        <div className="exp-title">{proj.projectTitle || proj.name || 'Project Name'}</div>
        <div className="exp-date">
          {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" style={{ color: '#7f8c8d', textDecoration: 'none' }}>View ↗</a>}
        </div>
      </div>
      <div className="exp-description" dangerouslySetInnerHTML={{ __html: parseMarkdown(proj.description || '') }} />
      {proj.toolsTechUsed && <div className="tech-stack">{proj.toolsTechUsed}</div>}
    </div>
  ));

  const educationList = jsonData.education?.map((edu, index) => (
    <div key={`edu-${index}`} className="experience-item">
      <div className="exp-header">
        <div className="exp-title">{edu.degreeName || 'Degree'}</div>
        <div className="exp-date">{edu.graduationYear || 'Year'}</div>
      </div>
      <div className="exp-company-row">
        <span>{edu.institutionName || 'University'}</span>
        {edu.currentCGPA && <span>GPA: {edu.currentCGPA}</span>}
      </div>
    </div>
  ));

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">

        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="profile-photo">
            {contact.profileImage ? (
              <img src={contact.profileImage} alt="Profile" />
            ) : (
              <div className="photo-placeholder">{Icons.user}</div>
            )}
          </div>

          <div className="sidebar-section">
            <div className="sidebar-title">{Icons.user} CONTACT</div>
            {contact.emailAddress && (
              <div className="sidebar-item">
                {Icons.email} <span>{contact.emailAddress}</span>
              </div>
            )}
            {contact.phoneNumber && (
              <div className="sidebar-item">
                {Icons.phone} <span>{contact.phoneNumber}</span>
              </div>
            )}
            {contact.Location && (
              <div className="sidebar-item">
                {Icons.location} <span>{contact.Location}</span>
              </div>
            )}
            {contact.linkedin && (
              <div className="sidebar-item">
                {Icons.linkedin} <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              </div>
            )}
            {contact.github && (
              <div className="sidebar-item">
                {Icons.github} <a href={contact.github} target="_blank" rel="noreferrer">GitHub</a>
              </div>
            )}
            {contact.portfolio && !contact.github && (
              <div className="sidebar-item">
                {Icons.link} <a href={contact.portfolio} target="_blank" rel="noreferrer">Portfolio</a>
              </div>
            )}
          </div>

          {(hardSkills.length > 0 || softSkills.length > 0) && (
            <div className="sidebar-section">
              <div className="sidebar-title">{Icons.code} SKILLS</div>
              <div className="skill-list">
                {hardSkills.map((skill, i) => <div key={`h-${i}`} className="skill-item">{skill.trim()}</div>)}
                {softSkills.map((skill, i) => <div key={`s-${i}`} className="skill-item">{skill.trim()}</div>)}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div className="sidebar-section">
              <div className="sidebar-title">{Icons.globe} LANGUAGES</div>
              {languages.map((lang, idx) => (
                <div key={idx} className="language-item">
                  <div className="language-name">{typeof lang === 'string' ? lang.trim() : (lang.name || lang)}</div>
                  <div className="language-level">{typeof lang === 'object' ? (lang.level || '') : ''}</div>
                </div>
              ))}
            </div>
          )}

          {certificates.length > 0 && (
            <div className="sidebar-section">
              <div className="sidebar-title">{Icons.cert} CERTIFICATES</div>
              {certificates.map((cert, i) => (
                <div key={i} className="course-item">
                  <div className="course-title">{cert.certificateName}</div>
                  <div className="course-org">{cert.providerName || ''}</div>
                  <div className="course-date">{cert.year || ''}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MAIN CONTENT */}
        <div className="main-content">
          <div className="header">
            <div className="name">{contact.fullName || 'Your Name'}</div>
            <div className="job-title">{contact.jobTitle || 'Professional Title'}</div>
          </div>

          {jsonData.Description?.UserDescription && (
            <div className="section">
              <div className="section-title">
                {Icons.user} PROFILE
              </div>
              <div className="profile-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(jsonData.Description.UserDescription) }} />
            </div>
          )}

          {workExpList && workExpList.length > 0 && (
            <div className="section">
              <div className="section-title">
                {Icons.briefcase} PROFESSIONAL EXPERIENCE
              </div>
              {workExpList}
            </div>
          )}

          {projectList && projectList.length > 0 && (
            <div className="section">
              <div className="section-title">
                {Icons.code} PROJECTS
              </div>
              {projectList}
            </div>
          )}

          {educationList && educationList.length > 0 && (
            <div className="section">
              <div className="section-title">
                {Icons.gradCap} EDUCATION
              </div>
              {educationList}
            </div>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
};

export const T19Css = `
@media print {
  body { margin: 0; padding: 0; background-color: white !important; }
  @page { size: A4 portrait; margin: 0; }
  .resume { width: 210mm !important; max-width: 210mm !important; min-height: 297mm !important; margin: 0 !important; box-shadow: none !important; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
}

body { font-family: 'Arial', sans-serif; background-color: #f5f5f5; }

.resume {
  width: 210mm;
  min-height: 297mm;
  background: white;
  margin: 20px auto;
  display: flex;
}

.sidebar {
  width: 180px;
  background: #2c3e50;
  color: white;
  padding: 25px 20px;
  flex-shrink: 0;
}

.profile-photo {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: #34495e;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 3px solid rgba(255,255,255,0.1);
}

.profile-photo img { width: 100%; height: 100%; object-fit: cover; }
.photo-placeholder { color: #7f8c8d; width: 60px; height: 60px; }

.sidebar-section { margin-bottom: 25px; }

.sidebar-title {
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  padding-bottom: 5px;
  letter-spacing: 0.5px;
}
.sidebar-title svg { width: 12px; height: 12px; }

.sidebar-item {
  font-size: 9px;
  margin-bottom: 8px;
  color: #ecf0f1;
  display: flex;
  align-items: center;
  gap: 8px;
  word-break: break-word;
}
.sidebar-item svg { width: 10px; height: 10px; min-width: 10px; opacity: 0.8; }
.sidebar-item a { color: #ecf0f1; text-decoration: none; }

.skill-list { 
  display: flex; 
  flex-wrap: wrap; 
  gap: 6px; 
}

.skill-item { 
  font-size: 9px; 
  color: #ecf0f1;
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 4px;
  line-height: 1;
}

.language-item { margin-bottom: 8px; }
.language-name { font-size: 10px; font-weight: bold; margin-bottom: 2px; }
.language-level { font-size: 8px; color: #bdc3c7; }

.course-item { margin-bottom: 10px; }
.course-title { font-size: 9px; font-weight: bold; margin-bottom: 2px; line-height: 1.2; }
.course-org { font-size: 8px; color: #bdc3c7; margin-bottom: 1px; }
.course-date { font-size: 8px; color: #95a5a6; }

.main-content {
  flex: 1;
  padding: 30px 35px;
}

.header { margin-bottom: 25px; border-bottom: 2px solid #f0f0f0; padding-bottom: 15px; }
.name { font-size: 24px; font-weight: bold; margin: 0 0 5px 0; color: #2c3e50; text-transform: uppercase; }
.job-title { font-size: 14px; color: #7f8c8d; margin: 0; font-weight: 500; letter-spacing: 1px; }

.section { margin-bottom: 25px; }

.section-title {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: #2c3e50;
  margin-bottom: 15px;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #2c3e50;
}
.section-title svg { width: 14px; height: 14px; }

.profile-text { font-size: 10px; line-height: 1.6; color: #444; text-align: justify; margin-bottom: 10px; }

.experience-item { margin-bottom: 15px; }
.exp-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; }
.exp-title { font-size: 11px; font-weight: bold; color: #000; }
.exp-date { font-size: 10px; color: #7f8c8d; font-weight: 500; }

.exp-company-row { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 10px; color: #555; font-style: italic; }

.exp-description { font-size: 10px; line-height: 1.5; color: #444; }
.exp-description ul { margin: 4px 0; padding-left: 15px; }
.exp-description li { margin-bottom: 3px; }

.tech-stack { 
  margin-top: 5px; 
  font-size: 9px; 
  color: #555; 
  font-family: 'Arial', sans-serif;
  background: #f0f0f0; 
  padding: 3px 6px; 
  display: inline-block; 
  border-radius: 4px;
  font-weight: 500;
}
`;
