
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
  font-family: 'Georgia', 'Times New Roman', serif;
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
  margin-bottom: 20px;
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
  font-style: italic;
  margin: 0 0 12px 0;
}

.contact-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  font-size: 9px;
  color: #555;
  margin-bottom: 18px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.contact-item i {
  font-size: 9px;
}

.section {
  margin-bottom: 18px;
}

.section-title {
  font-size: 11px;
  font-weight: bold;
  color: #000;
  margin-bottom: 10px;
  padding-bottom: 4px;
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
  gap: 10px;
}

.skill-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.skill-name {
  font-size: 9px;
  color: #333;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  color: #000;
  font-size: 8px;
}

.star.filled {
  color: #000;
}

.star.empty {
  color: #ddd;
}

.languages-list, .awards-list {
  font-size: 9px;
  color: #555;
}

.language-item, .award-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.quote-box {
  border-left: 3px solid #333;
  padding-left: 10px;
  font-size: 9px;
  font-style: italic;
  color: #555;
  line-height: 1.5;
}
`;

export const T18 = ({ jsonData }) => {
    const workExpList = jsonData.workExperience && jsonData.workExperience.length > 0
        ? jsonData.workExperience.map((we, index) => (
            <div key={`work-${index}`} className="experience-item">
                <div className="exp-header">
                    <div className="exp-title">{we.jobTitle || 'Position'}</div>
                    <div className="exp-date">{we.WorkDuration || '2013/10 - 2023/10'}</div>
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
        ? jsonData.skills.hardSkills.split(',').map(s => s.trim()).filter(s => s !== '').slice(0, 6)
        : ['Product development', 'Customer and client relations', 'Market research', 'Data analytics'];

    return (
        <StyledWrapper>
            <div className="resume" id="capture-content">
                <div className="header">
                    <div className="name">{jsonData.contactInfo?.fullName || "Andrew O'Sullivan"}</div>
                    <div className="job-title">{jsonData.contactInfo?.jobTitle || 'Product Manager'}</div>
                    <div className="contact-info">
                        <div className="contact-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>{jsonData.contactInfo?.Location || 'Ober-Linde 23, 12345 Berlin'}</span>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-envelope"></i>
                            <span>{jsonData.contactInfo?.emailAddress || 'osullivan@mail.com'}</span>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-phone"></i>
                            <span>{jsonData.contactInfo?.phoneNumber || '+01 111111111'}</span>
                        </div>
                        <div className="contact-item">
                            <i className="fab fa-linkedin"></i>
                            <span>{jsonData.contactInfo?.linkedin || 'in/osullivanad'}</span>
                        </div>
                    </div>
                </div>

                <div className="section">
                    <div className="section-title">Profile</div>
                    <div className="profile-text">
                        {jsonData.Description?.UserDescription ||
                            'Experienced Product Manager with a proven track record in the development and management of products throughout their lifecycle. Specializes in customer research, creative, and results metrics.'}
                    </div>
                </div>

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
                    <div className="skills-grid">
                        {hardSkills.map((skill, idx) => (
                            <div key={idx} className="skill-item">
                                <div className="skill-name">{skill}</div>
                                <div className="stars">
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className={`fas fa-star star ${i < 4 ? 'filled' : 'empty'}`}></i>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="section">
                    <div className="section-title">Languages</div>
                    <div className="languages-list">
                        <div className="language-item">
                            <span>German</span>
                            <span>• English</span>
                            <span>• Spanish</span>
                        </div>
                    </div>
                </div>

                <div className="section">
                    <div className="section-title">Awards</div>
                    <div className="awards-list">
                        <div className="award-item">
                            <span>Product Manager of the Year</span>
                            <span>Daily Business</span>
                        </div>
                    </div>
                </div>

                <div className="section">
                    <div className="section-title">Favorite Quote</div>
                    <div className="quote-box">
                        Eris Risis<br />
                        The key product is to eye user affect a problem for the customer
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
};

export const T18Css = `
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
