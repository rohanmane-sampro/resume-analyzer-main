import React from 'react';
import styled from 'styled-components';

const parseMarkdown = (text) => {
    if (!text) return '';
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br/>');
};

const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-black"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
);
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-black"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
);
const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-black"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
);

const SectionHeader = ({ title }) => (
    <div className="section-header">
        <h2 className="section-title">{title}</h2>
    </div>
);

export const T32 = ({ jsonData }) => {
    return (
        <StyledWrapper>
            <div className="resume-container">

                {/* --- HEADER --- */}
                <header className="header">
                    <h1 className="name">{jsonData?.contactInfo?.fullName || 'Your Name'}</h1>

                    <div className="contact-info">
                        {jsonData?.contactInfo?.Location && (
                            <div className="contact-item">
                                <MapPinIcon />
                                <span>{jsonData.contactInfo.Location}</span>
                            </div>
                        )}
                        {jsonData?.contactInfo?.emailAddress && (
                            <div className="contact-item">
                                <MailIcon />
                                <span>{jsonData.contactInfo.emailAddress}</span>
                            </div>
                        )}
                        {jsonData?.contactInfo?.phoneNumber && (
                            <div className="contact-item">
                                <PhoneIcon />
                                <span>{jsonData.contactInfo.phoneNumber}</span>
                            </div>
                        )}
                    </div>
                </header>

                {/* --- SUMMARY SECTION --- */}
                {jsonData?.Description?.UserDescription && (
                    <section className="section">
                        <SectionHeader title="Summary" />
                        <p className="summary-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(jsonData.Description.UserDescription) }} />
                    </section>
                )}

                {/* --- EDUCATION SECTION --- */}
                {jsonData?.education && jsonData.education.length > 0 && (
                    <section className="section">
                        <SectionHeader title="Education" />

                        {jsonData.education.map((edu, index) => (
                            <div key={index} className="edu-item">
                                <div className="edu-header">
                                    <h3 className="edu-school">{edu.institutionName},</h3>
                                    <span className="edu-date">{edu.graduationYear}</span>
                                </div>
                                <p className="edu-degree">{edu.degreeName}</p>
                                {edu.currentCGPA && (
                                    <p className="edu-detail">CGPA: {edu.currentCGPA}</p>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* --- WORK EXPERIENCE SECTION --- */}
                {jsonData?.workExperience && jsonData.workExperience.length > 0 && (
                    <section className="section">
                        <SectionHeader title="Work Experience" />

                        {jsonData.workExperience.map((exp, index) => (
                            <div key={index} className="work-item">
                                <div className="work-header">
                                    <h3 className="work-company">{exp.companyName},</h3>
                                    <span className="work-date">{exp.WorkDuration} | {exp.Location || ''}</span>
                                </div>
                                <p className="work-title">{exp.jobTitle}</p>
                                {exp.keyAchievements && (
                                    <div className="work-description" dangerouslySetInnerHTML={{ __html: parseMarkdown(exp.keyAchievements) }} />
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* --- PROJECTS SECTION --- */}
                {jsonData?.projects && jsonData.projects.length > 0 && (
                    <section className="section">
                        <SectionHeader title="Projects" />

                        {jsonData.projects.map((project, index) => (
                            <div key={index} className="work-item">
                                <h3 className="project-title">{project.projectTitle}</h3>
                                {project.toolsTechUsed && (
                                    <div className="project-description" dangerouslySetInnerHTML={{ __html: parseMarkdown(project.toolsTechUsed) }} />
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* --- TECHNICAL EXPERTISE SECTION --- */}
                {jsonData?.skills && (jsonData.skills.hardSkills || jsonData.skills.softSkills) && (
                    <section className="section">
                        <SectionHeader title="Technical Expertise" />
                        <p className="skills-text">
                            {[jsonData.skills.hardSkills, jsonData.skills.softSkills].filter(Boolean).join(', ')}
                        </p>
                    </section>
                )}

            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .resume-container {
    background-color: white;
    width: 210mm;
    min-height: 297mm;
    padding: 3rem;
    color: #111827;
    font-family: Georgia, 'Times New Roman', Times, serif;
    position: relative;
    box-sizing: border-box;
  }

  .header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .name {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    letter-spacing: 0.05em;
  }

  .contact-info {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    font-size: 0.875rem;
    flex-wrap: wrap;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .section {
    margin-bottom: 1.5rem;
  }

  .section-header {
    border-bottom: 2px solid #000;
    padding-bottom: 0.25rem;
    margin-bottom: 0.75rem;
  }

  .section-title {
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
  }

  .summary-text {
    font-size: 0.875rem;
    line-height: 1.625;
    margin-top: 0.75rem;
  }

  .edu-item {
    margin-top: 0.75rem;
    margin-bottom: 1rem;
  }

  .edu-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-weight: 700;
  }

  .edu-school {
    font-size: 0.875rem;
    margin: 0;
  }

  .edu-date {
    font-size: 0.875rem;
  }

  .edu-degree {
    font-style: italic;
    font-size: 0.875rem;
    margin: 0.25rem 0;
  }

  .edu-detail {
    font-size: 0.875rem;
    margin: 0.25rem 0;
  }

  .work-item {
    margin-top: 0.75rem;
    margin-bottom: 1rem;
  }

  .work-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-weight: 700;
    font-size: 0.875rem;
  }

  .work-company {
    text-transform: uppercase;
    margin: 0;
    font-size: 0.875rem;
  }

  .work-date {
    font-size: 0.875rem;
  }

  .work-title {
    font-style: italic;
    font-size: 0.875rem;
    margin: 0.25rem 0;
  }

  .work-description {
    font-size: 0.875rem;
    line-height: 1.5;
    margin-top: 0.25rem;
  }

  .work-description ul {
    list-style-type: disc;
    margin-left: 1.25rem;
    margin-top: 0.25rem;
  }

  .work-description li {
    margin-bottom: 0.25rem;
  }

  .project-title {
    font-weight: 700;
    font-size: 0.875rem;
    margin: 0.5rem 0 0.25rem 0;
  }

  .project-description {
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .skills-text {
    font-size: 0.875rem;
    margin-top: 0.75rem;
    line-height: 1.5;
  }

  svg {
    display: inline-block;
    vertical-align: middle;
  }

  .text-black {
    color: #000;
  }

  @media print {
    .resume-container {
      width: 210mm;
      height: 297mm;
      margin: 0;
      padding: 3rem;
      box-shadow: none;
    }
  }
`;

export const T32Css = `
  .resume-container {
    background-color: white;
    width: 210mm;
    min-height: 297mm;
    padding: 3rem;
    color: #111827;
    font-family: Georgia, 'Times New Roman', Times, serif;
    position: relative;
    box-sizing: border-box;
  }

  .header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .name {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    letter-spacing: 0.05em;
  }

  .contact-info {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    font-size: 0.875rem;
    flex-wrap: wrap;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .section {
    margin-bottom: 1.5rem;
  }

  .section-header {
    border-bottom: 2px solid #000;
    padding-bottom: 0.25rem;
    margin-bottom: 0.75rem;
  }

  .section-title {
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
  }

  .summary-text {
    font-size: 0.875rem;
    line-height: 1.625;
    margin-top: 0.75rem;
  }

  .edu-item {
    margin-top: 0.75rem;
    margin-bottom: 1rem;
  }

  .edu-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-weight: 700;
  }

  .edu-school {
    font-size: 0.875rem;
    margin: 0;
  }

  .edu-date {
    font-size: 0.875rem;
  }

  .edu-degree {
    font-style: italic;
    font-size: 0.875rem;
    margin: 0.25rem 0;
  }

  .edu-detail {
    font-size: 0.875rem;
    margin: 0.25rem 0;
  }

  .work-item {
    margin-top: 0.75rem;
    margin-bottom: 1rem;
  }

  .work-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-weight: 700;
    font-size: 0.875rem;
  }

  .work-company {
    text-transform: uppercase;
    margin: 0;
    font-size: 0.875rem;
  }

  .work-date {
    font-size: 0.875rem;
  }

  .work-title {
    font-style: italic;
    font-size: 0.875rem;
    margin: 0.25rem 0;
  }

  .work-description {
    font-size: 0.875rem;
    line-height: 1.5;
    margin-top: 0.25rem;
  }

  .work-description ul {
    list-style-type: disc;
    margin-left: 1.25rem;
    margin-top: 0.25rem;
  }

  .work-description li {
    margin-bottom: 0.25rem;
  }

  .project-title {
    font-weight: 700;
    font-size: 0.875rem;
    margin: 0.5rem 0 0.25rem 0;
  }

  .project-description {
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .skills-text {
    font-size: 0.875rem;
    margin-top: 0.75rem;
    line-height: 1.5;
  }

  svg {
    display: inline-block;
    vertical-align: middle;
  }

  .text-black {
    color: #000;
  }

  @media print {
    .resume-container {
      width: 210mm;
      height: 297mm;
      margin: 0;
      padding: 3rem;
      box-shadow: none;
    }
  }
`;
