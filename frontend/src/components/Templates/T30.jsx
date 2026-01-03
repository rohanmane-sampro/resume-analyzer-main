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
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5-2.5-1.12 2.5-2.5 2.5z" /></svg>;
const LinkedinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>;
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>;
const GithubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>;
const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>;

// --- CSS Styles (Static String) ---
export const T30Css = `
  .resume-container {
    width: 210mm;
    min-height: 297mm;
    height: auto;
    background: white;
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
    color: #1a202c;
    padding: 35px 45px;
    box-sizing: border-box;
  }

  .header {
    padding-bottom: 25px;
    margin-bottom: 28px;
    border-bottom: 2px solid #cbd5e0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .header-content {
    flex: 1;
    padding-right: 20px;
  }

  .profile-image-container {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid #cbd5e0;
    flex-shrink: 0;
  }

  .profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .name {
    font-size: 34px;
    font-weight: 300;
    letter-spacing: -1px;
    margin: 0 0 8px 0;
    color: #1a202c;
    text-transform: uppercase;
  }

  .job-title {
    font-size: 16px;
    font-weight: 400;
    color: #718096;
    margin: 0 0 20px 0;
    letter-spacing: 0.5px;
  }

  .contact-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    font-size: 11px;
    color: #4a5568;
  }

  .contact-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }

  .contact-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .separator {
    color: #a0aec0;
  }

  .main-content {
    max-width: 100%;
  }

  .section {
    margin-bottom: 28px;
  }

  .section-title {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #2d3748;
    margin: 0 0 16px 0;
    padding-bottom: 8px;
    border-bottom: 2px solid #cbd5e0;
  }

  .section-content {
    padding-left: 0;
  }

  .summary-text {
    font-size: 12px;
    line-height: 1.7;
    color: #4a5568;
    text-align: justify;
  }

  /* Expertise / Skills */
  .expertise-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .expertise-column {
    min-width: 0;
  }

  .expertise-heading {
    font-size: 11px;
    font-weight: 700;
    color: #2d3748;
    margin: 0 0 12px 0;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  .skills-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .skill-tag {
    background: #f7fafc;
    border: 1px solid #cbd5e0;
    color: #2d3748;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 500;
  }

  .competencies-list,
  .languages-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .competency-item,
  .language-item {
    font-size: 11px;
    color: #4a5568;
    padding-left: 14px;
    position: relative;
  }

  .competency-item::before,
  .language-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 6px;
    width: 4px;
    height: 4px;
    background: #718096;
    border-radius: 50%;
  }

  /* Timeline (Exp/Projects) */
  .timeline-item {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e2e8f0;
    page-break-inside: avoid;
  }

  .timeline-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .timeline-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
    gap: 15px;
  }

  .timeline-left {
    flex: 1;
  }

  .timeline-right {
    text-align: right;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .timeline-title {
    font-size: 14px;
    font-weight: 700;
    color: #1a202c;
    margin: 0 0 3px 0;
  }

  .timeline-subtitle {
    font-size: 12px;
    color: #4a5568;
    font-weight: 600;
  }

  .timeline-duration {
    font-size: 11px;
    color: #718096;
    font-weight: 600;
    white-space: nowrap;
  }
  
  .timeline-location {
    font-size: 10px;
    color: #a0aec0;
    font-style: italic;
  }

  .timeline-description {
    font-size: 12px;
    line-height: 1.6;
    color: #4a5568;
    text-align: justify;
    margin-top: 6px;
  }
  
  .timeline-description ul {
      margin-left: 15px;
      margin-top: 5px;
  }

  /* Projects - Updated to be Full Width and cleaner */
  .projects-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .project-card {
    padding: 18px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-left: 4px solid #cbd5e0;
    border-radius: 6px;
    page-break-inside: avoid;
    width: 100%;
    box-sizing: border-box;
  }

  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 8px;
  }

  .project-title {
    font-size: 14px;
    font-weight: 700;
    color: #2d3748;
    margin: 0;
  }
  
  .project-links {
    font-size: 11px;
    color: #718096;
  }
  
  .project-link {
    color: #718096;
    text-decoration: none;
    margin-right: 10px;
  }

  .project-duration {
    font-weight: 500;
  }

  .tech-stack-container {
    margin-bottom: 10px;
    font-size: 11px;
    color: #4a5568;
  }
  
  .tech-stack-label {
    font-weight: 700;
    color: #2d3748;
    margin-right: 5px;
  }

  .project-description {
    font-size: 12px;
    line-height: 1.6;
    color: #4a5568;
  }

  /* Education */
  .edu-item {
    margin-bottom: 18px;
    page-break-inside: avoid;
  }

  .edu-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 15px;
  }

  .edu-degree {
    font-size: 13px;
    font-weight: 700;
    color: #1a202c;
    margin: 0 0 3px 0;
  }

  .edu-school {
    font-size: 12px;
    color: #4a5568;
    font-weight: 500;
  }

  .edu-year {
    font-size: 11px;
    color: #718096;
    font-weight: 600;
  }

  .edu-cgpa {
    font-size: 11px;
    color: #4a5568;
    font-weight: 600;
    margin-top: 2px;
  }

  /* Certifications */
  .certifications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 14px;
  }

  .cert-card {
    padding: 12px;
    background: #f8fafc;
    border-radius: 4px;
    page-break-inside: avoid;
  }

  .cert-name {
    font-size: 12px;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 5px;
  }

  .cert-meta {
    font-size: 10px;
    color: #718096;
  }

  .cert-provider {
    font-weight: 500;
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
      overflow: visible !important;
    }

    .resume-container {
      width: 210mm !important;
      max-width: 210mm !important;
      min-height: auto !important;
      height: auto !important;
      margin: 0 auto !important;
      padding: 20px 30px !important; /* Reduced padding for better fit */
      box-shadow: none !important;
      background-color: white !important;
      border: none !important;
      display: block !important;
    }

    .section {
      margin-bottom: 18px !important;
      page-break-inside: avoid !important;
    }

    .header {
      margin-bottom: 15px !important;
      padding-bottom: 15px !important;
    }
    
    .timeline-item, .project-card, .edu-item, .cert-card {
      page-break-inside: avoid !important;
    }

    /* Force background colors to print */
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    
    /* Ensure light gray backgrounds appear */
    .project-card, .cert-card, .skill-tag {
        background-color: #f7fafc !important;
        border: 1px solid #cbd5e0 !important;
    }
  }
`;

const StyledWrapper = styled.div`
  ${props => props.cssContent}
`;

export const T30 = ({ jsonData }) => {
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
    <StyledWrapper cssContent={T30Css}>
      <div className="resume-container">

        {/* Header */}
        <header className="header">
          <div className="header-content">
            <h1 className="name">{jsonData?.contactInfo?.fullName || 'YOUR NAME'}</h1>
            <h2 className="job-title">{jsonData?.contactInfo?.jobTitle || 'Professional Title'}</h2>

            <div className="contact-bar">
              <div className="contact-group">
                {jsonData?.contactInfo?.emailAddress && (
                  <>
                    <span className="contact-item">
                      <MailIcon />
                      {jsonData.contactInfo.emailAddress}
                    </span>
                    <span className="separator">•</span>
                  </>
                )}
                {jsonData?.contactInfo?.phoneNumber && (
                  <>
                    <span className="contact-item">
                      <PhoneIcon />
                      {jsonData.contactInfo.phoneNumber}
                    </span>
                    <span className="separator">•</span>
                  </>
                )}
                {jsonData?.contactInfo?.Location && (
                  <span className="contact-item">
                    <MapPinIcon />
                    {jsonData.contactInfo.Location}
                  </span>
                )}
              </div>

              <div className="contact-group">
                {jsonData?.contactInfo?.linkedin && (
                  <>
                    <span className="separator">•</span>
                    <span className="contact-item">
                      <LinkedinIcon />
                      {jsonData.contactInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
                    </span>
                  </>
                )}
                {portfolioUrl && (
                  <>
                    <span className="separator">•</span>
                    <span className="contact-item">
                      <PortfolioIcon />
                      {portfolioUrl.replace(/^https?:\/\//, '')}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {jsonData?.contactInfo?.profileImage && (
            <div className="profile-image-container">
              <img src={jsonData.contactInfo.profileImage} alt="Profile" className="profile-image" />
            </div>
          )}
        </header>

        {/* Main Content */}
        <div className="main-content">

          {/* Professional Summary */}
          {jsonData?.Description?.UserDescription && (
            <section className="section">
              <h3 className="section-title">Profile</h3>
              <div className="section-content">
                <p className="summary-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(jsonData.Description.UserDescription) }} />
              </div>
            </section>
          )}

          {/* Experience */}
          {jsonData?.workExperience && jsonData.workExperience.length > 0 && (
            <section className="section">
              <h3 className="section-title">Experience</h3>
              <div className="section-content">
                {jsonData.workExperience.map((exp, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-header">
                      <div className="timeline-left">
                        <h4 className="timeline-title">{exp.jobTitle}</h4>
                        <div className="timeline-subtitle">{exp.companyName}</div>
                      </div>
                      <div className="timeline-right">
                        <span className="timeline-duration">{exp.WorkDuration}</span>
                        {exp.Location && <span className="timeline-location">{exp.Location}</span>}
                      </div>
                    </div>
                    {exp.keyAchievements && (
                      <div className="timeline-description" dangerouslySetInnerHTML={{ __html: parseMarkdown(exp.keyAchievements) }} />
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {jsonData?.projects && jsonData.projects.length > 0 && (
            <section className="section">
              <h3 className="section-title">Projects</h3>
              <div className="section-content">
                <div className="projects-list">
                  {jsonData.projects.map((project, index) => (
                    <div key={index} className="project-card">
                      <div className="project-header">
                        <h4 className="project-title">
                          {project.projectTitle || project.name}
                        </h4>
                        <div className="project-links">
                          {project.link && (
                            <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
                              Link ↗
                            </a>
                          )}
                          {project.duration && <span className="project-duration">{project.duration}</span>}
                        </div>
                      </div>

                      {project.toolsTechUsed && (
                        <div className="tech-stack-container">
                          <span className="tech-stack-label">Technologies:</span>
                          {project.toolsTechUsed}
                        </div>
                      )}

                      {project.description && (
                        <div className="project-description" dangerouslySetInnerHTML={{ __html: parseMarkdown(project.description) }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Education */}
          {jsonData?.education && jsonData.education.length > 0 && (
            <section className="section">
              <h3 className="section-title">Education</h3>
              <div className="section-content">
                {jsonData.education.map((edu, index) => (
                  <div key={index} className="edu-item">
                    <div className="edu-header">
                      <div className="edu-left">
                        <h4 className="edu-degree">{edu.degreeName}</h4>
                        <div className="edu-school">{edu.institutionName}</div>
                      </div>
                      <div className="edu-right">
                        <span className="edu-year">{edu.graduationYear}</span>
                        {edu.currentCGPA && (
                          <span className="edu-cgpa">CGPA: {edu.currentCGPA}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills Section */}
          {(skills.length > 0 || softSkills.length > 0 || languages.length > 0) && (
            <section className="section">
              <h3 className="section-title">Expertise</h3>
              <div className="section-content">
                <div className="expertise-grid">
                  {skills.length > 0 && (
                    <div className="expertise-column">
                      <h4 className="expertise-heading">Technical Skills</h4>
                      <div className="skills-tags">
                        {skills.map((skill, index) => (
                          <span key={index} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {softSkills.length > 0 && (
                    <div className="expertise-column">
                      <h4 className="expertise-heading">Core Competencies</h4>
                      <div className="competencies-list">
                        {softSkills.map((skill, index) => (
                          <div key={index} className="competency-item">{skill}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {languages.length > 0 && (
                    <div className="expertise-column">
                      <h4 className="expertise-heading">Languages</h4>
                      <div className="languages-list">
                        {languages.map((lang, index) => (
                          <div key={index} className="language-item">{lang}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Certifications */}
          {jsonData?.certificates && jsonData.certificates.length > 0 && (
            <section className="section">
              <h3 className="section-title">Certifications</h3>
              <div className="section-content">
                <div className="certifications-grid">
                  {jsonData.certificates.map((cert, index) => (
                    <div key={index} className="cert-card">
                      <div className="cert-name">{cert.certificateName}</div>
                      <div className="cert-meta">
                        <span className="cert-provider">{cert.providerName}</span>
                        {cert.courseDuration && (
                          <span className="cert-duration"> • {cert.courseDuration}</span>
                        )}
                        {cert.year && (
                          <span className="cert-duration"> • {cert.year}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

        </div>
      </div>
    </StyledWrapper>
  );
};
