import React from 'react';
import styled from 'styled-components';

export const T23 = ({ jsonData }) => {
  const contact = jsonData?.contactInfo || {};
  const description = jsonData?.Description?.UserDescription || '';
  const workExperience = jsonData?.workExperience || [];
  const education = jsonData?.education || [];
  const projects = jsonData?.projects || [];
  const certificates = jsonData?.certificates || [];
  const hardSkills = jsonData?.skills?.hardSkills ? jsonData.skills.hardSkills.split(',').map(s => s.trim()) : [];
  const softSkills = jsonData?.skills?.softSkills ? jsonData.skills.softSkills.split(',').map(s => s.trim()) : [];

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        <header className="header">
          <h1 className="name">{contact.fullName || 'Name'}</h1>
          <h2 className="job-title">{workExperience[0]?.jobTitle || 'Professional Title'}</h2>

          <div className="contact-bar">
            <div className="contact-item">
              <span className="icon">✉</span>
              {contact.emailAddress}
            </div>
            <div className="contact-item">
              <span className="icon">📞</span>
              {contact.phoneNumber}
            </div>
            <div className="contact-item">
              <span className="icon">📍</span>
              {contact.Location}
            </div>
            {contact.portfolio && (
              <div className="contact-item">
                <span className="icon">🔗</span>
                {contact.portfolio.replace(/^https?:\/\//, '')}
              </div>
            )}
          </div>
        </header>

        <div className="main-content">
          <div className="left-column">
            <section className="section">
              <h3 className="section-title">Profile</h3>
              <div className="section-divider" />
              <p className="profile-text">{description}</p>
            </section>

            <section className="section">
              <h3 className="section-title">Professional Experience</h3>
              <div className="section-divider" />
              {workExperience.map((work, index) => (
                <div key={index} className="experience-item">
                  <div className="item-header">
                    <span className="item-title">{work.jobTitle}</span>
                  </div>
                  <div className="item-sub-header">
                    <span className="item-org">{work.companyName}</span>
                    <span className="item-date">{work.WorkDuration}</span>
                  </div>
                  <div className="item-content">
                    {work.keyAchievements?.split('\n').map((achievement, i) => (
                      <div key={i} className="bullet-point">
                        <span className="bullet">•</span>
                        <span className="bullet-text">{achievement.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </div>

          <div className="right-column">
            <section className="section">
              <h3 className="section-title">Technical Skills</h3>
              <div className="section-divider" />
              <div className="skills-container">
                <div className="skill-group">
                  <span className="skill-label">Hard Skills:</span>
                  <p className="skill-list">{hardSkills.join(', ')}</p>
                </div>
                {softSkills.length > 0 && (
                  <div className="skill-group">
                    <span className="skill-label">Soft Skills:</span>
                    <p className="skill-list">{softSkills.join(', ')}</p>
                  </div>
                )}
              </div>
            </section>

            <section className="section">
              <h3 className="section-title">Education</h3>
              <div className="section-divider" />
              {education.map((edu, index) => (
                <div key={index} className="education-item">
                  <span className="item-title">{edu.degreeName}</span>
                  <span className="item-org">{edu.institutionName}</span>
                  <div className="item-sub-header">
                    <span className="item-date">{edu.graduationYear}</span>
                    {edu.currentCGPA && <span className="item-grade">CGPA: {edu.currentCGPA}</span>}
                  </div>
                </div>
              ))}
            </section>

            {projects.length > 0 && (
              <section className="section">
                <h3 className="section-title">Key Technical Projects</h3>
                <div className="section-divider" />
                {projects.map((project, index) => (
                  <div key={index} className="project-item">
                    <div className="bullet-point">
                      <span className="bullet">•</span>
                      <span className="item-title">{project.projectTitle}</span>
                    </div>
                    <p className="project-description">
                      {project.toolsTechUsed && <strong>{project.toolsTechUsed} - </strong>}
                      {project.projectDescription}
                    </p>
                  </div>
                ))}
              </section>
            )}

            {certificates.length > 0 && (
              <section className="section">
                <h3 className="section-title">Certifications</h3>
                <div className="section-divider" />
                {certificates.map((cert, index) => (
                  <div key={index} className="cert-item">
                    <span className="item-title">{cert.certificateName}</span>
                    <div className="item-sub-header">
                      <span className="item-org">{cert.providerName}</span>
                      <span className="item-date">{cert.courseDuration}</span>
                    </div>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

export const T23Css = `
@media print {
* {
-webkit-print-color-adjust: exact !important;
print-color-adjust: exact !important;
}
body {
margin: 0;
padding: 0;
}
@page {
size: A4 portrait;
margin: 0;
}
.resume {
width: 210mm !important;
height: 297mm !important;
margin: 0 !important;
padding: 15mm !important;
box-shadow: none !important;
}
}

.resume {
width: 210mm;
height: 297mm;
padding: 15mm;
margin: 20px auto;
background-color: white;
font-family: 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif;
color: #333;
box-sizing: border-box;
box-shadow: 0 0 10px rgba(0,0,0,0.1);
display: flex;
flex-direction: column;
}

.header {
margin-bottom: 20px;
}

.name {
font-size: 24pt;
font-weight: 700;
margin: 0;
color: #000;
}

.job-title {
font-size: 14pt;
font-weight: 500;
margin: 4px 0 12px 0;
color: #444;
}

.contact-bar {
display: flex;
flex-wrap: wrap;
gap: 15px;
font-size: 9pt;
border-top: 1px solid #ddd;
border-bottom: 1px solid #ddd;
padding: 8px 0;
}

.contact-item {
display: flex;
align-items: center;
gap: 4px;
}

.icon {
font-size: 10pt;
}

.main-content {
display: flex;
gap: 30px;
flex: 1;
}

.left-column {
flex: 1.8;
}

.right-column {
flex: 1;
}

.section {
margin-bottom: 20px;
}

.section-title {
font-size: 12pt;
font-weight: 700;
text-transform: uppercase;
margin: 0 0 4px 0;
color: #000;
}

.section-divider {
height: 1.5px;
background-color: #000;
margin-bottom: 10px;
}

.profile-text {
font-size: 9.5pt;
line-height: 1.5;
margin: 0;
text-align: justify;
}

.experience-item, .education-item, .project-item, .cert-item {
margin-bottom: 15px;
}

.item-header {
display: flex;
justify-content: space-between;
align-items: center;
}

.item-title {
font-size: 10.5pt;
font-weight: 700;
color: #000;
}

.item-sub-header {
display: flex;
justify-content: space-between;
font-size: 9pt;
color: #555;
margin: 2px 0 4px 0;
}

.item-org {
font-weight: 600;
}

.item-date {
font-style: italic;
}

.item-content {
margin-top: 5px;
}

.bullet-point {
display: flex;
gap: 8px;
margin-bottom: 3px;
line-height: 1.4;
}

.bullet {
font-size: 10pt;
}

.bullet-text {
font-size: 9.5pt;
}

.skills-container {
display: flex;
flex-direction: column;
gap: 10px;
}

.skill-group {
font-size: 9.5pt;
}

.skill-label {
font-weight: 700;
display: block;
margin-bottom: 2px;
}

.skill-list {
margin: 0;
line-height: 1.4;
}

.project-description {
font-size: 9pt;
margin: 4px 0 0 18px;
line-height: 1.4;
}

.item-grade {
font-weight: 600;
}
`;

const StyledWrapper = styled.div`${T23Css}`;