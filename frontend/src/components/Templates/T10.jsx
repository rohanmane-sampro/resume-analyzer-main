
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
    font-family: 'Times New Roman', serif;
    margin: 0;
    padding: 0;
    background-color: white !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  @page {
   size: A4;
   margin: 0.5in;
  }
  .resume {
    width: 100%;
    border: none !important;
    box-shadow: none !important;
  }
}

body {
  font-family: 'Times New Roman', serif;
  background-color: #f5f5f5;
}

.resume {
  width: 210mm;
  max-width: 95%;
  background: white;
  margin: 20px auto;
  padding: 40px 60px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  line-height: 1.3;
}

.header {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
}

.name {
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 3px;
}

.contact-info {
  font-size: 11px;
  color: #333;
}

.contact-info a {
  color: #0066cc;
  text-decoration: none;
  margin: 0 3px;
}

.contact-info a:hover {
  text-decoration: underline;
}

.section {
  margin-bottom: 18px;
}

.section-title {
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 8px;
  padding-bottom: 2px;
  border-bottom: 1px solid #000;
  letter-spacing: 1px;
}

.project-item {
  margin-bottom: 12px;
}

.project-header {
  font-size: 11px;
  margin-bottom: 3px;
}

.project-title {
  font-weight: bold;
  color: #000;
}

.project-tech {
  color: #0066cc;
  font-style: italic;
}

.project-description {
  font-size: 10px;
  line-height: 1.4;
  margin-left: 15px;
}

.project-description ul {
  margin: 2px 0;
  padding-left: 20px;
}

.project-description li {
  margin-bottom: 2px;
}

.skills-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px 15px;
  font-size: 11px;
}

.skill-label {
  font-weight: bold;
  min-width: 100px;
}

.skill-value {
  color: #333;
}

.education-item, .work-item {
  margin-bottom: 8px;
  font-size: 11px;
}

.item-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.item-title {
  font-weight: bold;
  color: #000;
}

.item-date {
  color: #000;
  font-weight: normal;
}

.item-subtitle {
  color: #0066cc;
  font-style: italic;
  margin-left: 15px;
}

.item-location {
  font-size: 10px;
  color: #666;
  margin-left: 15px;
}
`;

export const T10 = ({ jsonData }) => {
    // Process projects
    const projectsList = jsonData.projects && jsonData.projects.length > 0
        ? jsonData.projects.map((proj, index) => (
            <div key={`proj-${index}`} className="project-item">
                <div className="project-header">
                    <span className="project-title">{proj.projectTitle || `Project ${index + 1}`}</span>
                    {' '}
                    <span className="project-tech">
                        {proj.toolsTechUsed || 'Technologies'}
                    </span>
                </div>
                <div className="project-description">
                    <ul>
                        {proj.projectDescription ? (
                            <li>{proj.projectDescription}</li>
                        ) : (
                            <>
                                <li>Created a XYZ feature to accomplish ABC;</li>
                                <li>Retrieved data from XYZ for ABC;</li>
                                <li>Implemented XYZ library for ABC;</li>
                                <li>Utilized XYZ that increased A by B%;</li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        ))
        : null;

    // Process skills
    const hardSkills = jsonData.skills?.hardSkills
        ? jsonData.skills.hardSkills.split(',').map(s => s.trim()).filter(s => s !== '')
        : [];

    const softSkills = jsonData.skills?.softSkills
        ? jsonData.skills.softSkills.split(',').map(s => s.trim()).filter(s => s !== '')
        : [];

    // Process education
    const educationList = jsonData.education && jsonData.education.length > 0
        ? jsonData.education.map((edu, index) => (
            <div key={`edu-${index}`} className="education-item">
                <div className="item-row">
                    <div className="item-title">
                        {edu.degreeName || 'Degree'}, {edu.fieldOfStudy || 'Major'}
                    </div>
                    <div className="item-date">{edu.graduationYear || 'Month Year'}</div>
                </div>
                <div className="item-subtitle">{edu.institutionName || 'University'}</div>
            </div>
        ))
        : null;

    // Process work experience
    const workExpList = jsonData.workExperience && jsonData.workExperience.length > 0
        ? jsonData.workExperience.map((we, index) => (
            <div key={`work-${index}`} className="work-item">
                <div className="item-row">
                    <div className="item-title">{we.jobTitle || 'Job Title'}</div>
                    <div className="item-date">{we.WorkDuration || 'Month Year - Month Year'}</div>
                </div>
                <div className="item-subtitle">{we.companyName || 'Company'}</div>
            </div>
        ))
        : null;

    return (
        <StyledWrapper>
            <div className="resume" id="capture-content">
                {/* Header */}
                <div className="header">
                    <div className="name">
                        {jsonData.contactInfo?.fullName || 'FIRSTNAME LASTNAME'}
                    </div>
                    <div className="contact-info">
                        {jsonData.contactInfo?.phoneNumber && (
                            <>1 | (123) 456-7890 ◆ </>
                        )}
                        <a href={`mailto:${jsonData.contactInfo?.emailAddress || 'your.email@email.com'}`}>
                            {jsonData.contactInfo?.emailAddress || 'your.email@email.com'}
                        </a>
                        {' ◆ '}
                        <a href={`https://linkedin.com/in/${jsonData.contactInfo?.linkedin || 'linkedin'}`} target="_blank" rel="noreferrer">
                            linkedin.com/in/{jsonData.contactInfo?.linkedin || 'linkedin'}
                        </a>
                        {' ◆ '}
                        <a href={jsonData.contactInfo?.portfolio || 'www.yourwebsite.com'} target="_blank" rel="noreferrer">
                            {jsonData.contactInfo?.portfolio?.replace('https://', '').replace('http://', '') || 'www.yourwebsite.com'}
                        </a>
                        {jsonData.contactInfo?.Location && (
                            <> ◆ San Francisco, CA</>
                        )}
                    </div>
                </div>

                {/* Projects */}
                {projectsList && projectsList.length > 0 && (
                    <div className="section">
                        <div className="section-title">Projects</div>
                        {projectsList}
                    </div>
                )}

                {/* Skills */}
                {(hardSkills.length > 0 || softSkills.length > 0) && (
                    <div className="section">
                        <div className="section-title">Skills</div>
                        <div className="skills-grid">
                            {hardSkills.length > 0 && (
                                <>
                                    <div className="skill-label">Languages:</div>
                                    <div className="skill-value">{hardSkills.slice(0, 8).join(', ')}</div>
                                </>
                            )}
                            <div className="skill-label">Frameworks:</div>
                            <div className="skill-value">React, Ruby on Rails, Express, Django, Mocha</div>

                            <div className="skill-label">Tools:</div>
                            <div className="skill-value">Git, Docker, TravisCI, Kubernetes, AWS</div>

                            {softSkills.length > 0 && (
                                <>
                                    <div className="skill-label">Soft Skills:</div>
                                    <div className="skill-value">{softSkills.join(', ')}</div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Education */}
                {educationList && educationList.length > 0 && (
                    <div className="section">
                        <div className="section-title">Education</div>
                        {educationList}
                    </div>
                )}

                {/* Work Experience */}
                {workExpList && workExpList.length > 0 && (
                    <div className="section">
                        <div className="section-title">Work Experience</div>
                        {workExpList}
                    </div>
                )}
            </div>
        </StyledWrapper>
    );
};

export const T10Css = `
    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      
      body {
        font-family: 'Times New Roman', serif;
        margin: 0 !important;
        padding: 0 !important;
        background-color: white !important;
      }
      
      @page {
       size: A4 portrait;
       margin: 0;
      }
      
      .resume {
        width: 210mm !important;
        margin: 0 auto !important;
        box-shadow: none !important;
      }
    }
    
    body {
       font-family: 'Times New Roman', serif;
       background-color: #f5f5f5;
    }
    
    .resume {
       width: 210mm;
       background: white;
       margin: 20px auto;
       padding: 40px 60px;
    }
    
    .name {
       font-size: 18px;
       font-weight: bold;
       text-transform: uppercase;
       letter-spacing: 3px;
    }
    
    .section-title {
       font-size: 11px;
       font-weight: bold;
       text-transform: uppercase;
       border-bottom: 1px solid #000;
    }`;
