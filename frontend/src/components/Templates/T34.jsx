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
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-indigo-900"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
);
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-indigo-900"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
);
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-indigo-900"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-indigo-900"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
);

const SectionHeader = ({ title }) => (
  <div className="section-header">
    <h2 className="section-title">{title}</h2>
  </div>
);

export const T34 = ({ jsonData }) => {
  return (
    <StyledWrapper>
      <div className="resume-container">

        {/* --- HEADER --- */}
        <header className="header">
          <h1 className="name">
            {jsonData?.contactInfo?.fullName || 'Your Name'}
            <span className="job-title-inline">{jsonData?.contactInfo?.jobTitle || 'Job Title'}</span>
          </h1>

          {/* Contact Info Row */}
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
            {jsonData?.contactInfo?.linkedin && (
              <div className="contact-item">
                <LinkedinIcon />
                <span>{jsonData.contactInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
              </div>
            )}
          </div>
        </header>

        {/* --- PROFILE SECTION --- */}
        {jsonData?.Description?.UserDescription && (
          <section className="section">
            <SectionHeader title="Profile" />
            <p className="profile-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(jsonData.Description.UserDescription) }} />
          </section>
        )}

        {/* --- WORK EXPERIENCE SECTION --- */}
        {jsonData?.workExperience && jsonData.workExperience.length > 0 && (
          <section className="section">
            <SectionHeader title="Work Experience" />

            {jsonData.workExperience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="experience-header">
                  <h3 className="experience-title">{exp.jobTitle}</h3>
                  <span className="experience-date">{exp.WorkDuration}</span>
                </div>
                <div className="experience-subheader">
                  <span className="experience-company">{exp.companyName}</span>
                  <span className="experience-location">{exp.Location || ''}</span>
                </div>
                {exp.keyAchievements && (
                  <div className="experience-description" dangerouslySetInnerHTML={{ __html: parseMarkdown(exp.keyAchievements) }} />
                )}
              </div>
            ))}
          </section>
        )}

        {/* --- EDUCATION SECTION --- */}
        {jsonData?.education && jsonData.education.length > 0 && (
          <section className="section">
            <SectionHeader title="Education" />

            {jsonData.education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="education-header">
                  <h3 className="education-degree">{edu.degreeName}</h3>
                  <span className="education-date">{edu.graduationYear}</span>
                </div>
                <p className="education-institution">{edu.institutionName}</p>
              </div>
            ))}
          </section>
        )}

        {/* --- SKILLS SECTION --- */}
        {jsonData?.skills && (jsonData.skills.hardSkills || jsonData.skills.softSkills) && (
          <section className="section">
            <SectionHeader title="Skills" />
            <ul className="skills-list">
              {jsonData.skills.hardSkills && jsonData.skills.hardSkills.split(',').map((skill, index) => (
                <li key={`hard-${index}`}>{skill.trim()}</li>
              ))}
              {jsonData.skills.softSkills && jsonData.skills.softSkills.split(',').map((skill, index) => (
                <li key={`soft-${index}`}>{skill.trim()}</li>
              ))}
            </ul>
          </section>
        )}

        {/* --- LANGUAGES SECTION --- */}
        {jsonData?.contactInfo?.Languages && (
          <section className="section">
            <SectionHeader title="Languages" />
            <div className="languages-grid">
              {jsonData.contactInfo.Languages.split(',').map((lang, index) => {
                const trimmedLang = lang.trim();
                if (!trimmedLang) return null;
                return (
                  <div key={index} className="language-item">
                    <span className="language-name">{trimmedLang}</span>
                    <span className="language-level">— Fluent</span>
                  </div>
                );
              })}
            </div>
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
    height: 297mm;
    max-height: 297mm;
    padding: 2rem 2.5rem;
    color: #1f2937;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    box-sizing: border-box;
    overflow: hidden;
    page-break-after: always;
  }

  .header {
    margin-bottom: 1.25rem;
    border-bottom: 0;
  }

  .name {
    font-size: 2rem;
    font-weight: 700;
    color: #312e81;
    margin: 0;
    line-height: 1.2;
  }

  .job-title-inline {
    font-size: 1.125rem;
    font-weight: 400;
    font-style: italic;
    color: #4f46e5;
    margin-left: 0.5rem;
  }

  .contact-info {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 0.75rem;
    font-size: 0.8rem;
    color: #374151;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .contact-item svg {
    flex-shrink: 0;
  }

  .text-indigo-900 {
    color: #312e81;
  }

  .section {
    margin-bottom: 1rem;
  }

  .section-header {
    background-color: #eef2ff;
    padding: 0.2rem 0;
    text-align: center;
    border-top: 1px solid #e0e7ff;
    border-bottom: 1px solid #e0e7ff;
    margin-bottom: 0.5rem;
  }

  .section-title {
    color: #312e81;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.8rem;
    margin: 0;
  }

  .profile-text {
    font-size: 0.8rem;
    line-height: 1.4;
    text-align: justify;
    margin-top: 0.5rem;
  }

  .experience-item {
    margin-top: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .experience-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-weight: 700;
    color: #111827;
    font-size: 0.8rem;
  }

  .experience-title {
    margin: 0;
  }

  .experience-date {
    font-size: 0.75rem;
  }

  .experience-subheader {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-style: italic;
    color: #4b5563;
    font-size: 0.75rem;
    margin-bottom: 0.3rem;
  }

  .experience-company {
  }

  .experience-location {
  }

  .experience-description {
    font-size: 0.75rem;
    line-height: 1.3;
  }

  .experience-description ul {
    list-style-type: disc;
    margin-left: 1rem;
    margin-top: 0.2rem;
  }

  .experience-description li {
    margin-bottom: 0.15rem;
  }

  .education-item {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .education-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-weight: 700;
    color: #111827;
    font-size: 0.8rem;
  }

  .education-degree {
    margin: 0;
  }

  .education-date {
    font-size: 0.75rem;
  }

  .education-institution {
    font-style: italic;
    color: #4b5563;
    font-size: 0.75rem;
    margin: 0;
  }

  .skills-list {
    list-style-type: disc;
    margin-left: 1rem;
    font-size: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-top: 0.5rem;
  }

  .languages-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    margin-top: 0.5rem;
    font-size: 0.75rem;
  }

  .language-item {
    display: flex;
    gap: 0.4rem;
  }

  .language-name {
    font-weight: 700;
    color: #111827;
  }

  .language-level {
  }

  svg {
    display: inline-block;
    vertical-align: middle;
  }

  @media print {
    .resume-container {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      margin: 0;
      padding: 2rem 2.5rem;
      box-shadow: none;
      overflow: hidden;
      page-break-after: always;
    }
  }
`;

export const T34Css = `
  .resume-container {
    background-color: white;
    width: 210mm;
    height: 297mm;
    max-height: 297mm;
    padding: 2rem 2.5rem;
    color: #1f2937;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    box-sizing: border-box;
    overflow: hidden;
    page-break-after: always;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .header {
    margin-bottom: 1.25rem;
    border-bottom: 0;
  }

  .name {
    font-size: 2rem;
    font-weight: 700;
    color: #312e81;
    margin: 0;
    line-height: 1.2;
  }

  .job-title-inline {
    font-size: 1.125rem;
    font-weight: 400;
    font-style: italic;
    color: #4f46e5;
    margin-left: 0.5rem;
  }

  .contact-info {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 0.75rem;
    font-size: 0.8rem;
    color: #374151;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .contact-item svg {
    flex-shrink: 0;
  }

  .text-indigo-900 {
    color: #312e81;
  }

  .section {
    margin-bottom: 1rem;
  }

  .section-header {
    background-color: #eef2ff !important;
    padding: 0.2rem 0;
    text-align: center;
    border-top: 1px solid #e0e7ff;
    border-bottom: 1px solid #e0e7ff;
    margin-bottom: 0.5rem;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .section-title {
    color: #312e81;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.8rem;
    margin: 0;
  }

  .profile-text {
    font-size: 0.8rem;
    line-height: 1.4;
    text-align: justify;
    margin-top: 0.5rem;
  }

  .experience-item {
    margin-top: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .experience-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-weight: 700;
    color: #111827;
    font-size: 0.8rem;
  }

  .experience-title {
    margin: 0;
  }

  .experience-date {
    font-size: 0.75rem;
  }

  .experience-subheader {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-style: italic;
    color: #4b5563;
    font-size: 0.75rem;
    margin-bottom: 0.3rem;
  }

  .experience-description {
    font-size: 0.75rem;
    line-height: 1.3;
  }

  .experience-description ul {
    list-style-type: disc;
    margin-left: 1rem;
    margin-top: 0.2rem;
  }

  .experience-description li {
    margin-bottom: 0.15rem;
  }

  .education-item {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .education-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-weight: 700;
    color: #111827;
    font-size: 0.8rem;
  }

  .education-degree {
    margin: 0;
  }

  .education-date {
    font-size: 0.75rem;
  }

  .education-institution {
    font-style: italic;
    color: #4b5563;
    font-size: 0.75rem;
    margin: 0;
  }

  .skills-list {
    list-style-type: disc;
    margin-left: 1rem;
    font-size: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-top: 0.5rem;
  }

  .languages-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    margin-top: 0.5rem;
    font-size: 0.75rem;
  }

  .language-item {
    display: flex;
    gap: 0.4rem;
  }

  .language-name {
    font-weight: 700;
    color: #111827;
  }

  svg {
    display: inline-block;
    vertical-align: middle;
  }

  @media print {
    .resume-container {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      margin: 0;
      padding: 2rem 2.5rem;
      box-shadow: none;
      overflow: hidden;
      page-break-after: always;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    .section-header {
      background-color: #eef2ff !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;
