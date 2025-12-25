
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
  padding: 35px 45px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.header {
  margin-bottom: 20px;
}

.name {
  font-size: 26px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #000;
}

.job-title {
  font-size: 14px;
  color: #27ae60;
  margin: 0 0 15px 0;
  font-style: italic;
}

.contact-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  font-size: 10px;
  color: #333;
  margin-bottom: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.contact-item i {
  font-size: 10px;
  color: #555;
}

.section {
  margin-bottom: 22px;
}

.section-title {
  font-size: 13px;
  font-weight: bold;
  color: #27ae60;
  margin-bottom: 10px;
  padding-bottom: 4px;
  border-bottom: 2px solid #27ae60;
}

.experience-item, .education-item {
  margin-bottom: 14px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 3px;
}

.item-title {
  font-size: 11px;
  font-weight: bold;
  color: #000;
}

.item-date {
  font-size: 10px;
  color: #666;
}

.item-location {
  font-size: 10px;
  color: #555;
  margin-bottom: 6px;
}

.item-description {
  font-size: 10px;
  line-height: 1.5;
  color: #444;
}

.item-description ul {
  margin: 4px 0;
  padding-left: 18px;
}

.item-description li {
  margin-bottom: 3px;
}

.education-degree {
  font-size: 11px;
  font-weight: bold;
  color: #000;
  margin-bottom: 2px;
}

.education-institution {
  font-size: 10px;
  color: #555;
}

.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
}

.skill-category {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.skill-item {
  font-size: 10px;
  color: #444;
  padding-left: 12px;
  position: relative;
}

.skill-item:before {
  content: '•';
  position: absolute;
  left: 0;
  color: #27ae60;
}
`;

export const T15 = ({ jsonData }) => {
    // Process work experience
    const workExpList = jsonData.workExperience && jsonData.workExperience.length > 0
        ? jsonData.workExperience.map((we, index) => (
            <div key={`work-${index}`} className="experience-item">
                <div className="item-header">
                    <div className="item-title">{we.jobTitle || 'Position'}</div>
                    <div className="item-date">{we.WorkDuration || 'Dec 2021 - Feb 2022'}</div>
                </div>
                <div className="item-location">{we.companyName || 'Company'}</div>
                <div className="item-description">
                    <ul>
                        <li dangerouslySetInnerHTML={{ __html: parseMarkdown(we.keyAchievements || 'Job responsibilities') }} />
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
                    <div className="education-degree">{edu.degreeName || 'Degree'}</div>
                    <div className="item-date">{edu.graduationYear || '2021'}</div>
                </div>
                <div className="education-institution">{edu.institutionName || 'University'}</div>
            </div>
        ))
        : null;

    // Skills
    const hardSkills = jsonData.skills?.hardSkills
        ? jsonData.skills.hardSkills.split(',').map(s => s.trim()).filter(s => s !== '')
        : ['C#', 'C++', 'Java', 'Python'];

    const softSkills = jsonData.skills?.softSkills
        ? jsonData.skills.softSkills.split(',').map(s => s.trim()).filter(s => s !== '')
        : ['Unity', 'Unreal Engine 4/5'];

    return (
        <StyledWrapper>
            <div className="resume" id="capture-content">
                {/* Header */}
                <div className="header">
                    <div className="name">{jsonData.contactInfo?.fullName || 'Isabella Montoya'}</div>
                    <div className="job-title">{jsonData.contactInfo?.jobTitle || 'Game Designer'}</div>

                    <div className="contact-info">
                        <div className="contact-item">
                            <i className="fas fa-envelope"></i>
                            <span>{jsonData.contactInfo?.emailAddress || 'isabella.montoya.dec@gmail.com'}</span>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-phone"></i>
                            <span>{jsonData.contactInfo?.phoneNumber || '+54 11 3192 1234'}</span>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>{jsonData.contactInfo?.Location || 'Buenos Aires, Argentina'}</span>
                        </div>
                        <div className="contact-item">
                            <i className="fab fa-linkedin"></i>
                            <span>{jsonData.contactInfo?.linkedin || 'linkedin.com/in/isabellamontoya'}</span>
                        </div>
                    </div>
                </div>

                {/* Professional Experience */}
                {workExpList && workExpList.length > 0 && (
                    <div className="section">
                        <div className="section-title">Professional Experience</div>
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

                {/* Skills */}
                {(hardSkills.length > 0 || softSkills.length > 0) && (
                    <div className="section">
                        <div className="section-title">Skills</div>
                        <div className="skills-grid">
                            {hardSkills.length > 0 && (
                                <div className="skill-category">
                                    {hardSkills.map((skill, idx) => (
                                        <div key={idx} className="skill-item">{skill}</div>
                                    ))}
                                </div>
                            )}
                            {softSkills.length > 0 && (
                                <div className="skill-category">
                                    {softSkills.map((skill, idx) => (
                                        <div key={idx} className="skill-item">{skill}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </StyledWrapper>
    );
};

export const T15Css = `
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
