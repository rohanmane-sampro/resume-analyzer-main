
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
  min-height: 297mm;
  background: white;
  margin: 20px auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
}

.sidebar {
  width: 180px;
  background: #2c3e50;
  color: white;
  padding: 25px 20px;
}

.profile-photo {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: #34495e;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.profile-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-placeholder {
  font-size: 60px;
  color: #7f8c8d;
}

.sidebar-section {
  margin-bottom: 20px;
}

.sidebar-title {
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.sidebar-title i {
  font-size: 12px;
}

.sidebar-item {
  font-size: 9px;
  margin-bottom: 6px;
  color: #ecf0f1;
  display: flex;
  align-items: center;
  gap: 6px;
}

.sidebar-item i {
  font-size: 8px;
  min-width: 12px;
}

.language-item {
  margin-bottom: 8px;
}

.language-name {
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 3px;
}

.language-level {
  font-size: 8px;
  color: #bdc3c7;
}

.course-item {
  margin-bottom: 12px;
}

.course-title {
  font-size: 9px;
  font-weight: bold;
  margin-bottom: 2px;
}

.course-org {
  font-size: 8px;
  color: #bdc3c7;
  margin-bottom: 2px;
}

.course-date {
  font-size: 8px;
  color: #95a5a6;
}

.main-content {
  flex: 1;
  padding: 25px 30px;
}

.header {
  margin-bottom: 20px;
}

.name {
  font-size: 22px;
  font-weight: bold;
  margin: 0 0 3px 0;
  color: #000;
}

.job-title {
  font-size: 13px;
  color: #666;
  margin: 0 0 15px 0;
}

.section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  color: #000;
  margin-bottom: 10px;
  padding-bottom: 3px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title i {
  font-size: 12px;
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
`;

export const T19 = ({ jsonData }) => {
  const workExpList = jsonData.workExperience && jsonData.workExperience.length > 0
    ? jsonData.workExperience.map((we, index) => (
      <div key={`work-${index}`} className="experience-item">
        <div className="exp-header">
          <div className="exp-title">{we.jobTitle || 'Position'}</div>
          <div className="exp-date">{we.WorkDuration || '08/2024 - Present'}</div>
        </div>
        <div className="exp-company">{we.companyName || 'Company, Location'}</div>
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

  const languages = jsonData.contactInfo?.Languages
    ? jsonData.contactInfo.Languages.split(',').map(l => l.trim()).filter(l => l !== '')
    : ['Portuguese', 'German', 'English', 'Spanish'];

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        <div className="sidebar">
          <div className="profile-photo">
            {jsonData.contactInfo?.profileImage ? (
              <img src={jsonData.contactInfo.profileImage} alt="Profile" />
            ) : (
              <div className="photo-placeholder">
                <i className="fas fa-user"></i>
              </div>
            )}
          </div>

          <div className="sidebar-section">
            <div className="sidebar-item">
              <i className="fas fa-envelope"></i>
              <span>{jsonData.contactInfo?.emailAddress || 'isabela.campos@email.com'}</span>
            </div>
            <div className="sidebar-item">
              <i className="fas fa-phone"></i>
              <span>{jsonData.contactInfo?.phoneNumber || '+41 79 123 45 67'}</span>
            </div>
            <div className="sidebar-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>{jsonData.contactInfo?.Location || 'Geneve, Switzerland, CH'}</span>
            </div>
            <div className="sidebar-item">
              <i className="fas fa-calendar"></i>
              <span>12.01.1994</span>
            </div>
            <div className="sidebar-item">
              <i className="fas fa-user-circle"></i>
              <span>Brazilian, Swiss, CH</span>
            </div>
            <div className="sidebar-item">
              <i className="fas fa-heart"></i>
              <span>Married</span>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-title">
              <i className="fas fa-globe"></i>
              LANGUAGES
            </div>
            {languages.map((lang, idx) => (
              <div key={idx} className="language-item">
                <div className="language-name">{lang}</div>
                <div className="language-level">Native / B2 Level</div>
              </div>
            ))}
          </div>

          <div className="sidebar-section">
            <div className="sidebar-title">
              <i className="fas fa-certificate"></i>
              COURSES
            </div>
            <div className="course-item">
              <div className="course-title">Certified Associate in Project Management (CAPM)</div>
              <div className="course-org">PMI Global</div>
              <div className="course-date">09/2021 - 01/2022 | Switzerland</div>
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="header">
            <div className="name">{jsonData.contactInfo?.fullName || 'Isabela Campos'}</div>
            <div className="job-title">{jsonData.contactInfo?.jobTitle || 'Area Supervisor'}</div>
          </div>

          {workExpList && workExpList.length > 0 && (
            <div className="section">
              <div className="section-title">
                <i className="fas fa-briefcase"></i>
                PROFESSIONAL EXPERIENCE
              </div>
              {workExpList}
            </div>
          )}

          {educationList && educationList.length > 0 && (
            <div className="section">
              <div className="section-title">
                <i className="fas fa-graduation-cap"></i>
                EDUCATION
              </div>
              {educationList}
            </div>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
};

export const T19Css = `
@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  body {
    margin: 0;
    padding: 0;
    background-color: white !important;
  }
  @page {
   size: A4 portrait;
   margin: 0;
  }
  .resume {
    width: 210mm !important;
    max-width: 210mm !important;
    min-height: 297mm !important;
    margin: 0 !important;
    box-shadow: none !important;
  }
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
}

.resume {
  width: 210mm;
  min-height: 297mm;
  background: white;
  margin: 20px auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
}

.sidebar {
  width: 180px;
  background: #2c3e50;
  color: white;
  padding: 25px 20px;
}

.profile-photo {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: #34495e;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.profile-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-placeholder {
  font-size: 60px;
  color: #7f8c8d;
}

.sidebar-section {
  margin-bottom: 20px;
}

.sidebar-title {
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.sidebar-title i {
  font-size: 12px;
}

.sidebar-item {
  font-size: 9px;
  margin-bottom: 6px;
  color: #ecf0f1;
  display: flex;
  align-items: center;
  gap: 6px;
}

.sidebar-item i {
  font-size: 8px;
  min-width: 12px;
}

.language-item {
  margin-bottom: 8px;
}

.language-name {
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 3px;
}

.language-level {
  font-size: 8px;
  color: #bdc3c7;
}

.course-item {
  margin-bottom: 12px;
}

.course-title {
  font-size: 9px;
  font-weight: bold;
  margin-bottom: 2px;
}

.course-org {
  font-size: 8px;
  color: #bdc3c7;
  margin-bottom: 2px;
}

.course-date {
  font-size: 8px;
  color: #95a5a6;
}

.main-content {
  flex: 1;
  padding: 25px 30px;
}

.header {
  margin-bottom: 20px;
}

.name {
  font-size: 22px;
  font-weight: bold;
  margin: 0 0 3px 0;
  color: #000;
}

.job-title {
  font-size: 13px;
  color: #666;
  margin: 0 0 15px 0;
}

.section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  color: #000;
  margin-bottom: 10px;
  padding-bottom: 3px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title i {
  font-size: 12px;
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
`;
