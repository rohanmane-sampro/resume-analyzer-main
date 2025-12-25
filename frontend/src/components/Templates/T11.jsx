
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
    font-family: 'Helvetica', 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: white !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
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
  font-family: 'Helvetica', 'Arial', sans-serif;
  background-color: #f5f5f5;
}

.resume {
  width: 210mm;
  max-width: 95%;
  background: white;
  margin: 20px auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
}

.sidebar {
  width: 100px;
  background: #f0f0f0;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-photo {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 15px;
}

.profile-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-placeholder {
  font-size: 32px;
  color: #999;
}

.main-content {
  flex: 1;
  padding: 25px 35px;
  background: white;
}

.header {
  margin-bottom: 20px;
}

.name {
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 3px 0;
  color: #333;
}

.job-title {
  font-size: 13px;
  color: #666;
  margin: 0 0 12px 0;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 10px;
  color: #555;
  margin-bottom: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.contact-item i {
  width: 12px;
  color: #666;
  font-size: 9px;
}

.contact-item a {
  color: #555;
  text-decoration: none;
}

.section {
  margin-bottom: 18px;
}

.section-title {
  font-size: 12px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  padding-bottom: 3px;
  border-bottom: 1px solid #ddd;
}

.profile-text {
  font-size: 10px;
  line-height: 1.5;
  color: #555;
  text-align: justify;
}

.experience-item, .education-item {
  margin-bottom: 12px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 3px;
}

.item-title {
  font-size: 11px;
  font-weight: bold;
  color: #333;
}

.item-date {
  font-size: 9px;
  color: #666;
}

.item-subtitle {
  font-size: 10px;
  color: #666;
  margin-bottom: 4px;
}

.item-description {
  font-size: 10px;
  line-height: 1.4;
  color: #555;
}

.item-description ul {
  margin: 3px 0;
  padding-left: 18px;
}

.item-description li {
  margin-bottom: 2px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  font-size: 10px;
}

.skill-category {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.skill-category-title {
  font-weight: bold;
  color: #333;
  margin-bottom: 3px;
}

.skill-item {
  color: #555;
  padding-left: 8px;
  position: relative;
}

.skill-item:before {
  content: '•';
  position: absolute;
  left: 0;
}

.language-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  font-size: 10px;
}

.language-name {
  font-weight: 600;
  color: #333;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  color: #ffa500;
  font-size: 10px;
}

.star.empty {
  color: #ddd;
}

.award-item {
  font-size: 10px;
  color: #555;
  margin-bottom: 4px;
}

.award-title {
  font-weight: 600;
  color: #333;
}
`;

export const T11 = ({ jsonData }) => {
    // Process work experience
    const workExpList = jsonData.workExperience && jsonData.workExperience.length > 0
        ? jsonData.workExperience.map((we, index) => (
            <div key={`work-${index}`} className="experience-item">
                <div className="item-header">
                    <div className="item-title">{we.jobTitle || 'Position'}</div>
                    <div className="item-date">{we.WorkDuration || '2023 - present'}</div>
                </div>
                <div className="item-subtitle">{we.companyName || 'Company'}</div>
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
                    <div className="item-date">{edu.graduationYear || '2018'}</div>
                </div>
                <div className="item-subtitle">{edu.institutionName || 'University'}</div>
            </div>
        ))
        : null;

    // Process skills
    const hardSkills = jsonData.skills?.hardSkills
        ? jsonData.skills.hardSkills.split(',').map(s => s.trim()).filter(s => s !== '')
        : [];

    const softSkills = jsonData.skills?.softSkills
        ? jsonData.skills.softSkills.split(',').map(s => s.trim()).filter(s => s !== '')
        : [];

    // Languages
    const languages = jsonData.contactInfo?.Languages
        ? jsonData.contactInfo.Languages.split(',').map(l => l.trim()).filter(l => l !== '')
        : ['English', 'Spanish'];

    return (
        <StyledWrapper>
            <div className="resume" id="capture-content">
                {/* Sidebar with Photo */}
                <div className="sidebar">
                    <div className="profile-photo">
                        <div className="photo-placeholder">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="main-content">
                    {/* Header */}
                    <div className="header">
                        <div className="name">{jsonData.contactInfo?.fullName || 'Brian T. Wayne'}</div>
                        <div className="job-title">{jsonData.contactInfo?.jobTitle || 'Business Development Consultant'}</div>

                        <div className="contact-info">
                            <div className="contact-item">
                                <i className="fas fa-envelope"></i>
                                <a href={`mailto:${jsonData.contactInfo?.emailAddress || 'brian@waynes.com'}`}>
                                    {jsonData.contactInfo?.emailAddress || 'brian@waynes.com'}
                                </a>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-phone"></i>
                                <span>{jsonData.contactInfo?.phoneNumber || '(+123) 456-7890 2345'}</span>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>{jsonData.contactInfo?.Location || '12345 Pacific Coast Hwy Malibu, California, 90264, USA'}</span>
                            </div>
                            <div className="contact-item">
                                <i className="fab fa-linkedin"></i>
                                <a href={`https://linkedin.com/in/${jsonData.contactInfo?.linkedin || 'linkedin.com/wayne-2345'}`}>
                                    {jsonData.contactInfo?.linkedin || 'linkedin.com/wayne-2345'}
                                </a>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-globe"></i>
                                <a href={jsonData.contactInfo?.portfolio || 'wayne.com'}>
                                    {jsonData.contactInfo?.portfolio?.replace('https://', '').replace('http://', '') || 'wayne.com'}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Profile */}
                    <div className="section">
                        <div className="section-title">Profile</div>
                        <div className="profile-text">
                            {jsonData.Description?.UserDescription ||
                                "I'm Brian Thomas Wayne, a business development consultant with a passion for helping companies achieve sustainable growth. Well versed MBA, having extensive experience in strategy and relationship building. I strive to provide innovative solutions that drive success for my clients."}
                        </div>
                    </div>

                    {/* Work Experience */}
                    {workExpList && workExpList.length > 0 && (
                        <div className="section">
                            <div className="section-title">Work Experience</div>
                            {workExpList}
                        </div>
                    )}

                    {/* Education */}
                    {educationList && educationList.length > 0 && (
                        <div className="section">
                            <div className="section-title">Education</div>
                            {educationList}
                        </div>
                    )}

                    {/* Skills */}
                    {(hardSkills.length > 0 || softSkills.length > 0) && (
                        <div className="section">
                            <div className="section-title">Skills</div>
                            <div className="skills-grid">
                                {hardSkills.length > 0 && (
                                    <div className="skill-category">
                                        <div className="skill-category-title">Technical</div>
                                        {hardSkills.slice(0, 4).map((skill, idx) => (
                                            <div key={idx} className="skill-item">{skill}</div>
                                        ))}
                                    </div>
                                )}
                                {softSkills.length > 0 && (
                                    <div className="skill-category">
                                        <div className="skill-category-title">Professional</div>
                                        {softSkills.slice(0, 4).map((skill, idx) => (
                                            <div key={idx} className="skill-item">{skill}</div>
                                        ))}
                                    </div>
                                )}
                                <div className="skill-category">
                                    <div className="skill-category-title">Other</div>
                                    <div className="skill-item">Communication</div>
                                    <div className="skill-item">Leadership</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Languages */}
                    <div className="section">
                        <div className="section-title">Languages</div>
                        {languages.map((lang, index) => (
                            <div key={`lang-${index}`} className="language-item">
                                <div className="language-name">{lang}</div>
                                <div className="stars">
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className={`fas fa-star star ${i >= 4 ? 'empty' : ''}`}></i>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Awards */}
                    <div className="section">
                        <div className="section-title">Awards</div>
                        <div className="award-item">
                            <span className="award-title">Outstanding Business Student Award</span>
                            <br />University of Southern California, 2018
                        </div>
                    </div>
                </div>
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
        font-family: 'Helvetica', 'Arial', sans-serif;
        margin: 0 !important;
        padding: 0 !important;
        background-color: white !important;
      }
      
      @page {
       size: A4 portrait;
       margin: 0;
      }
      
      .resume {
        width: 210mm !important;
        margin: 0 auto !important;
        box-shadow: none !important;
      }
    }
    
    body {
       font-family: 'Helvetica', 'Arial', sans-serif;
       background-color: #f5f5f5;
    }
    
    .resume {
       width: 210mm;
       background: white;
       margin: 20px auto;
       display: flex;
    }
    
    .sidebar {
       width: 100px;
       background: #f0f0f0;
    }
    
    .name {
       font-size: 24px;
       font-weight: bold;
    }
    
    .section-title {
       font-size: 12px;
       font-weight: bold;
       border-bottom: 1px solid #ddd;
    }`;
