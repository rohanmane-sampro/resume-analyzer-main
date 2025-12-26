
import React from 'react';
import styled from "styled-components";

// Helper function to convert markdown to HTML
const parseMarkdown = (text) => {
    if (!text || typeof text !== 'string') return '';
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\*(.+?)\*/g, '<em>$1</em>') // Italic
        .replace(/\n/g, '<br/>'); // Convert line breaks
};

const StyledWrapper = styled.div`
@media print {
  body {
    font-family: 'Calibri', 'Arial', sans-serif;
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
    max-width: 100%;
    border: none !important;
    box-shadow: none !important;
  }
}

body {
  font-family: 'Calibri', 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

.resume {
  width: 210mm;
  max-width: 95%;
  background: white;
  margin: 20px auto;
  padding: 40px 50px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  line-height: 1.4;
}

.header {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ddd;
}

.name {
  font-size: 32px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #000;
}

.title {
  font-size: 14px;
  color: #666;
  margin: 0 0 10px 0;
}

.contact-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 12px;
  margin-top: 8px;
}

.contact-links a {
  color: #0066cc;
  text-decoration: none;
}

.contact-links a:hover {
  text-decoration: underline;
}

.intro-text {
  background: #e6f2ff;
  border-left: 4px solid #0066cc;
  padding: 12px 15px;
  margin-bottom: 20px;
  font-size: 11px;
  line-height: 1.5;
  color: #333;
}

.intro-text strong {
  color: #0066cc;
  font-weight: bold;
}

.section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
  color: #000;
  margin-bottom: 10px;
  padding-bottom: 4px;
  border-bottom: 2px solid #0066cc;
  letter-spacing: 0.5px;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 11px;
  line-height: 1.6;
}

.skill-item {
  background: #f0f0f0;
  padding: 4px 10px;
  border-radius: 3px;
  color: #333;
}

.experience-item, .project-item, .education-item, .activity-item {
  margin-bottom: 15px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}

.item-title {
  font-weight: bold;
  font-size: 12px;
  color: #000;
}

.item-date {
  font-size: 11px;
  color: #0066cc;
  font-weight: bold;
}

.item-subtitle {
  font-size: 11px;
  color: #0066cc;
  margin-bottom: 4px;
  font-style: italic;
}

.item-location {
  font-size: 10px;
  color: #666;
  margin-bottom: 6px;
}

.item-description {
  font-size: 11px;
  line-height: 1.5;
  color: #333;
}

.item-description ul {
  margin: 4px 0;
  padding-left: 20px;
}

.item-description li {
  margin-bottom: 3px;
}

.project-role {
  font-weight: bold;
  font-size: 11px;
  color: #000;
  margin-bottom: 2px;
}

.project-company {
  font-size: 11px;
  color: #0066cc;
  font-style: italic;
  margin-bottom: 4px;
}

.education-degree {
  font-weight: bold;
  font-size: 12px;
  color: #000;
}

.education-institution {
  font-size: 11px;
  color: #0066cc;
  font-style: italic;
  margin-bottom: 3px;
}

.education-details {
  font-size: 10px;
  color: #666;
  line-height: 1.4;
}

.activity-name {
  font-size: 11px;
  font-weight: bold;
  color: #000;
  margin-bottom: 2px;
}

.activity-description {
  font-size: 11px;
  color: #333;
  line-height: 1.4;
}
`;

export const T9 = ({ jsonData }) => {
    // Process skills
    const hardSkills = jsonData.skills?.hardSkills
        ? jsonData.skills.hardSkills.split(',').map(skill => skill.trim()).filter(skill => skill !== '')
        : [];

    const softSkills = jsonData.skills?.softSkills
        ? jsonData.skills.softSkills.split(',').map(skill => skill.trim()).filter(skill => skill !== '')
        : [];

    const allSkills = [...hardSkills, ...softSkills];

    const skillsList = allSkills.map((skill, index) => (
        <div key={`skill-${index}`} className="skill-item">{skill}</div>
    ));

    // Process projects
    const projectsList = jsonData.projects && jsonData.projects.length > 0
        ? jsonData.projects.map((proj, index) => (
            <div key={`proj-${index}`} className="project-item">
                <div className="item-header">
                    <div className="project-role">{proj.projectTitle || 'Project Title'}</div>
                    <div className="item-date">{proj.duration || 'MMM YYYY - MMM YYYY'}</div>
                </div>
                <div className="project-company">{proj.organization || 'Organization'}</div>
                <div className="item-description">
                    {proj.projectDescription || proj.toolsTechUsed || 'Project description'}
                </div>
            </div>
        ))
        : null;

    // Process work experience
    const workExpList = jsonData.workExperience && jsonData.workExperience.length > 0
        ? jsonData.workExperience.map((we, index) => (
            <div key={`work-${index}`} className="experience-item">
                <div className="item-header">
                    <div className="item-title">{we.jobTitle || 'Role / Project'}</div>
                    <div className="item-date">{we.WorkDuration || 'MMM YYYY - MMM YYYY'}</div>
                </div>
                <div className="item-subtitle">{we.companyName || 'Company'}</div>
                <div className="item-location">somewhere, state</div>
                <div className="item-description">
                    <ul>
                        <li dangerouslySetInnerHTML={{ __html: parseMarkdown(we.keyAchievements || 'Key achievements and responsibilities') }} />
                    </ul>
                </div>
            </div>
        ))
        : null;

    // Process education
    const educationList = jsonData.education && jsonData.education.length > 0
        ? jsonData.education.map((edu, index) => (
            <div key={`edu-${index}`} className="education-item">
                <div className="item-header">
                    <div className="education-degree">{edu.degreeName || 'Degree'}, {edu.fieldOfStudy || 'Major'}</div>
                    <div className="item-date">{edu.graduationYear || 'MMM YYYY'}</div>
                </div>
                <div className="education-institution">{edu.institutionName || 'Institution Name'}</div>
                <div className="education-details">
                    {edu.currentCGPA && `CGPA: ${edu.currentCGPA}`}
                </div>
            </div>
        ))
        : null;

    // Process languages as activities
    const languages = jsonData.contactInfo?.Languages
        ? jsonData.contactInfo.Languages.split(',').map(lang => lang.trim()).filter(lang => lang !== '')
        : [];

    return (
        <StyledWrapper>
            <div className="resume" id="capture-content">
                {/* Header */}
                <div className="header">
                    <div className="name">{jsonData.contactInfo?.fullName || 'Your Name'}</div>
                    <div className="title">{jsonData.contactInfo?.jobTitle || 'Data Scientist / Junior Developer'}</div>
                    <div className="contact-links">
                        <a href={jsonData.contactInfo?.portfolio || '#'} target="_blank" rel="noreferrer">
                            Portfolio: {jsonData.contactInfo?.portfolio?.replace('https://', '').replace('http://', '') || 'MatthisDana.com'}
                        </a>
                        <a href={`https://linkedin.com/in/${jsonData.contactInfo?.linkedin || ''}`} target="_blank" rel="noreferrer">
                            github.com/{jsonData.contactInfo?.linkedin || 'TimmyLu01'}
                        </a>
                    </div>
                </div>

                {/* Intro Text */}
                <div className="intro-text">
                    {jsonData.Description?.UserDescription ||
                        'Hello, here is some text without a meaning. This text should show what a printed text will look like at this place. If you read this text, you will get no information. Really? Is there no information? Is there a difference between this text and some nonsense like "Huardest gefburn"? Kjift – not at all! A blind text like this gives you information about the selected font, how the letters are written and an impression of the look. This text should contain all letters of the alphabet and it should be written in of the original language. There is no need for special content, but the length of words should match the language.'}
                </div>

                {/* Skills */}
                {skillsList.length > 0 && (
                    <div className="section">
                        <div className="section-title">Skills</div>
                        <div className="skills-list">
                            {skillsList}
                        </div>
                    </div>
                )}

                {/* Programming Projects */}
                {projectsList && projectsList.length > 0 && (
                    <div className="section">
                        <div className="section-title">Programming Projects</div>
                        {projectsList}
                    </div>
                )}

                {/* Technical Experience */}
                {workExpList && workExpList.length > 0 && (
                    <div className="section">
                        <div className="section-title">Technical Experience</div>
                        {workExpList}
                    </div>
                )}

                {/* Education */}
                {educationList && educationList.length > 0 && (
                    <div className="section">
                        <div className="section-title">Education</div>
                        {educationList}
                    </div>
                )}

                {/* Activities */}
                {languages.length > 0 && (
                    <div className="section">
                        <div className="section-title">Activities</div>
                        {languages.map((lang, index) => (
                            <div key={`activity-${index}`} className="activity-item">
                                <div className="activity-name">{lang}</div>
                                <div className="item-date">YYYY – YYYY</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </StyledWrapper>
    );
};

export const T9Css = `
    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
      
      body {
        font-family: 'Calibri', 'Arial', sans-serif;
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
        max-width: 210mm !important;
        margin: 0 auto !important;
        box-shadow: none !important;
      }
    }
    
    body {
       font-family: 'Calibri', 'Arial', sans-serif;
       margin: 0;
       padding: 0;
       background-color: #f5f5f5;
    }
    
    .resume {
       width: 210mm;
       background: white;
       margin: 20px auto;
       padding: 40px 50px;
       box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    }
    
    .name {
       font-size: 32px;
       font-weight: bold;
       color: #000;
    }
    
    .section-title {
       font-size: 13px;
       font-weight: bold;
       text-transform: uppercase;
       border-bottom: 2px solid #0066cc;
    }
    
    .intro-text {
       background: #e6f2ff;
       border-left: 4px solid #0066cc;
       padding: 12px 15px;
    }`;
