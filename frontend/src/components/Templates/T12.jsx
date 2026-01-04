import React from 'react';
import styled from "styled-components";

// --- HELPER FUNCTION ---
const parseMarkdown = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
};

// --- STYLED COMPONENTS ---
const StyledWrapper = styled.div`
  /* --- PRINT SETTINGS --- */
  @media print {
    @page {
      size: A4;
      margin: 0; /* Browser handles margins via body padding */
    }
    body {
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      background-color: white !important;
    }
    .resume-container {
      width: 210mm;
      min-height: 297mm;
      box-shadow: none !important;
      margin: 0 !important;
      border: none !important;
    }
  }

  /* --- WEB PREVIEW --- */
  font-family: 'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif;
  background-color: #e5e7eb;
  display: flex;
  justify-content: center;
  padding: 40px 0;
  color: #333;

  .resume-container {
    width: 210mm;
    min-height: 297mm;
    background: white;
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    padding: 40px 50px; /* Generous internal padding */
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }

  /* --- HEADER SECTION --- */
  .header {
    margin-bottom: 30px;
    /* No border here, we rely on section borders now, or keep the heavy anchor if preferred. 
       Let's keep the heavy anchor but add spacing. */
    border-bottom: 3px solid #333; 
    padding-bottom: 25px;
  }

  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .name-block {
    flex: 1;
  }

  .full-name {
    font-size: 32px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: -0.5px;
    color: #111 !important;
    margin: 0;
    line-height: 1;
  }

  .job-title {
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    color: #555 !important; /* Modern Grey */
    letter-spacing: 2px;
    margin-top: 8px;
  }

  /* Contact Info as a compact grid or line */
  .contact-bar {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    font-size: 11px;
    color: #444 !important;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #f3f4f6 !important; /* Subtle pill background */
    padding: 4px 10px;
    border-radius: 4px;
  }

  .contact-item a {
    color: #444 !important;
    text-decoration: none;
    font-weight: 500;
  }
  
  .contact-item span {
    color: #444 !important;
  }
  
  .contact-item i {
    color: #444 !important;
  }

  /* --- SECTIONS --- */
  .section {
    margin-bottom: 25px;
    padding-bottom: 25px;
    border-bottom: 1px solid #e5e7eb; /* The requested line */
  }

  /* Remove the line from the last section to avoid it looking "dangling" at the bottom */
  .section:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .section-title {
    font-size: 14px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #111 !important;
    border-left: 4px solid #3b82f6; /* Modern Blue Accent */
    padding-left: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }

  .summary-text {
    font-size: 11px;
    line-height: 1.6;
    color: #444 !important;
  }

  /* --- EXPERIENCE & EDUCATION ITEMS --- */
  .entry-item {
    margin-bottom: 20px;
  }
  /* Tighter spacing for the last item in a list */
  .entry-item:last-child {
    margin-bottom: 0;
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
    color: #000 !important;
  }

  .entry-date {
    font-size: 11px;
    font-weight: 600;
    color: #666 !important;
    white-space: nowrap;
  }

  .entry-subtitle {
    font-size: 12px;
    font-weight: 500;
    color: #3b82f6 !important; /* Blue accent for company/school */
    margin-bottom: 6px;
  }

  .entry-description {
    font-size: 11px;
    line-height: 1.5;
    color: #555 !important;
  }
  
  .entry-description span {
    color: #555 !important;
  }
  
  .entry-description strong {
    color: #000 !important;
  }
  
  .entry-description ul {
    margin: 0;
    padding-left: 16px;
  }
  .entry-description li {
    margin-bottom: 4px;
    color: #555 !important;
  }

  /* --- SKILLS GRID (ATS Friendly) --- */
  .skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .skill-tag {
    font-size: 10px;
    font-weight: 600;
    color: #333 !important;
    border: 1px solid #ddd;
    padding: 4px 8px;
    border-radius: 2px;
    background: #fafafa !important;
  }

  /* --- CERTIFICATES & PROJECTS (Compact) --- */
  .compact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .compact-item {
    border-left: 2px solid #eee;
    padding-left: 12px;
  }
`;

export const T12 = ({ jsonData }) => {
  // --- DATA PREPARATION ---
  const { contactInfo, skills, workExperience, education, Description, certificates, projects } = jsonData || {};

  // Skills: Combine and clean
  const hardSkills = skills?.hardSkills ? skills.hardSkills.split(',').map(s => s.trim()).filter(s => s) : [];
  const softSkills = skills?.softSkills ? skills.softSkills.split(',').map(s => s.trim()).filter(s => s) : [];
  const allSkills = [...hardSkills, ...softSkills];

  return (
    <StyledWrapper>
      <div className="resume-container" id="capture-content">

        {/* HEADER */}
        <div className="header">
          <div className="header-top">
            <div className="name-block">
              <h1 className="full-name">{contactInfo?.fullName || 'Firstname Lastname'}</h1>
              <div className="job-title">{contactInfo?.jobTitle || 'Job Title'}</div>
            </div>
          </div>

          <div className="contact-bar">
            {contactInfo?.emailAddress && (
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <a href={`mailto:${contactInfo.emailAddress}`}>{contactInfo.emailAddress}</a>
              </div>
            )}
            {contactInfo?.phoneNumber && (
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>{contactInfo.phoneNumber}</span>
              </div>
            )}
            {contactInfo?.linkedin && (
              <div className="contact-item">
                <i className="fab fa-linkedin"></i>
                <a href={`https://linkedin.com/in/${contactInfo.linkedin}`} target="_blank" rel="noreferrer">
                  {contactInfo.linkedin}
                </a>
              </div>
            )}
            {contactInfo?.Location && (
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{contactInfo.Location}</span>
              </div>
            )}
            {contactInfo?.portfolio && (
              <div className="contact-item">
                <i className="fas fa-globe"></i>
                <a href={contactInfo.portfolio} target="_blank" rel="noreferrer">
                  {contactInfo.portfolio.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* SUMMARY */}
        {Description?.UserDescription && (
          <div className="section">
            <div className="section-title">Professional Summary</div>
            <div className="summary-text">
              {Description.UserDescription}
            </div>
          </div>
        )}

        {/* SKILLS */}
        {allSkills.length > 0 && (
          <div className="section">
            <div className="section-title">Technical Skills</div>
            <div className="skills-grid">
              {allSkills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* EXPERIENCE */}
        {workExperience?.length > 0 && (
          <div className="section">
            <div className="section-title">Experience</div>
            {workExperience.map((job, index) => (
              <div key={index} className="entry-item">
                <div className="entry-header">
                  <span className="entry-title">{job.jobTitle}</span>
                  <span className="entry-date">{job.WorkDuration}</span>
                </div>
                <div className="entry-subtitle">{job.companyName}</div>
                <div className="entry-description">
                  <span dangerouslySetInnerHTML={{ __html: parseMarkdown(job.keyAchievements) }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROJECTS */}
        {projects && projects.length > 0 && (
          <div className="section">
            <div className="section-title">Key Projects</div>
            <div className="compact-grid">
              {projects.map((proj, index) => (
                <div key={index} className="compact-item">
                  <div className="entry-header">
                    <span className="entry-title">{proj.projectTitle}</span>
                  </div>
                  <div className="entry-description" style={{ fontSize: '10px' }}>
                    <span dangerouslySetInnerHTML={{ __html: parseMarkdown(proj.toolsTechUsed) }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDUCATION */}
        {education && education.length > 0 && (
          <div className="section">
            <div className="section-title">Education</div>
            {education.map((edu, index) => (
              <div key={index} className="entry-item">
                <div className="entry-header">
                  <span className="entry-title">{edu.degreeName}</span>
                  <span className="entry-date">{edu.graduationYear}</span>
                </div>
                <div className="entry-subtitle">{edu.institutionName}</div>
              </div>
            ))}
          </div>
        )}

        {/* CERTIFICATIONS */}
        {certificates && certificates.length > 0 && (
          <div className="section">
            <div className="section-title">Certifications</div>
            <div className="compact-grid">
              {certificates.map((cert, index) => (
                <div key={index} className="compact-item" style={{ borderLeftColor: '#333' }}>
                  <div className="entry-title" style={{ fontSize: '11px' }}>{cert.certificateName}</div>
                  <div className="entry-date" style={{ fontSize: '10px' }}>{cert.providerName}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </StyledWrapper>
  );
};

export const T12Css = `
@media print {
  @page {
    size: A4;
    margin: 0;
  }
  body {
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    background-color: white !important;
  }
  .resume-container {
    width: 210mm !important;
    min-height: 297mm !important;
    box-shadow: none !important;
    border: none !important;
    margin: 0 !important;
    padding: 40px 50px !important; 
  }
}

body {
  font-family: 'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif;
  background-color: #e5e7eb;
}

.resume-container {
  width: 210mm;
  min-height: 297mm;
  background: white;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  padding: 40px 50px;
  box-sizing: border-box;
  margin: 20px auto;
  position: relative;
  overflow: hidden;
}

.header {
  margin-bottom: 30px;
  border-bottom: 3px solid #333;
  padding-bottom: 25px;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.full-name {
  font-size: 32px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  color: #111;
  margin: 0;
  line-height: 1;
}

.job-title {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  color: #555;
  letter-spacing: 2px;
  margin-top: 8px;
}

.contact-bar {
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 11px;
  color: #444;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f3f4f6;
  padding: 4px 10px;
  border-radius: 4px;
}

.contact-item a {
  color: #444;
  text-decoration: none;
  font-weight: 500;
}

.section {
  margin-bottom: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid #e5e7eb;
}

.section:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-title {
  font-size: 14px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #111;
  border-left: 4px solid #3b82f6;
  padding-left: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.summary-text {
  font-size: 11px;
  line-height: 1.6;
  color: #444;
}

.entry-item {
  margin-bottom: 20px;
}
.entry-item:last-child {
  margin-bottom: 0;
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
  color: #000;
}

.entry-date {
  font-size: 11px;
  font-weight: 600;
  color: #666;
  white-space: nowrap;
}

.entry-subtitle {
  font-size: 12px;
  font-weight: 500;
  color: #3b82f6;
  margin-bottom: 6px;
}

.entry-description {
  font-size: 11px;
  line-height: 1.5;
  color: #555;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  font-size: 10px;
  font-weight: 600;
  color: #333;
  border: 1px solid #ddd;
  padding: 4px 8px;
  border-radius: 2px;
  background: #fafafa;
}

.compact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.compact-item {
  border-left: 2px solid #eee;
  padding-left: 12px;
}
`;
