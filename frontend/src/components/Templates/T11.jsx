import React from 'react';
import styled from "styled-components";

// Utility to parse bold/italic markdown from text fields
const parseMarkdown = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
};

const StyledWrapper = styled.div`
  /* --- PRINT CONFIGURATION --- */
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
      width: 210mm;
      min-height: 297mm;
      box-shadow: none !important;
      margin: 0 !important;
      page-break-after: always;
    }
  }

  /* --- WEB PREVIEW CONFIGURATION --- */
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  padding: 20px 0;

  .resume-container {
    width: 210mm;
    min-height: 297mm;
    background: white;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    display: flex;
    position: relative;
    overflow: hidden;
  }

  /* --- LEFT SIDEBAR (Dark Theme) --- */
  .sidebar {
    width: 32%; /* Approx 67mm */
    background-color: #1a2530 !important; /* Deep Slate */
    color: #ecf0f1 !important;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid #111;
  }

  /* Profile Photo */
  .profile-container {
    width: 120px;
    height: 120px;
    margin-bottom: 25px;
    border: 4px solid rgba(255,255,255,0.1);
    border-radius: 50%;
    overflow: hidden;
    background: #fff !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .profile-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .profile-placeholder {
    font-size: 50px;
    color: #ccc !important;
  }

  /* Sidebar Sections */
  .sidebar-section {
    width: 100%;
    margin-bottom: 30px;
  }

  .sidebar-title {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 700;
    color: #3498db !important; /* Accent Blue */
    border-bottom: 1px solid rgba(255,255,255,0.2);
    padding-bottom: 8px;
    margin-bottom: 15px;
  }

  /* Contact Info */
  .contact-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-size: 11px;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #bdc3c7 !important;
    word-break: break-all;
  }

  .contact-item i {
    width: 15px;
    color: #3498db !important;
    text-align: center;
  }
  
  .contact-item a {
    color: #bdc3c7 !important;
    text-decoration: none;
    transition: 0.2s;
  }
  
  .contact-item span {
    color: #bdc3c7 !important;
  }

  /* Skills (Chips) */
  .skills-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .skill-chip {
    background: rgba(255,255,255,0.1) !important;
    color: #ecf0f1 !important;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 500;
  }

  /* Languages (Progress Bars) */
  .lang-item {
    margin-bottom: 10px;
  }
  .lang-name {
    font-size: 11px;
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    color: #ecf0f1 !important;
  }
  .lang-name span {
    color: #ecf0f1 !important;
  }
  .progress-bg {
    width: 100%;
    height: 4px;
    background: rgba(255,255,255,0.1) !important;
    border-radius: 2px;
  }
  .progress-fill {
    height: 100%;
    background: #3498db !important;
    border-radius: 2px;
  }

  /* --- RIGHT MAIN CONTENT --- */
  .main-content {
    flex: 1;
    padding: 40px;
    background-color: #ffffff !important;
    color: #2c3e50 !important;
  }

  /* Header Section */
  .header-section {
    margin-bottom: 35px;
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 20px;
  }

  .full-name {
    font-size: 32px;
    font-weight: 800;
    text-transform: uppercase;
    color: #2c3e50 !important;
    letter-spacing: 1px;
    margin: 0;
    line-height: 1.2;
  }

  .job-role {
    font-size: 16px;
    color: #3498db !important;
    font-weight: 600;
    margin-top: 5px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .summary {
    margin-top: 15px;
    font-size: 11px;
    line-height: 1.6;
    color: #555 !important;
    text-align: justify;
  }

  /* Main Sections */
  .main-section {
    margin-bottom: 25px;
  }

  .main-title {
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #2c3e50 !important;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
  }

  .main-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e0e0e0;
    margin-left: 15px;
  }

  /* Experience Item */
  .exp-item {
    margin-bottom: 20px;
    position: relative;
    padding-left: 15px;
    border-left: 2px solid #f0f0f0;
  }

  .exp-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 4px;
  }

  .exp-role {
    font-size: 13px;
    font-weight: 700;
    color: #2c3e50 !important;
  }

  .exp-date {
    font-size: 11px;
    font-weight: 600;
    color: #3498db !important;
    background: #f0f8ff !important;
    padding: 2px 6px;
    border-radius: 4px;
  }

  .exp-company {
    font-size: 12px;
    font-style: italic;
    color: #7f8c8d !important;
    margin-bottom: 8px;
    display: block;
  }

  .exp-desc {
    font-size: 11px;
    line-height: 1.5;
    color: #444 !important;
  }
  
  .exp-desc span {
    color: #444 !important;
  }
  
  .exp-desc strong {
    color: #2c3e50 !important;
  }

  .exp-desc ul {
    margin: 0;
    padding-left: 15px;
  }
  .exp-desc li {
    margin-bottom: 3px;
    color: #444 !important;
  }

  /* Education Item */
  .edu-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    border-bottom: 1px dashed #eee;
    padding-bottom: 8px;
  }
  .edu-item:last-child { border-bottom: none; }

  .edu-details {
    display: flex;
    flex-direction: column;
  }

  .edu-degree {
    font-size: 12px;
    font-weight: 700;
    color: #2c3e50 !important;
  }
  .edu-school {
    font-size: 11px;
    color: #7f8c8d !important;
  }
  .edu-year {
    font-size: 11px;
    font-weight: 600;
    color: #3498db !important;
  }

  /* Certificates */
  .cert-item {
    font-size: 11px;
    color: #444 !important;
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
  }
  .cert-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .cert-title {
    font-weight: 700;
    color: #2c3e50 !important;
  }
  .cert-issuer {
    color: #7f8c8d !important;
    font-style: italic;
  }

  /* Project Item (New) */
  .project-item {
    margin-bottom: 15px;
    padding-left: 15px;
    border-left: 2px solid #f0f0f0;
  }
  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }
  .project-title {
    font-size: 13px;
    font-weight: 700;
    color: #2c3e50 !important;
  }
  .project-link {
    font-size: 10px;
    color: #3498db !important;
    text-decoration: none;
    margin-left: 8px;
  }
  .project-desc {
    font-size: 11px;
    line-height: 1.5;
    color: #444 !important;
  }
  .project-desc span {
    color: #444 !important;
  }
  .project-desc strong {
    color: #2c3e50 !important;
  }
`;

export const T11 = ({ jsonData }) => {
  // Data Extraction with safety checks
  const { contactInfo, skills, workExperience, education, Description, certificates, projects } = jsonData || {};

  const hardSkills = skills?.hardSkills ? skills.hardSkills.split(',').map(s => s.trim()).filter(s => s) : [];
  const softSkills = skills?.softSkills ? skills.softSkills.split(',').map(s => s.trim()).filter(s => s) : [];
  const allSkills = [...hardSkills, ...softSkills];

  const languages = contactInfo?.Languages ? contactInfo.Languages.split(',').map(l => l.trim()).filter(l => l) : ['English'];

  return (
    <StyledWrapper>
      <div className="resume-container" id="capture-content">

        {/* --- LEFT SIDEBAR --- */}
        <div className="sidebar">
          {/* Profile Photo */}
          <div className="profile-container">
            {contactInfo?.profileImage ? (
              <img src={contactInfo.profileImage} alt="Profile" />
            ) : (
              <i className="fas fa-user profile-placeholder"></i>
            )}
          </div>

          {/* Contact Info */}
          <div className="sidebar-section">
            <div className="sidebar-title">Contact</div>
            <div className="contact-list">
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
              {contactInfo?.Location && (
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{contactInfo.Location}</span>
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

          {/* Skills Section */}
          {(allSkills.length > 0) && (
            <div className="sidebar-section">
              <div className="sidebar-title">Expertise</div>
              <div className="skills-wrap">
                {allSkills.map((skill, index) => (
                  <span key={index} className="skill-chip">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Languages Section */}
          <div className="sidebar-section">
            <div className="sidebar-title">Languages</div>
            {languages.map((lang, index) => (
              <div key={index} className="lang-item">
                <div className="lang-name">
                  <span>{lang}</span>
                </div>
                <div className="progress-bg">
                  <div className="progress-fill" style={{ width: '90%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT MAIN CONTENT --- */}
        <div className="main-content">

          {/* Header */}
          <div className="header-section">
            <h1 className="full-name">{contactInfo?.fullName || 'Your Name'}</h1>
            <div className="job-role">{contactInfo?.jobTitle || 'Professional Title'}</div>
            {Description?.UserDescription && (
              <div className="summary">
                {Description.UserDescription}
              </div>
            )}
          </div>

          {/* Work Experience */}
          {workExperience?.length > 0 && (
            <div className="main-section">
              <div className="main-title">Professional Experience</div>
              {workExperience.map((job, index) => (
                <div key={index} className="exp-item">
                  <div className="exp-header">
                    <span className="exp-role">{job.jobTitle}</span>
                    <span className="exp-date">{job.WorkDuration}</span>
                  </div>
                  <span className="exp-company">{job.companyName}</span>
                  <div className="exp-desc">
                    <span dangerouslySetInnerHTML={{ __html: parseMarkdown(job.keyAchievements) }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects Section */}
          {projects && projects.length > 0 && (
            <div className="main-section">
              <div className="main-title">Projects</div>
              {projects.map((proj, index) => (
                <div key={index} className="project-item">
                  <div className="project-header">
                    <span className="project-title">{proj.projectTitle}</span>
                  </div>
                  <div className="project-desc">
                    <span dangerouslySetInnerHTML={{ __html: parseMarkdown(proj.toolsTechUsed) }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <div className="main-section">
              <div className="main-title">Education</div>
              {education.map((edu, index) => (
                <div key={index} className="edu-item">
                  <div className="edu-details">
                    <span className="edu-degree">{edu.degreeName}</span>
                    <span className="edu-school">{edu.institutionName}</span>
                  </div>
                  <span className="edu-year">{edu.graduationYear}</span>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certificates && certificates.length > 0 && (
            <div className="main-section">
              <div className="main-title">Certifications</div>
              {certificates.map((cert, index) => (
                <div key={index} className="cert-item">
                  <div className="cert-header">
                    <span className="cert-title">{cert.certificateName}</span>
                    {cert.courseDuration && <span className="edu-year">{cert.courseDuration}</span>}
                  </div>
                  {cert.providerName && <span className="cert-issuer">{cert.providerName}</span>}
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </StyledWrapper>
  );
};

export const T11Css = `
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
    margin: 0 !important;
    page-break-after: always;
  }
}

body {
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  background-color: #f0f2f5;
}

.resume-container {
  width: 210mm;
  min-height: 297mm;
  background: white;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  display: flex;
  margin: 20px auto;
  position: relative;
  overflow: hidden;
}

/* Sidebar */
.sidebar {
  width: 32%;
  background-color: #1a2530;
  color: #ecf0f1;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #111;
}

.profile-container {
  width: 120px;
  height: 120px;
  margin-bottom: 25px;
  border: 4px solid rgba(255,255,255,0.1);
  border-radius: 50%;
  overflow: hidden;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sidebar-section {
  width: 100%;
  margin-bottom: 30px;
}

.sidebar-title {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
  color: #3498db;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  padding-bottom: 8px;
  margin-bottom: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #bdc3c7;
  font-size: 11px;
  margin-bottom: 10px;
  word-break: break-all;
}
.contact-item i {
  color: #3498db;
  width: 15px;
  text-align: center;
}
.contact-item a {
  color: #bdc3c7;
  text-decoration: none;
}

.skill-chip {
  background: rgba(255,255,255,0.1);
  color: #ecf0f1;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  margin: 0 4px 4px 0;
  display: inline-block;
}

.lang-item {
  margin-bottom: 10px;
}
.lang-name {
  font-size: 11px;
  margin-bottom: 4px;
  display: block;
  color: #ecf0f1;
}
.progress-bg {
  width: 100%;
  height: 4px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
}
.progress-fill {
  height: 100%;
  background: #3498db;
  border-radius: 2px;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 40px;
  background-color: #ffffff;
  color: #2c3e50;
}

.header-section {
  margin-bottom: 35px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 20px;
}

.full-name {
  font-size: 32px;
  font-weight: 800;
  text-transform: uppercase;
  color: #2c3e50;
  margin: 0;
  line-height: 1.2;
}

.job-role {
  font-size: 16px;
  color: #3498db;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 5px;
}

.summary {
  margin-top: 15px;
  font-size: 11px;
  line-height: 1.6;
  color: #555;
  text-align: justify;
}

.main-title {
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #2c3e50;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.main-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e0e0e0;
  margin-left: 15px;
}

.exp-item {
  margin-bottom: 20px;
  padding-left: 15px;
  border-left: 2px solid #f0f0f0;
}

.exp-role {
  font-size: 13px;
  font-weight: 700;
  color: #2c3e50;
  display: block;
}

.exp-date {
  font-size: 11px;
  font-weight: 600;
  color: #3498db;
  background: #f0f8ff;
  padding: 2px 6px;
  border-radius: 4px;
  margin-top: 4px;
  display: inline-block;
}

.exp-company {
  font-size: 12px;
  font-style: italic;
  color: #7f8c8d;
  margin: 4px 0 8px 0;
  display: block;
}

.exp-desc {
  font-size: 11px;
  line-height: 1.5;
  color: #444;
}

.edu-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  border-bottom: 1px dashed #eee;
  padding-bottom: 8px;
}

.edu-degree {
  font-size: 12px;
  font-weight: 700;
  color: #2c3e50;
  display: block;
}
.edu-school {
  font-size: 11px;
  color: #7f8c8d;
}
.edu-year {
  font-size: 11px;
  font-weight: 600;
  color: #3498db;
}

.cert-item {
  font-size: 11px;
  color: #444;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
}
.cert-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.cert-title {
  font-weight: 700;
  color: #2c3e50;
}
.cert-issuer {
  color: #7f8c8d;
  font-style: italic;
}

/* Projects */
.project-item {
  margin-bottom: 15px;
  padding-left: 15px;
  border-left: 2px solid #f0f0f0;
}
.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}
.project-title {
  font-size: 13px;
  font-weight: 700;
  color: #2c3e50;
}
.project-link {
  font-size: 10px;
  color: #3498db;
  text-decoration: none;
  margin-left: 8px;
}
.project-desc {
  font-size: 11px;
  line-height: 1.5;
  color: #444;
}
`;
