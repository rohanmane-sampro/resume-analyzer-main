import React from 'react';
import styled from 'styled-components';

// --- Icons ---
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
);
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
);
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
);
const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
);

// --- Helpers ---
const parseMarkdown = (text) => {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
};

const SectionHeader = ({ title }) => (
  <div className="section-header">
    <h2 className="section-title">{title}</h2>
  </div>
);

// --- CSS Styles ---
export const T34Css = `
  .resume-container {
    background-color: white;
    width: 210mm;
    min-height: 297mm;
    padding: 3rem;
    color: #1f2937;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    box-sizing: border-box;
  }

  /* Header */
  .header {
    margin-bottom: 2rem;
    border-bottom: 0;
  }

  .name {
    font-size: 2.25rem;
    font-weight: 800;
    color: #312e81; /* Indigo 900 */
    margin: 0;
    line-height: 1.2;
  }

  .job-title-inline {
    font-size: 1.25rem;
    font-weight: 400;
    font-style: italic;
    color: #4f46e5; /* Indigo 600 */
    margin-left: 0.5rem;
  }

  .contact-info {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    margin-top: 1rem;
    font-size: 0.85rem;
    color: #4b5563;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  
  .contact-item svg {
    color: #4f46e5;
  }

  /* Section Headers */
  .section {
    margin-bottom: 1.75rem;
  }

  .section-header {
    background-color: #eef2ff !important;
    padding: 0.35rem 0.5rem;
    border-left: 4px solid #312e81;
    margin-bottom: 1rem;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .section-title {
    color: #312e81;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.9rem;
    margin: 0;
  }

  /* Descriptions (Profile, Exp, Projects) */
  .profile-text, .description-text {
    font-size: 0.85rem;
    line-height: 1.6;
    text-align: justify;
    color: #374151;
  }
  
  .description-text ul {
    list-style-type: disc;
    margin-left: 1.25rem;
    margin-top: 0.25rem;
  }

  .description-text li {
    margin-bottom: 0.15rem;
  }

  /* Experience & Projects Items */
  .item-container {
    margin-bottom: 1.25rem;
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.25rem;
  }

  .item-title {
    font-size: 0.95rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
  }

  .item-date {
    font-size: 0.8rem;
    font-weight: 600;
    color: #312e81;
    white-space: nowrap;
    margin-left: 1rem;
  }

  .item-subheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    color: #4b5563;
    font-style: italic;
    margin-bottom: 0.5rem;
  }
  
  .project-link {
    color: #4f46e5;
    text-decoration: none;
    font-size: 0.8rem;
  }

  /* Education */
  .education-item {
    margin-bottom: 1rem;
  }
  .education-score {
    font-size: 0.8rem;
    color: #4b5563;
    margin-top: 2px;
  }

  /* Skills - Chips Design */
  .skills-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }
  
  .skill-chip {
    background-color: #f3f4f6 !important;
    color: #1f2937;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    border: 1px solid #e5e7eb;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* Certifications */
  .cert-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .cert-item {
    margin-bottom: 0.5rem;
  }
  .cert-name {
    font-size: 0.85rem;
    font-weight: 700;
    color: #1f2937;
  }
  .cert-issuer {
    font-size: 0.8rem;
    color: #6b7280;
  }

  /* Languages */
  .languages-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    font-size: 0.85rem;
  }
  .language-item {
    display: flex;
    flex-direction: column;
  }
  .language-name {
    font-weight: 700;
    color: #111827;
  }
  .language-level {
    font-size: 0.75rem;
    color: #6b7280;
  }

  @media print {
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    html {
      margin: 0 !important;
      padding: 0 !important;
      background: white !important;
    }
    
    body { 
      margin: 0 !important;
      padding: 0 !important;
      background: white !important;
    }
    
    @page {
      size: A4 portrait;
      margin: 0;
    }
    
    .resume-container {
      width: 210mm !important;
      height: auto !important;
      min-height: auto !important;
      margin: 0 !important;
      padding: 2rem 2.5rem !important;
      box-shadow: none !important;
      background: white !important;
      page-break-inside: avoid !important;
    }
    
    .section-header {
      background-color: #eef2ff !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      page-break-after: avoid !important;
    }
    
    .skill-chip {
      background-color: #f3f4f6 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    .item-container {
      page-break-inside: avoid !important;
    }
    
    .section {
      page-break-inside: avoid !important;
    }
  }
`;

const StyledWrapper = styled.div`
  ${T34Css}
`;

export const T34 = ({ jsonData }) => {
  // Data extraction helpers with CORRECT field names
  const hardSkills = jsonData.skills?.hardSkills
    ? (Array.isArray(jsonData.skills.hardSkills) ? jsonData.skills.hardSkills : jsonData.skills.hardSkills.split(','))
    : [];
  const softSkills = jsonData.skills?.softSkills
    ? (Array.isArray(jsonData.skills.softSkills) ? jsonData.skills.softSkills : jsonData.skills.softSkills.split(','))
    : [];

  // Combine skills for chip display
  const allSkills = [...hardSkills, ...softSkills].map(s => s.trim()).filter(Boolean);

  const languages = jsonData.contactInfo?.Languages
    ? jsonData.contactInfo.Languages.split(',').map(l => l.trim()).filter(Boolean)
    : [];

  return (
    <StyledWrapper>
      <div className="resume-container">

        {/* --- HEADER --- */}
        <header className="header">
          <h1 className="name">
            {jsonData?.contactInfo?.fullName || 'Your Name'}
            <span className="job-title-inline">{jsonData?.contactInfo?.jobTitle || 'Job Title'}</span>
          </h1>

          <div className="contact-info">
            {jsonData?.contactInfo?.Location && (
              <div className="contact-item">
                <MapPinIcon /> <span>{jsonData.contactInfo.Location}</span>
              </div>
            )}
            {jsonData?.contactInfo?.emailAddress && (
              <div className="contact-item">
                <MailIcon /> <span>{jsonData.contactInfo.emailAddress}</span>
              </div>
            )}
            {jsonData?.contactInfo?.phoneNumber && (
              <div className="contact-item">
                <PhoneIcon /> <span>{jsonData.contactInfo.phoneNumber}</span>
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
                <GlobeIcon />
                <span>{jsonData.contactInfo.portfolio.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
          </div>
        </header>

        {/* --- PROFILE --- */}
        {jsonData?.Description?.UserDescription && (
          <section className="section">
            <SectionHeader title="Profile" />
            <div className="profile-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(jsonData.Description.UserDescription) }} />
          </section>
        )}

        {/* --- WORK EXPERIENCE --- */}
        {jsonData?.workExperience && jsonData.workExperience.length > 0 && (
          <section className="section">
            <SectionHeader title="Work Experience" />
            {jsonData.workExperience.map((exp, index) => (
              <div key={index} className="item-container">
                <div className="item-header">
                  <h3 className="item-title">{exp.jobTitle}</h3>
                  <span className="item-date">{exp.WorkDuration}</span>
                </div>
                <div className="item-subheader">
                  <span>{exp.companyName}</span>
                </div>
                {exp.keyAchievements && (
                  <div className="description-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(exp.keyAchievements) }} />
                )}
              </div>
            ))}
          </section>
        )}

        {/* --- PROJECTS --- */}
        {jsonData?.projects && jsonData.projects.length > 0 && (
          <section className="section">
            <SectionHeader title="Projects" />
            {jsonData.projects.map((proj, index) => (
              <div key={index} className="item-container">
                <div className="item-header">
                  <h3 className="item-title">{proj.projectTitle}</h3>
                </div>
                {proj.toolsTechUsed && (
                  <div className="description-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(proj.toolsTechUsed) }} />
                )}
              </div>
            ))}
          </section>
        )}

        {/* --- EDUCATION --- */}
        {jsonData?.education && jsonData.education.length > 0 && (
          <section className="section">
            <SectionHeader title="Education" />
            {jsonData.education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="item-header">
                  <h3 className="item-title">{edu.degreeName}</h3>
                  <span className="item-date">{edu.graduationYear}</span>
                </div>
                <div className="item-subheader">
                  <span>{edu.institutionName}</span>
                </div>
                {edu.currentCGPA && <div className="education-score">CGPA: {edu.currentCGPA}</div>}
              </div>
            ))}
          </section>
        )}

        {/* --- SKILLS (CHIP DESIGN) --- */}
        {allSkills.length > 0 && (
          <section className="section">
            <SectionHeader title="Skills" />
            <div className="skills-wrapper">
              {allSkills.map((skill, index) => (
                <span key={index} className="skill-chip">{skill}</span>
              ))}
            </div>
          </section>
        )}

        {/* --- CERTIFICATIONS --- */}
        {jsonData?.certificates && jsonData.certificates.length > 0 && (
          <section className="section">
            <SectionHeader title="Certifications" />
            <div className="cert-grid">
              {jsonData.certificates.map((cert, index) => (
                <div key={index} className="cert-item">
                  <div className="cert-name">{cert.certificateName}</div>
                  <div className="cert-issuer">
                    {cert.providerName} {cert.courseDuration ? `• ${cert.courseDuration}` : ''}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- LANGUAGES --- */}
        {languages.length > 0 && (
          <section className="section">
            <SectionHeader title="Languages" />
            <div className="languages-grid">
              {languages.map((lang, index) => (
                <div key={index} className="language-item">
                  <span className="language-name">{lang}</span>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </StyledWrapper>
  );
};
