import React from 'react';
import styled from "styled-components";

// --- Helper Functions ---
const parseMarkdown = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
};

const removeSpace = (str) => str ? str.trim() : '';

// --- Styled Components ---
const StyledWrapper = styled.div`
  /* Screen Preview Settings - Minimal styling to avoid PDF capture issues */
  display: flex;
  justify-content: center;
  font-family: 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif;

  /* Remove wrapper styling for print/PDF */
  @media print {
    background: none !important;
    background-color: transparent !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  .resume-container {
    width: 210mm;
    min-height: 297mm;
    background: white;
    display: flex;
    overflow: hidden;
  }

  /* --- LEFT COLUMN (Sidebar) --- */
  .left-col {
    width: 32%;
    background-color: #2c3e50; /* Dark Slate Blue */
    color: #ecf0f1;
    display: flex;
    flex-direction: column;
    padding: 30px 20px;
    text-align: left;
  }

  .profile-img-container {
    width: 120px;
    height: 120px;
    margin: 0 auto 20px auto;
    border: 4px solid rgba(255,255,255,0.2);
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
  }

  .profile-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .sidebar-section {
    width: 100%;
    margin-bottom: 18px;
  }

  .sidebar-title {
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border-bottom: 1px solid rgba(255,255,255,0.3);
    padding-bottom: 6px;
    margin-bottom: 10px;
    font-weight: 700;
    color: #fff;
  }

  /* Contact Items */
  .contact-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 11px;
    margin-bottom: 8px;
    word-break: break-all;
    line-height: 1.3;
    color: #bdc3c7;
  }
  
  .contact-item i {
    color: #3498db; /* Accent Blue */
    width: 16px;
    margin-top: 2px;
  }
  
  .contact-item a {
    color: inherit;
    text-decoration: none;
  }

  /* Education in Sidebar */
  .edu-block {
    margin-bottom: 12px;
    font-size: 11px;
  }
  
  .edu-year {
    color: #3498db;
    font-weight: 700;
    font-size: 11px;
    margin-bottom: 2px;
  }
  
  .edu-school {
    font-weight: 600;
    color: #fff;
  }
  
  .edu-degree {
    font-style: italic;
    color: #bdc3c7;
    margin-bottom: 2px;
  }
  
  .edu-cgpa {
     color: #95a5a6;
     font-size: 11px;
  }

  /* Sidebar Lists (Languages/Soft Skills) */
  .sidebar-list {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 12px;
  }
  
  .sidebar-list li {
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
    color: #bdc3c7;
  }

  .bullet-point {
    width: 4px;
    height: 4px;
    background: #3498db;
    border-radius: 50%;
  }

  /* --- RIGHT COLUMN (Main) --- */
  .right-col {
    width: 68%;
    padding: 30px 25px;
    background-color: #ffffff;
    color: #333;
    display: flex;
    flex-direction: column;
  }

  /* Header */
  .header-name {
    font-size: 34px;
    font-weight: 800;
    text-transform: uppercase;
    color: #2c3e50;
    margin: 0;
    line-height: 1;
    letter-spacing: -1px;
  }

  .header-role {
    font-size: 16px;
    color: #3498db; /* Accent Blue */
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-top: 6px;
    margin-bottom: 20px;
    font-weight: 600;
  }

  /* Main Sections */
  .main-section {
    margin-bottom: 18px;
  }

  .main-title {
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    color: #2c3e50;
    border-bottom: 2px solid #ecf0f1;
    padding-bottom: 5px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .main-title i {
    color: #3498db;
    font-size: 14px;
  }

  .summary-text {
    font-size: 12px;
    line-height: 1.6;
    color: #555;
    text-align: justify;
  }

  /* Experience & Projects Items */
  .entry-block {
    margin-bottom: 14px;
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

  .entry-date {
    font-size: 11px;
    font-weight: 600;
    color: #3498db;
    white-space: nowrap;
  }

  .entry-subtitle {
    font-size: 11px;
    font-style: italic;
    color: #7f8c8d;
    margin-bottom: 4px;
  }

  .entry-content {
    font-size: 10px;
    line-height: 1.4;
    color: #444;
  }

  .entry-content ul {
    margin: 4px 0 0 0;
    padding-left: 18px;
  }
  
  .entry-content li {
    margin-bottom: 3px;
  }

  /* Skills Pills */
  .skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .skill-pill {
    background: #f1f5f9;
    color: #2c3e50;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    border: 1px solid #e2e8f0;
  }

  /* Print Styles injected via Styled Components */
  @media print {
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .resume-container {
      box-shadow: none;
      margin: 0;
      width: 100%;
    }
  }
`;

// --- Main Component ---
export const T4 = ({ jsonData }) => {
  // Safe Accessors with defaults
  const contact = jsonData?.contactInfo || {};
  const education = jsonData?.education || [];
  const skills = jsonData?.skills || {};
  const projects = jsonData?.projects || [];
  const experience = jsonData?.workExperience || [];
  const certificates = jsonData?.certificates || [];
  const description = jsonData?.Description?.UserDescription || '';

  // Process Arrays
  const hardSkills = (skills.hardSkills || '').split(',').filter(s => s.trim());
  const softSkills = (skills.softSkills || '').split(',').filter(s => s.trim());
  const languages = (contact.Languages || '').split(',').filter(s => s.trim());

  return (
    <StyledWrapper>
      <div className="resume-container" id="capture-content">

        {/* --- LEFT SIDEBAR --- */}
        <div className="left-col">
          {/* Profile Image */}
          <div className="profile-img-container">
            <img
              src={contact.profileImage || "https://www.skibalawchicago.com/wp-content/uploads/2024/06/profile-placeholder.jpg"}
              alt="Profile"
              className="profile-img"
            />
          </div>

          {/* Contact Info */}
          <div className="sidebar-section">
            <div className="sidebar-title">Contact</div>
            {contact.phoneNumber && (
              <div className="contact-item">
                <i className="fas fa-phone"></i> {contact.phoneNumber}
              </div>
            )}
            {contact.emailAddress && (
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <a href={`mailto:${contact.emailAddress}`}>{contact.emailAddress}</a>
              </div>
            )}
            {contact.Location && (
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i> {contact.Location}
              </div>
            )}
            {contact.linkedin && (
              <div className="contact-item">
                <i className="fab fa-linkedin"></i>
                <a href={`https://linkedin.com/in/${contact.linkedin}`} target="_blank" rel="noreferrer">LinkedIn</a>
              </div>
            )}
            {contact.portfolio && (
              <div className="contact-item">
                <i className="fas fa-globe"></i>
                <a href={contact.portfolio} target="_blank" rel="noreferrer">Portfolio</a>
              </div>
            )}
          </div>

          {/* Education */}
          {education.length > 0 && (
            <div className="sidebar-section">
              <div className="sidebar-title">Education</div>
              {education.slice(0, 3).map((edu, index) => (
                <div key={index} className="edu-block">
                  <div className="edu-year">{edu.graduationYear}</div>
                  <div className="edu-school">{edu.institutionName}</div>
                  <div className="edu-degree">{edu.degreeName}</div>
                  {edu.currentCGPA && <div className="edu-cgpa">CGPA: {edu.currentCGPA}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="sidebar-section">
              <div className="sidebar-title">Languages</div>
              <ul className="sidebar-list">
                {languages.map((lang, idx) => (
                  <li key={idx}><span className="bullet-point"></span>{removeSpace(lang)}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Soft Skills */}
          {softSkills.length > 0 && (
            <div className="sidebar-section">
              <div className="sidebar-title">Soft Skills</div>
              <ul className="sidebar-list">
                {softSkills.slice(0, 5).map((skill, idx) => (
                  <li key={idx}><span className="bullet-point"></span>{removeSpace(skill)}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* --- RIGHT MAIN CONTENT --- */}
        <div className="right-col">

          {/* Header */}
          <h1 className="header-name">{contact.fullName || 'Your Name'}</h1>
          <div className="header-role">{contact.jobTitle || 'Job Role'}</div>

          {/* Profile Summary */}
          {description && (
            <div className="main-section">
              <div className="main-title"><i className="fas fa-user"></i> Profile</div>
              <p className="summary-text">{description}</p>
            </div>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <div className="main-section">
              <div className="main-title"><i className="fas fa-briefcase"></i> Experience</div>
              {experience.slice(0, 3).map((exp, idx) => (
                <div key={idx} className="entry-block">
                  <div className="entry-header">
                    <span className="entry-title">{exp.jobTitle}</span>
                    <span className="entry-date">{exp.WorkDuration}</span>
                  </div>
                  <div className="entry-subtitle">{exp.companyName} {exp.Location ? `| ${exp.Location}` : ''}</div>
                  <div className="entry-content" dangerouslySetInnerHTML={{ __html: parseMarkdown(exp.keyAchievements) }} />
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="main-section">
              <div className="main-title"><i className="fas fa-code"></i> Projects</div>
              {projects.slice(0, 3).map((proj, idx) => (
                <div key={idx} className="entry-block">
                  <div className="entry-header">
                    <span className="entry-title">{proj.projectTitle}</span>
                    {proj.duration && <span className="entry-date">{proj.duration}</span>}
                  </div>
                  <div className="entry-content">
                    {proj.toolsTechUsed && (
                      <div dangerouslySetInnerHTML={{ __html: parseMarkdown(proj.toolsTechUsed) }} />
                    )}
                    <div style={{ marginTop: '4px' }}>{proj.projectDescription}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certificates */}
          {certificates.length > 0 && (
            <div className="main-section">
              <div className="main-title"><i className="fas fa-certificate"></i> Certificates</div>
              {certificates.slice(0, 2).map((cert, idx) => (
                <div key={idx} className="entry-block" style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: '700', fontSize: '13px', color: '#2c3e50' }}>{cert.certificateName}</div>
                  <div style={{ fontSize: '11px', color: '#666' }}>
                    {cert.providerName} {cert.courseDuration ? `(${cert.courseDuration})` : ''}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Technical Skills */}
          {hardSkills.length > 0 && (
            <div className="main-section">
              <div className="main-title"><i className="fas fa-laptop-code"></i> Technical Skills</div>
              <div className="skills-grid">
                {hardSkills.map((skill, idx) => (
                  <span key={idx} className="skill-pill">{removeSpace(skill)}</span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </StyledWrapper>
  );
};

// --- CSS Export (For Printing/PDF generators that need raw CSS string) ---
export const T4Css = `
/* Reset wrapper and body styles for PDF */
html, body {
  margin: 0 !important;
  padding: 0 !important;
  background: white !important;
  width: 210mm !important;
  min-height: 297mm !important;
}

/* Remove any wrapper div styling */
body > div {
  background: none !important;
  background-color: transparent !important;
  padding: 0 !important;
  margin: 0 !important;
}

/* Font Awesome Icons */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

/* Screen Styles */
.resume-container {
  width: 210mm;
  min-height: 297mm;
  background: white;
  display: flex;
  overflow: hidden;
  margin: 0 !important;
  font-family: 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif;
}

/* LEFT COLUMN */
.left-col {
  width: 32%;
  background-color: #2c3e50;
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  text-align: left;
}

.profile-img-container {
  width: 120px;
  height: 120px;
  margin: 0 auto 20px auto;
  border: 4px solid rgba(255,255,255,0.2);
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sidebar-section {
  width: 100%;
  margin-bottom: 18px;
}

.sidebar-title {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border-bottom: 1px solid rgba(255,255,255,0.3);
  padding-bottom: 6px;
  margin-bottom: 10px;
  font-weight: 700;
  color: #fff;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 11px;
  margin-bottom: 8px;
  word-break: break-all;
  line-height: 1.3;
  color: #bdc3c7;
}

.contact-item i {
  color: #3498db;
  width: 16px;
  margin-top: 2px;
}

.contact-item a {
  color: inherit;
  text-decoration: none;
}

.edu-block {
  margin-bottom: 12px;
  font-size: 11px;
}

.edu-year {
  color: #3498db;
  font-weight: 700;
  font-size: 11px;
  margin-bottom: 2px;
}

.edu-school {
  font-weight: 600;
  color: #fff;
}

.edu-degree {
  font-style: italic;
  color: #bdc3c7;
  margin-bottom: 2px;
}

.edu-cgpa {
  color: #95a5a6;
  font-size: 11px;
}

.sidebar-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 12px;
}

.sidebar-list li {
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #bdc3c7;
}

.bullet-point {
  width: 4px;
  height: 4px;
  background: #3498db;
  border-radius: 50%;
}

/* RIGHT COLUMN */
.right-col {
  width: 68%;
  padding: 30px 25px;
  background-color: #ffffff;
  color: #333;
  display: flex;
  flex-direction: column;
}

.header-name {
  font-size: 34px;
  font-weight: 800;
  text-transform: uppercase;
  color: #2c3e50;
  margin: 0;
  line-height: 1;
  letter-spacing: -1px;
}

.header-role {
  font-size: 16px;
  color: #3498db;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 6px;
  margin-bottom: 20px;
  font-weight: 600;
}

.main-section {
  margin-bottom: 18px;
}

.main-title {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  color: #2c3e50;
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 5px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.main-title i {
  color: #3498db;
  font-size: 14px;
}

.summary-text {
  font-size: 12px;
  line-height: 1.6;
  color: #555;
  text-align: justify;
}

.entry-block {
  margin-bottom: 14px;
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

.entry-date {
  font-size: 11px;
  font-weight: 600;
  color: #3498db;
  white-space: nowrap;
}

.entry-subtitle {
  font-size: 11px;
  font-style: italic;
  color: #7f8c8d;
  margin-bottom: 4px;
}

.entry-content {
  font-size: 10px;
  line-height: 1.4;
  color: #444;
}

.entry-content ul {
  margin: 4px 0 0 0;
  padding-left: 18px;
}

.entry-content li {
  margin-bottom: 3px;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-pill {
  background: #f1f5f9;
  color: #2c3e50;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  border: 1px solid #e2e8f0;
}

/* Print Styles */
@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  @page {
    size: A4 portrait;
    margin: 0;
  }

  body {
    margin: 0;
    padding: 0;
    background: white;
  }

  .resume-container {
    width: 210mm !important;
    min-height: 297mm !important;
    max-height: 297mm !important;
    margin: 0 !important;
    box-shadow: none !important;
    border: none !important;
    display: flex !important;
    overflow: hidden !important;
    page-break-after: avoid !important;
    page-break-inside: avoid !important;
  }

  .left-col {
    width: 32% !important;
    background-color: #2c3e50 !important;
    color: #ecf0f1 !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    display: flex !important;
    flex-direction: column !important;
    padding: 30px 20px !important;
  }

  .right-col {
    width: 68% !important;
    background-color: #ffffff !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    display: flex !important;
    flex-direction: column !important;
    padding: 40px 35px !important;
  }
  
  .skill-pill {
    background-color: #f1f5f9 !important;
    border: 1px solid #e2e8f0 !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  
  .sidebar-title, .main-title {
     -webkit-print-color-adjust: exact !important;
     print-color-adjust: exact !important;
  }

  .profile-img-container {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
`;