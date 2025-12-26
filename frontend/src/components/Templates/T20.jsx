
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
   margin: 0.5in;
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
  max-width: 95%;
  background: white;
  margin: 20px auto;
  padding: 35px 45px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.header {
  margin-bottom: 18px;
}

.name {
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 8px 0;
  color: #000;
}

.contact-info {
  display: flex;
  gap: 15px;
  font-size: 9px;
  color: #555;
  margin-bottom: 15px;
}

.section {
  margin-bottom: 18px;
}

.section-title {
  font-size: 11px;
  font-weight: bold;
  color: #000;
  margin-bottom: 10px;
  padding-bottom: 3px;
  border-bottom: 1px solid #000;
}

.profile-text {
  font-size: 9px;
  line-height: 1.5;
  color: #444;
  text-align: justify;
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

.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.skill-category {
  margin-bottom: 10px;
}

.skill-category-title {
  font-size: 9px;
  font-weight: bold;
  color: #000;
  margin-bottom: 5px;
}

.skill-item {
  font-size: 9px;
  color: #555;
  margin-bottom: 3px;
}

.cert-item {
  margin-bottom: 8px;
  font-size: 9px;
  color: #555;
}

.cert-name {
  font-weight: bold;
  color: #000;
}
`;

export const T20 = ({ jsonData }) => {
  const workExpList = jsonData.workExperience && jsonData.workExperience.length > 0
    ? jsonData.workExperience.map((we, index) => (
      <div key={`work-${index}`} className="experience-item">
        <div className="exp-header">
          <div className="exp-title">{we.jobTitle || 'Position'}</div>
          <div className="exp-date">{we.WorkDuration || '2015 Sep - 2017 Jul'}</div>
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

  const hardSkills = jsonData.skills?.hardSkills
    ? jsonData.skills.hardSkills.split(',').map(s => s.trim()).filter(s => s !== '')
    : [];

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        <div className="header">
          <div className="name">{jsonData.contactInfo?.fullName || 'Andrew Kim'}</div>
          <div className="contact-info">
            <span>{jsonData.contactInfo?.emailAddress || 'andrew.kim@gmail.com'}</span>
            <span>{jsonData.contactInfo?.phoneNumber || '+1 415 555 2011'}</span>
            <span>{jsonData.contactInfo?.Location || 'New York City, USA'}</span>
          </div>
        </div>

        <div className="section">
          <div className="section-title">Profile</div>
          <div className="profile-text">
            {jsonData.Description?.UserDescription ||
              'Experienced finance professional with a successful track record in M&A, valuation and financial modeling. Accomplished finance professional with a proven success record in mergers and acquisitions, valuations, and financial modeling. Dynamic finance professional with a proven track record in mergers and acquisitions, valuations.'}
          </div>
        </div>

        {workExpList && workExpList.length > 0 && (
          <div className="section">
            <div className="section-title">Work Experience</div>
            {workExpList}
          </div>
        )}

        {educationList && educationList.length > 0 && (
          <div className="section">
            <div className="section-title">Education</div>
            {educationList}
          </div>
        )}

        {hardSkills.length > 0 && (
          <div className="section">
            <div className="section-title">Skills</div>
            <div className="skills-grid">
              <div className="skill-category">
                <div className="skill-category-title">Financial Modeling</div>
                <div className="skill-item">Built financial models in Excel</div>
              </div>
              <div className="skill-category">
                <div className="skill-category-title">Investment Analysis</div>
                <div className="skill-item">Prepared and presented investment reports</div>
              </div>
              <div className="skill-category">
                <div className="skill-category-title">Budgeting and Forecasting</div>
                <div className="skill-item">Developed and analyzed data on monthly cycles</div>
              </div>
              <div className="skill-category">
                <div className="skill-category-title">Business Valuation</div>
                <div className="skill-item">DCF and calc of price multiples</div>
              </div>
            </div>
          </div>
        )}

        <div className="section">
          <div className="section-title">Certifications</div>
          <div className="skills-grid">
            <div className="cert-item">
              <div className="cert-name">CPA</div>
              Level 2 of 2
            </div>
            <div className="cert-item">
              <div className="cert-name">CFA</div>
              Level 2
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

export const T20Css = `
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
    width: 100% !important;
    max-width: 100% !important;
    min-height: 100vh !important;
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
  max-width: 95%;
  background: white;
  margin: 20px auto;
  padding: 35px 45px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.header {
  margin-bottom: 18px;
}

.name {
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 8px 0;
  color: #000;
}

.contact-info {
  display: flex;
  gap: 15px;
  font-size: 9px;
  color: #555;
  margin-bottom: 15px;
}

.section {
  margin-bottom: 18px;
}

.section-title {
  font-size: 11px;
  font-weight: bold;
  color: #000;
  margin-bottom: 10px;
  padding-bottom: 3px;
  border-bottom: 1px solid #000;
}

.profile-text {
  font-size: 9px;
  line-height: 1.5;
  color: #444;
  text-align: justify;
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

.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.skill-category {
  margin-bottom: 10px;
}

.skill-category-title {
  font-size: 9px;
  font-weight: bold;
  color: #000;
  margin-bottom: 5px;
}

.skill-item {
  font-size: 9px;
  color: #555;
  margin-bottom: 3px;
}

.cert-item {
  margin-bottom: 8px;
  font-size: 9px;
  color: #555;
}

.cert-name {
  font-weight: bold;
  color: #000;
}
`;
