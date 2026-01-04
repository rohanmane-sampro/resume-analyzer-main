import React from 'react';
import styled from 'styled-components';

// --- Helpers ---
const parseMarkdown = (text) => {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
};

// --- Icons ---
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);
const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
);

const SectionHeader = ({ title }) => (
  <div className="section-header">
    <h2 className="section-title">{title}</h2>
  </div>
);

// --- CSS Styles ---
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
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
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
    text-align: justify;
  }

  /* Split Layout for Experience/Projects/Education */
  .experience-item, .education-item, .project-item {
    display: flex;
    margin-bottom: 1.25rem;
    font-size: 0.875rem;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .left-col {
    width: 25%;
    padding-right: 1rem;
    flex-shrink: 0;
  }

  .right-col {
    width: 75%;
  }

  .date-text {
    color: #64748b;
    font-weight: 500;
    margin: 0;
  }

  .location-text {
    color: #64748b;
    font-size: 0.75rem;
    margin: 0;
  }

  .main-text {
    color: #0f172a;
    font-weight: 700;
    margin: 0;
    font-size: 0.875rem;
  }

  .sub-text {
    font-weight: 400;
    font-style: italic;
  }

  .description-text {
     font-size: 0.875rem;
     color: #374151;
     margin-top: 0.25rem;
     text-align: justify;
     line-height: 1.5;
  }
  
  .description-text ul {
     list-style-type: disc;
     margin-left: 1.25rem;
     margin-top: 0.25rem;
  }
  
  .description-text li {
     margin-bottom: 0.15rem;
  }

  /* Skills Chips */
  .skills-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .skill-chip {
    background-color: #f1f5f9;
    color: #334155;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    border: 1px solid #e2e8f0;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* Languages Grid */
  .languages-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .svg {
    display: inline-block;
    vertical-align: middle;
  }
  .text-slate-800 {
    color: #1e293b;
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
       background-color: white !important;
    }
    
    .resume-container {
       width: 210mm !important;
       height: auto !important;
       min-height: auto !important;
       margin: 0 !important;
       padding: 2.5rem !important;
       box-shadow: none !important;
       background-color: white !important;
       page-break-inside: avoid !important;
    }
    
    .section-header {
       background-color: #f1f5f9 !important;
       -webkit-print-color-adjust: exact !important;
       print-color-adjust: exact !important;
    }
    
    .skill-chip {
       background-color: #f1f5f9 !important;
       -webkit-print-color-adjust: exact !important;
       print-color-adjust: exact !important;
    }
  }
`;

const StyledWrapper = styled.div`
  ${T31Css}
`;

export const T31 = ({ jsonData }) => {
  // Data Extraction Helpers
  const hardSkills = jsonData.skills?.hardSkills
    ? (Array.isArray(jsonData.skills.hardSkills) ? jsonData.skills.hardSkills : jsonData.skills.hardSkills.split(','))
    : [];
  const softSkills = jsonData.skills?.softSkills
    ? (Array.isArray(jsonData.skills.softSkills) ? jsonData.skills.softSkills : jsonData.skills.softSkills.split(','))
    : [];
  const allSkills = [...hardSkills, ...softSkills].map(s => s.trim()).filter(Boolean);

  const languages = jsonData.contactInfo?.Languages
    ? jsonData.contactInfo.Languages.split(',').map(l => l.trim()).filter(Boolean)
    : [];

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

            <div className="contact-grid">
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
              {jsonData?.contactInfo?.Location && (
                <div className="contact-item">
                  <MapPinIcon /> <span>{jsonData.contactInfo.Location}</span>
                </div>
              )}
              {jsonData?.contactInfo?.linkedin && (
                <div className="contact-item">
                  <LinkedinIcon /> <span>{jsonData.contactInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
                </div>
              )}
              {jsonData?.contactInfo?.portfolio && (
                <div className="contact-item">
                  <LinkIcon /> <span>{jsonData.contactInfo.portfolio.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
            </div>
          </div>

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
              <div className="experience-item" key={index}>
                <div className="left-col">
                  <p className="date-text">{exp.WorkDuration}</p>
                  <p className="location-text">{exp.Location || ''}</p>
                </div>
                <div className="right-col">
                  <h3 className="main-text">
                    {exp.companyName}, <span className="sub-text">{exp.jobTitle}</span>
                  </h3>
                  <div className="description-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(exp.keyAchievements) }} />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* --- PROJECTS SECTION --- */}
        {jsonData?.projects && jsonData.projects.length > 0 && (
          <section className="resume-section">
            <SectionHeader title="Projects" />
            {jsonData.projects.map((proj, index) => (
              <div className="project-item" key={index}>
                <div className="left-col">
                  <p className="date-text">{proj.duration}</p>
                </div>
                <div className="right-col">
                  <h3 className="main-text">
                    {proj.projectTitle}
                    {proj.link && <span className="sub-text" style={{ fontSize: '0.8em', marginLeft: '5px' }}><a href={proj.link} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Link ↗</a></span>}
                  </h3>
                  {proj.toolsTechUsed && (
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '4px' }}>
                      <strong>Stack:</strong> {proj.toolsTechUsed}
                    </div>
                  )}
                  <div className="description-text" dangerouslySetInnerHTML={{ __html: parseMarkdown(proj.description || proj.toolsTechUsed) }} />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* --- EDUCATION SECTION --- */}
        {jsonData?.education && jsonData.education.length > 0 && (
          <section className="resume-section">
            <SectionHeader title="Education" />
            {jsonData.education.map((edu, index) => (
              <div className="education-item" key={index}>
                <div className="left-col">
                  <p className="date-text">{edu.graduationYear}</p>
                </div>
                <div className="right-col">
                  <h3 className="main-text">
                    {edu.degreeName}, <span className="sub-text">{edu.institutionName}</span>
                  </h3>
                  {edu.currentCGPA && (
                    <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                      CGPA/Score: {edu.currentCGPA}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* --- SKILLS SECTION --- */}
        {allSkills.length > 0 && (
          <section className="resume-section">
            <SectionHeader title="Skills" />
            <div className="skills-wrapper">
              {allSkills.map((skill, index) => (
                <span key={index} className="skill-chip">{skill}</span>
              ))}
            </div>
          </section>
        )}

        {/* --- CERTIFICATIONS SECTION --- */}
        {jsonData?.certificates && jsonData.certificates.length > 0 && (
          <section className="resume-section">
            <SectionHeader title="Certifications" />
            {jsonData.certificates.map((cert, index) => (
              <div className="experience-item" key={index} style={{ marginBottom: '0.75rem' }}>
                <div className="left-col">
                  <p className="date-text">{cert.courseDuration}</p>
                </div>
                <div className="right-col">
                  <h3 className="main-text">{cert.certificateName}</h3>
                  <p className="sub-text" style={{ fontSize: '0.8rem' }}>{cert.providerName}</p>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* --- LANGUAGES SECTION --- */}
        {languages.length > 0 && (
          <section className="resume-section">
            <SectionHeader title="Languages" />
            <div className="languages-grid">
              {languages.map((lang, index) => (
                <div key={index} style={{ fontSize: '0.875rem', color: '#374151' }}>• {lang}</div>
              ))}
            </div>
          </section>
        )}

      </div>
    </StyledWrapper>
  );
};
