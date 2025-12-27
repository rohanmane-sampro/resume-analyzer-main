import React from 'react';
import styled from 'styled-components';

const parseMarkdown = (text) => {
    if (!text) return '';
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br/>');
};

export const T29 = ({ jsonData }) => {
    const skills = jsonData?.skills?.hardSkills?.split(',').map(s => s.trim()).filter(Boolean) || [];
    const softSkills = jsonData?.skills?.softSkills?.split(',').map(s => s.trim()).filter(Boolean) || [];
    const languages = jsonData?.contactInfo?.Languages?.split(',').map(l => l.trim()).filter(Boolean) || [];

    return (
        <StyledWrapper>
            <div className="resume-container">
                {/* Header */}
                <header className="header">
                    <div className="header-content">
                        <h1 className="name">{jsonData?.contactInfo?.fullName || 'YOUR NAME'}</h1>
                        <h2 className="job-title">{jsonData?.contactInfo?.jobTitle || 'Professional Title'}</h2>
                    </div>
                </header>

                {/* Two Column Layout */}
                <div className="main-layout">
                    {/* Left Sidebar */}
                    <aside className="sidebar">
                        {/* Contact */}
                        <section className="sidebar-section">
                            <h3 className="sidebar-title">CONTACT</h3>
                            <div className="sidebar-content">
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
                                    <span className="small-text">{jsonData?.contactInfo?.linkedin?.replace('https://www.linkedin.com/in/', '') || 'LinkedIn'}</span>
                                </div>
                                <div className="contact-item">
                                    <i className="fab fa-github"></i>
                                    <span className="small-text">{jsonData?.contactInfo?.portfolio || 'GitHub'}</span>
                                </div>
                            </div>
                        </section>

                        {/* Skills */}
                        {skills.length > 0 && (
                            <section className="sidebar-section">
                                <h3 className="sidebar-title">TECHNICAL SKILLS</h3>
                                <div className="sidebar-content">
                                    <div className="skills-list">
                                        {skills.slice(0, 12).map((skill, index) => (
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
                                        {softSkills.slice(0, 5).map((skill, index) => (
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
                                    {languages.slice(0, 3).map((lang, index) => (
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
                                    {jsonData.education.slice(0, 2).map((edu, index) => (
                                        <div key={index} className="edu-item">
                                            <div className="edu-year">{edu.graduationYear}</div>
                                            <div className="edu-degree">{edu.degreeName}</div>
                                            <div className="edu-school">{edu.institutionName}</div>
                                            <div className="edu-location">{edu.location}</div>
                                            {edu.currentCGPA && (
                                                <div className="edu-cgpa">CGPA: {edu.currentCGPA}</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Certifications */}
                        {jsonData?.certificates && jsonData.certificates.length > 0 && jsonData.certificates[0].certificateName && (
                            <section className="sidebar-section">
                                <h3 className="sidebar-title">CERTIFICATIONS</h3>
                                <div className="sidebar-content">
                                    {jsonData.certificates.slice(0, 2).map((cert, index) => (
                                        <div key={index} className="cert-item">
                                            <div className="cert-name">{cert.certificateName}</div>
                                            <div className="cert-provider">{cert.providerName}</div>
                                            {cert.courseDuration && (
                                                <div className="cert-duration">{cert.courseDuration}</div>
                                            )}
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
                        {jsonData?.workExperience && jsonData.workExperience.length > 0 && jsonData.workExperience[0].companyName && (
                            <section className="content-section">
                                <h3 className="content-title">PROFESSIONAL EXPERIENCE</h3>
                                <div className="content-body">
                                    {jsonData.workExperience.slice(0, 2).map((exp, index) => (
                                        <div key={index} className="exp-item">
                                            <div className="exp-header">
                                                <div>
                                                    <h4 className="exp-title">{exp.jobTitle}</h4>
                                                    <div className="exp-company">{exp.companyName}</div>
                                                </div>
                                                <div className="exp-duration">{exp.WorkDuration}</div>
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
                            <section className="content-section">
                                <h3 className="content-title">KEY PROJECTS</h3>
                                <div className="content-body">
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
                    </main>
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
    font-family: 'Roboto', 'Arial', sans-serif;
    color: #2c3e50;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .header {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    padding: 25px 35px;
    color: white;
    page-break-inside: avoid;
  }

  .header-content {
    max-width: 100%;
  }

  .name {
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 6px 0;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .job-title {
    font-size: 15px;
    font-weight: 300;
    margin: 0;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    opacity: 0.95;
  }

  .main-layout {
    display: grid;
    grid-template-columns: 230px 1fr;
    flex: 1;
    overflow: hidden;
  }

  .sidebar {
    background: #34495e;
    color: white;
    padding: 25px 18px;
    overflow: hidden;
  }

  .sidebar-section {
    margin-bottom: 20px;
    page-break-inside: avoid;
  }

  .sidebar-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.3px;
    margin: 0 0 12px 0;
    padding-bottom: 6px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
    text-transform: uppercase;
  }

  .sidebar-content {
    font-size: 10px;
    line-height: 1.5;
  }

  .contact-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 10px;
    word-break: break-word;
  }

  .contact-item i {
    font-size: 11px;
    width: 14px;
    margin-top: 2px;
    flex-shrink: 0;
    color: #3498db;
  }

  .small-text {
    font-size: 9px;
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
  }

  .language-item {
    margin-bottom: 12px;
  }

  .language-name {
    font-size: 10px;
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
  }

  .edu-item,
  .cert-item {
    margin-bottom: 14px;
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
    font-size: 9px;
    color: #3498db;
    font-weight: 700;
    margin-bottom: 5px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  .edu-degree {
    font-size: 11px;
    font-weight: 700;
    margin-bottom: 3px;
  }

  .edu-school {
    font-size: 10px;
    opacity: 0.9;
    margin-bottom: 2px;
  }

  .edu-location {
    font-size: 9px;
    opacity: 0.7;
    margin-bottom: 3px;
  }

  .edu-cgpa {
    font-size: 9px;
    color: #3498db;
    font-weight: 600;
  }

  .cert-name {
    font-size: 10px;
    font-weight: 700;
    margin-bottom: 3px;
  }

  .cert-provider {
    font-size: 9px;
    opacity: 0.8;
    margin-bottom: 2px;
  }

  .cert-duration {
    font-size: 8px;
    opacity: 0.7;
  }

  .main-content {
    padding: 25px 30px;
    background: white;
    overflow: hidden;
  }

  .content-section {
    margin-bottom: 20px;
    page-break-inside: avoid;
  }

  .content-title {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1.8px;
    text-transform: uppercase;
    margin: 0 0 14px 0;
    padding-bottom: 8px;
    border-bottom: 3px solid #1e3c72;
    color: #1e3c72;
  }

  .content-body {
    color: #2c3e50;
  }

  .summary-text {
    font-size: 11px;
    line-height: 1.7;
    text-align: justify;
    color: #34495e;
  }

  .exp-item,
  .project-item {
    margin-bottom: 16px;
    padding-bottom: 14px;
    border-bottom: 1px solid #ecf0f1;
  }

  .exp-item:last-child,
  .project-item:last-child {
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

  .exp-title,
  .project-title {
    font-size: 12px;
    font-weight: 700;
    color: #1e3c72;
    margin: 0 0 5px 0;
  }

  .exp-company {
    font-size: 11px;
    color: #7f8c8d;
    font-weight: 600;
    margin-bottom: 3px;
  }

  .exp-duration {
    font-size: 10px;
    color: #95a5a6;
    font-weight: 600;
    white-space: nowrap;
    text-align: right;
  }

  .exp-description,
  .project-description {
    font-size: 10px;
    line-height: 1.6;
    color: #34495e;
    text-align: justify;
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

    .sidebar {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .sidebar-section,
    .content-section {
      page-break-inside: avoid;
    }

    .skill-dot,
    .language-fill {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
`;

export const T29Css = `
  ${StyledWrapper.componentStyle.rules.join('\n')}
`;
