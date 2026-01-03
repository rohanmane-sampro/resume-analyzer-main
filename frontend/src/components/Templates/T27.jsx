import React from 'react';
import styled from 'styled-components';

const parseMarkdown = (text) => {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
};

export const T27 = ({ jsonData }) => {
  const skills = jsonData?.skills?.hardSkills?.split(',').map(s => s.trim()).filter(Boolean) || [];
  const softSkills = jsonData?.skills?.softSkills?.split(',').map(s => s.trim()).filter(Boolean) || [];
  const languages = jsonData?.contactInfo?.Languages?.split(',').map(l => l.trim()).filter(Boolean) || [];

  return (
    <StyledWrapper>
      <div className="resume-container">
        {/* Header Section with Gradient */}
        <header className="header">
          <div className="header-content">
            <div className="profile-section">
              {jsonData?.contactInfo?.profileImage && (
                <div className="profile-image-wrapper">
                  <img
                    src={jsonData.contactInfo.profileImage}
                    alt="Profile"
                    className="profile-image"
                  />
                </div>
              )}
              <div className="header-text">
                <h1 className="name">{jsonData?.contactInfo?.fullName || 'Your Name'}</h1>
                <h2 className="job-title">{jsonData?.contactInfo?.jobTitle || 'Professional Title'}</h2>
              </div>
            </div>

            <div className="contact-grid">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>{jsonData?.contactInfo?.emailAddress || 'email@example.com'}</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>{jsonData?.contactInfo?.phoneNumber || '+1234567890'}</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{jsonData?.contactInfo?.Location || 'Location'}</span>
              </div>
              <div className="contact-item">
                <i className="fab fa-linkedin"></i>
                <span className="link-text">{jsonData?.contactInfo?.linkedin?.replace('https://www.linkedin.com/in/', '') || 'LinkedIn'}</span>
              </div>
              <div className="contact-item">
                <i className="fab fa-github"></i>
                <span className="link-text">{jsonData?.contactInfo?.portfolio || 'Portfolio'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="main-content">
          {/* Professional Summary */}
          {jsonData?.Description?.UserDescription && (
            <section className="section">
              <div className="section-header">
                <i className="fas fa-user-circle"></i>
                <h3>Professional Summary</h3>
              </div>
              <div className="section-content">
                <p className="summary-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(jsonData.Description.UserDescription) }} />
              </div>
            </section>
          )}

          {/* Two Column Layout */}
          <div className="two-column">
            {/* Left Column */}
            <div className="left-column">
              {/* Skills */}
              {skills.length > 0 && (
                <section className="section">
                  <div className="section-header">
                    <i className="fas fa-code"></i>
                    <h3>Technical Skills</h3>
                  </div>
                  <div className="section-content">
                    <div className="skills-grid">
                      {skills.slice(0, 12).map((skill, index) => (
                        <div key={index} className="skill-tag">{skill}</div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Soft Skills */}
              {softSkills.length > 0 && (
                <section className="section">
                  <div className="section-header">
                    <i className="fas fa-lightbulb"></i>
                    <h3>Core Competencies</h3>
                  </div>
                  <div className="section-content">
                    <ul className="competencies-list">
                      {softSkills.slice(0, 5).map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {/* Languages */}
              {languages.length > 0 && (
                <section className="section">
                  <div className="section-header">
                    <i className="fas fa-language"></i>
                    <h3>Languages</h3>
                  </div>
                  <div className="section-content">
                    <div className="languages-list">
                      {languages.slice(0, 3).map((lang, index) => (
                        <div key={index} className="language-item">
                          <span className="language-name">{lang}</span>
                          <div className="language-bar">
                            <div className="language-fill"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Certifications */}
              {jsonData?.certificates && jsonData.certificates.length > 0 && jsonData.certificates[0].certificateName && (
                <section className="section">
                  <div className="section-header">
                    <i className="fas fa-certificate"></i>
                    <h3>Certifications</h3>
                  </div>
                  <div className="section-content">
                    {jsonData.certificates.slice(0, 3).map((cert, index) => (
                      <div key={index} className="cert-item">
                        <div className="cert-name">{cert.certificateName}</div>
                        <div className="cert-details">
                          <span className="cert-provider">{cert.providerName}</span>
                          {cert.courseDuration && <span className="cert-duration"> • {cert.courseDuration}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column */}
            <div className="right-column">
              {/* Education */}
              {jsonData?.education && jsonData.education.length > 0 && (
                <section className="section">
                  <div className="section-header">
                    <i className="fas fa-graduation-cap"></i>
                    <h3>Education</h3>
                  </div>
                  <div className="section-content">
                    {jsonData.education.slice(0, 2).map((edu, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <h4 className="timeline-title">{edu.degreeName}</h4>
                          <div className="timeline-subtitle">{edu.institutionName}</div>
                          <div className="timeline-meta">
                            <span>{edu.location}</span>
                            <span className="separator">•</span>
                            <span>{edu.graduationYear}</span>
                            {edu.currentCGPA && (
                              <>
                                <span className="separator">•</span>
                                <span className="cgpa">CGPA: {edu.currentCGPA}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Work Experience */}
              {jsonData?.workExperience && jsonData.workExperience.length > 0 && jsonData.workExperience[0].companyName && (
                <section className="section">
                  <div className="section-header">
                    <i className="fas fa-briefcase"></i>
                    <h3>Work Experience</h3>
                  </div>
                  <div className="section-content">
                    {jsonData.workExperience.slice(0, 2).map((exp, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <h4 className="timeline-title">{exp.jobTitle}</h4>
                          <div className="timeline-subtitle">{exp.companyName}</div>
                          <div className="timeline-meta">
                            <span>{exp.WorkDuration}</span>
                          </div>
                          {exp.keyAchievements && (
                            <div className="timeline-description" dangerouslySetInnerHTML={{ __html: parseMarkdown(exp.keyAchievements) }} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Projects */}
              {jsonData?.projects && jsonData.projects.length > 0 && (
                <section className="section">
                  <div className="section-header">
                    <i className="fas fa-project-diagram"></i>
                    <h3>Projects</h3>
                  </div>
                  <div className="section-content">
                    {jsonData.projects.slice(0, 2).map((project, index) => (
                      <div key={index} className="project-item">
                        <h4 className="project-title">{project.projectTitle}</h4>
                        {project.toolsTechUsed && (
                          <div className="project-tech" dangerouslySetInnerHTML={{ __html: parseMarkdown(project.toolsTechUsed) }} />
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
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
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #2d3748;
    position: relative;
    overflow: hidden;
  }

  .header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 25px 30px;
    color: white !important;
    position: relative;
    overflow: hidden;
  }

  .header * {
    color: white !important;
  }

  .header::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }

  .header-content {
    position: relative;
    z-index: 1;
  }

  .profile-section {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 15px;
  }

  .profile-image-wrapper {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.3);
    padding: 3px;
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    flex-shrink: 0;
  }

  .profile-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  .header-text {
    flex: 1;
  }

  .name {
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 5px 0;
    letter-spacing: -0.5px;
    color: white !important;
  }

  .job-title {
    font-size: 16px;
    font-weight: 400;
    margin: 0;
    opacity: 0.95;
    letter-spacing: 0.5px;
    color: white !important;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 8px;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    background: rgba(255, 255, 255, 0.15);
    padding: 6px 10px;
    border-radius: 5px;
    backdrop-filter: blur(10px);
  }

  .contact-item i {
    font-size: 12px;
    width: 14px;
    text-align: center;
    flex-shrink: 0;
  }

  .link-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .main-content {
    padding: 20px 30px;
  }

  .section {
    margin-bottom: 18px;
    page-break-inside: avoid;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
    padding-bottom: 6px;
    border-bottom: 2px solid #667eea;
  }

  .section-header i {
    font-size: 16px;
    color: #667eea;
  }

  .section-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: #2d3748;
    letter-spacing: -0.3px;
  }

  .section-content {
    padding-left: 26px;
  }

  .summary-text {
    line-height: 1.6;
    color: #4a5568;
    font-size: 11px;
    text-align: justify;
  }

  .two-column {
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 25px;
    margin-top: 15px;
  }

  .skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .skill-tag {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 4px 10px;
    border-radius: 15px;
    font-size: 10px;
    font-weight: 500;
    box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3);
  }

  .competencies-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .competencies-list li {
    padding: 5px 0;
    padding-left: 15px;
    position: relative;
    font-size: 11px;
    color: #4a5568;
  }

  .competencies-list li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: #667eea;
    font-weight: bold;
  }

  .languages-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .language-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .language-name {
    font-size: 11px;
    font-weight: 600;
    color: #2d3748;
  }

  .language-bar {
    height: 5px;
    background: #e2e8f0;
    border-radius: 3px;
    overflow: hidden;
  }

  .language-fill {
    height: 100%;
    width: 85%;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    border-radius: 3px;
  }

  .cert-item {
    margin-bottom: 10px;
  }

  .cert-name {
    font-weight: 600;
    font-size: 11px;
    color: #2d3748;
    margin-bottom: 3px;
  }

  .cert-details {
    font-size: 10px;
    color: #718096;
  }

  .cert-provider {
    color: #667eea;
    font-weight: 500;
  }

  .timeline-item {
    position: relative;
    padding-left: 20px;
    margin-bottom: 16px;
  }

  .timeline-marker {
    position: absolute;
    left: 0;
    top: 5px;
    width: 10px;
    height: 10px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 0 0 2px #667eea;
  }

  .timeline-content {
    padding-bottom: 14px;
    border-left: 2px solid #e2e8f0;
    padding-left: 15px;
    margin-left: 4px;
  }

  .timeline-item:last-child .timeline-content {
    border-left: none;
  }

  .timeline-title {
    font-size: 12px;
    font-weight: 700;
    color: #2d3748;
    margin: 0 0 4px 0;
  }

  .timeline-subtitle {
    font-size: 11px;
    color: #667eea;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .timeline-meta {
    font-size: 10px;
    color: #718096;
    margin-bottom: 6px;
  }

  .separator {
    margin: 0 5px;
  }

  .cgpa {
    font-weight: 600;
    color: #667eea;
  }

  .timeline-description {
    font-size: 10px;
    line-height: 1.5;
    color: #4a5568;
    margin-top: 6px;
  }

  .project-item {
    margin-bottom: 12px;
    padding: 10px;
    background: #f7fafc;
    border-radius: 6px;
    border-left: 3px solid #667eea;
  }

  .project-title {
    font-size: 11px;
    font-weight: 700;
    color: #2d3748;
    margin: 0 0 6px 0;
  }

  .project-tech {
    font-size: 10px;
    line-height: 1.5;
    color: #4a5568;
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
      overflow: hidden !important;
    }

    .header {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      page-break-inside: avoid;
    }

    .section {
      page-break-inside: avoid;
    }

    .skill-tag, .timeline-marker, .language-fill {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
`;

export const T27Css = `
  ${StyledWrapper.componentStyle.rules.join('\n')}
`;
