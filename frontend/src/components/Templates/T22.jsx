
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
}

.header {
  background: linear-gradient(135deg, #4a5f73 0%, #5a6f83 100%);
  color: white;
  padding: 40px 50px;
  display: flex;
  align-items: center;
  gap: 30px;
}

.profile-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  flex-shrink: 0;
}

.header-content {
  flex: 1;
}

.name {
  font-size: 36px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: white !important;
}

.job-title {
  font-size: 16px;
  margin: 0 0 15px 0;
  color: #e0e0e0 !important;
  font-weight: 300;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 13px;
  color: white !important;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: white !important;
}

.contact-item svg {
  width: 14px;
  height: 14px;
}

.main-content {
  display: flex;
  gap: 0;
}

.left-column {
  background: #f8f9fa;
  padding: 40px 30px;
  border-right: 1px solid #e0e0e0;
  flex: 0 0 35%;
  align-self: flex-start;
}

.right-column {
  padding: 40px 40px;
  flex: 1;
}

.section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: #4a5f73;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid #4a5f73;
  letter-spacing: 1px;
}

.profile-text {
  font-size: 12px;
  line-height: 1.6;
  color: #333;
  text-align: justify;
}

.skill-category {
  margin-bottom: 20px;
}

.skill-category-title {
  font-size: 13px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.skill-list {
  font-size: 12px;
  line-height: 1.8;
  color: #555;
}

.skill-item {
  position: relative;
  padding-left: 15px;
  margin-bottom: 5px;
}

.skill-item:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #4a5f73;
  font-weight: bold;
}

.skill-bar {
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  margin-top: 5px;
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  background: #4a5f73;
  border-radius: 3px;
}

.experience-item, .education-item, .certificate-item {
  margin-bottom: 25px;
  position: relative;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.item-title {
  font-weight: bold;
  font-size: 14px;
  color: #000;
}

.item-date {
  font-size: 11px;
  color: #4a5f73;
  font-weight: 600;
  white-space: nowrap;
}

.item-subtitle {
  font-size: 13px;
  color: #4a5f73;
  margin-bottom: 5px;
  font-weight: 600;
}

.item-location {
  font-size: 11px;
  color: #666;
  margin-bottom: 8px;
}

.item-description {
  font-size: 12px;
  line-height: 1.6;
  color: #333;
}

.item-description ul {
  margin: 8px 0;
  padding-left: 20px;
}

.item-description li {
  margin-bottom: 5px;
}

.certificate-name {
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin-bottom: 3px;
}

.certificate-icon {
  color: #4a5f73;
  margin-right: 5px;
}

.language-item {
  font-size: 12px;
  color: #333;
  margin-bottom: 8px;
  padding-left: 15px;
  position: relative;
}

.language-item:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #4a5f73;
  font-weight: bold;
}
`;

export const T22 = ({ jsonData }) => {
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
          <div className="item-title">{we.jobTitle || 'Job Title'}</div>
          <div className="item-date">{we.WorkDuration || 'MM/YYYY - MM/YYYY'}</div>
        </div>
        <div className="item-subtitle">{we.companyName || 'Company Name'}</div>
        {we.location && <div className="item-location">{we.location}</div>}
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
          <div className="item-title">{edu.degreeName || 'Degree'}</div>
          <div className="item-date">{edu.graduationYear || 'MM/YYYY'}</div>
        </div>
        <div className="item-subtitle">{edu.institutionName || 'Institution Name'}</div>
        <div className="item-location">{edu.location || 'Location'}</div>
        {edu.currentCGPA && (
          <div className="item-description">
            CGPA: {edu.currentCGPA}
          </div>
        )}
      </div>
    ))
    : null;

  // Process certifications
  const certificationsList = jsonData.certifications && jsonData.certifications.length > 0
    ? jsonData.certifications.map((cert, index) => (
      <div key={`cert-${index}`} className="certificate-item">
        <div className="item-header">
          <div className="certificate-name">
            <span className="certificate-icon">✓</span>
            {cert.certificationName || cert.certificateName || 'Certification Name'}
          </div>
          {cert.courseDuration && <div className="item-date">{cert.courseDuration}</div>}
        </div>
        {cert.providerName && <div className="item-subtitle">{cert.providerName}</div>}
      </div>
    ))
    : null;

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <div className="name">{jsonData.contactInfo?.fullName || 'Your Name'}</div>
            <div className="job-title">{jsonData.contactInfo?.jobTitle || 'Professional Title'}</div>
            <div className="contact-info">
              <div className="contact-item">
                ✉ {jsonData.contactInfo?.emailAddress || 'your.email@example.com'}
              </div>
              <div className="contact-item">
                ☎ {jsonData.contactInfo?.phoneNumber || 'Your Phone'}
              </div>
              <div className="contact-item">
                🔗 {jsonData.contactInfo?.linkedin || 'LinkedIn'}
              </div>
              {jsonData.contactInfo?.portfolio && (
                <div className="contact-item">
                  💼 {jsonData.contactInfo.portfolio}
                </div>
              )}
              {jsonData.contactInfo?.github && (
                <div className="contact-item">
                  💻 {jsonData.contactInfo.github}
                </div>
              )}
              <div className="contact-item">
                📍 {jsonData.contactInfo?.Location || 'Your Location'}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Left Column */}
          <div className="left-column">
            {/* Profile */}
            <div className="section">
              <div className="section-title">Profile</div>
              <div className="profile-text">
                {jsonData.Description?.UserDescription
                  ? jsonData.Description.UserDescription
                  : 'A dedicated and results-driven professional with expertise in delivering high-quality solutions and driving team success through effective collaboration and innovative problem-solving.'}
              </div>
            </div>

            {/* Skills */}
            <div className="section">
              <div className="section-title">Skills</div>

              {hardSkills.length > 0 && (
                <div className="skill-category">
                  <div className="skill-category-title">Technical Skills</div>
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
                  <div className="skill-category-title">Soft Skills</div>
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

            {/* Languages */}
            {languages.length > 0 && (
              <div className="section">
                <div className="section-title">Languages</div>
                {languages.map((lang, index) => (
                  <div key={`lang-${index}`} className="language-item">
                    {lang}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="right-column">
            {/* Professional Experience */}
            {workExpList && workExpList.length > 0 && (
              <div className="section">
                <div className="section-title">Professional Experience</div>
                {workExpList}
              </div>
            )}

            {/* Certificates */}
            {certificationsList && certificationsList.length > 0 && (
              <div className="section">
                <div className="section-title">Certificates</div>
                {certificationsList}
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
      </div>
    </StyledWrapper>
  );
};

export const T22Css = `
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
  overflow: hidden; /* Hide overflow */
}

.header {
  background: linear-gradient(135deg, #4a5f73 0%, #5a6f83 100%);
  color: white;
  padding: 40px 50px;
  display: flex;
  align-items: center;
  gap: 30px;
}

.profile-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  flex-shrink: 0;
}

.header-content {
  flex: 1;
}

.name {
  font-size: 36px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: white !important;
}

.job-title {
  font-size: 16px;
  margin: 0 0 15px 0;
  color: #e0e0e0 !important;
  font-weight: 300;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 13px;
  color: white !important;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: white !important;
}

.main-content {
  display: flex;
  gap: 0;
}

.left-column {
  background: #f8f9fa;
  padding: 40px 30px;
  border-right: 1px solid #e0e0e0;
  flex: 0 0 35%;
  align-self: flex-start;
}

.right-column {
  padding: 40px 40px;
  flex: 1;
}

.section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: #4a5f73;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid #4a5f73;
  letter-spacing: 1px;
}

.profile-text {
  font-size: 12px;
  line-height: 1.6;
  color: #333;
  text-align: justify;
}

.skill-category {
  margin-bottom: 20px;
}

.skill-category-title {
  font-size: 13px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.skill-list {
  font-size: 12px;
  line-height: 1.8;
  color: #555;
}

.skill-item {
  position: relative;
  padding-left: 15px;
  margin-bottom: 5px;
}

.skill-item:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #4a5f73;
  font-weight: bold;
}

.experience-item, .education-item, .certificate-item {
  margin-bottom: 25px;
  position: relative;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.item-title {
  font-weight: bold;
  font-size: 14px;
  color: #000;
}

.item-date {
  font-size: 11px;
  color: #4a5f73;
  font-weight: 600;
  white-space: nowrap;
}

.item-subtitle {
  font-size: 13px;
  color: #4a5f73;
  margin-bottom: 5px;
  font-weight: 600;
}

.item-location {
  font-size: 11px;
  color: #666;
  margin-bottom: 8px;
}

.item-description {
  font-size: 12px;
  line-height: 1.6;
  color: #333;
}

.item-description ul {
  margin: 8px 0;
  padding-left: 20px;
}

.item-description li {
  margin-bottom: 5px;
}

.certificate-name {
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin-bottom: 3px;
}

.certificate-icon {
  color: #4a5f73;
  margin-right: 5px;
}

.language-item {
  font-size: 12px;
  color: #333;
  margin-bottom: 8px;
  padding-left: 15px;
  position: relative;
}

.language-item:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #4a5f73;
  font-weight: bold;
}
`;
