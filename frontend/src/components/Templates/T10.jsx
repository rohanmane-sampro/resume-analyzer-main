import React from 'react';
import styled from "styled-components";

// --- Helper: Markdown Parser ---
const parseMarkdown = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
};

// --- Styled Components ---

const PageWrapper = styled.div`
  /* Print Optimization */
  @media print {
    body { 
      -webkit-print-color-adjust: exact; 
      print-color-adjust: exact; 
    }
    @page { 
      size: A4; 
      margin: 0; 
    }
    .resume-page {
      width: 100%;
      height: 100%;
      margin: 0;
      border: none;
      box-shadow: none;
    }
  }

  /* Screen Display */
  background: #e0e0e0;
  padding: 20px;
  font-family: 'Roboto', 'Segoe UI', Helvetica, sans-serif;

  .resume-page {
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    background: white;
    box-shadow: 0 0 15px rgba(0,0,0,0.1);
    display: grid;
    grid-template-columns: 32% 68%; /* Sidebar vs Main Content Split */
  }
`;

const LeftColumn = styled.div`
  background-color: #2c3e50 !important; /* Professional Dark Slate */
  color: white !important;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 25px;

  /* Maximum strength - override everything */
  &&& {
    color: white !important;
  }

  /* Ensure all text is white - strongest enforcement */
  *, *::before, *::after {
    color: white !important;
  }

  /* Specific targeting for all headings with multiple selectors */
  h1, h2, h3, h4, h5, h6,
  & h1, & h2, & h3, & h4, & h5, & h6 {
    color: #ecf0f1 !important;
  }

  /* Triple ampersand for maximum specificity */
  &&& h3 {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border-bottom: 1px solid rgba(255,255,255,0.3);
    padding-bottom: 8px;
    margin-bottom: 15px;
    color: #ecf0f1 !important;
  }

  h3 {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border-bottom: 1px solid rgba(255,255,255,0.3);
    padding-bottom: 8px;
    margin-bottom: 15px;
    color: #ecf0f1 !important;
  }

  /* All divs inside should have white text */
  div, span, p, a, li, ul,
  & div, & span, & p, & a, & li, & ul {
    color: white !important;
  }

  .left-item {
    margin-bottom: 15px;
  }

  .left-title {
    font-weight: bold;
    font-size: 13px;
    color: #fff !important;
  }

  .left-subtitle {
    font-size: 11px;
    color: #bdc3c7 !important; /* Light Grey */
    font-style: italic;
    margin-bottom: 2px;
  }

  .left-date {
    font-size: 10px;
    color: #95a5a6 !important;
  }

  .contact-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    margin-bottom: 8px;
    color: #ecf0f1 !important;
    word-break: break-all;
  }
  
  .contact-row a {
    color: #fff !important;
    text-decoration: none;
  }

  .skill-tag {
    display: inline-block;
    background: rgba(255,255,255,0.1);
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 10px;
    margin: 0 5px 5px 0;
    color: white !important;
  }

  /* Language Specific Styles */
  .lang-item {
    font-size: 11px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 6px;
    color: white !important;
  }
  
  .lang-dot {
    width: 4px;
    height: 4px;
    background-color: #3498db;
    border-radius: 50%;
  }
`;

const RightColumn = styled.div`
  padding: 30px;
  color: #333;

  /* Name Header */
  .header-name {
    font-size: 32px;
    font-weight: 800;
    text-transform: uppercase;
    color: #2c3e50;
    line-height: 1;
    margin-bottom: 5px;
  }

  .header-role {
    font-size: 16px;
    color: #7f8c8d;
    font-weight: 500;
    margin-bottom: 10px; 
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  /* Section Styling */
  .section-head {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    margin-top: 20px;
  }

  .section-head h3 {
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 1px;
    color: #2c3e50;
    margin: 0;
    padding-right: 15px;
    white-space: nowrap;
  }

  .line {
    width: 100%;
    height: 2px;
    background: #ecf0f1;
    position: relative;
  }
  
  /* Adds a blue accent to the start of the line */
  .line::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 40px;
    background: #3498db; 
  }

  .content-block {
    margin-bottom: 18px;
  }

  .block-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 3px;
  }

  .role-title {
    font-weight: 700;
    font-size: 13px;
    color: #000;
  }

  .date-span {
    font-size: 11px;
    font-weight: 600;
    color: #3498db; /* Professional Blue */
  }

  .company-name {
    font-size: 12px;
    font-style: italic;
    color: #666;
    margin-bottom: 5px;
  }

  .main-desc {
    font-size: 11px;
    line-height: 1.5;
    color: #444;
  }

  .main-desc ul {
    margin: 0;
    padding-left: 18px;
  }
  
  .main-desc li {
    margin-bottom: 3px;
  }
`;

export const T10 = ({ jsonData }) => {
  const {
    contactInfo = {},
    education = [],
    workExperience = [],
    projects = [],
    certificates = [],
    skills = {},
    Description = {}
  } = jsonData;

  // Process Arrays
  const hardSkills = skills.hardSkills ? skills.hardSkills.split(',').map(s => s.trim()) : [];
  const softSkills = skills.softSkills ? skills.softSkills.split(',').map(s => s.trim()) : [];
  const allSkills = [...hardSkills, ...softSkills];

  // Process Languages (New)
  const languages = contactInfo.Languages
    ? contactInfo.Languages.split(',').map(lang => lang.trim()).filter(lang => lang !== '')
    : [];

  return (
    <PageWrapper>
      <div className="resume-page" id="capture-content">

        {/* --- LEFT COLUMN (Sidebar) --- */}
        <LeftColumn>

          {/* Contact Section */}
          <div>
            <h3 style={{ color: '#ecf0f1' }}>Contact</h3>
            {contactInfo.phoneNumber && <div className="contact-row">📱 {contactInfo.phoneNumber}</div>}
            {contactInfo.emailAddress && <div className="contact-row">✉️ {contactInfo.emailAddress}</div>}
            {contactInfo.Location && <div className="contact-row">📍 {contactInfo.Location}</div>}
            {contactInfo.linkedin && (
              <div className="contact-row">
                🔗 <a href={`https://linkedin.com/in/${contactInfo.linkedin}`} target="_blank" rel="noreferrer">LinkedIn</a>
              </div>
            )}
            {contactInfo.portfolio && (
              <div className="contact-row">
                🌐 <a href={contactInfo.portfolio} target="_blank" rel="noreferrer">Portfolio</a>
              </div>
            )}
          </div>

          {/* Education Section */}
          {education.length > 0 && (
            <div>
              <h3 style={{ color: '#ecf0f1' }}>Education</h3>
              {education.map((edu, index) => (
                <div key={index} className="left-item">
                  <div className="left-title">{edu.degreeName}</div>
                  <div className="left-subtitle">{edu.institutionName}</div>
                  <div className="left-date">
                    {edu.graduationDuration || edu.graduationYear}
                    {edu.currentCGPA && ` | CGPA: ${edu.currentCGPA}`}
                  </div>
                  {edu.location && <div className="left-date">{edu.location}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Certificates Section */}
          {certificates.length > 0 && (
            <div>
              <h3 style={{ color: '#ecf0f1' }}>Certificates</h3>
              {certificates.map((cert, index) => (
                <div key={index} className="left-item">
                  <div className="left-title">{cert.certificateName}</div>
                  <div className="left-subtitle">{cert.providerName}</div>
                  <div className="left-date">{cert.courseDuration}</div>
                </div>
              ))}
            </div>
          )}

          {/* Skills Section */}
          {allSkills.length > 0 && (
            <div>
              <h3 style={{ color: '#ecf0f1' }}>Skills</h3>
              <div>
                {allSkills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Languages Section */}
          {languages.length > 0 && (
            <div>
              <h3 style={{ color: '#ecf0f1' }}>Languages</h3>
              <div>
                {languages.map((lang, index) => (
                  <div key={index} className="lang-item">
                    <span className="lang-dot"></span> {lang}
                  </div>
                ))}
              </div>
            </div>
          )}

        </LeftColumn>

        {/* --- RIGHT COLUMN (Main Content) --- */}
        <RightColumn>

          {/* Header */}
          <div className="header-name">{contactInfo.fullName || 'Your Name'}</div>
          <div className="header-role">{contactInfo.jobTitle || 'Professional Title'}</div>

          {/* Profile Summary */}
          {Description.UserDescription && (
            <section>
              <div className="section-head">
                <h3>Profile</h3>
                <div className="line"></div>
              </div>
              <div className="content-block">
                <p className="main-desc" style={{ textAlign: 'justify' }}>
                  {Description.UserDescription}
                </p>
              </div>
            </section>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section>
              <div className="section-head">
                <h3>Experience</h3>
                <div className="line"></div>
              </div>

              {workExperience.map((exp, index) => (
                <div key={index} className="content-block">
                  <div className="block-header">
                    <span className="role-title">{exp.jobTitle}</span>
                    <span className="date-span">{exp.WorkDuration || exp.duration}</span>
                  </div>
                  <div className="company-name">
                    {exp.companyName} {exp.Location ? `| ${exp.Location}` : ''}
                  </div>
                  <div className="main-desc">
                    <span dangerouslySetInnerHTML={{ __html: parseMarkdown(exp.keyAchievements || exp.description) }} />
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <div className="section-head">
                <h3>Projects</h3>
                <div className="line"></div>
              </div>

              {projects.map((proj, index) => (
                <div key={index} className="content-block">
                  <div className="block-header">
                    <span className="role-title">{proj.projectTitle}</span>
                    {proj.duration && <span className="date-span">{proj.duration}</span>}
                  </div>
                  <div className="main-desc">
                    {proj.projectDescription || proj.toolsTechUsed}
                  </div>
                </div>
              ))}
            </section>
          )}

        </RightColumn>
      </div>
    </PageWrapper>
  );
};

export const T10Css = `
  /* Print Optimization */
  @media print {
    * {
      -webkit-print-color-adjust: exact !important; 
      print-color-adjust: exact !important;
    }
    @page { 
      size: A4; 
      margin: 0; 
    }
    .resume-page {
      width: 210mm !important;
      min-height: 297mm !important;
      margin: 0 !important;
      border: none !important;
      box-shadow: none !important;
    }
  }

  /* Screen Display */
  body {
    background: #e0e0e0;
    padding: 20px;
    font-family: 'Roboto', 'Segoe UI', Helvetica, sans-serif;
  }

  .resume-page {
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    background: white;
    box-shadow: 0 0 15px rgba(0,0,0,0.1);
    display: grid !important;
    grid-template-columns: 32% 68% !important;
  }

  /* Left Column Styles (First child of grid) */
  .resume-page > *:first-child {
    background-color: #2c3e50 !important;
    color: white !important;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .resume-page > *:first-child * {
    color: white !important;
  }

  .resume-page > *:first-child h3 {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border-bottom: 1px solid rgba(255,255,255,0.3);
    padding-bottom: 8px;
    margin-bottom: 15px;
    color: #ecf0f1 !important;
  }

  .left-item {
    margin-bottom: 15px;
  }

  .left-title {
    font-weight: bold;
    font-size: 13px;
    color: #fff;
  }

  .left-subtitle {
    font-size: 11px;
    color: #bdc3c7;
    font-style: italic;
    margin-bottom: 2px;
  }

  .left-date {
    font-size: 10px;
    color: #95a5a6;
  }

  .contact-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    margin-bottom: 8px;
    color: #ecf0f1;
    word-break: break-all;
  }
  
  .contact-row a {
    color: #fff;
    text-decoration: none;
  }

  .skill-tag {
    display: inline-block;
    background: rgba(255,255,255,0.1);
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 10px;
    margin: 0 5px 5px 0;
  }

  .lang-item {
    font-size: 11px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .lang-dot {
    width: 4px;
    height: 4px;
    background-color: #3498db;
    border-radius: 50%;
  }

  /* Right Column Styles (Second child of grid) */
  .resume-page > *:last-child {
    padding: 30px;
    color: #333;
    background-color: white;
  }

  .header-name {
    font-size: 32px;
    font-weight: 800;
    text-transform: uppercase;
    color: #2c3e50;
    line-height: 1;
    margin-bottom: 5px;
  }

  .header-role {
    font-size: 16px;
    color: #7f8c8d;
    font-weight: 500;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .section-head {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    margin-top: 20px;
  }

  .section-head h3 {
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 1px;
    color: #2c3e50;
    margin: 0;
    padding-right: 15px;
    white-space: nowrap;
  }

  .line {
    width: 100%;
    height: 2px;
    background: #ecf0f1;
    position: relative;
  }
  
  .line::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 40px;
    background: #3498db; 
  }

  .content-block {
    margin-bottom: 18px;
  }

  .block-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 3px;
  }

  .role-title {
    font-weight: 700;
    font-size: 13px;
    color: #000;
  }

  .date-span {
    font-size: 11px;
    font-weight: 600;
    color: #3498db;
  }

  .company-name {
    font-size: 12px;
    font-style: italic;
    color: #666;
    margin-bottom: 5px;
  }

  .main-desc {
    font-size: 11px;
    line-height: 1.5;
    color: #444;
  }

  .main-desc ul {
    margin: 0;
    padding-left: 18px;
  }
  
  .main-desc li {
    margin-bottom: 3px;
  }
`;
