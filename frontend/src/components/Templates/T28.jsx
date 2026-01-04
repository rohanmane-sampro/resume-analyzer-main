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
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5-2.5-1.12 2.5-2.5 2.5z" /></svg>;
const LinkedinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>;
const GithubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>;
const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>;

// --- CSS String ---
export const T28Css = `
  .resume-container {
    width: 210mm;
    min-height: 297mm;
    height: auto;
    background: white;
    font-family: 'Georgia', 'Times New Roman', serif;
    color: #1a1a1a;
    padding: 35px 45px;
    box-sizing: border-box;
  }

  .header {
    text-align: center;
    padding-bottom: 18px;
    border-bottom: 3px double #1a1a1a;
    margin-bottom: 22px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .profile-pic-container {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 15px;
    border: 1px solid #ddd;
  }

  .profile-pic {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .name {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin: 0 0 8px 0;
    color: #1a1a1a;
  }

  .job-title {
    font-size: 14px;
    font-weight: 400;
    font-style: italic;
    margin: 0;
    color: #333;
    letter-spacing: 1px;
  }

  .contact-info,
  .links-info {
    font-size: 10px;
    color: #333;
    margin-top: 10px;
    font-family: 'Arial', sans-serif;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
  }

  .contact-item,
  .link-item {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .contact-link {
    color: #333;
    text-decoration: none;
  }

  .main-content {
    margin-top: 20px;
  }

  .section {
    margin-bottom: 25px;
    page-break-inside: avoid;
  }

  .section-title {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin: 0 0 12px 0;
    padding-bottom: 5px;
    border-bottom: 1px solid #1a1a1a;
    color: #1a1a1a;
  }

  .section-content {
    padding-left: 0;
  }

  .summary-text {
    font-size: 11px;
    line-height: 1.6;
    text-align: justify;
    color: #333;
    font-family: 'Georgia', serif;
  }

  /* Education & Experience */
  .edu-item,
  .exp-item,
  .project-item {
    margin-bottom: 16px;
    page-break-inside: avoid;
  }

  .edu-header,
  .exp-header,
  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 4px;
  }

  .edu-degree,
  .exp-title,
  .project-title {
    font-size: 12px;
    font-weight: 700;
    margin: 0;
    color: #1a1a1a;
  }

  .edu-institution,
  .exp-company {
    font-size: 11px;
    font-style: italic;
    color: #333;
  }

  .meta-right {
    text-align: right;
    font-family: 'Arial', sans-serif;
    font-size: 10px;
    color: #1a1a1a;
  }

  .date-text {
    font-weight: 600;
  }

  .location-text {
    font-style: italic;
    color: #666;
  }

  .edu-cgpa {
    font-size: 10px;
    color: #333;
    margin-top: 2px;
    font-family: 'Arial', sans-serif;
  }

  .description-text {
    font-size: 10px;
    line-height: 1.5;
    color: #333;
    margin-top: 4px;
    text-align: justify;
    font-family: 'Arial', sans-serif;
  }
  
  .description-text ul {
    margin-top: 4px;
    margin-bottom: 4px;
    padding-left: 15px;
  }

  .tech-stack {
    font-size: 10px;
    font-family: 'Arial', sans-serif;
    color: #555;
    margin-top: 2px;
  }

  .project-link-icon {
    margin-left: 5px;
    color: #555;
    text-decoration: none;
    font-size: 10px;
  }

  /* Skills */
  .skills-row {
    margin-bottom: 6px;
    font-size: 10px;
    line-height: 1.5;
    display: flex;
  }

  .skills-label {
    font-weight: 700;
    color: #1a1a1a;
    display: inline-block;
    min-width: 130px;
    font-family: 'Arial', sans-serif;
  }

  .skills-list {
    color: #333;
    font-family: 'Arial', sans-serif;
    flex: 1;
  }

  /* Certifications */
  .cert-item {
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
    font-family: 'Arial', sans-serif;
    font-size: 10px;
  }

  .cert-name {
    font-weight: 600;
    color: #1a1a1a;
  }

  .cert-meta {
    color: #666;
    font-style: italic;
  }

  @media print {
    @page {
      margin: 0;
      size: auto;
    }
    
    html, body {
      background-color: white !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    .resume-container {
      width: 210mm !important;
      height: auto !important;
      min-height: auto !important;
      margin: 0 !important;
      padding: 35px 45px !important;
      box-shadow: none !important;
      background-color: white !important;
    }

    .section, .edu-item, .exp-item, .project-item {
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

export const T28 = ({ jsonData }) => {
  // Data extraction helpers
  const skills = jsonData?.skills?.hardSkills?.split(',').map(s => s.trim()).filter(Boolean) || [];
  const softSkills = jsonData?.skills?.softSkills?.split(',').map(s => s.trim()).filter(Boolean) || [];
  const languages = jsonData?.contactInfo?.Languages?.split(',').map(l => l.trim()).filter(Boolean) || [];

  const portfolioUrl = jsonData?.contactInfo?.portfolio || '';
  const PortfolioIcon = portfolioUrl.toLowerCase().includes('github') ? GithubIcon : LinkIcon;

  return (
    <StyledWrapper cssContent={T28Css}>
      <div className="resume-container">
        {/* Header */}
        <header className="header">
          {jsonData?.contactInfo?.profileImage && (
            <div className="profile-pic-container">
              <img src={jsonData.contactInfo.profileImage} alt="Profile" className="profile-pic" />
            </div>
          )}

          <h1 className="name">{jsonData?.contactInfo?.fullName || 'YOUR NAME'}</h1>
          <h2 className="job-title">{jsonData?.contactInfo?.jobTitle || 'Professional Title'}</h2>

          <div className="contact-info">
            {jsonData?.contactInfo?.emailAddress && (
              <span className="contact-item">
                <MailIcon /> {jsonData.contactInfo.emailAddress}
              </span>
            )}
            {jsonData?.contactInfo?.phoneNumber && (
              <span className="contact-item">
                <PhoneIcon /> {jsonData.contactInfo.phoneNumber}
              </span>
            )}
            {jsonData?.contactInfo?.Location && (
              <span className="contact-item">
                <MapPinIcon /> {jsonData.contactInfo.Location}
              </span>
            )}
          </div>

          <div className="links-info">
            {jsonData?.contactInfo?.linkedin && (
              <span className="link-item">
                <LinkedinIcon />
                <a href={jsonData.contactInfo.linkedin} className="contact-link" target="_blank" rel="noreferrer">
                  {jsonData.contactInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
                </a>
              </span>
            )}
            {portfolioUrl && (
              <span className="link-item">
                <PortfolioIcon />
                <a href={portfolioUrl} className="contact-link" target="_blank" rel="noreferrer">
                  {portfolioUrl.replace(/^https?:\/\//, '')}
                </a>
              </span>
            )}
          </div>
        </header>

        {/* Main Content */}
        <div className="main-content">

          {/* Professional Summary */}
          {jsonData?.Description?.UserDescription && (
            <section className="section">
              <h3 className="section-title">PROFESSIONAL SUMMARY</h3>
              <div className="section-content">
                <p className="summary-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(jsonData.Description.UserDescription) }} />
              </div>
            </section>
          )}

          {/* Education */}
          {jsonData?.education && jsonData.education.length > 0 && (
            <section className="section">
              <h3 className="section-title">EDUCATION</h3>
              <div className="section-content">
                {jsonData.education.map((edu, index) => (
                  <div key={index} className="edu-item">
                    <div className="edu-header">
                      <div>
                        <h4 className="edu-degree">{edu.degreeName}</h4>
                        <div className="edu-institution">{edu.institutionName}</div>
                      </div>
                      <div className="meta-right">
                        <div className="date-text">{edu.graduationYear}</div>
                      </div>
                    </div>
                    {edu.currentCGPA && <div className="edu-cgpa">CGPA: {edu.currentCGPA}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {(skills.length > 0 || softSkills.length > 0 || languages.length > 0) && (
            <section className="section">
              <h3 className="section-title">SKILLS & COMPETENCIES</h3>
              <div className="section-content">
                {skills.length > 0 && (
                  <div className="skills-row">
                    <span className="skills-label">Technical Skills:</span>
                    <span className="skills-list">{skills.join(' • ')}</span>
                  </div>
                )}
                {softSkills.length > 0 && (
                  <div className="skills-row">
                    <span className="skills-label">Core Competencies:</span>
                    <span className="skills-list">{softSkills.join(' • ')}</span>
                  </div>
                )}
                {languages.length > 0 && (
                  <div className="skills-row">
                    <span className="skills-label">Languages:</span>
                    <span className="skills-list">{languages.join(' • ')}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Work Experience */}
          {jsonData?.workExperience && jsonData.workExperience.length > 0 && (
            <section className="section">
              <h3 className="section-title">PROFESSIONAL EXPERIENCE</h3>
              <div className="section-content">
                {jsonData.workExperience.map((exp, index) => (
                  <div key={index} className="exp-item">
                    <div className="exp-header">
                      <div>
                        <h4 className="exp-title">{exp.jobTitle}</h4>
                        <div className="exp-company">{exp.companyName}</div>
                      </div>
                      <div className="meta-right">
                        <div className="date-text">{exp.WorkDuration}</div>
                        {exp.Location && <div className="location-text">{exp.Location}</div>}
                      </div>
                    </div>
                    {exp.keyAchievements && (
                      <div className="description-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(exp.keyAchievements) }} />
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {jsonData?.projects && jsonData.projects.length > 0 && (
            <section className="section">
              <h3 className="section-title">PROJECTS</h3>
              <div className="section-content">
                {jsonData.projects.map((project, index) => (
                  <div key={index} className="project-item">
                    <div className="project-header">
                      <div>
                        <h4 className="project-title">
                          {project.projectTitle}
                          {project.link && (
                            <a href={project.link} target="_blank" rel="noreferrer" className="project-link-icon">
                              ↗ Link
                            </a>
                          )}
                        </h4>
                      </div>
                      <div className="meta-right">
                        {project.duration && <div className="date-text">{project.duration}</div>}
                      </div>
                    </div>

                    {project.toolsTechUsed && (
                      <div className="tech-stack"><strong>Stack:</strong> {project.toolsTechUsed}</div>
                    )}

                    {project.description && (
                      <div className="description-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(project.description) }} />
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {jsonData?.certificates && jsonData.certificates.length > 0 && (
            <section className="section">
              <h3 className="section-title">CERTIFICATIONS & ACHIEVEMENTS</h3>
              <div className="section-content">
                {jsonData.certificates.map((cert, index) => (
                  <div key={index} className="cert-item">
                    <span className="cert-name">{cert.certificateName}</span>
                    <span className="cert-meta">
                      {cert.providerName}
                      {cert.year && ` | ${cert.year}`}
                      {cert.courseDuration && ` • ${cert.courseDuration}`}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
};
