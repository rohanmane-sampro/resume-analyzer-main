import React from 'react';
import styled from 'styled-components';

// --- Helpers ---
const parseMarkdown = (text) => {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
};

// --- SVG Icons ---
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5-2.5-1.12 2.5-2.5 2.5z" /></svg>;
const LinkedinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>;
const GithubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>;
const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>;

// --- CSS Styles (Static String) ---
export const T29Css = `
  .resume-container {
    width: 210mm;
    min-height: 297mm;
    height: auto;
    background: white;
    font-family: 'Roboto', 'Arial', sans-serif;
    color: #2c3e50;
    display: flex;
    flex-direction: column;
  }

  .header {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    padding: 25px 35px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .header-content {
    flex: 1;
    padding-right: 20px;
  }

  .profile-image-container {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid rgba(255, 255, 255, 0.3);
    flex-shrink: 0;
  }

  .profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .name {
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 6px 0;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: white !important;
  }

  .job-title {
    font-size: 15px;
    font-weight: 300;
    margin: 0;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    opacity: 0.95;
    color: white !important;
  }

  .main-layout {
    display: flex;
    flex: 1;
    height: auto;
  }

  .sidebar {
    width: 240px;
    background: #34495e !important;
    color: white !important;
    padding: 25px 20px;
    flex-shrink: 0;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .sidebar * {
    color: white !important;
  }

  .sidebar a {
    color: #3498db !important;
  }

  .sidebar-section {
    margin-bottom: 25px;
    page-break-inside: avoid;
  }

  .sidebar-title {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.3px;
    margin: 0 0 12px 0;
    padding-bottom: 6px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
    text-transform: uppercase;
  }

  .sidebar-content {
    font-size: 11px;
    line-height: 1.5;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    word-break: break-all;
  }

  .contact-item svg {
    flex-shrink: 0;
    color: #3498db;
  }

  .small-text {
    font-size: 10px;
  }

  .skills-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .skill-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .skill-dot {
    width: 5px;
    height: 5px;
    background: #3498db;
    border-radius: 50%;
    flex-shrink: 0;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .language-item {
    margin-bottom: 12px;
  }

  .language-name {
    font-size: 11px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .language-bar {
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    overflow: hidden;
  }

  .language-fill {
    height: 100%;
    background: #3498db;
    border-radius: 2px;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .edu-item,
  .cert-item {
    margin-bottom: 16px;
    padding-bottom: 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .edu-item:last-child,
  .cert-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .edu-year {
    font-size: 10px;
    color: #3498db;
    font-weight: 700;
    margin-bottom: 5px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  .edu-degree {
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 3px;
  }

  .edu-school {
    font-size: 11px;
    opacity: 0.9;
    margin-bottom: 2px;
  }

  .edu-cgpa {
    font-size: 10px;
    color: #3498db;
    font-weight: 600;
    margin-top: 2px;
  }

  .cert-name {
    font-size: 11px;
    font-weight: 700;
    margin-bottom: 3px;
  }

  .cert-provider {
    font-size: 10px;
    opacity: 0.8;
    margin-bottom: 2px;
  }

  .cert-duration {
    font-size: 9px;
    opacity: 0.7;
  }

  .main-content {
    padding: 30px 35px;
    background: white;
    flex: 1;
  }

  .content-section {
    margin-bottom: 25px;
  }

  .content-title {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 1.8px;
    text-transform: uppercase;
    margin: 0 0 15px 0;
    padding-bottom: 8px;
    border-bottom: 3px solid #1e3c72;
    color: #1e3c72;
  }

  .summary-text {
    font-size: 11px;
    line-height: 1.7;
    text-align: justify;
    color: #34495e;
  }

  .exp-item {
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #ecf0f1;
    page-break-inside: avoid;
  }

  .exp-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .exp-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
    gap: 15px;
  }

  .exp-title {
    font-size: 13px;
    font-weight: 700;
    color: #1e3c72;
    margin: 0 0 5px 0;
  }

  .exp-company {
    font-size: 12px;
    color: #7f8c8d;
    font-weight: 600;
    margin-bottom: 3px;
  }

  .exp-duration {
    font-size: 11px;
    color: #95a5a6;
    font-weight: 600;
    white-space: nowrap;
    text-align: right;
  }
  
  .exp-location {
    font-size: 10px;
    color: #bdc3c7;
    font-style: italic;
  }

  .exp-description {
    font-size: 11px;
    line-height: 1.6;
    color: #34495e;
    text-align: justify;
    margin-top: 5px;
  }

  /* NEW PROJECT CARD DESIGN */
  .projects-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .project-card {
    background: #f0f7ff; /* Attractive Light Blue */
    border-left: 5px solid #1e3c72; /* Matching header */
    border-radius: 4px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    page-break-inside: avoid;
    width: 100%;
    box-sizing: border-box;
  }

  .project-header {
     display: flex;
     justify-content: space-between;
     align-items: center;
     margin-bottom: 8px;
     border-bottom: 1px solid #dcebfb;
     padding-bottom: 5px;
  }
  
  .project-title {
     font-size: 13px;
     font-weight: 700;
     color: #1e3c72;
     margin: 0;
     text-transform: uppercase;
  }

  .project-links {
     display: flex;
     align-items: center;
     gap: 10px;
  }
  
  .project-link {
     color: #3498db;
     font-size: 11px;
     text-decoration: none;
     display: flex;
     align-items: center;
     gap: 3px;
     font-weight: 600;
  }
  
  .project-duration {
    font-size: 11px;
    color: #7f8c8d;
    font-weight: 600;
  }

  .tech-stack-container {
     background: #e1effe;
     padding: 6px 10px;
     border-radius: 4px;
     margin-bottom: 10px;
     font-size: 10px;
     color: #1e429f;
     display: inline-block;
  }
  
  .tech-stack-label {
     font-weight: 800;
     margin-right: 5px;
     text-transform: uppercase;
  }

  .project-description {
    font-size: 11px;
    line-height: 1.6;
    color: #34495e;
    text-align: justify;
  }

  @media print {
    @page {
      margin: 0;
      size: auto;
    }
    
    html, body {
      background-color: white !important;
      height: auto !important;
      min-height: auto !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    .resume-container {
      width: 210mm !important;
      height: auto !important;
      min-height: auto !important;
      margin: 0 !important;
      box-shadow: none !important;
      background-color: white !important;
    }

    .sidebar {
      background-color: #34495e !important;
      color: white !important;
    }
    
    .header {
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%) !important;
      color: white !important;
    }
    
    .content-title {
      border-bottom-color: #1e3c72 !important;
    }

    .project-card {
      background-color: #f0f7ff !important;
      border-left-color: #1e3c72 !important;
    }
    
    .tech-stack-container {
      background-color: #e1effe !important;
    }

    .sidebar-section,
    .content-section,
    .exp-item,
    .project-card {
      page-break-inside: avoid !important;
    }

    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
  }
`;

const StyledWrapper = styled.div`
  ${props => props.cssContent}
`;

export const T29 = ({ jsonData }) => {
  // Safe Data Parsing Helpers
  const parseSkills = (skillData) => {
    if (!skillData) return [];
    if (Array.isArray(skillData)) return skillData;
    return skillData.split(',').map(s => s.trim()).filter(Boolean);
  };

  const skills = parseSkills(jsonData?.skills?.hardSkills);
  const softSkills = parseSkills(jsonData?.skills?.softSkills);
  const languages = jsonData?.contactInfo?.Languages
    ? jsonData.contactInfo.Languages.split(',').map(l => l.trim()).filter(Boolean)
    : [];

  const portfolioUrl = jsonData?.contactInfo?.portfolio || '';
  const PortfolioIcon = portfolioUrl.toLowerCase().includes('github') ? GithubIcon : LinkIcon;

  return (
    <StyledWrapper cssContent={T29Css}>
      <div className="resume-container">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <h1 className="name">{jsonData?.contactInfo?.fullName || 'YOUR NAME'}</h1>
            <h2 className="job-title">{jsonData?.contactInfo?.jobTitle || 'Professional Title'}</h2>
          </div>
          {jsonData?.contactInfo?.profileImage && (
            <div className="profile-image-container">
              <img src={jsonData.contactInfo.profileImage} alt="Profile" className="profile-image" />
            </div>
          )}
        </header>

        {/* Two Column Layout */}
        <div className="main-layout">
          {/* Left Sidebar */}
          <aside className="sidebar">
            {/* Contact */}
            <section className="sidebar-section">
              <h3 className="sidebar-title">CONTACT</h3>
              <div className="sidebar-content">
                {jsonData?.contactInfo?.emailAddress && (
                  <div className="contact-item">
                    <MailIcon />
                    <span>{jsonData.contactInfo.emailAddress}</span>
                  </div>
                )}
                {jsonData?.contactInfo?.phoneNumber && (
                  <div className="contact-item">
                    <PhoneIcon />
                    <span>{jsonData.contactInfo.phoneNumber}</span>
                  </div>
                )}
                {jsonData?.contactInfo?.Location && (
                  <div className="contact-item">
                    <MapPinIcon />
                    <span>{jsonData.contactInfo.Location}</span>
                  </div>
                )}
                {jsonData?.contactInfo?.linkedin && (
                  <div className="contact-item">
                    <LinkedinIcon />
                    <span className="small-text">{jsonData.contactInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
                  </div>
                )}
                {portfolioUrl && (
                  <div className="contact-item">
                    <PortfolioIcon />
                    <span className="small-text">{portfolioUrl.replace(/^https?:\/\//, '')}</span>
                  </div>
                )}
              </div>
            </section>

            {/* Skills */}
            {skills.length > 0 && (
              <section className="sidebar-section">
                <h3 className="sidebar-title">TECHNICAL SKILLS</h3>
                <div className="sidebar-content">
                  <div className="skills-list">
                    {skills.map((skill, index) => (
                      <div key={index} className="skill-item">
                        <div className="skill-dot"></div>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Soft Skills */}
            {softSkills.length > 0 && (
              <section className="sidebar-section">
                <h3 className="sidebar-title">CORE STRENGTHS</h3>
                <div className="sidebar-content">
                  <div className="skills-list">
                    {softSkills.map((skill, index) => (
                      <div key={index} className="skill-item">
                        <div className="skill-dot"></div>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <section className="sidebar-section">
                <h3 className="sidebar-title">LANGUAGES</h3>
                <div className="sidebar-content">
                  {languages.map((lang, index) => (
                    <div key={index} className="language-item">
                      <div className="language-name">{lang}</div>
                      <div className="language-bar">
                        <div className="language-fill" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {jsonData?.education && jsonData.education.length > 0 && (
              <section className="sidebar-section">
                <h3 className="sidebar-title">EDUCATION</h3>
                <div className="sidebar-content">
                  {jsonData.education.map((edu, index) => (
                    <div key={index} className="edu-item">
                      <div className="edu-year">{edu.graduationYear}</div>
                      <div className="edu-degree">{edu.degreeName}</div>
                      <div className="edu-school">{edu.institutionName}</div>
                      {edu.currentCGPA && (
                        <div className="edu-cgpa">CGPA: {edu.currentCGPA}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {jsonData?.certificates && jsonData.certificates.length > 0 && (
              <section className="sidebar-section">
                <h3 className="sidebar-title">CERTIFICATIONS</h3>
                <div className="sidebar-content">
                  {jsonData.certificates.map((cert, index) => (
                    <div key={index} className="cert-item">
                      <div className="cert-name">{cert.certificateName}</div>
                      <div className="cert-provider">{cert.providerName}</div>
                      <div className="cert-duration">
                        {cert.year && <span>{cert.year} </span>}
                        {cert.courseDuration && <span>• {cert.courseDuration}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </aside>

          {/* Right Main Content */}
          <main className="main-content">
            {/* Professional Summary */}
            {jsonData?.Description?.UserDescription && (
              <section className="content-section">
                <h3 className="content-title">PROFESSIONAL SUMMARY</h3>
                <div className="content-body">
                  <p className="summary-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(jsonData.Description.UserDescription) }} />
                </div>
              </section>
            )}

            {/* Work Experience */}
            {jsonData?.workExperience && jsonData.workExperience.length > 0 && (
              <section className="content-section">
                <h3 className="content-title">PROFESSIONAL EXPERIENCE</h3>
                <div className="content-body">
                  {jsonData.workExperience.map((exp, index) => (
                    <div key={index} className="exp-item">
                      <div className="exp-header">
                        <div>
                          <h4 className="exp-title">{exp.jobTitle}</h4>
                          <div className="exp-company">{exp.companyName}</div>
                        </div>
                        <div>
                          <div className="exp-duration">{exp.WorkDuration}</div>
                          {exp.Location && <div className="exp-location">{exp.Location}</div>}
                        </div>
                      </div>
                      {exp.keyAchievements && (
                        <div className="exp-description" dangerouslySetInnerHTML={{ __html: parseMarkdown(exp.keyAchievements) }} />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects - Updated with Attractive Box Design */}
            {jsonData?.projects && jsonData.projects.length > 0 && (
              <section className="content-section">
                <h3 className="content-title">KEY PROJECTS</h3>
                <div className="content-body">
                  <div className="projects-list">
                    {jsonData.projects.map((project, index) => (
                      <div key={index} className="project-card">
                        <div className="project-header">
                          <h4 className="project-title">{project.projectTitle || project.name}</h4>
                          <div className="project-links">
                            {project.link && (
                              <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
                                <LinkIcon /> Link
                              </a>
                            )}
                            {project.duration && <span className="project-duration">{project.duration}</span>}
                          </div>
                        </div>

                        {/* Distinct Stack Section */}
                        {project.toolsTechUsed && (
                          <div className="tech-stack-container">
                            <span className="tech-stack-label">Stack:</span>
                            {project.toolsTechUsed}
                          </div>
                        )}

                        {/* Separate Description */}
                        {project.description && (
                          <div className="project-description" dangerouslySetInnerHTML={{ __html: parseMarkdown(project.description) }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </StyledWrapper>
  );
};
