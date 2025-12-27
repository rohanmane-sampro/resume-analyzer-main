
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
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
  
  body {
    font-family: 'Arial', sans-serif;
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
    min-height: 297mm !important;
    margin: 0 !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
}

body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
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

.left-sidebar {
  width: 60px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 1000"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:rgb(20,60,40);stop-opacity:0.9" /><stop offset="100%" style="stop-color:rgb(10,30,20);stop-opacity:0.95" /></linearGradient></defs><rect width="100" height="1000" fill="url(%23grad)"/></svg>') center/cover;
  background-color: #1a3a2a;
  flex-shrink: 0;
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 40px 40px 30px;
  display: flex;
  align-items: flex-start;
  gap: 25px;
  border-bottom: 2px solid #e0e0e0;
}

.profile-photo {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
  border: 3px solid #1a3a2a;
  flex-shrink: 0;
}

.header-content {
  flex: 1;
}

.name {
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #000;
}

.job-title {
  font-size: 14px;
  font-style: italic;
  margin: 0 0 15px 0;
  color: #666;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 11px;
  color: #333;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-icon {
  width: 16px;
  text-align: center;
}

.main-content {
  padding: 30px 40px 40px;
}

.section {
  margin-bottom: 25px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin-bottom: 12px;
  padding-bottom: 5px;
  border-bottom: 2px solid #1a3a2a;
}

.profile-text {
  font-size: 11px;
  line-height: 1.6;
  color: #333;
  text-align: justify;
}

.experience-item, .education-item, .certificate-item {
  margin-bottom: 18px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 5px;
}

.item-title {
  font-weight: bold;
  font-size: 12px;
  color: #000;
}

.item-date {
  font-size: 10px;
  color: #666;
  white-space: nowrap;
}

.item-subtitle {
  font-size: 11px;
  color: #666;
  font-style: italic;
  margin-bottom: 3px;
}

.item-location {
  font-size: 10px;
  color: #999;
  margin-bottom: 6px;
}

.item-description {
  font-size: 11px;
  line-height: 1.5;
  color: #333;
}

.item-description ul {
  margin: 5px 0;
  padding-left: 20px;
}

.item-description li {
  margin-bottom: 4px;
}

.certificates-list {
  font-size: 11px;
  color: #333;
}

.certificate-item {
  margin-bottom: 8px;
}

.languages-list {
  font-size: 11px;
  color: #333;
}

.language-item {
  margin-bottom: 5px;
}

.skills-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.skill-category {
  margin-bottom: 15px;
}

.skill-category-title {
  font-size: 12px;
  font-weight: bold;
  color: #000;
  margin-bottom: 8px;
}

.skill-list {
  font-size: 11px;
  line-height: 1.8;
  color: #333;
}

.skill-item {
  padding-left: 15px;
  position: relative;
  margin-bottom: 3px;
}

.skill-item:before {
  content: "-";
  position: absolute;
  left: 0;
  color: #1a3a2a;
  font-weight: bold;
}
`;

export const T25 = ({ jsonData }) => {
  // Process skills
  const hardSkills = jsonData.skills?.hardSkills
    ? jsonData.skills.hardSkills.split(',').map(skill => skill.trim()).filter(skill => skill !== '')
    : [];

  const softSkills = jsonData.skills?.softSkills
    ? jsonData.skills.softSkills.split(',').map(skill => skill.trim()).filter(skill => skill !== '')
    : [];

  // Process languages
  const languages = jsonData.contactInfo?.Languages
    ? jsonData.contactInfo.Languages.split(',').map(lang => lang.trim()).filter(lang => lang !== '')
    : [];

  // Process work experience
  const workExpList = jsonData.workExperience && jsonData.workExperience.length > 0
    ? jsonData.workExperience.map((we, index) => (
      <div key={`work-${index}`} className="experience-item">
        <div className="item-header">
          <div>
            <div className="item-title">{we.companyName || 'Company Name'}, <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>{we.jobTitle || 'Job Title'}</span></div>
          </div>
          <div className="item-date">{we.WorkDuration || '2019 - present'}</div>
        </div>
        {we.location && <div className="item-location">{we.location}</div>}
        <div className="item-description">
          {we.keyAchievements || 'Key achievements and responsibilities'}
        </div>
      </div>
    ))
    : null;

  // Process education
  const educationList = jsonData.education && jsonData.education.length > 0
    ? jsonData.education.map((edu, index) => (
      <div key={`edu-${index}`} className="education-item">
        <div className="item-header">
          <div>
            <div className="item-title">{edu.institutionName || 'Institution Name'}, <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>{edu.degreeName || 'Degree'}</span></div>
          </div>
          <div className="item-date">{edu.graduationYear || '2014 - 2017'}</div>
        </div>
        <div className="item-location">{edu.location || 'Location'}</div>
      </div>
    ))
    : null;

  // Process certifications
  const certificationsList = jsonData.certifications && jsonData.certifications.length > 0
    ? jsonData.certifications.map((cert, index) => (
      <div key={`cert-${index}`} className="certificate-item">
        {cert.certificationName || cert.certificateName || 'Certification Name'} • {cert.providerName || 'Provider'}
      </div>
    ))
    : null;

  return (
    <StyledWrapper>
      <div className="resume">
        {/* Left Decorative Sidebar */}
        <div className="left-sidebar"></div>

        {/* Main Wrapper */}
        <div className="main-wrapper">
          {/* Header */}
          <div className="header">
            {jsonData.contactInfo?.profilePicture && (
              <img
                src={jsonData.contactInfo.profilePicture}
                alt="Profile"
                className="profile-photo"
              />
            )}
            <div className="header-content">
              <div className="name">{jsonData.contactInfo?.fullName || 'Catherine Bale'}</div>
              <div className="job-title">{jsonData.contactInfo?.jobTitle || 'Marketing Assistant'}</div>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">✉</span>
                  {jsonData.contactInfo?.emailAddress || 'c.bale@bale.com'}
                </div>
                <div className="contact-item">
                  <span className="contact-icon">☎</span>
                  {jsonData.contactInfo?.phoneNumber || '+15 417 543 010'}
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  {jsonData.contactInfo?.Location || '22611 Pacific Coast Hwy, Malibu California 90265 USA'}
                </div>
                {jsonData.contactInfo?.linkedin && (
                  <div className="contact-item">
                    <span className="contact-icon">🔗</span>
                    {jsonData.contactInfo.linkedin}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-content">
            {/* Profile */}
            <div className="section">
              <div className="section-title">Profile</div>
              <div className="profile-text">
                {(jsonData.Description?.UserDescription ||
                  'To obtain a challenging marketing position.')}
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

            {/* Certificates */}
            {certificationsList && certificationsList.length > 0 && (
              <div className="section">
                <div className="section-title">Certificates</div>
                <div className="certificates-list">
                  {certificationsList}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div className="section">
                <div className="section-title">Languages</div>
                <div className="languages-list">
                  {languages.map((lang, index) => (
                    <div key={`lang-${index}`} className="language-item">
                      {lang}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {(hardSkills.length > 0 || softSkills.length > 0) && (
              <div className="section">
                <div className="section-title">Skills</div>
                <div className="skills-section">
                  {hardSkills.length > 0 && (
                    <div className="skill-category">
                      <div className="skill-category-title">Market research</div>
                      <div className="skill-list">
                        {hardSkills.map((skill, index) => (
                          <div key={`hard-${index}`} className="skill-item">
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {softSkills.length > 0 && (
                    <div className="skill-category">
                      <div className="skill-category-title">Tools</div>
                      <div className="skill-list">
                        {softSkills.map((skill, index) => (
                          <div key={`soft-${index}`} className="skill-item">
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
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
    color-adjust: exact !important;
  }
  
  body {
    font-family: 'Arial', sans-serif;
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
    min-height: 297mm !important;
    margin: 0 !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
}

body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
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

.left-sidebar {
  width: 60px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 1000"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:rgb(20,60,40);stop-opacity:0.9" /><stop offset="100%" style="stop-color:rgb(10,30,20);stop-opacity:0.95" /></linearGradient></defs><rect width="100" height="1000" fill="url(%23grad)"/></svg>') center/cover;
  background-color: #1a3a2a;
  flex-shrink: 0;
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 40px 40px 30px;
  display: flex;
  align-items: flex-start;
  gap: 25px;
  border-bottom: 2px solid #e0e0e0;
}

.profile-photo {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
  border: 3px solid #1a3a2a;
  flex-shrink: 0;
}

.header-content {
  flex: 1;
}

.name {
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #000;
}

.job-title {
  font-size: 14px;
  font-style: italic;
  margin: 0 0 15px 0;
  color: #666;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 11px;
  color: #333;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-icon {
  width: 16px;
  text-align: center;
}

.main-content {
  padding: 30px 40px 40px;
}

.section {
  margin-bottom: 25px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin-bottom: 12px;
  padding-bottom: 5px;
  border-bottom: 2px solid #1a3a2a;
}

.profile-text {
  font-size: 11px;
  line-height: 1.6;
  color: #333;
  text-align: justify;
}

.experience-item, .education-item, .certificate-item {
  margin-bottom: 18px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 5px;
}

.item-title {
  font-weight: bold;
  font-size: 12px;
  color: #000;
}

.item-date {
  font-size: 10px;
  color: #666;
  white-space: nowrap;
}

.item-subtitle {
  font-size: 11px;
  color: #666;
  font-style: italic;
  margin-bottom: 3px;
}

.item-location {
  font-size: 10px;
  color: #999;
  margin-bottom: 6px;
}

.item-description {
  font-size: 11px;
  line-height: 1.5;
  color: #333;
}

.item-description ul {
  margin: 5px 0;
  padding-left: 20px;
}

.item-description li {
  margin-bottom: 4px;
}

.certificates-list {
  font-size: 11px;
  color: #333;
}

.certificate-item {
  margin-bottom: 8px;
}

.languages-list {
  font-size: 11px;
  color: #333;
}

.language-item {
  margin-bottom: 5px;
}

.skills-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.skill-category {
  margin-bottom: 15px;
}

.skill-category-title {
  font-size: 12px;
  font-weight: bold;
  color: #000;
  margin-bottom: 8px;
}

.skill-list {
  font-size: 11px;
  line-height: 1.8;
  color: #333;
}

.skill-item {
  padding-left: 15px;
  position: relative;
  margin-bottom: 3px;
}

.skill-item:before {
  content: "-";
  position: absolute;
  left: 0;
  color: #1a3a2a;
  font-weight: bold;
}
`;
