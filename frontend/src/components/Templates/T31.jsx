import React from 'react';
import styled from 'styled-components';

const parseMarkdown = (text) => {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
};

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
);
const FlagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" x2="4" y1="22" y2="15" /></svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

const SectionHeader = ({ title }) => (
  <div className="section-header">
    <h2 className="section-title">{title}</h2>
  </div>
);

const ExperienceItem = ({ date, location, role, company, children, description }) => (
  <div className="experience-item">
    <div className="experience-left">
      <p className="experience-date">{date}</p>
      <p className="experience-location">{location}</p>
    </div>
    <div className="experience-right">
      <h3 className="experience-role-company">
        {company}, <span className="experience-role">{role}</span>
      </h3>
      {description && (
        <div className="experience-description" dangerouslySetInnerHTML={{ __html: parseMarkdown(description) }} />
      )}
      {children && <ul className="experience-list">{children}</ul>}
    </div>
  </div>
);

export const T31 = ({ jsonData }) => {
  return (
    <StyledWrapper>
      <div className="resume-container">

        {/* --- HEADER --- */}
        <header className="resume-header">
          <div className="header-content">
            <h1 className="header-name">{jsonData?.contactInfo?.fullName || 'Your Name'}</h1>
            <p className="header-title">
              {jsonData?.contactInfo?.jobTitle || 'Job Title'}
            </p>

            {/* Contact Grid */}
            <div className="contact-grid">
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
              {jsonData?.contactInfo?.Location && (
                <div className="contact-item">
                  <MapPinIcon />
                  <span>{jsonData.contactInfo.Location}</span>
                </div>
              )}
              {jsonData?.contactInfo?.linkedin && (
                <div className="contact-item">
                  <LinkedinIcon />
                  <span>{jsonData.contactInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Profile Photo */}
          {jsonData?.contactInfo?.profileImage && (
            <div className="header-photo">
              <img
                src={jsonData.contactInfo.profileImage}
                alt="Profile"
                className="profile-img"
              />
            </div>
          )}
        </header>

        {/* --- PROFILE SECTION --- */}
        {jsonData?.Description?.UserDescription && (
          <section className="resume-section">
            <SectionHeader title="Profile" />
            <p className="profile-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(jsonData.Description.UserDescription) }} />
          </section>
        )}

        {/* --- EXPERIENCE SECTION --- */}
        {jsonData?.workExperience && jsonData.workExperience.length > 0 && (
          <section className="resume-section">
            <SectionHeader title="Experience" />

            {jsonData.workExperience.map((exp, index) => (
              <ExperienceItem
                key={index}
                date={exp.WorkDuration}
                location={exp.Location || ''}
                role={exp.jobTitle}
                company={exp.companyName}
                description={exp.keyAchievements}
              >
              </ExperienceItem>
            ))}
          </section>
        )}

        {/* --- EDUCATION SECTION --- */}
        {jsonData?.education && jsonData.education.length > 0 && (
          <section className="resume-section">
            <SectionHeader title="Education" />
            {jsonData.education.map((edu, index) => (
              <div className="education-item" key={index}>
                <div className="education-left">
                  <p className="education-date">{edu.graduationYear}</p>
                  <p className="education-location-text">{edu.location}</p>
                </div>
                <div className="education-right">
                  <h3 className="education-degree">
                    {edu.degreeName}, <span className="education-school">{edu.institutionName}</span>
                  </h3>
                </div>
              </div>
            ))}
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
    padding: 2.5rem;
    color: #1f2937;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    position: relative;
    box-sizing: border-box;
  }

  .resume-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
  }

  .header-content {
    flex: 1;
  }

  .header-name {
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 700;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: -0.025em;
    margin: 0;
  }

  .header-title {
    font-size: 1.25rem;
    line-height: 1.75rem;
    color: #475569;
    font-style: italic;
    margin-top: 0.25rem;
    font-weight: 500;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 0.5rem;
    column-gap: 2rem;
    margin-top: 1.5rem;
    font-size: 0.875rem;
    color: #374151;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .header-photo {
    margin-left: 1.5rem;
    flex-shrink: 0;
  }
  
  .profile-img {
     width: 8rem;
     height: 8rem;
     border-radius: 9999px;
     overflow: hidden;
     border: 2px solid #e5e7eb;
     object-fit: cover;
     display: block;
  }

  .resume-section {
    margin-bottom: 1.5rem;
  }

  .section-header {
    background-color: #f1f5f9;
    text-align: center;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    margin-bottom: 1rem;
    border-top: 1px solid #e2e8f0;
    border-bottom: 1px solid #e2e8f0;
  }

  .section-title {
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #1e293b;
    text-transform: uppercase;
    margin: 0;
  }

  .profile-text {
    font-size: 0.875rem;
    line-height: 1.625;
    color: #374151;
  }

  .experience-item {
    display: flex;
    margin-bottom: 1.25rem;
    font-size: 0.875rem;
  }

  .experience-left {
    width: 25%;
    padding-right: 1rem;
    flex-shrink: 0;
  }
  
  .experience-date {
    color: #64748b;
    font-weight: 500;
    margin: 0;
  }

  .experience-location {
    color: #64748b;
    font-size: 0.75rem;
    margin: 0;
  }

  .experience-right {
    width: 75%;
  }

  .experience-role-company {
    color: #0f172a;
    font-weight: 700;
    margin: 0;
    font-size: 0.875rem;
  }

  .experience-role {
    font-weight: 400;
    font-style: italic;
  }

  .experience-list {
    list-style-type: disc;
    margin-left: 1rem;
    margin-top: 0.25rem;
    color: #374151;
    padding-left: 0;
  }
  
  .experience-list li {
     margin-bottom: 0.25rem;
  }
  
  .experience-list li::marker {
      color: #9ca3af;
  }

  .experience-description {
     font-size: 0.875rem;
     color: #374151;
     margin-top: 0.25rem;
  }

  .education-item {
    display: flex;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }

  .education-left {
    width: 25%;
    padding-right: 1rem;
  }

  .education-date {
    color: #64748b;
    font-weight: 500;
    margin: 0;
  }
  
  .education-location-text {
      color: #64748b;
      font-size: 0.75rem;
      margin: 0;
  }

  .education-right {
    width: 75%;
  }

  .education-degree {
    font-weight: 700;
    color: #0f172a;
    margin: 0;
    font-size: 0.875rem;
  }

  .education-school {
    font-weight: 400;
    font-style: italic;
  }

  svg {
    display: inline-block;
    vertical-align: middle;
  }
  .text-slate-800 {
    color: #1e293b;
  }
  
  @media print {
    .resume-container {
        width: 210mm;
        height: 297mm;
        margin: 0;
        padding: 2.5rem;
        box-shadow: none;
    }
  }
`;

export const T31Css = `
  .resume-container {
    background-color: white;
    width: 210mm;
    min-height: 297mm;
    padding: 2.5rem;
    color: #1f2937;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    position: relative;
    box-sizing: border-box;
  }

  .resume-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
  }

  .header-content {
    flex: 1;
  }

  .header-name {
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 700;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: -0.025em;
    margin: 0;
  }

  .header-title {
    font-size: 1.25rem;
    line-height: 1.75rem;
    color: #475569;
    font-style: italic;
    margin-top: 0.25rem;
    font-weight: 500;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 0.5rem;
    column-gap: 2rem;
    margin-top: 1.5rem;
    font-size: 0.875rem;
    color: #374151;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .header-photo {
    margin-left: 1.5rem;
    flex-shrink: 0;
  }
  
  .profile-img {
     width: 8rem;
     height: 8rem;
     border-radius: 9999px;
     overflow: hidden;
     border: 2px solid #e5e7eb;
     object-fit: cover;
     display: block;
  }

  .resume-section {
    margin-bottom: 1.5rem;
  }

  .section-header {
    background-color: #f1f5f9;
    text-align: center;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    margin-bottom: 1rem;
    border-top: 1px solid #e2e8f0;
    border-bottom: 1px solid #e2e8f0;
  }

  .section-title {
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #1e293b;
    text-transform: uppercase;
    margin: 0;
  }

  .profile-text {
    font-size: 0.875rem;
    line-height: 1.625;
    color: #374151;
  }

  .experience-item {
    display: flex;
    margin-bottom: 1.25rem;
    font-size: 0.875rem;
  }

  .experience-left {
    width: 25%;
    padding-right: 1rem;
    flex-shrink: 0;
  }
  
  .experience-date {
    color: #64748b;
    font-weight: 500;
    margin: 0;
  }

  .experience-location {
    color: #64748b;
    font-size: 0.75rem;
    margin: 0;
  }

  .experience-right {
    width: 75%;
  }

  .experience-role-company {
    color: #0f172a;
    font-weight: 700;
    margin: 0;
    font-size: 0.875rem;
  }

  .experience-role {
    font-weight: 400;
    font-style: italic;
  }

  .experience-list {
    list-style-type: disc;
    margin-left: 1rem;
    margin-top: 0.25rem;
    color: #374151;
    padding-left: 0;
  }
  
  .experience-list li {
     margin-bottom: 0.25rem;
  }
  
  .experience-list li::marker {
      color: #9ca3af;
  }

  .experience-description {
     font-size: 0.875rem;
     color: #374151;
     margin-top: 0.25rem;
  }

  .education-item {
    display: flex;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }

  .education-left {
    width: 25%;
    padding-right: 1rem;
  }

  .education-date {
    color: #64748b;
    font-weight: 500;
    margin: 0;
  }
  
  .education-location-text {
      color: #64748b;
      font-size: 0.75rem;
      margin: 0;
  }

  .education-right {
    width: 75%;
  }

  .education-degree {
    font-weight: 700;
    color: #0f172a;
    margin: 0;
    font-size: 0.875rem;
  }

  .education-school {
    font-weight: 400;
    font-style: italic;
  }

  svg {
    display: inline-block;
    vertical-align: middle;
  }
  
  .text-slate-800 {
    color: #1e293b;
  }
  
  @media print {
    .resume-container {
        width: 210mm;
        height: 297mm;
        margin: 0;
        padding: 2.5rem;
        box-shadow: none;
    }
  }
`;
