
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
  overflow: hidden;
  background: white;
  margin: 20px auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
}

.sidebar {
  width: 35%;
  background: #2c3e50;
  color: white;
  padding: 30px 25px;
}

.profile-section {
  text-align: center;
  margin-bottom: 25px;
}

.name {
  font-size: 22px;
  font-weight: bold;
  margin: 15px 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.profile-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #34495e;
  margin: 0 auto 15px;
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
  font-size: 48px;
  color: #7f8c8d;
}

.sidebar-section {
  margin-bottom: 25px;
}

.sidebar-title {
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 12px;
  letter-spacing: 1px;
  color: #ecf0f1;
}

.profile-text {
  font-size: 10px;
  line-height: 1.5;
  color: #bdc3c7;
  text-align: justify;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 9px;
  color: #bdc3c7;
}

.contact-item i {
  width: 12px;
  font-size: 10px;
  color: #ecf0f1;
  margin-top: 2px;
}

.skill-item {
  margin-bottom: 8px;
}

.skill-name {
  font-size: 10px;
  color: #ecf0f1;
  margin-bottom: 3px;
}

.skill-bar {
  height: 4px;
  background: #34495e;
  border-radius: 2px;
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  background: #3498db;
}

.main-content {
  flex: 1;
  padding: 30px 35px;
  background: white;
}

.section {
  margin-bottom: 22px;
}

.section-title {
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  color: #2c3e50;
  margin-bottom: 12px;
  padding-bottom: 6px;
  border-bottom: 2px solid #3498db;
  letter-spacing: 1px;
}

.experience-item, .education-item {
  margin-bottom: 15px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}

.item-title {
  font-size: 12px;
  font-weight: bold;
  color: #2c3e50;
}

.item-date {
  font-size: 10px;
  color: #7f8c8d;
  font-style: italic;
}

.item-company {
  font-size: 11px;
  color: #3498db;
  margin-bottom: 6px;
  font-style: italic;
}

.item-description {
  font-size: 10px;
  line-height: 1.5;
  color: #555;
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
  color: #555;
}
`;

export const T12 = ({ jsonData }) => {
  // Process work experience
  const workExpList = jsonData.workExperience && jsonData.workExperience.length > 0
    ? jsonData.workExperience.map((we, index) => (
      <div key={`work-${index}`} className="experience-item">
        <div className="item-header">
          <div className="item-title">{we.jobTitle || 'Position'}</div>
          <div className="item-date">{we.WorkDuration || '2021-04-pres.'}</div>
        </div>
        <div className="item-company">{we.companyName || 'Company'}</div>
        <div className="item-description">
          <span dangerouslySetInnerHTML={{ __html: parseMarkdown(we.keyAchievements || 'Job responsibilities') }} />
        </div>
      </div>
    ))
    : null;

  // Process education
  const educationList = jsonData.education && jsonData.education.length > 0
    ? jsonData.education.map((edu, index) => (
      <div key={`edu-${index}`} className="education-item">
        <div className="item-header">
          <div className="item-title">{edu.degreeName || 'Degree'}</div>
          <div className="item-date">{edu.graduationYear || '2015-2025'}</div>
        </div>
        <div className="item-company">{edu.institutionName || 'University'}</div>
        <div className="education-degree">
          {edu.fieldOfStudy || 'Field of Study'}
        </div>
      </div>
    ))
    : null;

  // Skills
  const hardSkills = jsonData.skills?.hardSkills
    ? jsonData.skills.hardSkills.split(',').map(s => s.trim()).filter(s => s !== '')
    : ['Python', 'SQL', 'R', 'Matlab'];

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        {/* Dark Sidebar */}
        <div className="sidebar">
          <div className="profile-section">
            <div className="profile-photo">
              {jsonData.contactInfo?.profileImage ? (
                <img src={jsonData.contactInfo.profileImage} alt="Profile" />
              ) : (
                <div className="photo-placeholder">
                  <i className="fas fa-user"></i>
                </div>
              )}
            </div>
            <div className="name">{jsonData.contactInfo?.fullName || 'Guillaume Ouancaux'}</div>
          </div>

          {/* Profile */}
          <div className="sidebar-section">
            <div className="sidebar-title">Profile</div>
            <div className="profile-text">
              {jsonData.Description?.UserDescription
                ? jsonData.Description.UserDescription
                : 'Inventive and passionate data analyst...'}
            </div>
          </div>

          {/* Contact */}
          <div className="sidebar-section">
            <div className="sidebar-title">Contact details</div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>{jsonData.contactInfo?.emailAddress || 'wonky.willianson@gmail.com'}</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>{jsonData.contactInfo?.phoneNumber || '+353875517818'}</span>
            </div>
            <div className="contact-item">
              <i className="fab fa-github"></i>
              <span>{jsonData.contactInfo?.portfolio?.replace('https://github.com/', '') || 'gitHub.com/WankyStan'}</span>
            </div>
            <div className="contact-item">
              <i className="fab fa-linkedin"></i>
              <span>{jsonData.contactInfo?.linkedin || 'linkedin.com/in/xxx'}</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>{jsonData.contactInfo?.Location || 'Farringdon/London, UK'}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="sidebar-section">
            <div className="sidebar-title">Skills</div>
            {hardSkills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-name">{skill}</div>
                <div className="skill-bar">
                  <div className="skill-fill" style={{ width: '85%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Experience */}
          {workExpList && workExpList.length > 0 && (
            <div className="section">
              <div className="section-title">Experience</div>
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
        </div>
      </div>
    </StyledWrapper>
  );
};

export const T12Css = `
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
    overflow: hidden !important;
  }
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
}

.resume {
  width: 210mm;
  min-height: 297mm;
  overflow: hidden;
  background: white;
  margin: 20px auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
}

.sidebar {
  width: 35%;
  background: #2c3e50;
  color: white;
  padding: 30px 25px;
}

.profile-section {
  text-align: center;
  margin-bottom: 25px;
}

.name {
  font-size: 22px;
  font-weight: bold;
  margin: 15px 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.profile-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #34495e;
  margin: 0 auto 15px;
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
  font-size: 48px;
  color: #7f8c8d;
}

.sidebar-section {
  margin-bottom: 25px;
}

.sidebar-title {
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 12px;
  letter-spacing: 1px;
  color: #ecf0f1;
}

.profile-text {
  font-size: 10px;
  line-height: 1.5;
  color: #bdc3c7;
  text-align: justify;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 9px;
  color: #bdc3c7;
}

.contact-item i {
  width: 12px;
  font-size: 10px;
  color: #ecf0f1;
  margin-top: 2px;
}

.skill-item {
  margin-bottom: 8px;
}

.skill-name {
  font-size: 10px;
  color: #ecf0f1;
  margin-bottom: 3px;
}

.skill-bar {
  height: 4px;
  background: #34495e;
  border-radius: 2px;
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  background: #3498db;
}

.main-content {
  flex: 1;
  padding: 30px 35px;
  background: white;
}

.section {
  margin-bottom: 22px;
}

.section-title {
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  color: #2c3e50;
  margin-bottom: 12px;
  padding-bottom: 6px;
  border-bottom: 2px solid #3498db;
  letter-spacing: 1px;
}

.experience-item, .education-item {
  margin-bottom: 15px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}

.item-title {
  font-size: 12px;
  font-weight: bold;
  color: #2c3e50;
}

.item-date {
  font-size: 10px;
  color: #7f8c8d;
  font-style: italic;
}

.item-company {
  font-size: 11px;
  color: #3498db;
  margin-bottom: 6px;
  font-style: italic;
}

.item-description {
  font-size: 10px;
  line-height: 1.5;
  color: #555;
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
  color: #555;
}
`;
