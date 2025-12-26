
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
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 3px 0;
  color: #000;
}

.job-title {
  font-size: 13px;
  color: #666;
  margin: 0 0 12px 0;
  font-style: italic;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 10px;
  color: #333;
  margin-bottom: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.contact-item i {
  font-size: 10px;
  color: #555;
}

.profile-section {
  margin-bottom: 20px;
}

.profile-text {
  font-size: 10px;
  line-height: 1.6;
  color: #444;
  text-align: justify;
}

.section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: #000;
  margin-bottom: 10px;
  padding-bottom: 4px;
  border-bottom: 1px solid #000;
}

.experience-item {
  margin-bottom: 16px;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 3px;
}

.exp-title {
  font-size: 11px;
  font-weight: bold;
  color: #000;
}

.exp-date {
  font-size: 10px;
  color: #666;
}

.exp-company {
  font-size: 10px;
  color: #444;
  margin-bottom: 6px;
}

.exp-description {
  font-size: 10px;
  line-height: 1.5;
  color: #444;
}

.exp-description ul {
  margin: 4px 0;
  padding-left: 18px;
}

.exp-description li {
  margin-bottom: 3px;
}
`;

export const T14 = ({ jsonData }) => {
  // Process work experience
  const workExpList = jsonData.workExperience && jsonData.workExperience.length > 0
    ? jsonData.workExperience.map((we, index) => (
      <div key={`work-${index}`} className="experience-item">
        <div className="exp-header">
          <div className="exp-title">{we.jobTitle || 'Position'}</div>
          <div className="exp-date">{we.WorkDuration || '06/2021 - 08/2021'}</div>
        </div>
        <div className="exp-company">{we.companyName || 'Company'}</div>
        <div className="exp-description">
          <ul>
            <li dangerouslySetInnerHTML={{ __html: parseMarkdown(we.keyAchievements || 'Job responsibilities and achievements') }} />
          </ul>
        </div>
      </div>
    ))
    : null;

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        {/* Header */}
        <div className="header">
          <div className="name">{jsonData.contactInfo?.fullName || 'Jasmine Williams'}</div>
          <div className="job-title">{jsonData.contactInfo?.jobTitle || 'Certified Nursing Assistant'}</div>

          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>{jsonData.contactInfo?.emailAddress || 'jasmine.williams@email.com'}</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>{jsonData.contactInfo?.phoneNumber || '(704) 555-0124'}</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>{jsonData.contactInfo?.Location || 'Charlotte, NC 28208'}</span>
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="profile-section">
          <div className="profile-text">
            {jsonData.Description?.UserDescription ||
              'Dedicated Certified Nursing Assistant with a strong background in providing high-quality patient care. Proficient in patient hygiene, mobility support, and nutrition needs. Possesses strong organizational skills and a commitment to achieving patient wellbeing and satisfaction.'}
          </div>
        </div>

        {/* Professional Experience */}
        {workExpList && workExpList.length > 0 && (
          <div className="section">
            <div className="section-title">Professional Experience</div>
            {workExpList}
          </div>
        )}
      </div>
    </StyledWrapper>
  );
};

export const T14Css = `
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
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 3px 0;
  color: #000;
}

.job-title {
  font-size: 13px;
  color: #666;
  margin: 0 0 12px 0;
  font-style: italic;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 10px;
  color: #333;
  margin-bottom: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.contact-item i {
  font-size: 10px;
  color: #555;
}

.profile-section {
  margin-bottom: 20px;
}

.profile-text {
  font-size: 10px;
  line-height: 1.6;
  color: #444;
  text-align: justify;
}

.section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: #000;
  margin-bottom: 10px;
  padding-bottom: 4px;
  border-bottom: 1px solid #000;
}

.experience-item {
  margin-bottom: 16px;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 3px;
}

.exp-title {
  font-size: 11px;
  font-weight: bold;
  color: #000;
}

.exp-date {
  font-size: 10px;
  color: #666;
}

.exp-company {
  font-size: 10px;
  color: #444;
  margin-bottom: 6px;
}

.exp-description {
  font-size: 10px;
  line-height: 1.5;
  color: #444;
}

.exp-description ul {
  margin: 4px 0;
  padding-left: 18px;
}

.exp-description li {
  margin-bottom: 3px;
}
`;
