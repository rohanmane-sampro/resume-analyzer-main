import React from 'react';
import styled from 'styled-components';

const parseMarkdown = (text) => {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
};

export const T30 = ({ jsonData }) => {
  const skills = jsonData?.skills?.hardSkills?.split(',').map(s => s.trim()).filter(Boolean) || [];
  const softSkills = jsonData?.skills?.softSkills?.split(',').map(s => s.trim()).filter(Boolean) || [];
  const languages = jsonData?.contactInfo?.Languages?.split(',').map(l => l.trim()).filter(Boolean) || [];

  return (
    <StyledWrapper>
      <div className="resume-container">
        {/* Header */}
        <header className="header">
          <h1 className="name">{jsonData?.contactInfo?.fullName || 'YOUR NAME'}</h1>
          <h2 className="job-title">{jsonData?.contactInfo?.jobTitle || 'Professional Title'}</h2>

          <div className="contact-bar">
            <div className="contact-group">
              <span className="contact-item">
                <i className="fas fa-envelope"></i>
                {jsonData?.contactInfo?.emailAddress || 'email@example.com'}
              </span>
              <span className="separator">•</span>
              <span className="contact-item">
                <i className="fas fa-phone"></i>
                {jsonData?.contactInfo?.phoneNumber || '+1234567890'}
              </span>
              <span className="separator">•</span>
              <span className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                {jsonData?.contactInfo?.Location || 'Location'}
              </span>
            </div>
            <div className="contact-group">
              <span className="contact-item">
                <i className="fab fa-linkedin"></i>
                {jsonData?.contactInfo?.linkedin?.replace('https://www.linkedin.com/in/', '') || 'LinkedIn'}
              </span>
              <span className="separator">•</span>
              <span className="contact-item">
                <i className="fab fa-github"></i>
                {jsonData?.contactInfo?.portfolio || 'GitHub'}
              </span>
            </div>
          </div>
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
                        {skills.slice(0, 15).map((skill, index) => (
                          <span key={index} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {softSkills.length > 0 && (
                    <div className="expertise-column">
                      <h4 className="expertise-heading">Core Competencies</h4>
                      <div className="competencies-list">
                        {softSkills.slice(0, 6).map((skill, index) => (
                          <div key={index} className="competency-item">{skill}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {languages.length > 0 && (
                    <div className="expertise-column">
                      <h4 className="expertise-heading">Languages</h4>
                      <div className="languages-list">
                        {languages.slice(0, 3).map((lang, index) => (
                          <div key={index} className="language-item">{lang}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Experience */}
          {jsonData?.workExperience && jsonData.workExperience.length > 0 && jsonData.workExperience[0].companyName && (
            <section className="section">
              <h3 className="section-title">Experience</h3>
              <div className="section-content">
                {jsonData.workExperience.slice(0, 2).map((exp, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-header">
                      <div className="timeline-left">
                        <h4 className="timeline-title">{exp.jobTitle}</h4>
                        <div className="timeline-subtitle">{exp.companyName}</div>
                      </div>
                      <div className="timeline-right">
                        <span className="timeline-duration">{exp.WorkDuration}</span>
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
                <div className="projects-grid">
                  {jsonData.projects.slice(0, 2).map((project, index) => (
                    <div key={index} className="project-card">
                      <h4 className="project-title">{project.projectTitle}</h4>
                      {project.toolsTechUsed && (
                        <div className="project-description" dangerouslySetInnerHTML={{ __html: parseMarkdown(project.toolsTechUsed) }} />
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
                {jsonData.education.slice(0, 2).map((edu, index) => (
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
                    <div className="edu-location">{edu.location}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {jsonData?.certificates && jsonData.certificates.length > 0 && jsonData.certificates[0].certificateName && (
            <section className="section">
              <h3 className="section-title">Certifications</h3>
              <div className="section-content">
                <div className="certifications-grid">
                  {jsonData.certificates.slice(0, 3).map((cert, index) => (
                    <div key={index} className="cert-card">
                      <div className="cert-name">{cert.certificateName}</div>
                      <div className="cert-meta">
                        <span className="cert-provider">{cert.providerName}</span>
                        {cert.courseDuration && (
                          <span className="cert-duration"> • {cert.courseDuration}</span>
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

const StyledWrapper = styled.div`
  .resume-container {
    width: 210mm;
    min-height: 297mm;
    max-height: 297mm;
    background: white;
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
    color: #1a202c;
    padding: 35px 45px;
    overflow: hidden;
  }

  .header {
    padding-bottom: 25px;
    margin-bottom: 28px;
    border-bottom: 1px solid #e2e8f0;
    page-break-inside: avoid;
  }

  .name {
    font-size: 32px;
    font-weight: 300;
    letter-spacing: -1px;
    margin: 0 0 6px 0;
    color: #1a202c;
  }

  .job-title {
    font-size: 14px;
    font-weight: 400;
    color: #718096;
    margin: 0 0 18px 0;
    letter-spacing: 0.5px;
  }

  .contact-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    font-size: 10px;
    color: #4a5568;
  }

  .contact-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .contact-item {
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }

  .contact-item i {
    font-size: 9px;
    color: #a0aec0;
  }

  .separator {
    color: #cbd5e0;
  }

  .main-content {
    max-width: 100%;
  }

  .section {
    margin-bottom: 25px;
    page-break-inside: avoid;
  }

  .section-title {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.8px;
    text-transform: uppercase;
    color: #2d3748;
    margin: 0 0 14px 0;
    padding-bottom: 6px;
    border-bottom: 1px solid #e2e8f0;
  }

  .section-content {
    padding-left: 0;
  }

  .summary-text {
    font-size: 11px;
    line-height: 1.7;
    color: #4a5568;
    text-align: justify;
  }

  .expertise-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 18px;
  }

  .expertise-column {
    min-width: 0;
  }

  .expertise-heading {
    font-size: 10px;
    font-weight: 600;
    color: #2d3748;
    margin: 0 0 10px 0;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  .skills-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .skill-tag {
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    color: #2d3748;
    padding: 4px 10px;
    border-radius: 3px;
    font-size: 9px;
    font-weight: 500;
  }

  .competencies-list,
  .languages-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .competency-item,
  .language-item {
    font-size: 10px;
    color: #4a5568;
    padding-left: 12px;
    position: relative;
  }

  .competency-item::before,
  .language-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 6px;
    width: 3px;
    height: 3px;
    background: #cbd5e0;
    border-radius: 50%;
  }

  .timeline-item {
    margin-bottom: 18px;
    padding-bottom: 18px;
    border-bottom: 1px solid #f7fafc;
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
    margin-bottom: 10px;
    gap: 15px;
  }

  .timeline-left {
    flex: 1;
  }

  .timeline-right {
    text-align: right;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .timeline-title {
    font-size: 12px;
    font-weight: 600;
    color: #1a202c;
    margin: 0 0 4px 0;
  }

  .timeline-subtitle {
    font-size: 11px;
    color: #718096;
    font-weight: 500;
  }

  .timeline-duration {
    font-size: 10px;
    color: #a0aec0;
    font-weight: 500;
    white-space: nowrap;
  }

  .timeline-description {
    font-size: 10px;
    line-height: 1.6;
    color: #4a5568;
    text-align: justify;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 14px;
  }

  .project-card {
    padding: 12px;
    background: #f7fafc;
    border-radius: 5px;
    border-left: 3px solid #cbd5e0;
  }

  .project-title {
    font-size: 11px;
    font-weight: 600;
    color: #2d3748;
    margin: 0 0 8px 0;
  }

  .project-description {
    font-size: 10px;
    line-height: 1.5;
    color: #4a5568;
  }

  .edu-item {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f7fafc;
  }

  .edu-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .edu-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 6px;
    gap: 15px;
  }

  .edu-left {
    flex: 1;
  }

  .edu-right {
    text-align: right;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .edu-degree {
    font-size: 12px;
    font-weight: 600;
    color: #1a202c;
    margin: 0 0 4px 0;
  }

  .edu-school {
    font-size: 11px;
    color: #718096;
    font-weight: 500;
  }

  .edu-year {
    font-size: 10px;
    color: #a0aec0;
    font-weight: 500;
  }

  .edu-cgpa {
    font-size: 10px;
    color: #4a5568;
    font-weight: 600;
  }

  .edu-location {
    font-size: 10px;
    color: #a0aec0;
  }

  .certifications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 12px;
  }

  .cert-card {
    padding: 10px;
    background: #f7fafc;
    border-radius: 4px;
  }

  .cert-name {
    font-size: 11px;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 5px;
  }

  .cert-meta {
    font-size: 9px;
    color: #718096;
  }

  .cert-provider {
    font-weight: 500;
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

    .timeline-item,
    .project-card,
    .edu-item {
      page-break-inside: avoid;
    }
  }
`;

export const T30Css = `
  ${StyledWrapper.componentStyle.rules.join('\n')}
`;
