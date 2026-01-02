import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  ${() => T25Css}
`;

export const T25 = ({ jsonData }) => {
  const { contactInfo = {}, Description = {}, workExperience = [], education = [], projects = [], certificates = [], skills = {} } = jsonData;

  const hardSkillsList = skills?.hardSkills ? skills.hardSkills.split(',').map(s => s.trim()) : [];
  const softSkillsList = skills?.softSkills ? skills.softSkills.split(',').map(s => s.trim()) : [];

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        <div className="left-column">
          <div className="profile-header">
            <h1 className="full-name">{contactInfo.fullName || 'Full Name'}</h1>
            <p className="job-title">{workExperience[0]?.jobTitle || 'Job Title'}</p>
          </div>

          <div className="profile-image-container">
            <div className="profile-image">
              <img src="[https://via.placeholder.com/150](https://via.placeholder.com/150)" alt="Profile" />
            </div>
          </div>

          <div className="contact-info">
            <div className="contact-item">
              <span className="icon">✉</span>
              <span className="text">{contactInfo.emailAddress}</span>
            </div>
            <div className="contact-item">
              <span className="icon">📞</span>
              <span className="text">{contactInfo.phoneNumber}</span>
            </div>
            <div className="contact-item">
              <span className="icon">📍</span>
              <span className="text">{contactInfo.Location}</span>
            </div>
            {contactInfo.portfolio && (
              <div className="contact-item">
                <span className="icon">🔗</span>
                <span className="text">{contactInfo.portfolio}</span>
              </div>
            )}
          </div>

          {softSkillsList.length > 0 && (
            <div className="sidebar-section">
              <div className="sidebar-header">
                <span className="icon">🌐</span> LANGUAGES
              </div>
              <div className="skills-list">
                {softSkillsList.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <span className="skill-name">{skill}</span>
                    <span className="skill-level">Fluent</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {certificates.length > 0 && (
            <div className="sidebar-section">
              <div className="sidebar-header">
                <span className="icon">🎓</span> COURSES
              </div>
              {certificates.map((cert, index) => (
                <div key={index} className="course-item">
                  <div className="course-title">{cert.certificateName}</div>
                  <div className="course-provider">{cert.providerName}</div>
                  <div className="course-date">{cert.courseDuration}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="right-column">
          <section className="main-section">
            <div className="section-header">
              <span className="icon">💼</span> PROFESSIONAL EXPERIENCE
            </div>
            <div className="experience-list">
              {workExperience.map((exp, index) => (
                <div key={index} className="experience-item">
                  <div className="exp-company">{exp.companyName}</div>
                  <div className="exp-role">{exp.jobTitle}</div>
                  <div className="exp-meta">{exp.WorkDuration}</div>
                  <ul className="exp-achievements">
                    {exp.keyAchievements?.split('\n').filter(a => a.trim()).map((achievement, aIndex) => (
                      <li key={aIndex}>{achievement.replace(/^[•-]\s*/, '')}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {education.length > 0 && (
            <section className="main-section">
              <div className="section-header">
                <span className="icon">🏛️</span> EDUCATION
              </div>
              <div className="education-list">
                {education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <div className="edu-degree">{edu.degreeName}</div>
                    <div className="edu-school">{edu.institutionName}</div>
                    <div className="edu-meta">
                      {edu.graduationYear} {edu.currentCGPA && `| CGPA: ${edu.currentCGPA}`}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {hardSkillsList.length > 0 && (
            <section className="main-section">
              <div className="section-header">
                <span className="icon">🛠️</span> SKILLS
              </div>
              <div className="skills-grid">
                {hardSkillsList.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
};

export const T25Css = `
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
box-shadow: none !important;
}
}

.resume {
width: 210mm;
height: 297mm;
margin: 0 auto;
background: #fff;
display: flex;
font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
color: #333;
overflow: hidden;
box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.left-column {
width: 35%;
padding: 30px 20px;
background-color: #fff;
border-right: 1px solid #eee;
display: flex;
flex-direction: column;
}

.right-column {
width: 65%;
padding: 30px 25px;
background-color: #fff;
}

.profile-header {
margin-bottom: 20px;
}

.full-name {
font-size: 26pt;
font-weight: 800;
margin: 0;
line-height: 1.1;
}

.job-title {
font-size: 14pt;
color: #555;
margin: 5px 0 0 0;
}

.profile-image-container {
margin: 20px 0;
display: flex;
justify-content: flex-start;
}

.profile-image {
width: 140px;
height: 140px;
border-radius: 50%;
overflow: hidden;
background: #f0f0f0;
}

.profile-image img {
width: 100%;
height: 100%;
object-fit: cover;
}

.contact-info {
margin-bottom: 30px;
}

.contact-item {
display: flex;
align-items: center;
margin-bottom: 10px;
font-size: 9pt;
}

.contact-item .icon {
width: 20px;
margin-right: 10px;
color: #000;
}

.sidebar-section {
margin-bottom: 25px;
}

.sidebar-header {
background: #f0f0f0;
padding: 6px 10px;
font-weight: 700;
font-size: 10pt;
letter-spacing: 1px;
display: flex;
align-items: center;
margin-bottom: 15px;
}

.sidebar-header .icon {
margin-right: 8px;
}

.skill-item {
margin-bottom: 12px;
}

.skill-name {
display: block;
font-weight: 700;
font-size: 9.5pt;
}

.skill-level {
font-size: 8.5pt;
color: #666;
}

.course-item {
margin-bottom: 15px;
}

.course-title {
font-weight: 700;
font-size: 9.5pt;
line-height: 1.2;
}

.course-provider {
font-size: 9pt;
color: #555;
}

.course-date {
font-size: 8.5pt;
color: #777;
margin-top: 2px;
}

.main-section {
margin-bottom: 30px;
}

.section-header {
background: #f0f0f0;
padding: 8px 15px;
font-weight: 700;
font-size: 11pt;
letter-spacing: 1.5px;
display: flex;
align-items: center;
margin-bottom: 20px;
}

.section-header .icon {
margin-right: 10px;
}

.experience-item {
margin-bottom: 25px;
}

.exp-company {
font-weight: 800;
font-size: 11pt;
color: #000;
}

.exp-role {
font-weight: 600;
font-size: 10pt;
color: #444;
margin-top: 2px;
}

.exp-meta {
font-size: 9pt;
color: #777;
margin-top: 2px;
}

.exp-achievements {
margin: 10px 0 0 0;
padding-left: 18px;
list-style-type: disc;
}

.exp-achievements li {
font-size: 9.5pt;
line-height: 1.4;
margin-bottom: 5px;
text-align: justify;
}

.education-item {
margin-bottom: 15px;
}

.edu-degree {
font-weight: 700;
font-size: 10pt;
}

.edu-school {
font-size: 9.5pt;
color: #444;
}

.edu-meta {
font-size: 9pt;
color: #777;
}

.skills-grid {
display: flex;
flex-wrap: wrap;
gap: 8px;
}

.skill-tag {
background: #f5f5f5;
padding: 4px 10px;
border-radius: 4px;
font-size: 9pt;
color: #333;
border: 1px solid #ddd;
}
`;