import React from 'react';
import styled from 'styled-components';

export const T26 = ({ jsonData }) => {
  const {
    contactInfo = {},
    Description = {},
    workExperience = [],
    education = [],
    projects = [],
    certificates = [],
    skills = {},
  } = jsonData;

  const hardSkillsList = skills.hardSkills ? skills.hardSkills.split(',').map(s => s.trim()) : [];
  const softSkillsList = skills.softSkills ? skills.softSkills.split(',').map(s => s.trim()) : [];

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        <header className="header">
          <h1 className="name">{contactInfo.fullName || 'Andrew Kim'}</h1>
          <div className="contact-bar">
            <span>{contactInfo.emailAddress}</span>
            {contactInfo.phoneNumber && <span className="dot">•</span>}
            <span>{contactInfo.phoneNumber}</span>
            {contactInfo.Location && <span className="dot">•</span>}
            <span>{contactInfo.Location}</span>
            {contactInfo.portfolio && <span className="dot">•</span>}
            <span>{contactInfo.portfolio}</span>
          </div>
        </header>

        <section className="section">
          <div className="section-title-bar">
            <h2>Profile</h2>
          </div>
          <p className="profile-text">{Description.UserDescription}</p>
        </section>

        {workExperience.length > 0 && (
          <section className="section">
            <div className="section-title-bar">
              <h2>Work Experience</h2>
            </div>
            {workExperience.map((job, index) => (
              <div key={index} className="experience-item">
                <div className="item-left">
                  <span className="duration">{job.WorkDuration}</span>
                </div>
                <div className="item-right">
                  <div className="job-title">{job.jobTitle}</div>
                  <div className="company-name">{job.companyName}</div>
                  <ul className="achievements-list">
                    {job.keyAchievements?.split('\n').map((bullet, i) => (
                      <li key={i}>{bullet.replace(/^[•-]\s*/, '')}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section className="section">
            <div className="section-title-bar">
              <h2>Education</h2>
            </div>
            {education.map((edu, index) => (
              <div key={index} className="experience-item">
                <div className="item-left">
                  <span className="duration">{edu.graduationYear}</span>
                </div>
                <div className="item-right">
                  <div className="job-title">{edu.degreeName}</div>
                  <div className="company-name">{edu.institutionName}</div>
                  {edu.currentCGPA && (
                    <ul className="achievements-list">
                      <li>Grade: {edu.currentCGPA}</li>
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section className="section">
            <div className="section-title-bar">
              <h2>Projects</h2>
            </div>
            {projects.map((proj, index) => (
              <div key={index} className="experience-item">
                <div className="item-left">
                  <span className="duration">{proj.toolsTechUsed}</span>
                </div>
                <div className="item-right">
                  <div className="job-title">{proj.projectTitle}</div>
                  <p className="profile-text" style={{ padding: 0, marginTop: '4px' }}>
                    {proj.projectDescription}
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}

        {(hardSkillsList.length > 0 || softSkillsList.length > 0) && (
          <section className="section">
            <div className="section-title-bar">
              <h2>Skills</h2>
            </div>
            <div className="skills-grid">
              {hardSkillsList.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-name">{skill}</div>
                </div>
              ))}
              {softSkillsList.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-name">{skill}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {certificates.length > 0 && (
          <section className="section">
            <div className="section-title-bar">
              <h2>Certificates</h2>
            </div>
            <div className="skills-grid">
              {certificates.map((cert, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-name">{cert.certificateName}</div>
                  <div className="skill-desc">{cert.providerName} | {cert.courseDuration}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </StyledWrapper>
  );
};

export const T26Css = `
.resume {
width: 210mm;
min-height: 297mm;
padding: 25.4mm 20mm;
margin: 0 auto;
background: white;
font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
color: #1a1a1a;
box-sizing: border-box;
}

.header {
margin-bottom: 25px;
}

.name {
font-size: 26pt;
color: #1e2a44;
margin: 0 0 8px 0;
font-weight: bold;
letter-spacing: -0.5px;
}

.contact-bar {
display: flex;
flex-wrap: wrap;
align-items: center;
gap: 8px;
font-size: 10pt;
color: #333;
}

.dot {
color: #666;
font-weight: bold;
}

.section {
margin-bottom: 20px;
}

.section-title-bar {
background-color: #f0f1f6;
padding: 6px 15px;
margin-bottom: 12px;
display: flex;
justify-content: center;
}

.section-title-bar h2 {
font-size: 13pt;
color: #1e2a44;
margin: 0;
text-transform: capitalize;
font-weight: bold;
}

.profile-text {
font-size: 10pt;
line-height: 1.5;
margin: 0;
padding: 0 5px;
color: #2c2c2c;
}

.experience-item {
display: flex;
margin-bottom: 15px;
padding: 0 5px;
}

.item-left {
width: 28%;
flex-shrink: 0;
font-size: 9.5pt;
color: #444;
padding-top: 2px;
}

.item-right {
width: 72%;
}

.job-title {
font-size: 11pt;
font-weight: bold;
color: #1a1a1a;
margin-bottom: 2px;
}

.company-name {
font-size: 10.5pt;
font-style: italic;
color: #444;
margin-bottom: 6px;
}

.achievements-list {
margin: 0;
padding-left: 18px;
list-style-type: disc;
}

.achievements-list li {
font-size: 10pt;
line-height: 1.4;
margin-bottom: 4px;
color: #2c2c2c;
}

.skills-grid {
display: grid;
grid-template-columns: 1fr 1fr;
gap: 15px;
padding: 0 5px;
}

.skill-item {
margin-bottom: 5px;
}

.skill-name {
font-size: 10.5pt;
font-weight: bold;
color: #1a1a1a;
}

.skill-desc {
font-size: 9.5pt;
color: #555;
margin-top: 2px;
}

@media print {
body {
margin: 0;
padding: 0;
}
.resume {
margin: 0;
box-shadow: none;
width: 210mm;
height: 297mm;
}
}
`;

const StyledWrapper = styled.div`${T26Css}`;