
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

  .main-content {
      padding: 20px 30px 30px !important;
  }
  
  .header {
      padding: 20px 30px !important;
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
  position: relative;
}

.header {
  background: #3a3a3a;
  color: white;
  padding: 25px 40px;
}

.name {
  font-size: 28px; /* Slightly reduced */
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #f5a623 !important;
}

.job-title {
  font-size: 14px; /* Slightly reduced */
  margin: 0 0 10px 0;
  color: white !important;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 10px; /* Reduced */
  color: white !important;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: white !important;
}

.contact-icon {
  color: #f5a623;
  font-weight: bold;
}

.main-content {
  padding: 25px 35px 30px; /* Adjusted padding */
}

.section {
  margin-bottom: 20px; /* Reduced margin */
}

.section-title {
  font-size: 12px;
  font-weight: bold;
  color: #000;
  margin-bottom: 10px;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-icon {
  width: 18px;
  height: 18px;
  background: #3a3a3a;
  color: #f5a623;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.profile-text {
  font-size: 10px;
  line-height: 1.5;
  color: #333;
  text-align: justify;
}

.experience-item, .education-item, .project-item {
  margin-bottom: 12px; /* Reduced margin */
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 3px;
}

.item-title {
  font-weight: bold;
  font-size: 11px; /* Reduced */
  color: #000;
}

.item-date {
  font-size: 9px;
  color: #f5a623;
  font-weight: 600;
  white-space: nowrap;
}

.item-subtitle {
  font-size: 10px;
  color: #666;
  font-style: italic;
  margin-bottom: 2px;
}

.item-location {
  font-size: 9px;
  color: #999;
  margin-bottom: 4px;
}

.item-description {
  font-size: 10px;
  line-height: 1.4; /* Tighter line height */
  color: #333;
}

.item-description ul {
  margin: 3px 0;
  padding-left: 15px;
}

.item-description li {
  margin-bottom: 2px;
}

.skills-section {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px; /* Reduced gap */
}

.skill-category {
  margin-bottom: 10px;
}

.skill-category-title {
  font-size: 10px;
  font-weight: bold;
  color: #000;
  margin-bottom: 5px;
}

.skill-list {
  font-size: 9px;
  line-height: 1.5;
  color: #333;
}

.skill-item {
  padding-left: 10px;
  position: relative;
  margin-bottom: 2px;
}

.skill-item:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #f5a623;
  font-weight: bold;
}

.languages-list {
  font-size: 10px;
  color: #333;
}

.language-item {
  margin-bottom: 4px;
}
`;

export const T24 = ({ jsonData }) => {
  // Process skills - Limit to fit one page
  const hardSkills = jsonData.skills?.hardSkills
    ? jsonData.skills.hardSkills.split(',').map(skill => skill.trim()).filter(skill => skill !== '')
    : [];

  const softSkills = jsonData.skills?.softSkills
    ? jsonData.skills.softSkills.split(',').map(skill => skill.trim()).filter(skill => skill !== '')
    : [];

  // Process languages - Limit to 4
  const languages = jsonData.contactInfo?.Languages
    ? jsonData.contactInfo.Languages.split(',').map(lang => lang.trim()).filter(lang => lang !== '')
    : [];

  // Process work experience - Limit to top 2 to ensure 1 page
  const workExpList = jsonData.workExperience && jsonData.workExperience.length > 0
    ? jsonData.workExperience.map((we, index) => (
      <div key={`work-${index}`} className="experience-item">
        <div className="item-header">
          <div className="item-title">{we.jobTitle || 'Job Title'}</div>
          <div className="item-date">{we.WorkDuration || 'Apr 2025 - Oct 2025'}</div>
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

  // Process education - Limit to top 2
  const educationList = jsonData.education && jsonData.education.length > 0
    ? jsonData.education.map((edu, index) => (
      <div key={`edu-${index}`} className="education-item">
        <div className="item-header">
          <div className="item-title">{edu.degreeName || 'Degree'}</div>
          <div className="item-date">{edu.graduationYear || '2021 - 2026'}</div>
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

  // Process projects - Limit to top 2
  const projectsList = jsonData.projects && jsonData.projects.length > 0
    ? jsonData.projects.map((proj, index) => (
      <div key={`proj-${index}`} className="project-item">
        <div className="item-header">
          <div className="item-title">{proj.projectTitle || 'Project Title'}</div>
          <div className="item-date">{proj.duration || 'Jan 2025 - Present'}</div>
        </div>
        <div className="item-subtitle">{proj.organization || 'Organization'}</div>
        <div className="item-description">
          <ul>
            <li>{proj.projectDescription || proj.toolsTechUsed || 'Project description and technologies used'}</li>
          </ul>
        </div>
      </div>
    ))
    : null;

  return (
    <StyledWrapper>
      <div className="resume">
        {/* Header */}
        <div className="header">
          <div className="name">{jsonData.contactInfo?.fullName || 'Chloé LIANG'}</div>
          <div className="job-title">{jsonData.contactInfo?.jobTitle || 'Compositing Artist'}</div>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">✉</span> {jsonData.contactInfo?.emailAddress || 'c.liang@iaast.com'}
            </div>
            <div className="contact-item">
              <span className="contact-icon">☎</span> {jsonData.contactInfo?.phoneNumber || '+33 6 52 18 9345'}
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span> {jsonData.contactInfo?.Location || 'Lyon, France'}
            </div>
            {jsonData.contactInfo?.portfolio && (
              <div className="contact-item">
                <span className="contact-icon">🌐</span> {jsonData.contactInfo.portfolio}
              </div>
            )}
            {jsonData.contactInfo?.linkedin && (
              <div className="contact-item">
                <span className="contact-icon">💼</span> {jsonData.contactInfo.linkedin}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Profile */}
          <div className="section">
            <div className="section-title">
              <span className="section-icon">👤</span>
              PROFILE
            </div>
            <div className="profile-text">
              {(jsonData.Description?.UserDescription ||
                'Skilled in both live-action and 3D animated productions. Proficient in integrating CGI using Nuke, with a passion for crafting visually compelling narratives that blur the line between reality and imagination.')}
            </div>
          </div>

          {/* Professional Experience */}
          {workExpList && workExpList.length > 0 && (
            <div className="section">
              <div className="section-title">
                <span className="section-icon">💼</span>
                PROFESSIONAL EXPERIENCE
              </div>
              {workExpList}
            </div>
          )}

          {/* Education */}
          {educationList && educationList.length > 0 && (
            <div className="section">
              <div className="section-title">
                <span className="section-icon">🎓</span>
                EDUCATION
              </div>
              {educationList}
            </div>
          )}

          {/* Skills */}
          {(hardSkills.length > 0 || softSkills.length > 0) && (
            <div className="section">
              <div className="section-title">
                <span className="section-icon">⚡</span>
                SKILLS
              </div>
              <div className="skills-section">
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
            </div>
          )}

          {/* Projects */}
          {projectsList && projectsList.length > 0 && (
            <div className="section">
              <div className="section-title">
                <span className="section-icon">🚀</span>
                PROJECTS
              </div>
              {projectsList}
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="section">
              <div className="section-title">
                <span className="section-icon">🌍</span>
                LANGUAGES
              </div>
              <div className="languages-list">
                {languages.map((lang, index) => (
                  <div key={`lang-${index}`} className="language-item">
                    {lang}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
};

export const T24Css = `

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

  .main-content {
      padding: 20px 30px 30px !important;
  }
  
  .header {
      padding: 20px 30px !important;
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
  position: relative;
}

.header {
  background: #3a3a3a;
  color: white;
  padding: 25px 40px;
}

.name {
  font-size: 28px; /* Slightly reduced */
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #f5a623 !important;
}

.job-title {
  font-size: 14px; /* Slightly reduced */
  margin: 0 0 10px 0;
  color: white !important;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 10px; /* Reduced */
  color: white !important;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: white !important;
}

.contact-icon {
  color: #f5a623;
  font-weight: bold;
}

.main-content {
  padding: 25px 35px 30px; /* Adjusted padding */
}

.section {
  margin-bottom: 20px; /* Reduced margin */
}

.section-title {
  font-size: 12px;
  font-weight: bold;
  color: #000;
  margin-bottom: 10px;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-icon {
  width: 18px;
  height: 18px;
  background: #3a3a3a;
  color: #f5a623;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.profile-text {
  font-size: 10px;
  line-height: 1.5;
  color: #333;
  text-align: justify;
}

.experience-item, .education-item, .project-item {
  margin-bottom: 12px; /* Reduced margin */
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 3px;
}

.item-title {
  font-weight: bold;
  font-size: 11px; /* Reduced */
  color: #000;
}

.item-date {
  font-size: 9px;
  color: #f5a623;
  font-weight: 600;
  white-space: nowrap;
}

.item-subtitle {
  font-size: 10px;
  color: #666;
  font-style: italic;
  margin-bottom: 2px;
}

.item-location {
  font-size: 9px;
  color: #999;
  margin-bottom: 4px;
}

.item-description {
  font-size: 10px;
  line-height: 1.4; /* Tighter line height */
  color: #333;
}

.item-description ul {
  margin: 3px 0;
  padding-left: 15px;
}

.item-description li {
  margin-bottom: 2px;
}

.skills-section {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px; /* Reduced gap */
}

.skill-category {
  margin-bottom: 10px;
}

.skill-category-title {
  font-size: 10px;
  font-weight: bold;
  color: #000;
  margin-bottom: 5px;
}

.skill-list {
  font-size: 9px;
  line-height: 1.5;
  color: #333;
}

.skill-item {
  padding-left: 10px;
  position: relative;
  margin-bottom: 2px;
}

.skill-item:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #f5a623;
  font-weight: bold;
}

.languages-list {
  font-size: 10px;
  color: #333;
}

.language-item {
  margin-bottom: 4px;
}
`;
