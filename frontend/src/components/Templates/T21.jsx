import React from 'react';
import styled from "styled-components";

// Helper: Inline SVGs to remove external dependencies
const Icons = {
  email: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  location: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="13" /><circle cx="4" cy="4" r="2" /></svg>,
  github: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>,
  globe: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
  user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
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
    @page { size: A4; margin: 0; }
    .resume { width: 100%; box-shadow: none !important; margin: 0 !important; }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  }

  body { font-family: 'Arial', sans-serif; background-color: #f5f5f5; }

  .resume {
    width: 210mm;
    min-height: 297mm;
    background: white;
    margin: 20px auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    display: flex;
    overflow: hidden; /* Ensures sidebar fills height */
  }

  /* --- LEFT COLUMN (Main) --- */
  .main-content {
    flex: 0.65; /* 65% width */
    padding: 30px;
  }

  /* --- RIGHT COLUMN (Sidebar) --- */
  .sidebar {
    flex: 0.35; /* 35% width */
    background-color: #f9f9f9;
    padding: 30px 20px;
    border-left: 1px solid #eee;
  }

  /* --- HEADER --- */
  .header { margin-bottom: 25px; }
  .name { font-size: 26px; font-weight: 800; text-transform: uppercase; color: #333; margin: 0 0 5px 0; line-height: 1.1; }
  .job-title { font-size: 14px; color: #666; font-weight: 500; letter-spacing: 0.5px; margin: 0; }

  /* --- PHOTO --- */
  .profile-photo-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 25px;
  }
  .profile-photo {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 3px solid white;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }
  .profile-photo img { width: 100%; height: 100%; object-fit: cover; }
  .photo-placeholder { color: #999; width: 50px; height: 50px; }

  /* --- CONTACT INFO (Sidebar) --- */
  .contact-section { display: flex; flex-direction: column; gap: 10px; margin-bottom: 25px; }
  .contact-item { display: flex; align-items: center; gap: 10px; font-size: 10px; color: #444; word-break: break-word; }
  .icon-box { width: 14px; height: 14px; color: #333; flex-shrink: 0; }
  .contact-text { flex: 1; }

  /* --- SECTIONS --- */
  .section { margin-bottom: 22px; }
  .section-title {
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    color: #000;
    margin-bottom: 12px;
    padding-bottom: 5px;
    border-bottom: 2px solid #333;
    letter-spacing: 1px;
  }
  
  /* Sidebar uses a simpler title style */
  .sidebar .section-title {
    border-bottom: 1px solid #ccc;
    color: #444;
  }

  /* --- PROFILE TEXT --- */
  .profile-text { font-size: 10px; line-height: 1.6; color: #444; text-align: justify; }

  /* --- EXPERIENCE & PROJECTS --- */
  .item-block { margin-bottom: 15px; }
  .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; }
  .item-title { font-size: 11px; font-weight: bold; color: #000; }
  .item-date { font-size: 10px; color: #666; font-weight: 500; }
  .item-sub { font-size: 10px; color: #555; font-style: italic; margin-bottom: 4px; display: flex; justify-content: space-between;}
  .item-desc { font-size: 10px; line-height: 1.5; color: #444; }
  .item-desc ul { margin: 4px 0; padding-left: 15px; }
  .item-desc li { margin-bottom: 3px; }

  /* --- EDUCATION (Sidebar Style) --- */
  .edu-block { margin-bottom: 12px; }
  .edu-degree { font-size: 11px; font-weight: bold; color: #333; }
  .edu-inst { font-size: 10px; color: #555; }
  .edu-meta { font-size: 9px; color: #777; margin-top: 2px; }

  /* --- SKILLS --- */
  .skills-wrapper { margin-bottom: 10px; }
  .skill-category { font-size: 10px; font-weight: bold; margin-bottom: 5px; color: #333; }
  .skills-grid { display: flex; flex-wrap: wrap; gap: 6px; }
  .skill-tag {
    font-size: 9px;
    background: #e9e9e9;
    padding: 3px 8px;
    border-radius: 4px;
    color: #333;
  }

  /* --- LISTS (Languages, Certs) --- */
  .simple-list { display: flex; flex-direction: column; gap: 4px; }
  .list-item { font-size: 10px; color: #444; display: flex; justify-content: space-between; }
  .list-left { font-weight: 500; }
  .list-right { color: #777; }
`;

export const T21 = ({ jsonData }) => {
  // --- Data Extraction & Mapping ---
  const contact = jsonData.contactInfo || {};

  // Work Experience
  const workExpList = jsonData.workExperience?.map((we, index) => (
    <div key={`work-${index}`} className="item-block">
      <div className="item-header">
        <div className="item-title">{we.jobTitle || 'Job Title'}</div>
        <div className="item-date">{we.WorkDuration || 'Dates'}</div>
      </div>
      <div className="item-sub">
        <span>{we.companyName || 'Company'}</span>
        <span>{we.Location || ''}</span>
      </div>
      <div className="item-desc" dangerouslySetInnerHTML={{ __html: parseMarkdown(we.keyAchievements || '') }} />
    </div>
  ));

  // Projects
  const projectList = jsonData.projects?.map((proj, index) => (
    <div key={`proj-${index}`} className="item-block">
      <div className="item-header">
        <div className="item-title">{proj.projectTitle || proj.name || 'Project Name'}</div>
        {proj.link && <div className="item-date"><a href={proj.link} style={{ color: '#666', textDecoration: 'none' }} target="_blank" rel="noreferrer">View Project</a></div>}
      </div>
      <div className="item-sub">
        {proj.toolsTechUsed && <span>Tech: {proj.toolsTechUsed}</span>}
      </div>
      <div className="item-desc" dangerouslySetInnerHTML={{ __html: parseMarkdown(proj.description || '') }} />
    </div>
  ));

  // Education
  const educationList = jsonData.education?.map((edu, index) => (
    <div key={`edu-${index}`} className="edu-block">
      <div className="edu-degree">{edu.degreeName || 'Degree'}</div>
      <div className="edu-inst">{edu.institutionName || 'University'}</div>
      <div className="edu-meta">
        <span>{edu.graduationYear || 'Year'}</span>
        {edu.currentCGPA && <span> • CGPA: {edu.currentCGPA}</span>}
      </div>
    </div>
  ));

  // Skills
  const hardSkills = jsonData.skills?.hardSkills
    ? (Array.isArray(jsonData.skills.hardSkills) ? jsonData.skills.hardSkills : jsonData.skills.hardSkills.split(',').filter(Boolean))
    : [];
  const softSkills = jsonData.skills?.softSkills
    ? (Array.isArray(jsonData.skills.softSkills) ? jsonData.skills.softSkills : jsonData.skills.softSkills.split(',').filter(Boolean))
    : [];

  // Certificates
  const certList = jsonData.certificates?.map((cert, index) => (
    <div key={`cert-${index}`} className="list-item">
      <span className="list-left">{cert.certificateName}</span>
      <span className="list-right">{cert.year || ''}</span>
    </div>
  ));

  // Languages
  const languages = contact.Languages
    ? (Array.isArray(contact.Languages) ? contact.Languages : contact.Languages.split(',').filter(Boolean))
    : [];
  const langList = languages.map((lang, index) => (
    <div key={`lang-${index}`} className="list-item">
      <span className="list-left">{typeof lang === 'string' ? lang.trim() : (lang.name || lang)}</span>
      <span className="list-right">{typeof lang === 'object' ? (lang.level || '') : ''}</span>
    </div>
  ));

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">

        {/* LEFT COLUMN: Main Content */}
        <div className="main-content">
          <div className="header">
            <div className="name">{contact.fullName || 'Your Name'}</div>
            <div className="job-title">{contact.jobTitle || 'Professional Title'}</div>
          </div>

          {jsonData.Description?.UserDescription && (
            <div className="section">
              <div className="section-title">Profile</div>
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
              {projectList}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <div className="sidebar">

          <div className="profile-photo-container">
            <div className="profile-photo">
              {contact.profileImage ? (
                <img src={contact.profileImage} alt="Profile" />
              ) : (
                <div className="photo-placeholder">{Icons.user}</div>
              )}
            </div>
          </div>

          <div className="contact-section">
            {contact.emailAddress && (
              <div className="contact-item">
                <div className="icon-box">{Icons.email}</div>
                <span className="contact-text">{contact.emailAddress}</span>
              </div>
            )}
            {contact.phoneNumber && (
              <div className="contact-item">
                <div className="icon-box">{Icons.phone}</div>
                <span className="contact-text">{contact.phoneNumber}</span>
              </div>
            )}
            {contact.Location && (
              <div className="contact-item">
                <div className="icon-box">{Icons.location}</div>
                <span className="contact-text">{contact.Location}</span>
              </div>
            )}
            {contact.linkedin && (
              <div className="contact-item">
                <div className="icon-box">{Icons.linkedin}</div>
                <span className="contact-text">{contact.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
              </div>
            )}
            {contact.github && (
              <div className="contact-item">
                <div className="icon-box">{Icons.github}</div>
                <span className="contact-text">{contact.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>
              </div>
            )}
            {/* Fallback for portfolio if generic */}
            {contact.portfolio && !contact.github && (
              <div className="contact-item">
                <div className="icon-box">{Icons.globe}</div>
                <span className="contact-text">{contact.portfolio.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
          </div>

          {educationList && educationList.length > 0 && (
            <div className="section">
              <div className="section-title">Education</div>
              {educationList}
            </div>
          )}

          {(hardSkills.length > 0 || softSkills.length > 0) && (
            <div className="section">
              <div className="section-title">Skills</div>
              {hardSkills.length > 0 && (
                <div className="skills-wrapper">
                  <div className="skills-grid">
                    {hardSkills.map((skill, i) => <span key={i} className="skill-tag">{skill.trim()}</span>)}
                  </div>
                </div>
              )}
              {softSkills.length > 0 && (
                <div className="skills-wrapper">
                  <div className="skill-category">Soft Skills</div>
                  <div className="skills-grid">
                    {softSkills.map((skill, i) => <span key={i} className="skill-tag">{skill.trim()}</span>)}
                  </div>
                </div>
              )}
            </div>
          )}

          {certList && certList.length > 0 && (
            <div className="section">
              <div className="section-title">Certifications</div>
              <div className="simple-list">{certList}</div>
            </div>
          )}

          {langList && langList.length > 0 && (
            <div className="section">
              <div className="section-title">Languages</div>
              <div className="simple-list">{langList}</div>
            </div>
          )}

        </div>
      </div>
    </StyledWrapper>
  );
};

export const T21Css = `
@media print {
  body { margin: 0; padding: 0; background-color: white !important; }
  @page { size: A4; margin: 0; }
  .resume { width: 210mm !important; height: 297mm !important; margin: 0 !important; box-shadow: none !important; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
}

body { font-family: 'Arial', sans-serif; background-color: #f5f5f5; }

.resume {
  width: 210mm;
  min-height: 297mm;
  background: white;
  margin: 20px auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
}

.main-content {
  flex: 0.65;
  padding: 30px;
}

.sidebar {
  flex: 0.35;
  background-color: #f9f9f9;
  padding: 30px 20px;
  border-left: 1px solid #eee;
}

.header { margin-bottom: 25px; }
.name { font-size: 26px; font-weight: 800; text-transform: uppercase; color: #333; margin: 0 0 5px 0; line-height: 1.1; }
.job-title { font-size: 14px; color: #666; font-weight: 500; letter-spacing: 0.5px; margin: 0; }

.profile-photo-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
}
.profile-photo {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 3px solid white;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
.profile-photo img { width: 100%; height: 100%; object-fit: cover; }
.photo-placeholder { color: #999; width: 50px; height: 50px; }

.contact-section { display: flex; flex-direction: column; gap: 10px; margin-bottom: 25px; }
.contact-item { display: flex; align-items: center; gap: 10px; font-size: 10px; color: #444; word-break: break-word; }
.icon-box { width: 14px; height: 14px; color: #333; flex-shrink: 0; }
.contact-text { flex: 1; }

.section { margin-bottom: 22px; }
.section-title {
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  color: #000;
  margin-bottom: 12px;
  padding-bottom: 5px;
  border-bottom: 2px solid #333;
  letter-spacing: 1px;
}

.sidebar .section-title {
  border-bottom: 1px solid #ccc;
  color: #444;
}

.profile-text { font-size: 10px; line-height: 1.6; color: #444; text-align: justify; }

.item-block { margin-bottom: 15px; }
.item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; }
.item-title { font-size: 11px; font-weight: bold; color: #000; }
.item-date { font-size: 10px; color: #666; font-weight: 500; }
.item-sub { font-size: 10px; color: #555; font-style: italic; margin-bottom: 4px; display: flex; justify-content: space-between;}
.item-desc { font-size: 10px; line-height: 1.5; color: #444; }
.item-desc ul { margin: 4px 0; padding-left: 15px; }
.item-desc li { margin-bottom: 3px; }

.edu-block { margin-bottom: 12px; }
.edu-degree { font-size: 11px; font-weight: bold; color: #333; }
.edu-inst { font-size: 10px; color: #555; }
.edu-meta { font-size: 9px; color: #777; margin-top: 2px; }

.skills-wrapper { margin-bottom: 10px; }
.skill-category { font-size: 10px; font-weight: bold; margin-bottom: 5px; color: #333; }
.skills-grid { display: flex; flex-wrap: wrap; gap: 6px; }
.skill-tag {
  font-size: 9px;
  background: #e9e9e9;
  padding: 3px 8px;
  border-radius: 4px;
  color: #333;
}

.simple-list { display: flex; flex-direction: column; gap: 4px; }
.list-item { font-size: 10px; color: #444; display: flex; justify-content: space-between; }
.list-left { font-weight: 500; }
.list-right { color: #777; }
`;
