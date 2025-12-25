
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
  font-family: 'Calibri', 'Arial', sans-serif;
  background-color: #f5f5f5;
}

.resume {
  width: 210mm;
  max-width: 95%;
  background: white;
  margin: 20px auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  min-height: 297mm;
}

.left-column {
  width: 180px;
  background: white;
  padding: 30px 20px;
  border-right: 1px solid #e0e0e0;
}

.profile-photo {
  width: 140px;
  height: 140px;
  background: #f0f0f0;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-placeholder {
  font-size: 60px;
  color: #ccc;
}

.name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 11px;
  color: #e67e22;
  margin-bottom: 15px;
  line-height: 1.4;
}

.contact-date {
  font-size: 9px;
  color: #666;
  margin-bottom: 4px;
}

.marital-status {
  font-size: 9px;
  color: #666;
}

.right-column {
  flex: 1;
  padding: 30px 35px;
}

.section {
  margin-bottom: 25px;
}

.section-title {
  font-size: 14px;
  font-weight: bold;
  color: #e67e22;
  margin-bottom: 10px;
  padding-bottom: 4px;
  border-bottom: 2px solid #e67e22;
}

.bio-text {
  font-size: 10px;
  line-height: 1.6;
  color: #555;
  text-align: justify;
}

.bio-text strong {
  color: #e67e22;
}

.work-item {
  margin-bottom: 16px;
}

.work-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}

.work-title {
  font-size: 11px;
  font-weight: bold;
  color: #333;
}

.work-date {
  font-size: 10px;
  color: #fff;
  background: #34495e;
  padding: 2px 8px;
  border-radius: 3px;
}

.work-company {
  font-size: 10px;
  color: #e67e22;
  margin-bottom: 6px;
}

.work-description {
  font-size: 10px;
  line-height: 1.5;
  color: #555;
}

.skills-section {
  margin-bottom: 20px;
}

.skills-category {
  margin-bottom: 12px;
}

.skills-category-title {
  font-size: 10px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.skills-bar-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.skill-bar-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.skill-bar-label {
  font-size: 9px;
  color: #666;
}

.skill-bar-wrapper {
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.skill-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #3498db, #2980b9);
}

.skill-bar-years {
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 7px;
  color: #333;
  font-weight: bold;
}

.languages-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  font-size: 10px;
}

.language-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.language-name {
  font-weight: 600;
  color: #333;
}

.language-level {
  font-size: 9px;
  color: #666;
}
`;

export const T13 = ({ jsonData }) => {
    // Process work experience
    const workExpList = jsonData.workExperience && jsonData.workExperience.length > 0
        ? jsonData.workExperience.map((we, index) => (
            <div key={`work-${index}`} className="work-item">
                <div className="work-header">
                    <div className="work-title">{we.jobTitle || 'Position'}</div>
                    <div className="work-date">{we.WorkDuration || 'XX/XXXX - today'}</div>
                </div>
                <div className="work-company">{we.companyName || 'Company'}</div>
                <div className="work-description">
                    <span dangerouslySetInnerHTML={{ __html: parseMarkdown(we.keyAchievements || 'Work description') }} />
                </div>
            </div>
        ))
        : null;

    // Skills
    const hardSkills = jsonData.skills?.hardSkills
        ? jsonData.skills.hardSkills.split(',').map(s => s.trim()).filter(s => s !== '').slice(0, 8)
        : ['Software development', 'Cyber security', 'Internet business/E-commerce', 'Web development'];

    return (
        <StyledWrapper>
            <div className="resume" id="capture-content">
                {/* Left Column */}
                <div className="left-column">
                    <div className="profile-photo">
                        <div className="photo-placeholder">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>

                    <div className="name">{jsonData.contactInfo?.fullName || 'Philip Empl'}</div>
                    <div className="subtitle">
                        {jsonData.contactInfo?.jobTitle || 'Management Information Systems (M. Sc.)'}
                    </div>

                    <div className="contact-date">
                        XX.XX.XXXX in Los Angeles
                    </div>
                    <div className="marital-status">unmarried</div>
                </div>

                {/* Right Column */}
                <div className="right-column">
                    {/* Biography */}
                    <div className="section">
                        <div className="section-title">Biography</div>
                        <div className="bio-text">
                            {jsonData.Description?.UserDescription ||
                                'Hello, here is some text without a meaning. This text should show what a printed text will look like at this place. If you read this text, you will get no information. Really? Is there no information? Is there a difference between this text and some nonsense like "Huardest gefburn"? Kjift - not at all! A blind text like this gives you information about the selected font, how the letters are written and an impression of the look. This text should contain all letters of the alphabet and it should be written in of the original language. There is no need for special content, but the length of words should match the language.'}
                        </div>
                    </div>

                    {/* Work Experience */}
                    {workExpList && workExpList.length > 0 && (
                        <div className="section">
                            <div className="section-title">Work experience</div>
                            {workExpList}
                        </div>
                    )}

                    {/* Skills */}
                    <div className="section">
                        <div className="section-title">Skills</div>

                        <div className="skills-section">
                            <div className="skills-category">
                                <div className="skills-category-title">Technical Skills</div>
                                <div className="skills-bar-container">
                                    {hardSkills.map((skill, index) => (
                                        <div key={index} className="skill-bar-item">
                                            <div className="skill-bar-label">{skill}</div>
                                            <div className="skill-bar-wrapper">
                                                <div className="skill-bar-fill" style={{ width: '70%' }}></div>
                                                <div className="skill-bar-years">6+ Jahre</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Languages */}
                        <div className="skills-category">
                            <div className="skills-category-title">Languages</div>
                            <div className="languages-grid">
                                <div className="language-item">
                                    <span className="language-name">German</span>
                                    <span className="language-level">L1</span>
                                </div>
                                <div className="language-item">
                                    <span className="language-name">English</span>
                                    <span className="language-level">C1</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
};

export const T13Css = `
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
