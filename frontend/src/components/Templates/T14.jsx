import React from 'react';
import styled from "styled-components";

// --- HELPER FUNCTION ---
const parseMarkdown = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
};

// --- STYLED COMPONENTS ---
const StyledWrapper = styled.div`
  /* --- PRINT SETTINGS --- */
  @media print {
    @page {
      size: A4;
      margin: 0;
    }
    body {
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      background-color: white !important;
    }
    .resume-container {
      width: 210mm;
      min-height: 297mm;
      box-shadow: none !important;
      margin: 0 !important;
      border: none !important;
    }
  }

  /* --- WEB PREVIEW --- */
  font-family: 'Roboto', 'Segoe UI', Helvetica, sans-serif;
  background-color: #e9ecef;
  display: flex;
  justify-content: center;
  padding: 40px 0;
  color: #2d3436;

  .resume-container {
    width: 210mm;
    min-height: 297mm;
    background: white;
    box-shadow: 0 15px 35px rgba(0,0,0,0.15);
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    border-top: 8px solid #2c3e50; /* Strong Top Accent */
  }

  /* --- HEADER --- */
  .header {
    padding: 35px 40px 25px 40px;
    border-bottom: 1px solid #dfe6e9;
  }

  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .name-block {
    flex: 1;
  }

  .name {
    font-size: 34px;
    font-weight: 800;
    text-transform: uppercase;
    color: #2d3436 !important;
    margin: 0;
    letter-spacing: 1px;
    line-height: 1;
  }

  .job-title {
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    color: #0984e3 !important; /* Accent Blue */
    letter-spacing: 2px;
    margin-top: 8px;
  }

  .contact-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 15px 25px;
    font-size: 10px;
    color: #636e72 !important;
    margin-top: 10px;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .contact-item i {
    color: #0984e3 !important;
    font-size: 11px;
  }

  .contact-item a {
    color: #636e72 !important;
    text-decoration: none;
    font-weight: 500;
  }
  
  .contact-item span {
    color: #636e72 !important;
  }

  /* --- LAYOUT COLUMNS --- */
  .main-body {
    display: flex;
    flex: 1;
  }

  .col-left {
    flex: 1.8; /* 65% width */
    padding: 30px 40px;
    border-right: 1px solid #f1f2f6;
  }

  .col-right {
    flex: 1; /* 35% width */
    padding: 30px 30px;
    background-color: #fafafa !important;
  }

  /* --- SECTION STYLES --- */
  .section {
    margin-bottom: 30px;
  }

  .section-title {
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    color: #2d3436 !important;
    letter-spacing: 1.2px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
  }

  .section-title::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 14px;
    background-color: #0984e3 !important;
    margin-right: 8px;
    border-radius: 2px;
  }

  /* --- CONTENT ITEMS --- */
  .summary {
    font-size: 11px;
    line-height: 1.6;
    color: #636e72 !important;
    text-align: justify;
    margin-bottom: 25px;
  }

  .entry-item {
    margin-bottom: 20px;
  }

  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 4px;
  }

  .entry-role {
    font-size: 13px;
    font-weight: 700;
    color: #2d3436 !important;
  }

  .entry-date {
    font-size: 10px;
    font-weight: 600;
    color: #b2bec3 !important;
    white-space: nowrap;
  }

  .entry-company {
    font-size: 11px;
    font-weight: 600;
    color: #0984e3 !important;
    margin-bottom: 6px;
    font-style: italic;
  }

  .entry-desc {
    font-size: 11px;
    line-height: 1.5;
    color: #636e72 !important;
  }
  .entry-desc span {
    color: #636e72 !important;
  }
  .entry-desc strong {
    color: #2d3436 !important;
  }
  .entry-desc ul {
    margin: 0;
    padding-left: 16px;
  }
  .entry-desc li {
    margin-bottom: 4px;
    color: #636e72 !important;
  }

  /* --- PROJECTS --- */
  .project-item {
    margin-bottom: 15px;
    padding-left: 12px;
    border-left: 2px solid #dfe6e9;
  }
  
  .project-title {
    font-size: 12px;
    font-weight: 700;
    color: #2d3436 !important;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .project-link {
    font-size: 9px;
    color: #0984e3 !important;
    text-decoration: none;
    font-weight: 400;
    border: 1px solid #dfe6e9;
    padding: 1px 4px;
    border-radius: 3px;
  }

  /* --- RIGHT COLUMN ITEMS --- */
  .right-item {
    margin-bottom: 18px;
  }

  .edu-degree {
    font-size: 12px;
    font-weight: 700;
    color: #2d3436 !important;
    display: block;
  }
  .edu-school {
    font-size: 11px;
    color: #636e72 !important;
    display: block;
  }
  .edu-year {
    font-size: 10px;
    color: #b2bec3 !important;
    display: block;
    margin-top: 2px;
  }

  /* --- SKILLS PILLS --- */
  .skill-container {
    margin-bottom: 15px;
  }
  .skill-cat {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: #b2bec3 !important;
    margin-bottom: 6px;
  }
  .skill-flex {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .skill-pill {
    font-size: 10px;
    background: #fff !important;
    border: 1px solid #dfe6e9;
    color: #2d3436 !important;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: 500;
  }
  .soft-skill-pill {
    background: #dfe6e9 !important;
    border-color: #dfe6e9;
  }

  .cert-item {
    font-size: 11px;
    margin-bottom: 8px;
    color: #636e72 !important;
  }
  .cert-name {
    font-weight: 700;
    color: #2d3436 !important;
    display: block;
  }

  .lang-item {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    margin-bottom: 5px;
    border-bottom: 1px dotted #dfe6e9;
    padding-bottom: 2px;
    color: #636e72 !important;
  }
  .lang-item span {
    color: #636e72 !important;
  }
`;

export const T14 = ({ jsonData }) => {
  // Safe extraction of data
  const { contactInfo, skills, workExperience, education, Description, certificates, projects } = jsonData || {};

  const hardSkills = skills?.hardSkills ? skills.hardSkills.split(',').map(s => s.trim()).filter(s => s) : [];
  const softSkills = skills?.softSkills ? skills.softSkills.split(',').map(s => s.trim()).filter(s => s) : [];

  const languages = contactInfo?.Languages ? contactInfo.Languages.split(',').map(l => l.trim()).filter(l => l) : [];

  return (
    <StyledWrapper>
      <div className="resume-container" id="capture-content">

        {/* --- HEADER --- */}
        <div className="header">
          <div className="header-top">
            <div className="name-block">
              <h1 className="name">{contactInfo?.fullName || 'Your Name'}</h1>
              <div className="job-title">{contactInfo?.jobTitle || 'Professional Title'}</div>
            </div>
          </div>

          <div className="contact-grid">
            {contactInfo?.emailAddress && (
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <a href={`mailto:${contactInfo.emailAddress}`}>{contactInfo.emailAddress}</a>
              </div>
            )}
            {contactInfo?.phoneNumber && (
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>{contactInfo.phoneNumber}</span>
              </div>
            )}
            {contactInfo?.Location && (
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{contactInfo.Location}</span>
              </div>
            )}
            {contactInfo?.linkedin && (
              <div className="contact-item">
                <i className="fab fa-linkedin"></i>
                <a href={`https://linkedin.com/in/${contactInfo.linkedin}`} target="_blank" rel="noreferrer">
                  {contactInfo.linkedin}
                </a>
              </div>
            )}
            {contactInfo?.portfolio && (
              <div className="contact-item">
                <i className="fas fa-globe"></i>
                <a href={contactInfo.portfolio} target="_blank" rel="noreferrer">
                  Portfolio/Website
                </a>
              </div>
            )}
          </div>
        </div>

        {/* --- MAIN BODY --- */}
        <div className="main-body">

          {/* LEFT COLUMN: Narrative */}
          <div className="col-left">

            {/* SUMMARY */}
            {Description?.UserDescription && (
              <div className="summary">
                {Description.UserDescription}
              </div>
            )}

            {/* EXPERIENCE */}
            {workExperience?.length > 0 && (
              <div className="section">
                <div className="section-title">Experience</div>
                {workExperience.map((job, index) => (
                  <div key={index} className="entry-item">
                    <div className="entry-header">
                      <span className="entry-role">{job.jobTitle}</span>
                      <span className="entry-date">{job.WorkDuration}</span>
                    </div>
                    <div className="entry-company">{job.companyName}</div>
                    <div className="entry-desc">
                      <span dangerouslySetInnerHTML={{ __html: parseMarkdown(job.keyAchievements) }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PROJECTS */}
            {projects && projects.length > 0 && (
              <div className="section">
                <div className="section-title">Key Projects</div>
                {projects.map((proj, index) => (
                  <div key={index} className="project-item">
                    <div className="project-title">
                      {proj.projectTitle}
                      {(proj.Link || proj.link) && (
                        <a href={proj.Link || proj.link} target="_blank" rel="noreferrer" className="project-link">
                          View
                        </a>
                      )}
                    </div>
                    <div className="entry-desc" style={{ marginTop: '4px' }}>
                      <span dangerouslySetInnerHTML={{ __html: parseMarkdown(proj.toolsTechUsed) }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Details */}
          <div className="col-right">

            {/* EDUCATION */}
            {education?.length > 0 && (
              <div className="section">
                <div className="section-title">Education</div>
                {education.map((edu, index) => (
                  <div key={index} className="right-item">
                    <span className="edu-degree">{edu.degreeName}</span>
                    <span className="edu-school">{edu.institutionName}</span>
                    <span className="edu-year">{edu.graduationYear}</span>
                  </div>
                ))}
              </div>
            )}

            {/* SKILLS */}
            {(hardSkills.length > 0 || softSkills.length > 0) && (
              <div className="section">
                <div className="section-title">Expertise</div>

                {hardSkills.length > 0 && (
                  <div className="skill-container">
                    <div className="skill-cat">Hard Skills</div>
                    <div className="skill-flex">
                      {hardSkills.map((skill, i) => (
                        <span key={i} className="skill-pill">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}

                {softSkills.length > 0 && (
                  <div className="skill-container">
                    <div className="skill-cat">Soft Skills</div>
                    <div className="skill-flex">
                      {softSkills.map((skill, i) => (
                        <span key={i} className="skill-pill soft-skill-pill">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CERTIFICATIONS */}
            {certificates && certificates.length > 0 && (
              <div className="section">
                <div className="section-title">Certifications</div>
                {certificates.map((cert, index) => (
                  <div key={index} className="cert-item">
                    <span className="cert-name">{cert.certificateName}</span>
                    <span>{cert.providerName}</span>
                    {cert.courseDuration && <span style={{ display: 'block', fontSize: '10px', color: '#b2bec3' }}>{cert.courseDuration}</span>}
                  </div>
                ))}
              </div>
            )}

            {/* LANGUAGES */}
            {languages.length > 0 && (
              <div className="section">
                <div className="section-title">Languages</div>
                {languages.map((lang, index) => (
                  <div key={index} className="lang-item">
                    <span>{lang}</span>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

      </div>
    </StyledWrapper>
  );
};

export const T14Css = `
@media print {
  @page {
    size: A4;
    margin: 0;
  }
  body {
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    background-color: white !important;
  }
  .resume-container {
    width: 210mm !important;
    min-height: 297mm !important;
    box-shadow: none !important;
    margin: 0 !important;
    border: none !important;
    /* Ensure border renders in print */
    border-top: 8px solid #2c3e50 !important;
  }
}

body {
  font-family: 'Roboto', 'Segoe UI', Helvetica, sans-serif;
  background-color: #e9ecef;
}

.resume-container {
  width: 210mm;
  min-height: 297mm;
  background: white;
  box-shadow: 0 15px 35px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  position: relative;
  overflow: hidden;
  border-top: 8px solid #2c3e50;
}

.header {
  padding: 35px 40px 25px 40px;
  border-bottom: 1px solid #dfe6e9;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.name {
  font-size: 34px;
  font-weight: 800;
  text-transform: uppercase;
  color: #2d3436;
  margin: 0;
  letter-spacing: 1px;
  line-height: 1;
}

.job-title {
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  color: #0984e3;
  letter-spacing: 2px;
  margin-top: 8px;
}

.contact-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 15px 25px;
  font-size: 10px;
  color: #636e72;
  margin-top: 10px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.contact-item i {
  color: #0984e3;
  font-size: 11px;
}

.contact-item a {
  color: #636e72;
  text-decoration: none;
  font-weight: 500;
}

.main-body {
  display: flex;
  flex: 1;
}

.col-left {
  flex: 1.8;
  padding: 30px 40px;
  border-right: 1px solid #f1f2f6;
}

.col-right {
  flex: 1;
  padding: 30px 30px;
  background-color: #fafafa;
}

.section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  color: #2d3436;
  letter-spacing: 1.2px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.section-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 14px;
  background-color: #0984e3;
  margin-right: 8px;
  border-radius: 2px;
}

.summary {
  font-size: 11px;
  line-height: 1.6;
  color: #636e72;
  text-align: justify;
  margin-bottom: 25px;
}

.entry-item {
  margin-bottom: 20px;
}

.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}

.entry-role {
  font-size: 13px;
  font-weight: 700;
  color: #2d3436;
}

.entry-date {
  font-size: 10px;
  font-weight: 600;
  color: #b2bec3;
  white-space: nowrap;
}

.entry-company {
  font-size: 11px;
  font-weight: 600;
  color: #0984e3;
  margin-bottom: 6px;
  font-style: italic;
}

.entry-desc {
  font-size: 11px;
  line-height: 1.5;
  color: #636e72;
}

.project-item {
  margin-bottom: 15px;
  padding-left: 12px;
  border-left: 2px solid #dfe6e9;
}

.project-title {
  font-size: 12px;
  font-weight: 700;
  color: #2d3436;
  display: flex;
  align-items: center;
  gap: 6px;
}

.project-link {
  font-size: 9px;
  color: #0984e3;
  text-decoration: none;
  font-weight: 400;
  border: 1px solid #dfe6e9;
  padding: 1px 4px;
  border-radius: 3px;
}

.right-item {
  margin-bottom: 18px;
}

.edu-degree {
  font-size: 12px;
  font-weight: 700;
  color: #2d3436;
  display: block;
}
.edu-school {
  font-size: 11px;
  color: #636e72;
  display: block;
}
.edu-year {
  font-size: 10px;
  color: #b2bec3;
  display: block;
  margin-top: 2px;
}

.skill-container {
  margin-bottom: 15px;
}
.skill-cat {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: #b2bec3;
  margin-bottom: 6px;
}
.skill-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.skill-pill {
  font-size: 10px;
  background: #fff;
  border: 1px solid #dfe6e9;
  color: #2d3436;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
}
.soft-skill-pill {
  background: #dfe6e9;
  border-color: #dfe6e9;
}

.cert-item {
  font-size: 11px;
  margin-bottom: 8px;
  color: #636e72;
}
.cert-name {
  font-weight: 700;
  color: #2d3436;
  display: block;
}

.lang-item {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  margin-bottom: 5px;
  border-bottom: 1px dotted #dfe6e9;
  padding-bottom: 2px;
}
`;
