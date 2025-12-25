
import React from 'react';
import styled from "styled-components";

// Helper function to convert markdown to HTML
const parseMarkdown = (text) => {
    if (!text || typeof text !== 'string') return '';
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\*(.+?)\*/g, '<em>$1</em>') // Italic
        .replace(/\n/g, '<br/>'); // Convert line breaks to HTML breaks
};

const removespace = (str) => str?.trim() || '';

const StyledWrapper = styled.div`
@media print {
  body {
    font-family: 'Georgia', 'Times New Roman', serif;
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
    page-break-inside: avoid;
  }
}

body {
  font-family: 'Georgia', 'Times New Roman', serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

.resume {
  width: 210mm;
  max-width: 95%;
  background: white;
  margin: 20px auto;
  padding: 30px 40px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.header {
  border-bottom: 1px solid #333;
  padding-bottom: 15px;
  margin-bottom: 25px;
  position: relative;
}

.name {
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 5px 0;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.position {
  font-size: 14px;
  color: #666;
  margin: 0 0 12px 0;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 11px;
  color: #333;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.contact-item i {
  color: #c41e3a;
  font-size: 10px;
}

.contact-item a {
  color: #333;
  text-decoration: none;
}

.globe-icon {
  width: 80px;
  height: 80px;
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(135deg, #4a90e2 0%, #67b8e3 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 40px;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 20px;
}

.left-column, .right-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section {
  margin-bottom: 15px;
}

.section-title {
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
  padding-bottom: 5px;
  border-bottom: 2px solid #333;
}

.job-item, .project-item {
  margin-bottom: 15px;
}

.job-title {
  font-weight: bold;
  font-size: 13px;
  margin-bottom: 3px;
}

.company-name {
  font-size: 12px;
  color: #c41e3a;
  font-weight: 600;
  margin-bottom: 2px;
}

.job-date {
  font-size: 11px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
}

.job-date i {
  font-size: 9px;
}

.job-location {
  font-size: 11px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 8px;
}

.job-description {
  font-size: 11px;
  line-height: 1.5;
  color: #333;
}

.job-description ul {
  margin: 5px 0;
  padding-left: 20px;
}

.job-description li {
  margin-bottom: 3px;
}

.project-name {
  font-weight: bold;
  font-size: 12px;
  color: #c41e3a;
  margin-bottom: 3px;
}

.project-tech {
  font-size: 11px;
  font-style: italic;
  margin-bottom: 5px;
}

.project-description {
  font-size: 11px;
  line-height: 1.5;
}

.philosophy-box {
  background: #f9f9f9;
  border-left: 4px solid #c41e3a;
  padding: 15px;
  font-style: italic;
  font-size: 12px;
  line-height: 1.6;
  color: #333;
}

.achievement-item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: flex-start;
}

.achievement-icon {
  color: #c41e3a;
  font-size: 16px;
  margin-top: 2px;
}

.achievement-text {
  font-size: 11px;
  line-height: 1.5;
}

.achievement-title {
  font-weight: bold;
  display: block;
  margin-bottom: 2px;
}

.strength-item {
  margin-bottom: 12px;
}

.strength-label {
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.strength-icon {
  color: #c41e3a;
  font-size: 14px;
}

.strength-bar {
  display: flex;
  gap: 3px;
  align-items: center;
}

.strength-text {
  font-size: 10px;
  color: #666;
  flex: 1;
}

.dots {
  display: flex;
  gap: 4px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ddd;
}

.dot.filled {
  background: #c41e3a;
}

.language-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 12px;
}

.language-name {
  font-weight: 600;
}

.education-item {
  margin-bottom: 15px;
}

.degree {
  font-weight: bold;
  font-size: 12px;
  color: #c41e3a;
  margin-bottom: 2px;
}

.university {
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 3px;
}

.education-date {
  font-size: 10px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 3px;
}

.education-details {
  font-size: 10px;
  color: #666;
  line-height: 1.4;
}

.chart-placeholder {
  width: 200px;
  height: 200px;
  margin: 15px auto;
  border-radius: 50%;
  background: linear-gradient(135deg, 
    #c41e3a 0%, #c41e3a 25%, 
    #e8b4bc 25%, #e8b4bc 50%, 
    #f4d5d8 50%, #f4d5d8 75%, 
    #b8d4e8 75%, #b8d4e8 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-center {
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  text-align: center;
  padding: 10px;
}

.chart-labels {
  font-size: 10px;
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.chart-label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.chart-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}
`;

export const T8 = ({ jsonData }) => {
    // Process work experience
    const workExpList = jsonData.workExperience && jsonData.workExperience.length > 0
        ? jsonData.workExperience.map((we, index) => (
            <div key={`work-${index}`} className="job-item">
                <div className="job-title">{we.jobTitle || 'Job Title'}</div>
                <div className="company-name">{we.companyName || 'Company Name'}</div>
                <div className="job-date">
                    <i className="far fa-calendar"></i>
                    {we.WorkDuration || 'Duration'}
                </div>
                <div className="job-location">
                    <i className="fas fa-map-marker-alt"></i>
                    Location
                </div>
                <div className="job-description">
                    <span dangerouslySetInnerHTML={{ __html: parseMarkdown(we.keyAchievements || '') }} />
                </div>
            </div>
        ))
        : null;

    // Process projects
    const projectsList = jsonData.projects && jsonData.projects.length > 0
        ? jsonData.projects.map((proj, index) => (
            <div key={`proj-${index}`} className="project-item">
                <div className="project-name">{proj.projectTitle || 'Project Title'}</div>
                <div className="project-tech">{proj.toolsTechUsed || 'Technologies'}</div>
                <div className="project-description">
                    {proj.projectDescription || 'Project description'}
                </div>
            </div>
        ))
        : null;

    // Process education
    const educationList = jsonData.education && jsonData.education.length > 0
        ? jsonData.education.map((edu, index) => (
            <div key={`edu-${index}`} className="education-item">
                <div className="degree">{edu.degreeName || 'Degree'}</div>
                <div className="university">{edu.institutionName || 'University'}</div>
                <div className="education-date">
                    <i className="far fa-calendar"></i>
                    {edu.graduationYear || 'Year'}
                </div>
                {edu.currentCGPA && (
                    <div className="education-details">CGPA: {edu.currentCGPA}</div>
                )}
            </div>
        ))
        : null;

    // Process languages with dot ratings
    const languages = jsonData.contactInfo?.Languages
        ? jsonData.contactInfo.Languages.split(',').map(lang => lang.trim()).filter(lang => lang !== '')
        : ['English', 'Spanish', 'German'];

    const languagesList = languages.map((lang, index) => (
        <div key={`lang-${index}`} className="language-item">
            <div className="language-name">{lang}</div>
            <div className="dots">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className={`dot ${i < 4 ? 'filled' : ''}`}></div>
                ))}
            </div>
        </div>
    ));

    // Process skills for strengths
    const hardSkills = jsonData.skills?.hardSkills
        ? jsonData.skills.hardSkills.split(',').map(skill => skill.trim()).filter(skill => skill !== '').slice(0, 3)
        : ['Hard working', 'Motivated & Leader', 'Embedded Systems'];

    const strengthsList = hardSkills.map((skill, index) => (
        <div key={`strength-${index}`} className="strength-item">
            <div className="strength-label">
                <i className="fas fa-check-circle strength-icon"></i>
                {skill}
            </div>
            <div className="strength-bar">
                <div className="strength-text">Eye for detail</div>
                <div className="dots">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className={`dot ${i < 4 ? 'filled' : ''}`}></div>
                    ))}
                </div>
            </div>
        </div>
    ));

    return (
        <StyledWrapper>
            <div className="resume" id="capture-content">
                {/* Header */}
                <div className="header">
                    <div className="name">{jsonData.contactInfo?.fullName || 'YOUR NAME HERE'}</div>
                    <div className="position">{jsonData.contactInfo?.jobTitle || 'Your Position or Tagline Here'}</div>

                    <div className="contact-info">
                        <div className="contact-item">
                            <i className="fas fa-envelope"></i>
                            <a href={`mailto:${jsonData.contactInfo?.emailAddress || 'your_name@email.com'}`}>
                                {jsonData.contactInfo?.emailAddress || 'your_name@email.com'}
                            </a>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-phone"></i>
                            <span>{jsonData.contactInfo?.phoneNumber || '(123) 123-1234'}</span>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>{jsonData.contactInfo?.Location || 'Address, Street, STREET, Country'}</span>
                        </div>
                        <div className="contact-item">
                            <i className="fab fa-linkedin"></i>
                            <span>{jsonData.contactInfo?.linkedin || 'My LinkedIn'}</span>
                        </div>
                        <div className="contact-item">
                            <i className="fab fa-github"></i>
                            <span>{jsonData.contactInfo?.portfolio?.replace('https://github.com/', '') || 'My GitHub'}</span>
                        </div>
                    </div>

                    <div className="globe-icon">
                        <i className="fas fa-globe"></i>
                    </div>
                </div>

                {/* Two Column Content */}
                <div className="content">
                    {/* Left Column */}
                    <div className="left-column">
                        {/* Experience Section */}
                        {workExpList && workExpList.length > 0 && (
                            <div className="section">
                                <div className="section-title">Experience</div>
                                {workExpList}
                            </div>
                        )}

                        {/* Projects Section */}
                        {projectsList && projectsList.length > 0 && (
                            <div className="section">
                                <div className="section-title">Projects</div>
                                {projectsList}
                            </div>
                        )}

                        {/* A Day of My Life Chart */}
                        <div className="section">
                            <div className="section-title">A Day of My Life</div>
                            <div className="chart-placeholder">
                                <div className="chart-center">Hopeful weekday for you</div>
                            </div>
                            <div className="chart-labels">
                                <div className="chart-label">
                                    <div className="chart-color" style={{ background: '#c41e3a' }}></div>
                                    <span>Daytime Job</span>
                                </div>
                                <div className="chart-label">
                                    <div className="chart-color" style={{ background: '#e8b4bc' }}></div>
                                    <span>Sports and relaxation</span>
                                </div>
                                <div className="chart-label">
                                    <div className="chart-color" style={{ background: '#f4d5d8' }}></div>
                                    <span>Sleep</span>
                                </div>
                                <div className="chart-label">
                                    <div className="chart-color" style={{ background: '#b8d4e8' }}></div>
                                    <span>Spending time with family</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="right-column">
                        {/* Life Philosophy */}
                        <div className="section">
                            <div className="section-title">My Life Philosophy</div>
                            <div className="philosophy-box">
                                {jsonData.Description?.UserDescription ||
                                    '"Something smart or heartfelt, preferably in one sentence."'}
                            </div>
                        </div>

                        {/* Most Proud Of */}
                        <div className="section">
                            <div className="section-title">Most Proud Of</div>
                            <div className="achievement-item">
                                <i className="fas fa-trophy achievement-icon"></i>
                                <div className="achievement-text">
                                    <span className="achievement-title">Feature Achievement</span>
                                    and some details about it
                                </div>
                            </div>
                            <div className="achievement-item">
                                <i className="fas fa-trophy achievement-icon"></i>
                                <div className="achievement-text">
                                    <span className="achievement-title">Another achievement</span>
                                    more details about it of course
                                </div>
                            </div>
                            <div className="achievement-item">
                                <i className="fas fa-trophy achievement-icon"></i>
                                <div className="achievement-text">
                                    <span className="achievement-title">Another achievement</span>
                                    more details about it of course
                                </div>
                            </div>
                        </div>

                        {/* Strengths */}
                        <div className="section">
                            <div className="section-title">Strengths</div>
                            {strengthsList}
                        </div>

                        {/* Languages */}
                        <div className="section">
                            <div className="section-title">Languages</div>
                            {languagesList}
                        </div>

                        {/* Education */}
                        {educationList && educationList.length > 0 && (
                            <div className="section">
                                <div className="section-title">Education</div>
                                {educationList}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
};

export const T8Css = `
    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
      
      body {
        font-family: 'Georgia', 'Times New Roman', serif;
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
       font-family: 'Georgia', 'Times New Roman', serif;
       margin: 0;
       padding: 0;
       background-color: #f5f5f5;
    }
    
    .resume {
       width: 210mm;
       background: white;
       margin: 20px auto;
       padding: 30px 40px;
       box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    }
    
    .name {
       font-size: 28px;
       font-weight: bold;
       text-transform: uppercase;
       letter-spacing: 2px;
    }
    
    .content {
       display: grid;
       grid-template-columns: 1fr 1fr;
       gap: 30px;
    }
    
    .section-title {
       font-size: 14px;
       font-weight: bold;
       text-transform: uppercase;
       letter-spacing: 1px;
       border-bottom: 2px solid #333;
    }`;
