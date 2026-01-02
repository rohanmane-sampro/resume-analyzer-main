import React from 'react';
import styled from 'styled-components';

export const T28 = ({ jsonData }) => {
  const {
    contactInfo = {},
    Description = {},
    workExperience = [],
    education = [],
    projects = [],
    certificates = [],
    skills = {},
  } = jsonData;

  const hardSkills = skills.hardSkills ? skills.hardSkills.split(',').map(s => s.trim()) : [];
  const softSkills = skills.softSkills ? skills.softSkills.split(',').map(s => s.trim()) : [];

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        <header className="header">
          <h1 className="name">{contactInfo.fullName || 'ARTHUR J. PENDELTON'}</h1>
          <div className="contact-line">
            {contactInfo.Location && <span>{contactInfo.Location}</span>}
            {contactInfo.phoneNumber && (
              <>
                <span className="separator">|</span>
                <span>{contactInfo.phoneNumber}</span>
              </>
            )}
            {contactInfo.emailAddress && (
              <>
                <span className="separator">|</span>
                <span className="email">{contactInfo.emailAddress}</span>
              </>
            )}
          </div>
          <hr className="header-divider" />
        </header>

        {education.length > 0 && (
          <section className="section">
            <h2 className="section-title">EDUCATION</h2>
            <ul className="main-list">
              {education.map((edu, index) => (
                <li key={index} className="main-item">
                  <strong>{edu.institutionName}</strong>, {edu.degreeName} {edu.graduationYear && `, ${edu.graduationYear}`}
                  {edu.currentCGPA && <span> (GPA: {edu.currentCGPA})</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {workExperience.length > 0 && (
          <section className="section">
            <h2 className="section-title">ACADEMIC EXPERIENCE</h2>
            <ul className="main-list">
              {workExperience.map((exp, index) => (
                <li key={index} className="main-item">
                  <div className="entry-header">
                    <strong>{exp.companyName}</strong>
                    <span>{exp.WorkDuration}</span>
                  </div>
                  <ul className="sub-list">
                    <li className="sub-item">
                      {exp.jobTitle}
                      {exp.keyAchievements && (
                        <ul className="inner-list">
                          {exp.keyAchievements.split('\n').map((achievement, aIdx) => (
                            achievement.trim() && <li key={aIdx}>{achievement.trim()}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        )}

        {projects.length > 0 && (
          <section className="section">
            <h2 className="section-title">PUBLICATIONS & PROJECTS</h2>
            <ul className="main-list">
              {projects.map((project, index) => (
                <li key={index} className="main-item project-item">
                  <strong>{project.projectTitle}</strong>. {project.toolsTechUsed && `(${project.toolsTechUsed}). `}
                  {project.projectDescription}
                </li>
              ))}
            </ul>
          </section>
        )}

        {certificates.length > 0 && (
          <section className="section">
            <h2 className="section-title">AWARDS & HONORS</h2>
            <ul className="main-list">
              {certificates.map((cert, index) => (
                <li key={index} className="main-item">
                  <strong>{cert.certificateName}</strong>, {cert.providerName} {cert.courseDuration && `(${cert.courseDuration})`}
                </li>
              ))}
            </ul>
          </section>
        )}

        {(hardSkills.length > 0 || softSkills.length > 0) && (
          <section className="section">
            <h2 className="section-title">SKILLS & COMPETENCIES</h2>
            <ul className="main-list">
              {hardSkills.length > 0 && (
                <li className="main-item">
                  <strong>Technical Skills:</strong> {hardSkills.join(', ')}
                </li>
              )}
              {softSkills.length > 0 && (
                <li className="main-item">
                  <strong>Professional Skills:</strong> {softSkills.join(', ')}
                </li>
              )}
            </ul>
          </section>
        )}

        {Description.UserDescription && (
          <section className="section">
            <h2 className="section-title">ADDITIONAL INFORMATION</h2>
            <div className="description-text">{Description.UserDescription}</div>
          </section>
        )}
      </div>
    </StyledWrapper>
  );
};

export const T28Css = `
.resume {
width: 210mm;
min-height: 297mm;
padding: 15mm 20mm;
margin: 0 auto;
background-color: white;
font-family: "Times New Roman", Times, serif;
color: #000;
box-sizing: border-box;
line-height: 1.3;
}

.header {
text-align: center;
margin-bottom: 20px;
}

.name {
font-size: 26pt;
font-weight: normal;
margin: 0 0 8px 0;
text-transform: uppercase;
letter-spacing: 1px;
}

.contact-line {
font-size: 10pt;
margin-bottom: 8px;
display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;
gap: 8px;
}

.separator {
padding: 0 2px;
}

.header-divider {
border: none;
border-top: 1px solid #000;
margin: 0;
width: 100%;
}

.section {
margin-bottom: 15px;
}

.section-title {
font-size: 12pt;
font-weight: bold;
text-transform: uppercase;
border-bottom: 1px solid #000;
margin: 0 0 10px 0;
padding-bottom: 2px;
}

.main-list {
list-style-type: disc;
padding-left: 20px;
margin: 0;
}

.main-item {
font-size: 10.5pt;
margin-bottom: 6px;
}

.entry-header {
display: flex;
justify-content: space-between;
align-items: baseline;
}

.sub-list {
list-style-type: circle;
padding-left: 20px;
margin: 3px 0;
}

.sub-item {
font-size: 10pt;
margin-bottom: 2px;
}

.inner-list {
list-style-type: square;
padding-left: 20px;
margin: 2px 0;
}

.project-item {
text-align: justify;
}

.description-text {
font-size: 10pt;
text-align: justify;
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
@page {
size: A4 portrait;
margin: 0;
}
}
`;

const StyledWrapper = styled.div`${T28Css}`;