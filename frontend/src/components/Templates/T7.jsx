
import React from 'react';
import styled from "styled-components";

// Helper function to convert markdown to HTML
const parseMarkdown = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Bold
    .replace(/\*(.+?)\*/g, '<em>$1</em>') // Italic
    .replace(/\n/g, '<br/>'); // Convert line breaks to HTML breaks
};

const removespace = (str) => str.trim();

const StyledWrapper = styled.div`
@media print {
  body {
    font-family: 'Segoe UI', Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: white !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  @page {
   size: A4;
   margin: 0.5in;
  }
  .resume {
    width: 100%;
    max-width: 100%;
    border: none !important;
    box-shadow: none !important;
    page-break-inside: avoid;
  }
  .section {
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .experience-item, .education-item {
    page-break-inside: avoid;
    break-inside: avoid;
    margin-bottom: 15px;
  }
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 20px 0;
}

.resume {
  width: 210mm;
  max-width: 95%;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  position: relative;
}

.header {
  background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
  color: white;
  padding: 40px 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
}

.header-left {
  flex: 1;
}

.header-right {
  width: 120px;
  height: 120px;
  background: white;
  border: 4px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.header-right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: #4a5568;
}

.resume-title {
  margin: 0;
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #cbd5e0;
  margin-bottom: 10px;
}

.name {
  margin: 0;
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.job-title {
  margin: 0;
  font-size: 16px;
  color: #a0aec0;
  font-weight: 400;
  margin-bottom: 20px;
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  font-size: 13px;
  line-height: 1.6;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-item i {
  width: 16px;
  color: #90cdf4;
}

.contact-item a {
  color: white;
  text-decoration: none;
}

.contact-item a:hover {
  text-decoration: underline;
}

.content {
  padding: 40px 50px;
}

.section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 3px solid #4a5568;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.summary-content {
  line-height: 1.6;
  color: #4a5568;
  margin-bottom: 15px;
  text-align: justify;
}

.subsection {
  margin-bottom: 15px;
}

.subsection-title {
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 8px;
  font-size: 14px;
}

.subsection-content {
  color: #4a5568;
  line-height: 1.6;
}

.experience-item, .education-item {
  margin-bottom: 20px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 5px;
}

.item-title {
  font-weight: 700;
  color: #2d3748;
  font-size: 16px;
}

.item-date {
  font-size: 13px;
  color: #718096;
  font-style: italic;
}

.item-subtitle {
  font-size: 14px;
  color: #4a5568;
  font-weight: 600;
  margin-bottom: 8px;
}

.item-description {
  color: #4a5568;
  line-height: 1.6;
  margin-left: 20px;
}

.item-description ul {
  margin: 5px 0;
  padding-left: 20px;
}

.item-description li {
  margin-bottom: 5px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.skill-item {
  background: #edf2f7;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 13px;
  color: #2d3748;
  font-weight: 500;
}

.activities-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.activity-item {
  background: #edf2f7;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  color: #4a5568;
}

.cgpa-info {
  font-size: 14px;
  color: #718096;
  margin-top: 5px;
}
`;

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const T7 = ({ jsonData }) => {
  // Process work experience
  const workExpList = jsonData.workExperience && jsonData.workExperience.length > 0
    ? jsonData.workExperience.map((we, index) => (
      <div key={`work-${index}`} className="experience-item">
        <div className="item-header">
          <div className="item-title">{we.companyName || 'Company Name'}</div>
          <div className="item-date">{we.WorkDuration || 'Duration'}</div>
        </div>
        <div className="item-subtitle">{we.jobTitle || 'Job Title'}</div>
        <div className="item-description">
          <span dangerouslySetInnerHTML={{ __html: parseMarkdown(we.keyAchievements || '') }} />
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
          <div className="item-date">{edu.graduationYear || 'Year'}</div>
        </div>
        <div className="item-subtitle">{edu.institutionName || 'Institution'}</div>
        {edu.currentCGPA && (
          <div className="cgpa-info">CGPA: {edu.currentCGPA}</div>
        )}
      </div>
    ))
    : null;

  // Process skills
  const hardSkills = jsonData.skills?.hardSkills
    ? jsonData.skills.hardSkills.split(',').map(skill => skill.trim()).filter(skill => skill !== '')
    : [];

  const hardSkillsList = hardSkills.map((skill, index) => (
    <div key={`skill-${index}`} className="skill-item">{skill}</div>
  ));

  // Process soft skills
  const softSkills = jsonData.skills?.softSkills
    ? jsonData.skills.softSkills.split(',').map(skill => skill.trim()).filter(skill => skill !== '')
    : [];

  const softSkillsList = softSkills.map((skill, index) => (
    <div key={`soft-${index}`} className="skill-item">{skill}</div>
  ));

  // Process languages as activities
  const languages = jsonData.contactInfo?.Languages
    ? jsonData.contactInfo.Languages.split(',').map(lang => lang.trim()).filter(lang => lang !== '')
    : [];

  const activitiesList = languages.map((lang, index) => (
    <div key={`activity-${index}`} className="activity-item">{lang}</div>
  ));

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        {/* Header Section */}
        <div className="header">
          <div className="header-left">
            <div className="resume-title">Resume</div>
            <h1 className="name">{jsonData.contactInfo?.fullName || 'John Doe'}</h1>
            <h2 className="job-title">{jsonData.contactInfo?.jobTitle || 'Software Developer'}</h2>

            <div className="contact-info">
              <div className="contact-item">
                <i className="fa fa-phone"></i>
                <span>{jsonData.contactInfo?.phoneNumber || '+90 123 456 7890'}</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <a href={`mailto:${jsonData.contactInfo?.emailAddress || 'john.doe@gmail.com'}`}>
                  {jsonData.contactInfo?.emailAddress || 'john.doe@gmail.com'}
                </a>
              </div>
              <div className="contact-item">
                <i className="fas fa-globe"></i>
                <a href={isValidUrl(jsonData.contactInfo?.portfolio || '')
                  ? jsonData.contactInfo.portfolio
                  : `https://github.com/${jsonData.contactInfo?.portfolio || 'johndoe'}`}
                  target="_blank"
                  rel="noreferrer">
                  {jsonData.contactInfo?.portfolio
                    ? jsonData.contactInfo.portfolio.replace(/^https?:\/\//, '')
                    : 'github.com/johndoe'}
                </a>
              </div>
              <div className="contact-item">
                <i className="fa fa-map-marker"></i>
                <span>{jsonData.contactInfo?.Location || 'City, Country'}</span>
              </div>
            </div>
          </div>

          <div className="header-right">
            {jsonData.contactInfo?.profileImage ? (
              <img src={jsonData.contactInfo.profileImage} alt="Profile" />
            ) : (
              <div className="photo-placeholder">
                <i className="fas fa-user"></i>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="content">
          {/* Profile Summary */}
          {jsonData.Description?.UserDescription && (
            <div className="section">
              <h3 className="section-title">Profile Summary</h3>
              <div className="summary-content">
                {jsonData.Description.UserDescription}
              </div>

              {jsonData.skills?.hardSkills && (
                <div className="subsection">
                  <div className="subsection-title">Skills:</div>
                  <div className="subsection-content">
                    {jsonData.skills.hardSkills.split(',').slice(0, 8).join(', ')}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Work Experience */}
          {workExpList && workExpList.length > 0 && (
            <div className="section">
              <h3 className="section-title">Experience</h3>
              {workExpList}
            </div>
          )}

          {/* Education */}
          {educationList && educationList.length > 0 && (
            <div className="section">
              <h3 className="section-title">Education</h3>
              {educationList}
            </div>
          )}

          {/* Technical Skills */}
          {hardSkillsList.length > 0 && (
            <div className="section">
              <h3 className="section-title">Technical Skills</h3>
              <div className="skills-grid">
                {hardSkillsList}
              </div>
            </div>
          )}

          {/* Soft Skills */}
          {softSkillsList.length > 0 && (
            <div className="section">
              <h3 className="section-title">Soft Skills</h3>
              <div className="skills-grid">
                {softSkillsList}
              </div>
            </div>
          )}

          {/* Activities/Languages */}
          {activitiesList.length > 0 && (
            <div className="section">
              <h3 className="section-title">Languages</h3>
              <div className="activities-list">
                {activitiesList}
              </div>
            </div>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
};

export const T7Css = `
@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
  
  body {
    font-family: 'Segoe UI', Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: white !important;
  }
  
  @page {
   size: A4 portrait;
   margin: 0.5in;
  }
  
  .resume {
    width: 100% !important;
    max-width: 100% !important;
    min-height: 100vh !important;
    margin: 0 !important;
    padding: 0 !important;
    border: none !important;
    box-shadow: none !important;
    page-break-inside: avoid;
  }
  
  .section {
    page-break-inside: avoid;
    break-inside: avoid;
  }
  
  .experience-item, .education-item {
    page-break-inside: avoid;
    break-inside: avoid;
    margin-bottom: 15px;
  }
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 20px 0;
}

.resume {
  width: 210mm;
  max-width: 95%;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  position: relative;
}

.header {
  background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
  color: white;
  padding: 40px 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
}

.header-left {
  flex: 1;
}

.header-right {
  width: 120px;
  height: 120px;
  background: white;
  border: 4px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.header-right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: #4a5568;
}

.resume-title {
  margin: 0;
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #cbd5e0;
  margin-bottom: 10px;
}

.name {
  margin: 0;
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.job-title {
  margin: 0;
  font-size: 16px;
  color: #a0aec0;
  font-weight: 400;
  margin-bottom: 20px;
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  font-size: 13px;
  line-height: 1.6;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-item i {
  width: 16px;
  color: #90cdf4;
}

.contact-item a {
  color: white;
  text-decoration: none;
}

.contact-item a:hover {
  text-decoration: underline;
}

.content {
  padding: 40px 50px;
}

.section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 3px solid #4a5568;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.summary-content {
  line-height: 1.6;
  color: #4a5568;
  margin-bottom: 15px;
  text-align: justify;
}

.subsection {
  margin-bottom: 15px;
}

.subsection-title {
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 8px;
  font-size: 14px;
}

.subsection-content {
  color: #4a5568;
  line-height: 1.6;
}

.experience-item, .education-item {
  margin-bottom: 20px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 5px;
}

.item-title {
  font-weight: 700;
  color: #2d3748;
  font-size: 16px;
}

.item-date {
  font-size: 13px;
  color: #718096;
  font-style: italic;
}

.item-subtitle {
  font-size: 14px;
  color: #4a5568;
  font-weight: 600;
  margin-bottom: 8px;
}

.item-description {
  color: #4a5568;
  line-height: 1.6;
  margin-left: 20px;
}

.item-description ul {
  margin: 5px 0;
  padding-left: 20px;
}

.item-description li {
  margin-bottom: 5px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.skill-item {
  background: #edf2f7;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 13px;
  color: #2d3748;
  font-weight: 500;
}

.activities-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.activity-item {
  background: #edf2f7;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  color: #4a5568;
}

.cgpa-info {
  font-size: 14px;
  color: #718096;
  margin-top: 5px;
}
`;
