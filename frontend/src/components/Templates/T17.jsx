
import React from 'react';
import styled from "styled-components";

const parseMarkdown = (text) => {
    if (!text || typeof text !== 'string') return '';
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br/>');
};

const StyledWrapper = styled.div`
@media print {
  body {
    margin: 0;
    padding: 0;
    background-color: white !important;
  }
  @page {
   size: A4;
   margin: 0.5in;
  }
  .resume {
    width: 100%;
    box-shadow: none !important;
  }
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
}

.resume {
  width: 210mm;
  max-width: 95%;
  background: white;
  margin: 20px auto;
  padding: 30px 35px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.header {
  margin-bottom: 18px;
}

.name {
  font-size: 22px;
  font-weight: bold;
  margin: 0 0 3px 0;
  color: #000;
}

.job-title {
  font-size: 12px;
  color: #666;
  font-style: italic;
  margin: 0 0 12px 0;
}

.contact-info {
  display: grid;
  grid-template-columns: auto auto;
  gap: 8px 20px;
  font-size: 9px;
  color: #555;
  margin-bottom: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.contact-item i {
  font-size: 9px;
  width: 12px;
}

.section {
  margin-bottom: 18px;
}

.section-title {
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  color: #000;
  margin-bottom: 10px;
  padding-bottom: 3px;
  border-bottom: 1px solid #000;
}

.profile-text {
  font-size: 9px;
  line-height: 1.5;
  color: #444;
  text-align: justify;
}

.experience-item {
  margin-bottom: 14px;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 3px;
}

.exp-title {
  font-size: 10px;
  font-weight: bold;
  color: #000;
}

.exp-date {
  font-size: 9px;
  color: #666;
}

.exp-company {
  font-size: 9px;
  color: #666;
  font-style: italic;
  margin-bottom: 5px;
}

.exp-description {
  font-size: 9px;
  line-height: 1.4;
  color: #555;
}

.exp-description ul {
  margin: 3px 0;
  padding-left: 16px;
}

.exp-description li {
  margin-bottom: 2px;
}

.skills-section {
  margin-bottom: 12px;
}

.skills-category-title {
  font-size: 9px;
  font-weight: bold;
  color: #000;
  margin-bottom: 4px;
}

.skills-list {
  font-size: 8px;
  line-height: 1.5;
  color: #555;
}
`;

export const T17 = ({ jsonData }) => {
    const workExpList = jsonData.workExperience && jsonData.workExperience.length > 0
        ? jsonData.workExperience.map((we, index) => (
            <div key={`work-${index}`} className="experience-item">
                <div className="exp-header">
                    <div className="exp-title">{we.jobTitle || 'Position'}</div>
                    <div className="exp-date">{we.WorkDuration || 'Month Year - Month Year'}</div>
                </div>
                <div className="exp-company">{we.companyName || 'Company, Location'}</div>
                <div className="exp-description">
                    <ul>
                        <li dangerouslySetInnerHTML={{ __html: parseMarkdown(we.keyAchievements || 'Work responsibilities') }} />
                    </ul>
                </div>
            </div>
        ))
        : null;

    const educationList = jsonData.education && jsonData.education.length > 0
        ? jsonData.education.map((edu, index) => (
            <div key={`edu-${index}`} className="experience-item">
                <div className="exp-header">
                    <div className="exp-title">{edu.degreeName || 'Degree'}</div>
                    <div className="exp-date">{edu.graduationYear || 'Year'}</div>
                </div>
                <div className="exp-company">{edu.institutionName || 'University'}</div>
            </div>
        ))
        : null;

    const hardSkills = jsonData.skills?.hardSkills
        ? jsonData.skills.hardSkills.split(',').map(s => s.trim()).filter(s => s !== '')
        : [];

    const softSkills = jsonData.skills?.softSkills
        ? jsonData.skills.softSkills.split(',').map(s => s.trim()).filter(s => s !== '')
        : [];

    return (
        <StyledWrapper>
            <div className="resume" id="capture-content">
                <div className="header">
                    <div className="name">{jsonData.contactInfo?.fullName || 'Priya Sharma'}</div>
                    <div className="job-title">{jsonData.contactInfo?.jobTitle || 'Senior Cloud Infrastructure Engineer'}</div>
                    <div className="contact-info">
                        <div className="contact-item">
                            <i className="fas fa-envelope"></i>
                            <span>{jsonData.contactInfo?.emailAddress || 'p.sharma@gmail.com'}</span>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-phone"></i>
                            <span>{jsonData.contactInfo?.phoneNumber || '9876543210'}</span>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>{jsonData.contactInfo?.Location || 'Bangalore, India'}</span>
                        </div>
                        <div className="contact-item">
                            <i className="fab fa-github"></i>
                            <span>{jsonData.contactInfo?.portfolio?.replace('https://github.com/', '') || 'priya-sharma'}</span>
                        </div>
                        <div className="contact-item">
                            <i className="fab fa-linkedin"></i>
                            <span>{jsonData.contactInfo?.linkedin || 'priyasharma-dev'}</span>
                        </div>
                    </div>
                </div>

                <div className="section">
                    <div className="section-title">Profile</div>
                    <div className="profile-text">
                        {jsonData.Description?.UserDescription ||
                            'Experienced Cloud and DevOps Engineer with 10 years in the field. Skilled in a wide range of software development tools. Possess extensive knowledge in Docker and Kubernetes. Expertise in creating CI/CD pipelines for enhanced operational efficiency and system reliability.'}
                    </div>
                </div>

                {(hardSkills.length > 0 || softSkills.length > 0) && (
                    <div className="section">
                        <div className="section-title">Technical Skills</div>
                        {hardSkills.length > 0 && (
                            <div className="skills-section">
                                <div className="skills-category-title">Core Competencies</div>
                                <div className="skills-list">{hardSkills.join(', ')}</div>
                            </div>
                        )}
                    </div>
                )}

                {workExpList && workExpList.length > 0 && (
                    <div className="section">
                        <div className="section-title">Professional Experience</div>
                        {workExpList}
                    </div>
                )}

                {jsonData.projects && jsonData.projects.length > 0 && (
                    <div className="section">
                        <div className="section-title">Key Technical Projects</div>
                        <div className="projects-list">
                            {jsonData.projects.map((proj, idx) => (
                                <div key={idx} className="experience-item">
                                    <div className="exp-title">{proj.projectTitle || 'Project'}</div>
                                    <div className="exp-description">
                                        {proj.projectDescription || proj.toolsTechUsed}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {educationList && educationList.length > 0 && (
                    <div className="section">
                        <div className="section-title">Education</div>
                        {educationList}
                    </div>
                )}
            </div>
        </StyledWrapper>
    );
};

export const T17Css = `
    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      body {
        margin: 0 !important;
        padding: 0 !important;
      }
      .resume {
        width: 210mm !important;
        box-shadow: none !important;
      }
    }`;
