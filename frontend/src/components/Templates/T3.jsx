import React from 'react';
import styled from "styled-components";

// --- Icons (Signature Red #d93025) ---
const Icons = {
  email: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  location: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="13" /><circle cx="4" cy="4" r="2" /></svg>,
  github: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>,
  globe: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
  link: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
};

const parseMarkdown = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
};

const colors = {
  accent: '#d93025', // Andrew O'Sullivan Red
  text: '#111111',
  lightText: '#666666',
  border: '#000000'
};

const StyledWrapper = styled.div`
  @media print {
    body { margin: 0; padding: 0; background-color: white !important; }
    @page { size: A4 portrait; margin: 0; }
    .resume { width: 100% !important; margin: 0 !important; box-shadow: none !important; }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  }

  body { font-family: 'Georgia', 'Times New Roman', serif; background-color: #f5f5f5; color: ${colors.text}; }

  .resume {
    width: 210mm;
    min-height: 297mm;
    background: white;
    margin: 20px auto;
    padding: 45px 50px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  /* --- HEADER --- */
  .header {
    text-align: center;
    margin-bottom: 35px;
  }

  .profile-photo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
  }

  .profile-photo {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    overflow: hidden;
    background: #f4f4f4;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .profile-photo img { width: 100%; height: 100%; object-fit: cover; }

  .name {
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 8px 0;
    color: ${colors.accent};
    font-family: 'Georgia', serif;
    letter-spacing: 0.5px;
  }

  .job-title {
    font-size: 16px;
    color: #444;
    font-style: italic;
    margin-bottom: 12px;
    font-family: 'Georgia', serif;
  }

  .contact-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
    font-size: 10px;
    font-family: 'Arial', sans-serif;
    color: #333;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .contact-item svg { width: 11px; height: 11px; color: ${colors.accent}; }
  .contact-item a { color: inherit; text-decoration: none; }

  /* --- SECTIONS --- */
  .section { margin-bottom: 18px; }

  .section-bar {
    font-family: 'Arial', sans-serif; /* Contrast font for headers */
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    color: #000;
    border-bottom: 2px solid #000;
    padding-bottom: 5px;
    margin-bottom: 20px;
    letter-spacing: 1px;
  }

  /* --- TWO COLUMN GRID (Date Left | Content Right) --- */
  .item-grid {
    display: grid;
    grid-template-columns: 135px 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }

  .left-col {
    font-family: 'Arial', sans-serif; /* Sans-serif for metadata */
    font-size: 10px;
    color: #555;
    text-align: left;
    line-height: 1.5;
  }
  .left-label { font-weight: 600; color: #000; display: block; margin-bottom: 3px; }
  .left-sub { font-style: italic; color: #777; display: block; }

  .right-col {
    font-family: 'Georgia', serif;
  }

  .main-title-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 3px;
  }

  .item-title {
    font-weight: 700;
    font-size: 12px;
    color: #000;
  }
  
  .item-subtitle {
    font-style: italic;
    font-size: 11px;
    color: #444;
    margin-bottom: 6px;
    display: block;
  }

  .item-desc {
    font-size: 11px;
    line-height: 1.6;
    color: #333;
    text-align: justify;
  }
  .item-desc ul { margin: 0; padding-left: 16px; }
  .item-desc li { margin-bottom: 4px; }

  /* --- PROJECTS STYLING (Attractive) --- */
  .proj-link {
    font-family: 'Arial', sans-serif;
    font-size: 9px;
    color: ${colors.accent};
    text-decoration: none;
    margin-left: 8px;
    border: 1px solid ${colors.accent};
    padding: 1px 5px;
    border-radius: 3px;
    display: inline-flex;
    align-items: center;
    gap: 3px;
  }
  .proj-link svg { width: 8px; height: 8px; }

  .tech-stack {
    font-family: 'Arial', sans-serif;
    font-size: 10px;
    color: #666;
    margin-bottom: 6px;
    font-style: italic;
  }

  /* --- SKILLS (CHIPS STYLE) --- */
  .skills-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .skill-chip {
    font-family: 'Arial', sans-serif;
    font-size: 10px;
    color: #333;
    background: #ffffff;
    padding: 5px 12px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-weight: 600;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  }

  /* --- CERTIFICATIONS & LANGUAGES --- */
  .cert-row {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    margin-bottom: 6px;
    font-family: 'Georgia', serif;
  }
  .cert-name { font-weight: 700; color: #000; }
  .cert-issuer { font-style: italic; color: #555; margin-left: 5px; }

  .lang-grid {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  .lang-item {
    font-size: 11px;
    font-family: 'Georgia', serif;
  }
  .lang-name { font-weight: 700; }
  .lang-level { color: #666; font-style: italic; }

  .profile-text {
    font-size: 11px;
    line-height: 1.6;
    text-align: justify;
    font-family: 'Georgia', serif;
  }

  .date-range { display: block; margin-bottom: 2px; }
  .location { display: block; font-style: italic; color: #777; }
`;

export const T3 = ({ jsonData }) => {
  const contact = jsonData.contactInfo || {};
  const education = jsonData.education || [];
  const workExp = jsonData.workExperience || [];
  const projects = jsonData.projects || [];
  const certificates = jsonData.certificates || [];
  const description = jsonData.Description?.UserDescription || '';

  const hardSkills = jsonData.skills?.hardSkills
    ? (Array.isArray(jsonData.skills.hardSkills) ? jsonData.skills.hardSkills : jsonData.skills.hardSkills.split(',').map(s => s.trim()).filter(s => s))
    : [];

  const softSkills = jsonData.skills?.softSkills
    ? (Array.isArray(jsonData.skills.softSkills) ? jsonData.skills.softSkills : jsonData.skills.softSkills.split(',').map(s => s.trim()).filter(s => s))
    : [];

  // Combine skills if desired, or keep separate. Using separate for clarity.
  const allSkills = [...hardSkills, ...softSkills].filter(s => s && s.trim());

  const languages = contact.Languages
    ? (Array.isArray(contact.Languages) ? contact.Languages : contact.Languages.split(',').map(l => l.trim()).filter(l => l))
    : [];

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">

        {/* HEADER */}
        <div className="header">
          {contact.profileImage && (
            <div className="profile-photo-container">
              <div className="profile-photo">
                <img src={contact.profileImage} alt="Profile" />
              </div>
            </div>
          )}

          <h1 className="name">{contact.fullName || 'Andrew O\'Sullivan'}</h1>
          <div className="job-title">{contact.jobTitle || 'Product Manager'}</div>

          <div className="contact-row">
            {contact.Location && (
              <div className="contact-item">
                {Icons.location} <span>{contact.Location}</span>
              </div>
            )}
            {contact.emailAddress && (
              <div className="contact-item">
                {Icons.email} <span>{contact.emailAddress}</span>
              </div>
            )}
            {contact.phoneNumber && (
              <div className="contact-item">
                {Icons.phone} <span>{contact.phoneNumber}</span>
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

        {/* PROFILE */}
        {description && (
          <div className="section">
            <div className="section-bar">Profile</div>
            <div className="profile-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(description) }} />
          </div>
        )}

        {/* PROFESSIONAL EXPERIENCE */}
        {workExp.length > 0 && (
          <div className="section">
            <div className="section-bar">Professional Experience</div>
            {workExp.map((we, index) => (
              <div key={index} className="item-grid">
                <div className="left-col">
                  <span className="date-range">{we.WorkDuration}</span>
                  <span className="location">{we.Location}</span>
                </div>
                <div className="right-col">
                  <div className="item-title">{we.jobTitle}</div>
                  <span className="item-subtitle">{we.companyName}</span>
                  <div className="item-desc">
                    <ul>
                      <li dangerouslySetInnerHTML={{ __html: parseMarkdown(we.keyAchievements) }} />
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROJECTS */}
        {projects.length > 0 && (
          <div className="section">
            <div className="section-bar">Projects</div>
            {projects.map((proj, index) => (
              <div key={index} className="item-grid">
                <div className="left-col">
                  {/* Left Column Label for Projects */}
                  <span className="date-range">Project</span>
                </div>
                <div className="right-col">
                  <div className="main-title-row">
                    <span className="item-title">{proj.title || proj.projectTitle}</span>
                    {proj.link && (
                      <a href={proj.link} className="proj-link" target="_blank" rel="noreferrer">
                        {Icons.link} View
                      </a>
                    )}
                  </div>
                  {(proj.technologies || proj.toolsTechUsed) && (
                    <div className="tech-stack">{proj.technologies || proj.toolsTechUsed}</div>
                  )}
                  <div className="item-desc" dangerouslySetInnerHTML={{ __html: parseMarkdown(proj.description) }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EDUCATION */}
        {education.length > 0 && (
          <div className="section">
            <div className="section-bar">Education</div>
            {education.map((edu, index) => (
              <div key={index} className="item-grid">
                <div className="left-col">
                  <span className="date-range">{edu.graduationYear}</span>
                  {edu.location && <span className="location">{edu.location}</span>}
                </div>
                <div className="right-col">
                  <div className="item-title">{edu.degreeName}</div>
                  <span className="item-subtitle">{edu.institutionName}</span>
                  {edu.currentCGPA && <div className="item-desc">CGPA: {edu.currentCGPA}</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SKILLS (Chip Style) */}
        {allSkills.length > 0 && (
          <div className="section">
            <div className="section-bar">Skills</div>
            <div className="skills-wrapper">
              {allSkills.map((skill, index) => (
                <span key={index} className="skill-chip">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* CERTIFICATIONS & LANGUAGES */}
        <div className="section">
          {certificates.length > 0 && (
            <>
              <div className="section-bar">Certifications</div>
              {certificates.map((cert, index) => (
                <div key={index} className="cert-row">
                  <div>
                    <span className="cert-name">{cert.certificateName || cert.name}</span>
                    <span className="cert-issuer"> — {cert.providerName || cert.issuer}</span>
                  </div>
                  <span className="left-col" style={{ width: 'auto', textAlign: 'right' }}>{cert.year || cert.date}</span>
                </div>
              ))}
            </>
          )}

          {languages.length > 0 && (
            <>
              <div className="section-bar" style={{ marginTop: '25px' }}>Languages</div>
              <div className="lang-grid">
                {languages.map((lang, index) => (
                  <div key={index} className="lang-item">
                    <span className="lang-name">• {typeof lang === 'string' ? lang : lang.name}</span>
                    {lang.level && <span className="lang-level"> — {lang.level}</span>}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

      </div>
    </StyledWrapper>
  );
};

export const T3Css = `
@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
  
  body {
    margin: 0 !important;
    padding: 0 !important;
    background-color: white !important;
    font-family: 'Georgia', 'Times New Roman', serif !important;
  }
  
  @page {
    size: A4 portrait;
    margin: 0;
  }
  
  .resume {
    width: 210mm !important;
    min-height: 297mm !important;
    max-width: 210mm !important;
    background: white !important;
    margin: 0 auto !important;
    padding: 15mm 12mm !important;
    box-shadow: none !important;
    box-sizing: border-box !important;
    page-break-after: auto !important;
  }
  
  .header {
    page-break-inside: avoid !important;
    page-break-after: avoid !important;
  }
  
  .section {
    page-break-inside: avoid !important;
  }
  
  .item-grid {
    page-break-inside: avoid !important;
  }
  
  /* Ensure colors print correctly */
  .name {
    color: #d93025 !important;
  }
  
  .contact-item svg {
    color: #d93025 !important;
  }
  
  .section-bar {
    border-bottom: 2px solid #000 !important;
  }
  
  .skill-chip {
    border: 1px solid #ccc !important;
    background: #ffffff !important;
  }
  
  .proj-link {
    border: 1px solid #d93025 !important;
    color: #d93025 !important;
  }
}

body { font-family: 'Georgia', 'Times New Roman', serif; background-color: #f5f5f5; color: #111; }

.resume {
  width: 210mm;
  min-height: 297mm;
  background: white;
  margin: 20px auto;
  padding: 45px 50px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  margin-bottom: 35px;
}

.profile-photo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.profile-photo {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  overflow: hidden;
  background: #f4f4f4;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile-photo img { width: 100%; height: 100%; object-fit: cover; }

.name {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #d93025;
  font-family: 'Georgia', serif;
  letter-spacing: 0.5px;
}

.job-title {
  font-size: 16px;
  color: #444;
  font-style: italic;
  margin-bottom: 12px;
  font-family: 'Georgia', serif;
}

.contact-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 10px;
  font-family: 'Arial', sans-serif;
  color: #333;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 6px;
}
.contact-item svg { width: 11px; height: 11px; color: #d93025; }
.contact-item a { color: inherit; text-decoration: none; }

.section { margin-bottom: 18px; }

.section-bar {
  font-family: 'Arial', sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #000;
  border-bottom: 2px solid #000;
  padding-bottom: 5px;
  margin-bottom: 20px;
  letter-spacing: 1px;
}

.item-grid {
  display: grid;
  grid-template-columns: 135px 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.left-col {
  font-family: 'Arial', sans-serif;
  font-size: 10px;
  color: #555;
  text-align: left;
  line-height: 1.5;
}
.left-label { font-weight: 600; color: #000; display: block; margin-bottom: 3px; }
.left-sub { font-style: italic; color: #777; display: block; }

.right-col {
  font-family: 'Georgia', serif;
}

.main-title-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 3px;
}

.item-title {
  font-weight: 700;
  font-size: 12px;
  color: #000;
}

.item-subtitle {
  font-style: italic;
  font-size: 11px;
  color: #444;
  margin-bottom: 6px;
  display: block;
}

.item-desc {
  font-size: 11px;
  line-height: 1.6;
  color: #333;
  text-align: justify;
}
.item-desc ul { margin: 0; padding-left: 16px; }
.item-desc li { margin-bottom: 4px; }

.proj-link {
  font-family: 'Arial', sans-serif;
  font-size: 9px;
  color: #d93025;
  text-decoration: none;
  margin-left: 8px;
  border: 1px solid #d93025;
  padding: 1px 5px;
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  gap: 3px;
}
.proj-link svg { width: 8px; height: 8px; }

.tech-stack {
  font-family: 'Arial', sans-serif;
  font-size: 10px;
  color: #666;
  margin-bottom: 6px;
  font-style: italic;
}

.skills-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-chip {
  font-family: 'Arial', sans-serif;
  font-size: 10px;
  color: #333;
  background: #ffffff;
  padding: 5px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.cert-row {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  margin-bottom: 6px;
  font-family: 'Georgia', serif;
}
.cert-name { font-weight: 700; color: #000; }
.cert-issuer { font-style: italic; color: #555; margin-left: 5px; }

.lang-grid {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.lang-item {
  font-size: 11px;
  font-family: 'Georgia', serif;
}
.lang-name { font-weight: 700; }
.lang-level { color: #666; font-style: italic; }

.profile-text {
  font-size: 11px;
  line-height: 1.6;
  text-align: justify;
  font-family: 'Georgia', serif;
}

.date-range { display: block; margin-bottom: 2px; }
.location { display: block; font-style: italic; color: #777; }
`;