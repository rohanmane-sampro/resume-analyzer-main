import React from 'react';
import styled from 'styled-components';

export const T29 = ({ jsonData }) => {
  const name = jsonData.contactInfo?.fullName || 'JONATHAN DOE';
  const jobTitle = jsonData.workExperience?.[0]?.jobTitle || 'SENIOR SOFTWARE ENGINEER';

  const education = jsonData.education || [];
  const workExperience = jsonData.workExperience || [];
  const projects = jsonData.projects || [];
  const certificates = jsonData.certificates || [];

  const hardSkills = jsonData.skills?.hardSkills
    ? jsonData.skills.hardSkills.split(',').map(s => s.trim()).filter(s => s)
    : [];

  const languages = ["English (Native)", "Spanish (Professional)", "Mandarin (Conversational)"];

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        <header className="header">
          <h1 className="name">{name}</h1>
          <p className="title">{jobTitle}</p>
        </header>

        <div className="main-container">
          <aside className="sidebar">
            <section className="side-section">
              <h2 className="side-title">EDUCATION</h2>
              {education.map((edu, index) => (
                <div key={index} className="side-item">
                  <p className="bold">{edu.degreeName}</p>
                  <p>{edu.institutionName},</p>
                  <p>{edu.graduationYear}</p>
                  {edu.currentCGPA && <p>GPA: {edu.currentCGPA}</p>}
                </div>
              ))}
            </section>

            <section className="side-section">
              <h2 className="side-title">SKILLS</h2>
              {hardSkills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span>{skill}</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: `${95 - (index * 5)}%` }}></div>
                  </div>
                </div>
              ))}
            </section>

            <section className="side-section">
              <h2 className="side-title">LANGUAGES</h2>
              {languages.map((lang, index) => (
                <p key={index} className="side-text">{lang}</p>
              ))}
            </section>

            <section className="side-section">
              <h2 className="side-title">CERTIFICATIONS</h2>
              {certificates.map((cert, index) => (
                <div key={index} className="side-item">
                  <p className="bold-sm">{cert.certificateName}</p>
                  <p className="small-text">{cert.providerName}</p>
                  <p className="small-text">{cert.courseDuration}</p>
                </div>
              ))}
            </section>
          </aside>

          <main className="content">
            <section className="content-section">
              <h2 className="content-title">WORK EXPERIENCE</h2>
              {workExperience.map((work, index) => (
                <div key={index} className="experience-item">
                  <div className="exp-header">
                    <p className="bold">{work.jobTitle?.toUpperCase()}</p>
                    <p className="sub-header">{work.companyName}, {work.WorkDuration}</p>
                  </div>
                  <ul className="achievements-list">
                    {work.keyAchievements?.split('\n').map((achievement, i) => (
                      <li key={i}>{achievement.replace(/^[•-]\s*/, '')}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <section className="content-section">
              <h2 className="content-title">PROJECTS</h2>
              {projects.map((project, index) => (
                <div key={index} className="project-item">
                  <p className="bold">PROJECT: {project.projectTitle}</p>
                  <p className="sub-header">{project.toolsTechUsed}</p>
                  <p className="project-desc">{project.projectDescription}</p>
                </div>
              ))}
            </section>
          </main>
        </div>
      </div>
    </StyledWrapper>
  );
};

export const T29Css = `
@media print {
* {
-webkit-print-color-adjust: exact !important;
print-color-adjust: exact !important;
}
@page {
size: A4;
margin: 0;
}
.resume {
box-shadow: none !important;
margin: 0 !important;
}
}

.resume {
width: 210mm;
min-height: 297mm;
background-color: white;
font-family: 'Helvetica', 'Arial', sans-serif;
color: #333;
display: flex;
flex-direction: column;
box-shadow: 0 0 10px rgba(0,0,0,0.1);
margin: 0 auto;
}

.header {
background-color: #20354b;
color: white;
padding: 40px 20px;
text-align: center;
}

.name {
font-size: 36pt;
font-weight: 800;
margin: 0;
letter-spacing: 2px;
}

.title {
font-size: 14pt;
font-weight: 600;
margin: 10px 0 0 0;
letter-spacing: 1px;
color: #cbd5e0;
}

.main-container {
display: flex;
flex: 1;
}

.sidebar {
width: 35%;
background-color: #e9ecf3;
padding: 30px 25px;
}

.content {
width: 65%;
padding: 30px 35px;
}

.side-section {
margin-bottom: 30px;
}

.side-title {
color: #2c7bb6;
font-size: 13pt;
font-weight: 700;
border-bottom: 2px solid #2c7bb6;
padding-bottom: 5px;
margin-bottom: 15px;
}

.side-item {
margin-bottom: 15px;
font-size: 10pt;
line-height: 1.4;
}

.side-text {
font-size: 10pt;
margin-bottom: 8px;
}

.bold {
font-weight: 700;
}

.bold-sm {
font-weight: 700;
font-size: 9.5pt;
}

.small-text {
font-size: 9pt;
}

.skill-item {
margin-bottom: 12px;
}

.skill-info {
font-size: 10pt;
margin-bottom: 4px;
}

.skill-bar {
height: 6px;
background-color: #d1d9e6;
border-radius: 3px;
width: 100%;
}

.skill-progress {
height: 100%;
background-color: #2c7bb6;
border-radius: 3px;
}

.content-section {
margin-bottom: 35px;
}

.content-title {
color: #2c7bb6;
font-size: 14pt;
font-weight: 700;
border-bottom: 2px solid #d1d9e6;
padding-bottom: 5px;
margin-bottom: 20px;
}

.experience-item {
margin-bottom: 25px;
}

.exp-header {
margin-bottom: 8px;
}

.sub-header {
color: #555;
font-size: 10pt;
margin-top: 2px;
}

.achievements-list {
margin: 0;
padding-left: 18px;
list-style-type: disc;
}

.achievements-list li {
font-size: 10pt;
margin-bottom: 6px;
line-height: 1.4;
text-align: justify;
}

.project-item {
margin-bottom: 20px;
}

.project-desc {
font-size: 10pt;
margin-top: 5px;
line-height: 1.4;
}
`;

const StyledWrapper = styled.div`${T29Css}`;