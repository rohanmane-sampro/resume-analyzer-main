
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
  padding: 35px 40px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.header {
  margin-bottom: 20px;
}

.name {
  font-size: 26px;
  font-weight: bold;
  margin: 0 0 4px 0;
  color: #2d5016;
}

.job-title {
  font-size: 13px;
  color: #666;
  margin: 0 0 12px 0;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 9px;
  color: #555;
  margin-bottom: 15px;
}

.section {
  margin-bottom: 18px;
}

.section-title {
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  color: #2d5016;
  margin-bottom: 10px;
  padding-bottom: 3px;
  border-bottom: 2px solid #2d5016;
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

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.skill-item {
  font-size: 9px;
  padding: 6px 10px;
  background: #f0f4ec;
  border-radius: 4px;
  text-align: center;
  color: #2d5016;
  font-weight: 500;
}
`;

export const T15 = ({ jsonData }) => {
    const workExpList = jsonData.workExperience && jsonData.workExperience.length > 0
        ? jsonData.workExperience.map((we, index) => (
            <div key={`work-${index}`} className="experience-item">
                <div className="exp-header">
                    <div className="exp-title">{we.jobTitle || 'Position'}</div>
                    <div className="exp-date">{we.WorkDuration || 'Duration'}</div>
                </div>
                <div className="exp-company">{we.companyName || 'Company'}</div>
                <div className="exp-description">
                    <ul>
                        <li dangerouslySetInnerHTML={{ __html: parseMarkdown(we.keyAchievements || 'Responsibilities') }} />
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
        ? jsonData.skills.hardSkills.split(',').map(s => s.trim()).filter(s => s !== '').slice(0, 9)
        : [];

    return (
        <StyledWrapper>
            <div className="resume" id="capture-content">
                <div className="header">
                    <div className="name">{jsonData.contactInfo?.fullName || 'Your Name'}</div>
                    <div className="job-title">{jsonData.contactInfo?.jobTitle || 'Game Designer'}</div>
                    <div className="contact-info">
                        <span>📧 {jsonData.contactInfo?.emailAddress || 'email@example.com'}</span>
                        <span>📞 {jsonData.contactInfo?.phoneNumber || '+00 000 000 0000'}</span>
                        <span>📍 {jsonData.contactInfo?.Location || 'Location'}</span>
                    </div>
                </div>

                {workExpList && workExpList.length > 0 && (
                    <div className="section">
                        <div className="section-title">Experience</div>
                        {workExpList}
                    </div>
                )}

                {educationList && educationList.length > 0 && (
                    <div className="section">
                        <div className="section-title">Education</div>
                        {educationList}
                    </div>
                )}

                {hardSkills.length > 0 && (
                    <div className="section">
                        <div className="section-title">Skills</div>
                        <div className="skills-grid">
                            {hardSkills.map((skill, idx) => (
                                <div key={idx} className="skill-item">{skill}</div>
                            ))}
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
