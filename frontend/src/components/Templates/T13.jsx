
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
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  @page {
   size: A4;
   margin: 0;
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
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
}

.left-column {
  width: 180px;
  background: #f8f9fa;
  padding: 25px 20px;
}

.profile-photo {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: #dee2e6;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.photo-placeholder {
  font-size: 60px;
  color: #adb5bd;
}

.sidebar-section {
  margin-bottom: 20px;
}

.sidebar-title {
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #495057;
}

.biography {
  font-size: 8px;
  line-height: 1.5;
  color: #6c757d;
  text-align: justify;
}

.skill-item {
  margin-bottom: 10px;
}

.skill-name {
  font-size: 9px;
  color: #495057;
  margin-bottom: 4px;
}

.progress-bar {
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #0d6efd;
}

.main-content {
  flex: 1;
  padding: 25px 30px;
}

.header {
  margin-bottom: 20px;
}

.name {
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 4px 0;
  color: #000;
}

.job-title {
  font-size: 13px;
  color: #6c757d;
  margin: 0 0 15px 0;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 9px;
  color: #6c757d;
  margin-bottom: 15px;
}

.section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: #000;
  margin-bottom: 12px;
  padding-bottom: 4px;
  border-bottom: 2px solid #0d6efd;
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
  color: #6c757d;
}

.exp-company {
  font-size: 9px;
  color: #6c757d;
  margin-bottom: 5px;
}

.exp-description {
  font-size: 9px;
  line-height: 1.4;
  color: #495057;
}

.exp-description ul {
  margin: 3px 0;
  padding-left: 16px;
}

.exp-description li {
  margin-bottom: 2px;
}
`;

export const T13 = ({ jsonData }) => {
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
        ? jsonData.skills.hardSkills.split(',').map(s => s.trim()).filter(s => s !== '').slice(0, 6)
        : [];

    return (
        <StyledWrapper>
            <div className="resume" id="capture-content">
                <div className="left-column">
                    <div className="profile-photo">
                        <div className="photo-placeholder">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>

                    <div className="sidebar-section">
                        <div className="sidebar-title">BIOGRAPHY</div>
                        <div className="biography">
                            {jsonData.Description?.UserDescription ||
                                'Professional with extensive experience in delivering high-quality results and driving innovation.'}
                        </div>
                    </div>

                    <div className="sidebar-section">
                        <div className="sidebar-title">SKILLS</div>
                        {hardSkills.map((skill, idx) => (
                            <div key={idx} className="skill-item">
                                <div className="skill-name">{skill}</div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="main-content">
                    <div className="header">
                        <div className="name">{jsonData.contactInfo?.fullName || 'Your Name'}</div>
                        <div className="job-title">{jsonData.contactInfo?.jobTitle || 'Professional Title'}</div>
                        <div className="contact-info">
                            <span>📧 {jsonData.contactInfo?.emailAddress || 'email@example.com'}</span>
                            <span>📞 {jsonData.contactInfo?.phoneNumber || '+00 000 000 0000'}</span>
                            <span>📍 {jsonData.contactInfo?.Location || 'Location'}</span>
                        </div>
                    </div>

                    {workExpList && workExpList.length > 0 && (
                        <div className="section">
                            <div className="section-title">Work Experience</div>
                            {workExpList}
                        </div>
                    )}

                    {educationList && educationList.length > 0 && (
                        <div className="section">
                            <div className="section-title">Education</div>
                            {educationList}
                        </div>
                    )}
                </div>
            </div>
        </StyledWrapper>
    );
};

export const T13Css = `
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
