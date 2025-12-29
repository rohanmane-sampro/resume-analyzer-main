
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
  padding: 35px 40px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.header {
  margin-bottom: 22px;
}

.name {
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 4px 0;
  color: #000;
}

.job-title {
  font-size: 13px;
  color: #666;
  margin: 0 0 12px 0;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 9px;
  color: #555;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.contact-item i {
  font-size: 8px;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
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

.exp-location {
  font-size: 9px;
  color: #666;
  margin-bottom: 4px;
}

.exp-description {
  font-size: 9px;
  line-height: 1.5;
  color: #555;
}

.skill-item {
  margin-bottom: 10px;
}

.skill-name {
  font-size: 9px;
  color: #333;
  margin-bottom: 4px;
}

.skill-bar {
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff6b9d, #c44569);
}

.tools-grid, .awards-list, .books-list {
  font-size: 9px;
  color: #555;
}

.tool-item, .award-item, .book-item {
  margin-bottom: 6px;
}

.award-title, .book-title {
  font-weight: bold;
  color: #333;
}
`;

export const T16 = ({ jsonData }) => {
  const workExpList = jsonData.workExperience && jsonData.workExperience.length > 0
    ? jsonData.workExperience.map((we, index) => (
      <div key={`work-${index}`} className="experience-item">
        <div className="exp-header">
          <div className="exp-title">{we.jobTitle || 'Position'}</div>
          <div className="exp-date">{we.WorkDuration || '06/2012 - present'}</div>
        </div>
        <div className="exp-location">{we.companyName || 'Company, Location'}</div>
        <div className="exp-description">
          {we.keyAchievements || 'Work description'}
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
        <div className="exp-location">{edu.institutionName || 'University'}</div>
      </div>
    ))
    : null;

  const hardSkills = jsonData.skills?.hardSkills
    ? jsonData.skills.hardSkills.split(',').map(s => s.trim()).filter(s => s !== '')
    : ['User research and testing', 'Wireframing and prototyping'];

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        <div className="header">
          <div className="name">{jsonData.contactInfo?.fullName || 'Lara Miller'}</div>
          <div className="job-title">{jsonData.contactInfo?.jobTitle || 'UX/UI Designer'}</div>
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>{jsonData.contactInfo?.Location || 'Hofanterderstrasse 142, Berlin, Germany'}</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>{jsonData.contactInfo?.emailAddress || 'lara@miller.design'}</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>{jsonData.contactInfo?.phoneNumber || '+49 30 616 714 210'}</span>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="left-column">
            {workExpList && workExpList.length > 0 && (
              <div className="section">
                <div className="section-title">Professional Experience</div>
                {workExpList}
              </div>
            )}

            {educationList && educationList.length > 0 && (
              <div className="section">
                <div className="section-title">Education</div>
                {educationList}
              </div>
            )}

            <div className="section">
              <div className="section-title">Skills</div>
              {hardSkills.map((skill, idx) => (
                <div key={idx} className="skill-item">
                  <div className="skill-name">{skill}</div>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ width: '85%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="right-column">
            <div className="section">
              <div className="section-title">Languages</div>
              <div className="skill-item">
                <div className="skill-name">German</div>
                <div className="skill-bar">
                  <div className="skill-fill" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-name">English</div>
                <div className="skill-bar">
                  <div className="skill-fill" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section-title">Awards</div>
              <div className="awards-list">
                <div className="award-item">
                  <div className="award-title">Red Dot Design Award</div>
                  Redesign of Drianna's ecommerce platform 2017
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section-title">Tools</div>
              <div className="tools-grid">
                <div className="tool-item">Figma - UI Design, Prototyping</div>
                <div className="tool-item">Adobe Creative Suite - Photo, Video, Illustration</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

export const T16Css = `
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
  padding: 35px 40px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.header {
  margin-bottom: 22px;
}

.name {
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 4px 0;
  color: #000;
}

.job-title {
  font-size: 13px;
  color: #666;
  margin: 0 0 12px 0;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 9px;
  color: #555;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.contact-item i {
  font-size: 8px;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
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

.exp-location {
  font-size: 9px;
  color: #666;
  margin-bottom: 4px;
}

.exp-description {
  font-size: 9px;
  line-height: 1.5;
  color: #555;
}

.skill-item {
  margin-bottom: 10px;
}

.skill-name {
  font-size: 9px;
  color: #333;
  margin-bottom: 4px;
}

.skill-bar {
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff6b9d, #c44569);
}

.tools-grid, .awards-list, .books-list {
  font-size: 9px;
  color: #555;
}

.tool-item, .award-item, .book-item {
  margin-bottom: 6px;
}

.award-title, .book-title {
  font-weight: bold;
  color: #333;
}
`;
