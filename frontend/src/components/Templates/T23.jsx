
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
    font-family: 'Georgia', 'Times New Roman', serif;
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
  font-family: 'Georgia', 'Times New Roman', serif;
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
  text-align: center;
  padding: 40px 50px 30px;
  border-bottom: 3px solid #000;
}

.name {
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #000;
  letter-spacing: 1px;
}

.job-title {
  font-size: 14px;
  font-style: italic;
  margin: 0 0 15px 0;
  color: #333;
}

.contact-info {
  display: flex;
  justify-content: center;
  gap: 15px;
  font-size: 11px;
  color: #333;
  flex-wrap: wrap;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.main-content {
  padding: 30px 50px 40px;
}

.section {
  margin-bottom: 25px;
}

.section-title {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: #000;
  margin-bottom: 12px;
  padding-bottom: 5px;
  border-bottom: 2px solid #000;
  letter-spacing: 1.5px;
}

.profile-text {
  font-size: 11px;
  line-height: 1.6;
  color: #333;
  text-align: justify;
}

.experience-item, .education-item {
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
  color: #333;
  font-style: italic;
  margin-bottom: 3px;
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
  margin: 5px 0;
  padding-left: 20px;
}

.item-description li {
  margin-bottom: 4px;
}

.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  font-size: 11px;
}

.skill-item {
  padding-left: 15px;
  position: relative;
  color: #333;
}

.skill-item:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #000;
  font-weight: bold;
}

.languages-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.language-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  color: #333;
}

.language-name {
  font-weight: 600;
}

.language-level {
  display: flex;
  gap: 3px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #000;
}

.dot.empty {
  background: #ddd;
}

.awards-list {
  font-size: 11px;
}

.award-item {
  margin-bottom: 10px;
}

.award-name {
  font-weight: bold;
  color: #000;
  margin-bottom: 2px;
}

.award-org {
  font-style: italic;
  color: #666;
}
`;

export const T23 = ({ jsonData }) => {
  // Process skills
  const hardSkills = jsonData.skills?.hardSkills
    ? jsonData.skills.hardSkills.split(',').map(skill => skill.trim()).filter(skill => skill !== '')
    : [];

  const softSkills = jsonData.skills?.softSkills
    ? jsonData.skills.softSkills.split(',').map(skill => skill.trim()).filter(skill => skill !== '')
    : [];

  const allSkills = [...hardSkills, ...softSkills];

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

  // Process certifications as awards
  const certificationsList = jsonData.certifications && jsonData.certifications.length > 0
    ? jsonData.certifications.map((cert, index) => (
      <div key={`cert-${index}`} className="award-item">
        <div className="award-name">{cert.certificationName || cert.certificateName || 'Certification Name'}</div>
        <div className="award-org">{cert.providerName || 'Provider'}</div>
      </div>
    ))
    : null;

  return (
    <StyledWrapper>
      <div className="resume">
        {/* Header */}
        <div className="header">
          <div className="name">{jsonData.contactInfo?.fullName || 'Andrew O\'Sullivan'}</div>
          <div className="job-title">{jsonData.contactInfo?.jobTitle || 'Product Manager'}</div>
          <div className="contact-info">
            <div className="contact-item">
              📍 {jsonData.contactInfo?.Location || 'Obere Lände 23, 12345 Berlin'}
            </div>
            <div className="contact-item">
              ✉ {jsonData.contactInfo?.emailAddress || 'andrew@null.com'}
            </div>
            <div className="contact-item">
              ☎ {jsonData.contactInfo?.phoneNumber || '+49 1111555'}
            </div>
            <div className="contact-item">
              🔗 {jsonData.contactInfo?.linkedin || 'andrewosullivan'}
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
                'Experienced Product Manager with a proven track record.')}
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
          {allSkills.length > 0 && (
            <div className="section">
              <div className="section-title">Skills</div>
              <div className="skills-grid">
                {allSkills.map((skill, index) => (
                  <div key={`skill-${index}`} className="skill-item">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="section">
              <div className="section-title">Languages</div>
              <div className="languages-grid">
                {languages.map((lang, index) => (
                  <div key={`lang-${index}`} className="language-item">
                    <span className="language-name">{lang}</span>
                    <div className="language-level">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot empty"></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Awards */}
          {certificationsList && certificationsList.length > 0 && (
            <div className="section">
              <div className="section-title">Awards</div>
              <div className="awards-list">
                {certificationsList}
              </div>
            </div>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
};

export const T23Css = `
@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
  
  body {
    font-family: 'Georgia', 'Times New Roman', serif;
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
  font-family: 'Georgia', 'Times New Roman', serif;
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
  text-align: center;
  padding: 40px 50px 30px;
  border-bottom: 3px solid #000;
}

.name {
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #000;
  letter-spacing: 1px;
}

.job-title {
  font-size: 14px;
  font-style: italic;
  margin: 0 0 15px 0;
  color: #333;
}

.contact-info {
  display: flex;
  justify-content: center;
  gap: 15px;
  font-size: 11px;
  color: #333;
  flex-wrap: wrap;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.main-content {
  padding: 30px 50px 40px;
}

.section {
  margin-bottom: 25px;
}

.section-title {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: #000;
  margin-bottom: 12px;
  padding-bottom: 5px;
  border-bottom: 2px solid #000;
  letter-spacing: 1.5px;
}

.profile-text {
  font-size: 11px;
  line-height: 1.6;
  color: #333;
  text-align: justify;
}

.experience-item, .education-item {
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
  color: #333;
  font-style: italic;
  margin-bottom: 3px;
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
  margin: 5px 0;
  padding-left: 20px;
}

.item-description li {
  margin-bottom: 4px;
}

.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  font-size: 11px;
}

.skill-item {
  padding-left: 15px;
  position: relative;
  color: #333;
}

.skill-item:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #000;
  font-weight: bold;
}

.languages-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.language-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  color: #333;
}

.language-name {
  font-weight: 600;
}

.language-level {
  display: flex;
  gap: 3px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #000;
}

.dot.empty {
  background: #ddd;
}

.awards-list {
  font-size: 11px;
}

.award-item {
  margin-bottom: 10px;
}

.award-name {
  font-weight: bold;
  color: #000;
  margin-bottom: 2px;
}

.award-org {
  font-style: italic;
  color: #666;
}
`;
