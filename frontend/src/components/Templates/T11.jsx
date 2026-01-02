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
    font-family: 'Arial', 'Helvetica', sans-serif;
    margin: 0;
    padding: 0;
    background-color: white !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  @page {
   size: A4 portrait;
   margin: 0;
  }
  .resume {
    width: 100%;
    box-shadow: none !important;
    background: white !important;
  }
  .section-container {
    box-shadow: none !important;
    border: 1px solid #e0e0e0 !important;
  }
}

body {
  font-family: 'Arial', 'Helvetica', sans-serif;
  background-color: #f5f5f5;
}

.resume {
  width: 210mm;
  min-height: 297mm;
  overflow: hidden;
  background: #f5f5f5;
  margin: 20px auto;
  padding: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.header {
  text-align: center;
  margin-bottom: 25px;
}

.name {
  font-size: 28px;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0 0 8px 0;
  color: #1a1a1a;
  letter-spacing: 1px;
}

.job-title {
  font-size: 14px;
  color: #666;
  margin: 0 0 15px 0;
}

.contact-info {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 11px;
  color: #555;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.contact-item i {
  color: #666;
  font-size: 10px;
}

.section-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
  color: #1a1a1a;
  margin-bottom: 12px;
  padding-bottom: 6px;
  border-bottom: 2px solid #333;
  letter-spacing: 0.5px;
}

.summary-text {
  font-size: 11px;
  line-height: 1.6;
  color: #444;
  text-align: justify;
}

.item {
  margin-bottom: 15px;
}

.item:last-child {
  margin-bottom: 0;
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
  color: #1a1a1a;
}

.item-date {
  font-size: 10px;
  color: #666;
  font-style: italic;
}

.item-subtitle {
  font-size: 11px;
  color: #555;
  margin-bottom: 6px;
}

.item-description {
  font-size: 11px;
  line-height: 1.5;
  color: #444;
}

.item-description ul {
  margin: 4px 0;
  padding-left: 20px;
}

.item-description li {
  margin-bottom: 3px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  font-size: 11px;
}

.skill-item {
  background: #f8f8f8;
  padding: 6px 10px;
  border-radius: 4px;
  color: #444;
  text-align: center;
}

.cert-item {
  margin-bottom: 12px;
}

.cert-item:last-child {
  margin-bottom: 0;
}

.cert-name {
  font-size: 11px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 3px;
}

.cert-details {
  font-size: 10px;
  color: #666;
}

.project-item {
  margin-bottom: 15px;
}

.project-item:last-child {
  margin-bottom: 0;
}

.project-title {
  font-size: 12px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.project-tech {
  font-size: 10px;
  color: #666;
  font-style: italic;
}
`;

export const T11 = ({ jsonData }) => {
  // Process skills
  const hardSkills = jsonData.skills?.hardSkills
    ? jsonData.skills.hardSkills.split(',').map(s => s.trim()).filter(s => s !== '')
    : [];

  const softSkills = jsonData.skills?.softSkills
    ? jsonData.skills.softSkills.split(',').map(s => s.trim()).filter(s => s !== '')
    : [];

  const allSkills = [...hardSkills, ...softSkills];

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        {/* Header */}
        <div className="header">
          <div className="name">{jsonData.contactInfo?.fullName || 'JOHN DOE'}</div>
          <div className="job-title">{jsonData.contactInfo?.jobTitle || 'Professional Title'}</div>
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>{jsonData.contactInfo?.emailAddress || 'email@example.com'}</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>{jsonData.contactInfo?.phoneNumber || '(123) 456-7890'}</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>{jsonData.contactInfo?.Location || 'City, State'}</span>
            </div>
            {jsonData.contactInfo?.linkedin && (
              <div className="contact-item">
                <i className="fab fa-linkedin"></i>
                <span>{jsonData.contactInfo.linkedin}</span>
              </div>
            )}
            {jsonData.contactInfo?.portfolio && (
              <div className="contact-item">
                <i className="fas fa-globe"></i>
                <span>{jsonData.contactInfo.portfolio.replace('https://', '').replace('http://', '')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {jsonData.Description?.UserDescription && (
          <div className="section-container">
            <div className="section-title">Summary</div>
            <div className="summary-text">
              {jsonData.Description.UserDescription}
            </div>
          </div>
        )}

        {/* Education */}
        {jsonData.education && jsonData.education.length > 0 && (
          <div className="section-container">
            <div className="section-title">Education</div>
            {jsonData.education.map((edu, index) => (
              <div key={`edu-${index}`} className="item">
                <div className="item-header">
                  <div className="item-title">{edu.degreeName || 'Degree Name'}</div>
                  <div className="item-date">{edu.graduationYear || 'Year'}</div>
                </div>
                <div className="item-subtitle">{edu.institutionName || 'Institution Name'}</div>
                {edu.currentCGPA && (
                  <div className="item-description">CGPA: {edu.currentCGPA}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Work Experience */}
        {jsonData.workExperience && jsonData.workExperience.length > 0 && (
          <div className="section-container">
            <div className="section-title">Work Experience</div>
            {jsonData.workExperience.map((exp, index) => (
              <div key={`work-${index}`} className="item">
                <div className="item-header">
                  <div className="item-title">{exp.jobTitle || 'Job Title'}</div>
                  <div className="item-date">{exp.WorkDuration || 'Duration'}</div>
                </div>
                <div className="item-subtitle">{exp.companyName || 'Company Name'}</div>
                {exp.keyAchievements && (
                  <div className="item-description">
                    <ul>
                      <li dangerouslySetInnerHTML={{ __html: parseMarkdown(exp.keyAchievements) }} />
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {jsonData.projects && jsonData.projects.length > 0 && (
          <div className="section-container">
            <div className="section-title">Projects</div>
            {jsonData.projects.map((proj, index) => (
              <div key={`proj-${index}`} className="project-item">
                <div className="project-title">{proj.projectTitle || 'Project Title'}</div>
                {proj.toolsTechUsed && (
                  <div className="project-tech" dangerouslySetInnerHTML={{ __html: parseMarkdown(proj.toolsTechUsed) }} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {jsonData.certificates && jsonData.certificates.length > 0 && (
          <div className="section-container">
            <div className="section-title">Certifications</div>
            {jsonData.certificates.map((cert, index) => (
              <div key={`cert-${index}`} className="cert-item">
                <div className="cert-name">{cert.certificateName || 'Certificate Name'}</div>
                <div className="cert-details">
                  {cert.providerName && <span>{cert.providerName}</span>}
                  {cert.courseDuration && <span> • {cert.courseDuration}</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Technical Skills */}
        {allSkills.length > 0 && (
          <div className="section-container">
            <div className="section-title">Technical Skills</div>
            <div className="skills-grid">
              {allSkills.map((skill, index) => (
                <div key={`skill-${index}`} className="skill-item">{skill}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </StyledWrapper>
  );
};

export const T11Css = `
@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  
  body {
    font-family: 'Arial', 'Helvetica', sans-serif;
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
    padding: 30px !important;
    box-shadow: none !important;
    background: white !important;
    overflow: hidden !important;
  }
  
  .section-container {
    box-shadow: none !important;
    border: 1px solid #e0e0e0 !important;
  }
}

body {
  font-family: 'Arial', 'Helvetica', sans-serif;
  background-color: #f5f5f5;
}

.resume {
  width: 210mm;
  min-height: 297mm;
  overflow: hidden;
  background: #f5f5f5;
  margin: 20px auto;
  padding: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.header {
  text-align: center;
  margin-bottom: 25px;
}

.name {
  font-size: 28px;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0 0 8px 0;
  color: #1a1a1a;
  letter-spacing: 1px;
}

.job-title {
  font-size: 14px;
  color: #666;
  margin: 0 0 15px 0;
}

.contact-info {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 11px;
  color: #555;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.contact-item i {
  color: #666;
  font-size: 10px;
}

.section-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
  color: #1a1a1a;
  margin-bottom: 12px;
  padding-bottom: 6px;
  border-bottom: 2px solid #333;
  letter-spacing: 0.5px;
}

.summary-text {
  font-size: 11px;
  line-height: 1.6;
  color: #444;
  text-align: justify;
}

.item {
  margin-bottom: 15px;
}

.item:last-child {
  margin-bottom: 0;
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
  color: #1a1a1a;
}

.item-date {
  font-size: 10px;
  color: #666;
  font-style: italic;
}

.item-subtitle {
  font-size: 11px;
  color: #555;
  margin-bottom: 6px;
}

.item-description {
  font-size: 11px;
  line-height: 1.5;
  color: #444;
}

.item-description ul {
  margin: 4px 0;
  padding-left: 20px;
}

.item-description li {
  margin-bottom: 3px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  font-size: 11px;
}

.skill-item {
  background: #f8f8f8;
  padding: 6px 10px;
  border-radius: 4px;
  color: #444;
  text-align: center;
}

.cert-item {
  margin-bottom: 12px;
}

.cert-item:last-child {
  margin-bottom: 0;
}

.cert-name {
  font-size: 11px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 3px;
}

.cert-details {
  font-size: 10px;
  color: #666;
}

.project-item {
  margin-bottom: 15px;
}

.project-item:last-child {
  margin-bottom: 0;
}

.project-title {
  font-size: 12px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.project-tech {
  font-size: 10px;
  color: #666;
  font-style: italic;
}
`;
