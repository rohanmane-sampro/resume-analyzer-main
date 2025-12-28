import React from 'react';
import styled from 'styled-components';

const parseMarkdown = (text) => {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
};

export const T28 = ({ jsonData }) => {
  const skills = jsonData?.skills?.hardSkills?.split(',').map(s => s.trim()).filter(Boolean) || [];
  const softSkills = jsonData?.skills?.softSkills?.split(',').map(s => s.trim()).filter(Boolean) || [];
  const languages = jsonData?.contactInfo?.Languages?.split(',').map(l => l.trim()).filter(Boolean) || [];

  return (
    <StyledWrapper>
      <div className="resume-container">
        {/* Header */}
        <header className="header">
          <h1 className="name">{jsonData?.contactInfo?.fullName || 'YOUR NAME'}</h1>
          <div className="title-bar">
            <h2 className="job-title">{jsonData?.contactInfo?.jobTitle || 'Professional Title'}</h2>
          </div>

          <div className="contact-info">
            <span className="contact-item">
              <i className="fas fa-envelope"></i> {jsonData?.contactInfo?.emailAddress || 'email@example.com'}
            </span>
            <span className="divider">|</span>
            <span className="contact-item">
              <i className="fas fa-phone"></i> {jsonData?.contactInfo?.phoneNumber || '+1234567890'}
            </span>
            <span className="divider">|</span>
            <span className="contact-item">
              <i className="fas fa-map-marker-alt"></i> {jsonData?.contactInfo?.Location || 'Location'}
            </span>
          </div>

          <div className="links-info">
            <span className="link-item">
              <i className="fab fa-linkedin"></i> {jsonData?.contactInfo?.linkedin?.replace('https://www.linkedin.com/in/', '') || 'LinkedIn'}
            </span>
            <span className="divider">|</span>
            <span className="link-item">
              <i className="fab fa-github"></i> {jsonData?.contactInfo?.portfolio || 'Portfolio/GitHub'}
            </span>
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
                {jsonData.education.slice(0, 2).map((edu, index) => (
                  <div key={index} className="edu-item">
                    <div className="edu-header">
                      <div className="edu-left">
                        <h4 className="edu-degree">{edu.degreeName}</h4>
                        <div className="edu-institution">{edu.institutionName}, {edu.location}</div>
                      </div>
                      <div className="edu-right">
                        <div className="edu-year">{edu.graduationYear}</div>
                        {edu.currentCGPA && <div className="edu-cgpa">CGPA: {edu.currentCGPA}</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {(skills.length > 0 || softSkills.length > 0) && (
            <section className="section">
              <h3 className="section-title">SKILLS & COMPETENCIES</h3>
              <div className="section-content">
                {skills.length > 0 && (
                  <div className="skills-row">
                    <span className="skills-label">Technical Skills:</span>
                    <span className="skills-list">{skills.slice(0, 15).join(' • ')}</span>
                  </div>
                )}
                {softSkills.length > 0 && (
                  <div className="skills-row">
                    <span className="skills-label">Core Competencies:</span>
                    <span className="skills-list">{softSkills.slice(0, 6).join(' • ')}</span>
                  </div>
                )}
                {languages.length > 0 && (
                  <div className="skills-row">
                    <span className="skills-label">Languages:</span>
                    <span className="skills-list">{languages.slice(0, 3).join(' • ')}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Work Experience */}
          {jsonData?.workExperience && jsonData.workExperience.length > 0 && jsonData.workExperience[0].companyName && (
            <section className="section">
              <h3 className="section-title">PROFESSIONAL EXPERIENCE</h3>
              <div className="section-content">
                {jsonData.workExperience.slice(0, 2).map((exp, index) => (
                  <div key={index} className="exp-item">
                    <div className="exp-header">
                      <div className="exp-left">
                        <h4 className="exp-title">{exp.jobTitle}</h4>
                        <div className="exp-company">{exp.companyName}</div>
                      </div>
                      <div className="exp-right">
                        <div className="exp-duration">{exp.WorkDuration}</div>
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

          {/* Projects */}
          {jsonData?.projects && jsonData.projects.length > 0 && (
            <section className="section">
              <h3 className="section-title">ACADEMIC & PERSONAL PROJECTS</h3>
              <div className="section-content">
                {jsonData.projects.slice(0, 2).map((project, index) => (
                  <div key={index} className="project-item">
                    <h4 className="project-title">{project.projectTitle}</h4>
                    {project.toolsTechUsed && (
                      <div className="project-description" dangerouslySetInnerHTML={{ __html: parseMarkdown(project.toolsTechUsed) }} />
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {jsonData?.certificates && jsonData.certificates.length > 0 && jsonData.certificates[0].certificateName && (
            <section className="section">
              <h3 className="section-title">CERTIFICATIONS & ACHIEVEMENTS</h3>
              <div className="section-content">
                {jsonData.certificates.slice(0, 3).map((cert, index) => (
                  <div key={index} className="cert-item">
                    <div className="cert-header">
                      <span className="cert-name">{cert.certificateName}</span>
                      <span className="cert-meta">
                        {cert.providerName}
                        {cert.courseDuration && ` • ${cert.courseDuration}`}
                      </span>
                    </div>
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

const StyledWrapper = styled.div`
  .resume-container {
    width: 210mm;
    min-height: 297mm;
    max-height: 297mm;
    background: white;
    font-family: 'Georgia', 'Times New Roman', serif;
    color: #1a1a1a;
    padding: 35px 45px;
    overflow: hidden;
  }

  .header {
    text-align: center;
    padding-bottom: 18px;
    border-bottom: 3px double #1a1a1a;
    margin-bottom: 22px;
    page-break-inside: avoid;
  }

  .name {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin: 0 0 8px 0;
    color: #1a1a1a;
  }

  .title-bar {
    margin-bottom: 12px;
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
  }

  .contact-item,
  .link-item {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .contact-item i,
  .link-item i {
    font-size: 9px;
  }

  .divider {
    margin: 0 8px;
    color: #666;
  }

  .main-content {
    margin-top: 20px;
  }

  .section {
    margin-bottom: 18px;
    page-break-inside: avoid;
  }

  .section-title {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin: 0 0 10px 0;
    padding-bottom: 5px;
    border-bottom: 2px solid #1a1a1a;
    color: #1a1a1a;
  }

  .section-content {
    padding-left: 0;
  }

  .summary-text {
    font-size: 11px;
    line-height: 1.7;
    text-align: justify;
    color: #333;
    font-family: 'Georgia', serif;
  }

  .edu-item,
  .exp-item,
  .project-item {
    margin-bottom: 14px;
  }

  .edu-header,
  .exp-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 6px;
  }

  .edu-left,
  .exp-left {
    flex: 1;
  }

  .edu-right,
  .exp-right {
    text-align: right;
    min-width: 120px;
  }

  .edu-degree,
  .exp-title,
  .project-title {
    font-size: 12px;
    font-weight: 700;
    margin: 0 0 3px 0;
    color: #1a1a1a;
  }

  .edu-institution,
  .exp-company {
    font-size: 11px;
    font-style: italic;
    color: #333;
    margin-bottom: 2px;
  }

  .edu-year,
  .exp-duration {
    font-size: 10px;
    font-weight: 600;
    color: #1a1a1a;
    font-family: 'Arial', sans-serif;
  }

  .edu-cgpa {
    font-size: 10px;
    color: #333;
    margin-top: 2px;
    font-family: 'Arial', sans-serif;
  }

  .exp-description,
  .project-description {
    font-size: 10px;
    line-height: 1.6;
    color: #333;
    margin-top: 5px;
    text-align: justify;
  }

  .skills-row {
    margin-bottom: 8px;
    font-size: 10px;
    line-height: 1.5;
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
  }

  .cert-item {
    margin-bottom: 8px;
  }

  .cert-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
  }

  .cert-name {
    font-size: 11px;
    font-weight: 600;
    color: #1a1a1a;
    flex: 1;
  }

  .cert-meta {
    font-size: 9px;
    color: #666;
    font-style: italic;
    white-space: nowrap;
    font-family: 'Arial', sans-serif;
  }

  @media print {
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }

    @page {
      size: A4 portrait;
      margin: 0;
    }

    .resume-container {
      width: 210mm !important;
      min-height: 297mm !important;
      max-height: 297mm !important;
      padding: 35px 45px !important;
      overflow: hidden !important;
    }

    .section {
      page-break-inside: avoid;
    }

    .header {
      page-break-inside: avoid;
    }
  }
`;

export const T28Css = `
  ${StyledWrapper.componentStyle.rules.join('\n')}
`;
