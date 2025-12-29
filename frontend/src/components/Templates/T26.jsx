
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
  padding: 40px 50px 30px;
  display: flex;
  align-items: center;
  gap: 30px;
  border-bottom: 3px solid #f5a623;
}

.profile-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f5a623;
  flex-shrink: 0;
}

.header-content {
  flex: 1;
}

.name {
  font-size: 32px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #000;
}

.job-title {
  font-size: 15px;
  font-style: italic;
  margin: 0 0 15px 0;
  color: #666;
}

.contact-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  font-size: 10px;
  color: #333;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.contact-icon {
  color: #f5a623;
  font-weight: bold;
  width: 16px;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 30px;
  padding: 30px 50px 40px;
}

.left-column {
  border-right: 2px solid #f5a623;
  padding-right: 30px;
}

.right-column {
  padding-left: 0;
}

.section {
  margin-bottom: 25px;
}

.section-title {
  font-size: 13px;
  font-weight: bold;
  color: #000;
  margin-bottom: 12px;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-icon {
  color: #f5a623;
  font-size: 16px;
}

.section-content {
  font-size: 11px;
  line-height: 1.6;
  color: #333;
}

.education-item, .skill-category {
  margin-bottom: 15px;
}

.education-degree {
  font-weight: bold;
  font-size: 11px;
  color: #000;
  margin-bottom: 3px;
}

.education-institution {
  font-size: 10px;
  color: #666;
  font-style: italic;
  margin-bottom: 2px;
}

.education-date {
  font-size: 10px;
  color: #999;
}

.education-details {
  font-size: 10px;
  color: #333;
  margin-top: 3px;
}

.education-details ul {
  margin: 3px 0;
  padding-left: 15px;
}

.skill-category-title {
  font-size: 11px;
  font-weight: bold;
  color: #000;
  margin-bottom: 6px;
}

.skill-list {
  font-size: 10px;
  line-height: 1.7;
  color: #333;
}

.skill-item {
  padding-left: 12px;
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
  font-size: 11px;
  color: #333;
}

.language-item {
  margin-bottom: 8px;
}

.language-name {
  font-weight: bold;
  color: #000;
}

.language-level {
  font-size: 10px;
  color: #666;
}

.experience-item, .project-item {
  margin-bottom: 20px;
}

.item-header {
  margin-bottom: 5px;
}

.item-title {
  font-weight: bold;
  font-size: 12px;
  color: #000;
  margin-bottom: 2px;
}

.item-subtitle {
  font-size: 11px;
  color: #666;
  font-style: italic;
  margin-bottom: 2px;
}

.item-date {
  font-size: 10px;
  color: #f5a623;
  font-weight: 600;
  margin-bottom: 5px;
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

.project-tech {
  font-size: 10px;
  color: #666;
  margin-top: 5px;
}
`;

export const T26 = ({ jsonData }) => {
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

  // Process education
  const educationList = jsonData.education && jsonData.education.length > 0
    ? jsonData.education.map((edu, index) => (
      <div key={`edu-${index}`} className="education-item">
        <div className="education-degree">{edu.institutionName || 'Institution Name'},</div>
        <div className="education-institution">{edu.degreeName || 'Degree Name'}</div>
        <div className="education-date">{edu.graduationYear || '2019 - 2024'} {edu.location ? `| ${edu.location}` : ''}</div>
        {edu.currentCGPA && (
          <div className="education-details">
            <ul>
              <li>CGPA: {edu.currentCGPA}</li>
            </ul>
          </div>
        )}
      </div>
    ))
    : null;

  // Process work experience
  const workExpList = jsonData.workExperience && jsonData.workExperience.length > 0
    ? jsonData.workExperience.map((we, index) => (
      <div key={`work-${index}`} className="experience-item">
        <div className="item-header">
          <div className="item-title">{we.jobTitle || 'Job Title'}, <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>{we.companyName || 'Company Name'}</span></div>
          <div className="item-date">{we.WorkDuration || 'set 2024 - dic 2024'} | {we.location || 'Location'}</div>
        </div>
        <div className="item-description">
          <ul>
            <li dangerouslySetInnerHTML={{ __html: parseMarkdown(we.keyAchievements || 'Key achievements and responsibilities') }} />
          </ul>
        </div>
      </div>
    ))
    : null;

  // Process projects
  const projectsList = jsonData.projects && jsonData.projects.length > 0
    ? jsonData.projects.map((proj, index) => (
      <div key={`proj-${index}`} className="project-item">
        <div className="item-header">
          <div className="item-title">{proj.projectTitle || 'Project Title'}, <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>{proj.organization || 'Organization'}</span></div>
          <div className="item-date">{proj.duration || 'Jan 2025 - Present'}</div>
        </div>
        <div className="item-description">
          <ul>
            <li>{proj.projectDescription || 'Project description'}</li>
          </ul>
        </div>
        {proj.toolsTechUsed && (
          <div className="project-tech">
            Technologies: {proj.toolsTechUsed}
          </div>
        )}
      </div>
    ))
    : null;

  return (
    <StyledWrapper>
      <div className="resume">
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
            <div className="name">{jsonData.contactInfo?.fullName || 'Elio Giordano'}</div>
            <div className="job-title">{jsonData.contactInfo?.jobTitle || 'Full-Stack Web Developer'}</div>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">✉</span>
                {jsonData.contactInfo?.emailAddress || 'elio.giordano.dev@email.com'}
              </div>
              <div className="contact-item">
                <span className="contact-icon">☎</span>
                {jsonData.contactInfo?.phoneNumber || '+39 348 133 4567'}
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                {jsonData.contactInfo?.Location || 'Bologna, Italy'}
              </div>
              <div className="contact-item">
                <span className="contact-icon">🌐</span>
                {jsonData.contactInfo?.portfolio || 'eliog.dev'}
              </div>
              <div className="contact-item">
                <span className="contact-icon">💼</span>
                {jsonData.contactInfo?.linkedin || 'linkedin.com/in/elio-giordano-dev'}
              </div>
              <div className="contact-item">
                <span className="contact-icon">💻</span>
                {jsonData.contactInfo?.github || 'github.com/egiordano'}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Left Column */}
          <div className="left-column">
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
                  <span className="section-icon">⚙</span>
                  SKILLS
                </div>
                {hardSkills.length > 0 && (
                  <div className="skill-category">
                    <div className="skill-category-title">Programming Languages:</div>
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
                    <div className="skill-category-title">Frameworks & Libraries:</div>
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
                      <div className="language-name">{lang}:</div>
                      <div className="language-level">Professional Working Proficiency</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="right-column">
            {/* Work Experience */}
            {workExpList && workExpList.length > 0 && (
              <div className="section">
                <div className="section-title">
                  <span className="section-icon">💼</span>
                  WORK EXPERIENCE
                </div>
                {workExpList}
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
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

export const T26Css = `
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
  padding: 40px 50px 30px;
  display: flex;
  align-items: center;
  gap: 30px;
  border-bottom: 3px solid #f5a623;
}

.profile-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f5a623;
  flex-shrink: 0;
}

.header-content {
  flex: 1;
}

.name {
  font-size: 32px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #000;
}

.job-title {
  font-size: 15px;
  font-style: italic;
  margin: 0 0 15px 0;
  color: #666;
}

.contact-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  font-size: 10px;
  color: #333;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.contact-icon {
  color: #f5a623;
  font-weight: bold;
  width: 16px;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 30px;
  padding: 30px 50px 40px;
}

.left-column {
  border-right: 2px solid #f5a623;
  padding-right: 30px;
}

.right-column {
  padding-left: 0;
}

.section {
  margin-bottom: 25px;
}

.section-title {
  font-size: 13px;
  font-weight: bold;
  color: #000;
  margin-bottom: 12px;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-icon {
  color: #f5a623;
  font-size: 16px;
}

.section-content {
  font-size: 11px;
  line-height: 1.6;
  color: #333;
}

.education-item, .skill-category {
  margin-bottom: 15px;
}

.education-degree {
  font-weight: bold;
  font-size: 11px;
  color: #000;
  margin-bottom: 3px;
}

.education-institution {
  font-size: 10px;
  color: #666;
  font-style: italic;
  margin-bottom: 2px;
}

.education-date {
  font-size: 10px;
  color: #999;
}

.education-details {
  font-size: 10px;
  color: #333;
  margin-top: 3px;
}

.education-details ul {
  margin: 3px 0;
  padding-left: 15px;
}

.skill-category-title {
  font-size: 11px;
  font-weight: bold;
  color: #000;
  margin-bottom: 6px;
}

.skill-list {
  font-size: 10px;
  line-height: 1.7;
  color: #333;
}

.skill-item {
  padding-left: 12px;
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
  font-size: 11px;
  color: #333;
}

.language-item {
  margin-bottom: 8px;
}

.language-name {
  font-weight: bold;
  color: #000;
}

.language-level {
  font-size: 10px;
  color: #666;
}

.experience-item, .project-item {
  margin-bottom: 20px;
}

.item-header {
  margin-bottom: 5px;
}

.item-title {
  font-weight: bold;
  font-size: 12px;
  color: #000;
  margin-bottom: 2px;
}

.item-subtitle {
  font-size: 11px;
  color: #666;
  font-style: italic;
  margin-bottom: 2px;
}

.item-date {
  font-size: 10px;
  color: #f5a623;
  font-weight: 600;
  margin-bottom: 5px;
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

.project-tech {
  font-size: 10px;
  color: #666;
  margin-top: 5px;
}
`;
