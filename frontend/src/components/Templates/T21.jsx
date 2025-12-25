
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
  padding: 30px 40px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 30px;
}

.main-content {
  flex: 1;
}

.photo-section {
  width: 140px;
  padding-top: 10px;
}

.profile-photo {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.photo-placeholder {
  font-size: 60px;
  color: #999;
}

.header {
  margin-bottom: 18px;
}

.name {
  font-size: 22px;
  font-weight: bold;
  margin: 0 0 3px 0;
  color: #000;
}

.job-title {
  font-size: 12px;
  color: #666;
  font-style: italic;
  margin: 0 0 12px 0;
}

.contact-info {
  display: grid;
  grid-template-columns: auto auto;
  gap: 8px 20px;
  font-size: 9px;
  color: #555;
  margin-bottom: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.contact-item i {
  font-size: 9px;
  width: 12px;
}

.section {
  margin-bottom: 18px;
}

.section-title {
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
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
  font-style: italic;
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
`;

export const T21 = ({ jsonData }) => {
    const workExpList = jsonData.workExperience && jsonData.workExperience.length > 0
        ? jsonData.workExperience.map((we, index) => (
            <div key={`work-${index}`} className="experience-item">
                <div className="exp-header">
                    <div className="exp-title">{we.jobTitle || 'Position'}</div>
                    <div className="exp-date">{we.WorkDuration || '01/2024 - 03/2025'}</div>
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
                    <div className="exp-date">{edu.graduationYear || 'Present'}</div>
                </div>
                <div className="exp-company">{edu.institutionName || 'University'}</div>
                <div className="exp-description">
                    {edu.fieldOfStudy || 'Specialization in field'}
                </div>
            </div>
        ))
        : null;

    return (
        <StyledWrapper>
            <div className="resume" id="capture-content">
                <div className="main-content">
                    <div className="header">
                        <div className="name">{jsonData.contactInfo?.fullName || 'Rohan K. Patel'}</div>
                        <div className="job-title">{jsonData.contactInfo?.jobTitle || "Master's Student in Renewable Energy Systems"}</div>
                        <div className="contact-info">
                            <div className="contact-item">
                                <i className="fas fa-envelope"></i>
                                <span>{jsonData.contactInfo?.emailAddress || 'rohan.k.patel@gmail.com'}</span>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-phone"></i>
                                <span>{jsonData.contactInfo?.phoneNumber || '+49 1637124678'}</span>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>{jsonData.contactInfo?.Location || 'Munich, Germany 80339'}</span>
                            </div>
                            <div className="contact-item">
                                <i className="fab fa-linkedin"></i>
                                <span>{jsonData.contactInfo?.linkedin || 'rohan-k-patel-fect001'}</span>
                            </div>
                            <div className="contact-item">
                                <i className="fab fa-github"></i>
                                <span>{jsonData.contactInfo?.portfolio?.replace('https://github.com/', '') || 'github'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="section">
                        <div className="section-title">Profile</div>
                        <div className="profile-text">
                            {jsonData.Description?.UserDescription ||
                                "Currently pursuing a Master of Science in Renewable Energy Systems with a specialization in Chemical Engineering. Eager to secure a working student role or a master's thesis project in the sustainable energy sector. Keen to leverage academic knowledge and hands-on project experience to contribute to clean energy solutions."}
                        </div>
                    </div>

                    {workExpList && workExpList.length > 0 && (
                        <div className="section">
                            <div className="section-title">Experience</div>
                            {workExpList}
                        </div>
                    )}

                    {educationList && educationList.length > 0 && (
                        <div className="section">
                            <div className="section-title">Education</div>
                            {educationList}
                        </div>
                    )}
                </div>

                <div className="photo-section">
                    <div className="profile-photo">
                        <div className="photo-placeholder">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
};

export const T21Css = `
    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      body {
        margin: 0 !important;
        padding: 0 !important;
      }
      .resume {
        width: 210mm !important;
        box-shadow: none !important;
      }
    }`;
