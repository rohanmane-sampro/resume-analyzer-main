import React from 'react';
import styled from 'styled-components';

const parseMarkdown = (text) => {
    if (!text) return '';
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br/>');
};

const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>;
const LinkedinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>;
const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>;

const SidebarHeader = ({ title }) => (
    <div className="sidebar-header">
        <h3 className="sidebar-title">{title}</h3>
    </div>
);

const MainHeader = ({ title }) => (
    <div className="main-header">
        <h2 className="main-title">{title}</h2>
    </div>
);

const RatingDots = ({ count }) => {
    return (
        <div className="rating-dots">
            {[...Array(5)].map((_, i) => (
                <div key={i} className={`dot ${i < count ? 'filled' : 'empty'}`} />
            ))}
        </div>
    );
};

export const T33 = ({ jsonData }) => {
    return (
        <StyledWrapper>
            <div className="resume-container">

                {/* --- LEFT SIDEBAR (35% Width) --- */}
                <div className="sidebar">

                    {/* Header / Name */}
                    <div className="header-section">
                        <h1 className="name">{jsonData?.contactInfo?.fullName || 'Your Name'}</h1>
                        <p className="job-title">{jsonData?.contactInfo?.jobTitle || 'Job Title'}</p>
                    </div>

                    {/* Profile Picture */}
                    {jsonData?.contactInfo?.profileImage && (
                        <div className="profile-pic-container">
                            <img
                                src={jsonData.contactInfo.profileImage}
                                alt="Profile"
                                className="profile-pic"
                            />
                        </div>
                    )}

                    {/* Contact Info */}
                    <div className="contact-section">
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
                        {jsonData?.contactInfo?.portfolio && (
                            <div className="contact-item">
                                <LinkIcon />
                                <span>{jsonData.contactInfo.portfolio}</span>
                            </div>
                        )}
                    </div>

                    {/* Profile Section */}
                    {jsonData?.Description?.UserDescription && (
                        <div className="sidebar-section">
                            <SidebarHeader title="Profile" />
                            <p className="profile-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(jsonData.Description.UserDescription) }} />
                        </div>
                    )}

                    {/* Languages Section */}
                    {jsonData?.languages && jsonData.languages.length > 0 && (
                        <div className="sidebar-section">
                            <SidebarHeader title="Languages" />
                            <div className="languages-list">
                                {jsonData.languages.map((lang, index) => (
                                    <div key={index} className="language-item">
                                        <span>{lang.name || lang}</span>
                                        <RatingDots count={lang.proficiency || 5} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Certificates/Awards Section */}
                    {jsonData?.certificates && jsonData.certificates.length > 0 && (
                        <div className="sidebar-section">
                            <SidebarHeader title="Awards" />
                            <div className="awards-list">
                                {jsonData.certificates.map((cert, index) => (
                                    <div key={index} className="award-item">
                                        <h4 className="award-title">{cert.certificateName}</h4>
                                        <p className="award-detail">{cert.providerName}, {cert.courseDuration}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                {/* --- RIGHT MAIN CONTENT (65% Width) --- */}
                <div className="main-content">

                    {/* Work Experience */}
                    {jsonData?.workExperience && jsonData.workExperience.length > 0 && (
                        <section className="main-section">
                            <MainHeader title="Work Experience" />

                            {jsonData.workExperience.map((exp, index) => (
                                <div key={index} className="experience-item">
                                    <h3 className="company-name">{exp.companyName}</h3>
                                    <p className="position-title">{exp.jobTitle}</p>
                                    <p className="date-location">{exp.WorkDuration} | {exp.Location || ''}</p>
                                    {exp.keyAchievements && (
                                        <div className="experience-description" dangerouslySetInnerHTML={{ __html: parseMarkdown(exp.keyAchievements) }} />
                                    )}
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Education */}
                    {jsonData?.education && jsonData.education.length > 0 && (
                        <section className="main-section">
                            <MainHeader title="Education" />

                            {jsonData.education.map((edu, index) => (
                                <div key={index} className="education-item">
                                    <h3 className="degree-name">{edu.degreeName}</h3>
                                    <p className="institution-name">{edu.institutionName}</p>
                                    <p className="edu-date-location">{edu.graduationYear} | {edu.location || ''}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Skills */}
                    {jsonData?.skills && (jsonData.skills.hardSkills || jsonData.skills.softSkills) && (
                        <section className="main-section">
                            <MainHeader title="Skills" />
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

                </div>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .resume-container {
    background-color: white;
    width: 210mm;
    min-height: 297mm;
    display: flex;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #1f2937;
    box-sizing: border-box;
  }

  .sidebar {
    width: 35%;
    background-color: #E8E8E8;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .header-section {
    margin-bottom: 1rem;
  }

  .name {
    font-size: 1.875rem;
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 700;
    color: #111827;
    line-height: 1.2;
    margin: 0;
  }

  .job-title {
    font-size: 1.25rem;
    font-weight: 300;
    color: #4b5563;
    margin-top: 0.5rem;
  }

  .profile-pic-container {
    width: 10rem;
    height: 10rem;
    margin: 0 auto;
    border-radius: 9999px;
    overflow: hidden;
    border: 4px solid #d1d5db;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  .profile-pic {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .contact-section {
    font-size: 0.875rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .contact-item svg {
    flex-shrink: 0;
  }

  .sidebar-section {
    margin-top: 0.25rem;
  }

  .sidebar-header {
    background-color: #D1D5DB;
    text-align: center;
    padding: 0.25rem 0;
    margin-bottom: 0.75rem;
    margin-top: 0.25rem;
  }

  .sidebar-title {
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 700;
    color: #1f2937;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.875rem;
    margin: 0;
  }

  .profile-text {
    font-size: 0.75rem;
    line-height: 1.625;
    color: #374151;
    text-align: justify;
  }

  .languages-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.875rem;
  }

  .language-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .rating-dots {
    display: flex;
    gap: 0.25rem;
  }

  .dot {
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 9999px;
  }

  .dot.filled {
    background-color: #374151;
  }

  .dot.empty {
    background-color: #d1d5db;
  }

  .awards-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 0.75rem;
  }

  .award-title {
    font-weight: 700;
    color: #111827;
    margin: 0 0 0.25rem 0;
  }

  .award-detail {
    color: #4b5563;
    margin: 0;
  }

  .main-content {
    width: 65%;
    background-color: white;
    padding: 2.5rem;
    padding-top: 3rem;
  }

  .main-section {
    margin-bottom: 2rem;
  }

  .main-header {
    background-color: #F3F4F6;
    text-align: center;
    padding: 0.25rem 0;
    margin-bottom: 1.25rem;
  }

  .main-title {
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 700;
    color: #1f2937;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 1rem;
    margin: 0;
  }

  .experience-item {
    margin-bottom: 1.5rem;
  }

  .company-name {
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 700;
    font-size: 1.125rem;
    color: #111827;
    margin: 0 0 0.25rem 0;
  }

  .position-title {
    color: #374151;
    margin: 0 0 0.25rem 0;
    font-size: 0.875rem;
  }

  .date-location {
    font-size: 0.75rem;
    color: #6b7280;
    margin: 0 0 0.5rem 0;
  }

  .experience-description {
    font-size: 0.875rem;
    color: #374151;
    line-height: 1.5;
  }

  .experience-description ul {
    list-style-type: disc;
    margin-left: 1rem;
    margin-top: 0.25rem;
  }

  .experience-description li {
    margin-bottom: 0.25rem;
  }

  .experience-description li::marker {
    color: #9ca3af;
  }

  .education-item {
    margin-bottom: 1rem;
  }

  .degree-name {
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 700;
    font-size: 1rem;
    color: #111827;
    margin: 0 0 0.25rem 0;
  }

  .institution-name {
    font-size: 0.875rem;
    color: #374151;
    margin: 0 0 0.25rem 0;
  }

  .edu-date-location {
    font-size: 0.75rem;
    color: #6b7280;
    margin: 0;
  }

  .skills-list {
    list-style-type: disc;
    margin-left: 1rem;
    font-size: 0.875rem;
    color: #374151;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }

  .skills-list li::marker {
    color: #9ca3af;
  }

  svg {
    display: inline-block;
    vertical-align: middle;
  }

  .shrink-0 {
    flex-shrink: 0;
  }

  @media print {
    .resume-container {
      width: 210mm;
      height: 297mm;
      margin: 0;
      box-shadow: none;
    }
  }
`;

export const T33Css = `
  .resume-container {
    background-color: white;
    width: 210mm;
    min-height: 297mm;
    display: flex;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #1f2937;
    box-sizing: border-box;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .sidebar {
    width: 35%;
    background-color: #E8E8E8 !important;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .header-section {
    margin-bottom: 1rem;
  }

  .name {
    font-size: 1.875rem;
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 700;
    color: #111827;
    line-height: 1.2;
    margin: 0;
  }

  .job-title {
    font-size: 1.25rem;
    font-weight: 300;
    color: #4b5563;
    margin-top: 0.5rem;
  }

  .profile-pic-container {
    width: 10rem;
    height: 10rem;
    margin: 0 auto;
    border-radius: 9999px;
    overflow: hidden;
    border: 4px solid #d1d5db;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  .profile-pic {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .contact-section {
    font-size: 0.875rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .contact-item svg {
    flex-shrink: 0;
  }

  .sidebar-section {
    margin-top: 0.25rem;
  }

  .sidebar-header {
    background-color: #D1D5DB !important;
    text-align: center;
    padding: 0.25rem 0;
    margin-bottom: 0.75rem;
    margin-top: 0.25rem;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .sidebar-title {
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 700;
    color: #1f2937;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.875rem;
    margin: 0;
  }

  .profile-text {
    font-size: 0.75rem;
    line-height: 1.625;
    color: #374151;
    text-align: justify;
  }

  .languages-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.875rem;
  }

  .language-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .rating-dots {
    display: flex;
    gap: 0.25rem;
  }

  .dot {
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 9999px;
  }

  .dot.filled {
    background-color: #374151 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .dot.empty {
    background-color: #d1d5db !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .awards-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 0.75rem;
  }

  .award-title {
    font-weight: 700;
    color: #111827;
    margin: 0 0 0.25rem 0;
  }

  .award-detail {
    color: #4b5563;
    margin: 0;
  }

  .main-content {
    width: 65%;
    background-color: white;
    padding: 2.5rem;
    padding-top: 3rem;
  }

  .main-section {
    margin-bottom: 2rem;
  }

  .main-header {
    background-color: #F3F4F6 !important;
    text-align: center;
    padding: 0.25rem 0;
    margin-bottom: 1.25rem;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .main-title {
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 700;
    color: #1f2937;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 1rem;
    margin: 0;
  }

  .experience-item {
    margin-bottom: 1.5rem;
  }

  .company-name {
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 700;
    font-size: 1.125rem;
    color: #111827;
    margin: 0 0 0.25rem 0;
  }

  .position-title {
    color: #374151;
    margin: 0 0 0.25rem 0;
    font-size: 0.875rem;
  }

  .date-location {
    font-size: 0.75rem;
    color: #6b7280;
    margin: 0 0 0.5rem 0;
  }

  .experience-description {
    font-size: 0.875rem;
    color: #374151;
    line-height: 1.5;
  }

  .experience-description ul {
    list-style-type: disc;
    margin-left: 1rem;
    margin-top: 0.25rem;
  }

  .experience-description li {
    margin-bottom: 0.25rem;
  }

  .experience-description li::marker {
    color: #9ca3af;
  }

  .education-item {
    margin-bottom: 1rem;
  }

  .degree-name {
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 700;
    font-size: 1rem;
    color: #111827;
    margin: 0 0 0.25rem 0;
  }

  .institution-name {
    font-size: 0.875rem;
    color: #374151;
    margin: 0 0 0.25rem 0;
  }

  .edu-date-location {
    font-size: 0.75rem;
    color: #6b7280;
    margin: 0;
  }

  .skills-list {
    list-style-type: disc;
    margin-left: 1rem;
    font-size: 0.875rem;
    color: #374151;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }

  .skills-list li::marker {
    color: #9ca3af;
  }

  svg {
    display: inline-block;
    vertical-align: middle;
  }

  .shrink-0 {
    flex-shrink: 0;
  }

  @media print {
    .resume-container {
      width: 210mm;
      height: 297mm;
      margin: 0;
      box-shadow: none;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    .sidebar {
      background-color: #E8E8E8 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    .sidebar-header {
      background-color: #D1D5DB !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    .main-header {
      background-color: #F3F4F6 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    .dot.filled {
      background-color: #374151 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    .dot.empty {
      background-color: #d1d5db !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;
