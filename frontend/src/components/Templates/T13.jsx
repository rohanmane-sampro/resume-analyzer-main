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
  font-family: 'Open Sans', 'Segoe UI', Helvetica, sans-serif;
  background-color: #f3f3f3;
  display: flex;
  justify-content: center;
  padding: 40px 0;
  color: #333;

  .resume-container {
    width: 210mm;
    min-height: 297mm;
    background: white;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }

  /* --- HEADER --- */
  .header {
    padding: 40px 40px 30px 40px;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .header-info {
    flex: 1;
    padding-right: 20px;
  }

  .name {
    font-size: 36px;
    font-weight: 300; /* Light weight for modern feel */
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 0;
    color: #222 !important;
    line-height: 1.1;
  }
  
  .name strong {
    font-weight: 700;
  }

  .job-title {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #666 !important;
    margin-top: 10px;
    font-weight: 600;
  }

  .summary {
    margin-top: 15px;
    font-size: 11px;
    line-height: 1.6;
    color: #555 !important;
    max-width: 90%;
  }

  .header-photo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    border: 3px solid #f0f0f0;
  }
  .header-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* --- CONTACT BAR --- */
  .contact-bar {
    background: #f9f9f9 !important;
    padding: 12px 40px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    font-size: 10px;
    border-bottom: 1px solid #eaeaea;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #555 !important;
  }
  .contact-item i {
    color: #333 !important;
    font-size: 11px;
  }
  .contact-item a {
    color: #555 !important;
    text-decoration: none;
    border-bottom: 1px dotted #999;
  }
  .contact-item span {
    color: #555 !important;
  }

  /* --- GRID LAYOUT --- */
  .content-grid {
    display: flex;
    flex: 1;
  }

  /* --- LEFT COLUMN (MAIN) --- */
  .col-main {
    flex: 2; /* Takes up 66% */
    padding: 30px 40px;
    border-right: 1px solid #f0f0f0;
  }

  /* --- RIGHT COLUMN (SIDE) --- */
  .col-side {
    flex: 1; /* Takes up 33% */
    padding: 30px 30px;
    background: #fff; 
  }

  /* --- TITLES --- */
  .section-title {
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: #222 !important;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }
  
  .section-title::after {
    content: '';
    flex: 1;
    height: 2px;
    background: #222;
    margin-left: 10px;
    opacity: 0.1;
  }

  /* --- EXPERIENCE & PROJECTS --- */
  .item-block {
    margin-bottom: 25px;
  }
  
  .item-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 4px;
  }
  
  .item-role {
    font-size: 14px;
    font-weight: 700;
    color: #222 !important;
  }
  
  .item-date {
    font-size: 10px;
    font-weight: 600;
    color: #888 !important;
    background: #f5f5f5 !important;
    padding: 2px 6px;
    border-radius: 2px;
  }
  
  .item-sub {
    font-size: 12px;
    font-weight: 600;
    color: #555 !important;
    margin-bottom: 8px;
    font-style: italic;
  }

  .item-desc {
    font-size: 11px;
    line-height: 1.6;
    color: #444 !important;
  }
  .item-desc span {
    color: #444 !important;
  }
  .item-desc strong {
    color: #222 !important;
  }
  .item-desc ul {
    margin: 0;
    padding-left: 15px;
  }
  .item-desc li {
    margin-bottom: 4px;
    color: #444 !important;
  }

  /* --- PROJECT LINK --- */
  .project-link {
    font-size: 10px;
    color: #0066cc !important;
    text-decoration: none;
    margin-left: 8px;
  }

  /* --- SKILLS & SIDEBAR ITEMS --- */
  .side-block {
    margin-bottom: 25px;
  }

  .skill-group {
    margin-bottom: 15px;
  }
  .skill-label {
    font-size: 10px;
    font-weight: 700;
    color: #666 !important;
    margin-bottom: 6px;
    text-transform: uppercase;
  }
  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .tag {
    font-size: 10px;
    background: #f0f0f0 !important;
    color: #333 !important;
    padding: 3px 8px;
    border-radius: 2px;
  }

  .edu-item, .cert-item {
    margin-bottom: 15px;
    border-left: 2px solid #ddd;
    padding-left: 10px;
  }
  .edu-degree {
    font-size: 11px;
    font-weight: 700;
    color: #222 !important;
    display: block;
  }
  .edu-school {
    font-size: 10px;
    color: #555 !important;
    display: block;
    margin-top: 2px;
  }
  .edu-year {
    font-size: 9px;
    color: #888 !important;
    display: block;
    margin-top: 2px;
  }

  .lang-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    font-size: 10px;
    border-bottom: 1px dotted #eee;
    padding-bottom: 2px;
    color: #555 !important;
  }
  .lang-row span {
    color: #555 !important;
  }
`;

export const T13 = ({ jsonData }) => {
  // Safe Data Extraction
  const { contactInfo, skills, workExperience, education, Description, certificates, projects } = jsonData || {};

  // Skills
  const hardSkills = skills?.hardSkills ? skills.hardSkills.split(',').map(s => s.trim()).filter(s => s) : [];
  const softSkills = skills?.softSkills ? skills.softSkills.split(',').map(s => s.trim()).filter(s => s) : [];

  // Languages
  const languages = contactInfo?.Languages ? contactInfo.Languages.split(',').map(l => l.trim()).filter(l => l) : [];

  return (
    <StyledWrapper>
      <div className="resume-container" id="capture-content">

        {/* --- HEADER --- */}
        <div className="header">
          <div className="header-info">
            <h1 className="name">
              <strong>{contactInfo?.fullName?.split(' ')[0]}</strong> {contactInfo?.fullName?.split(' ').slice(1).join(' ')}
            </h1>
            <div className="job-title">{contactInfo?.jobTitle || 'Professional Title'}</div>
            {Description?.UserDescription && (
              <div className="summary">
                {Description.UserDescription}
              </div>
            )}
          </div>
          <div className="header-photo">
            {contactInfo?.profileImage ? (
              <img src={contactInfo.profileImage} alt="Profile" />
            ) : (
              <div style={{ width: '100%', height: '100%', background: '#eee' }}></div>
            )}
          </div>
        </div>

        {/* --- CONTACT BAR --- */}
        <div className="contact-bar">
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
                LinkedIn
              </a>
            </div>
          )}
          {contactInfo?.portfolio && (
            <div className="contact-item">
              <i className="fas fa-globe"></i>
              <a href={contactInfo.portfolio} target="_blank" rel="noreferrer">
                Portfolio
              </a>
            </div>
          )}
        </div>

        {/* --- MAIN GRID --- */}
        <div className="content-grid">

          {/* LEFT COLUMN (Experience & Projects) */}
          <div className="col-main">

            {/* WORK EXPERIENCE */}
            {workExperience?.length > 0 && (
              <div className="item-block">
                <div className="section-title">Experience</div>
                {workExperience.map((job, index) => (
                  <div key={index} className="item-block">
                    <div className="item-head">
                      <span className="item-role">{job.jobTitle}</span>
                      <span className="item-date">{job.WorkDuration}</span>
                    </div>
                    <div className="item-sub">{job.companyName}</div>
                    <div className="item-desc">
                      <span dangerouslySetInnerHTML={{ __html: parseMarkdown(job.keyAchievements) }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PROJECTS */}
            {projects && projects.length > 0 && (
              <div className="item-block">
                <div className="section-title">Key Projects</div>
                {projects.map((proj, index) => (
                  <div key={index} className="item-block" style={{ marginBottom: '15px' }}>
                    <div className="item-head">
                      <span className="item-role">
                        {proj.projectTitle}
                        {(proj.Link || proj.link) && (
                          <a href={proj.Link || proj.link} target="_blank" rel="noreferrer" className="project-link">
                            <i className="fas fa-external-link-alt"></i> View
                          </a>
                        )}
                      </span>
                    </div>
                    <div className="item-desc">
                      <span dangerouslySetInnerHTML={{ __html: parseMarkdown(proj.toolsTechUsed) }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* RIGHT COLUMN (Skills, Edu, Certs) */}
          <div className="col-side">

            {/* EDUCATION */}
            {education?.length > 0 && (
              <div className="side-block">
                <div className="section-title">Education</div>
                {education.map((edu, index) => (
                  <div key={index} className="edu-item">
                    <span className="edu-degree">{edu.degreeName}</span>
                    <span className="edu-school">{edu.institutionName}</span>
                    <span className="edu-year">{edu.graduationYear}</span>
                  </div>
                ))}
              </div>
            )}

            {/* SKILLS (Hard) */}
            {hardSkills.length > 0 && (
              <div className="side-block">
                <div className="section-title">Skills</div>
                <div className="skill-group">
                  <div className="skill-label">Technical</div>
                  <div className="skill-tags">
                    {hardSkills.map((skill, i) => (
                      <span key={i} className="tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SOFT SKILLS */}
            {softSkills.length > 0 && (
              <div className="side-block">
                <div className="skill-group">
                  <div className="skill-label">Soft Skills</div>
                  <div className="skill-tags">
                    {softSkills.map((skill, i) => (
                      <span key={i} className="tag" style={{ background: '#eef2f5' }}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CERTIFICATIONS */}
            {certificates && certificates.length > 0 && (
              <div className="side-block">
                <div className="section-title">Certifications</div>
                {certificates.map((cert, index) => (
                  <div key={index} className="cert-item">
                    <span className="edu-degree">{cert.certificateName}</span>
                    <span className="edu-school">{cert.providerName}</span>
                    {cert.courseDuration && <span className="edu-year">{cert.courseDuration}</span>}
                  </div>
                ))}
              </div>
            )}

            {/* LANGUAGES */}
            {languages.length > 0 && (
              <div className="side-block">
                <div className="section-title">Languages</div>
                {languages.map((lang, index) => (
                  <div key={index} className="lang-row">
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

export const T13Css = `
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
    border: none !important;
    margin: 0 !important;
    display: flex;
    flex-direction: column;
  }
}

body {
  font-family: 'Open Sans', 'Segoe UI', Helvetica, sans-serif;
  background-color: #f3f3f3;
}

.resume-container {
  width: 210mm;
  min-height: 297mm;
  background: white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  position: relative;
  overflow: hidden;
}

.header {
  padding: 40px 40px 30px 40px;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header-info {
  flex: 1;
  padding-right: 20px;
}

.name {
  font-size: 36px;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  color: #222;
  line-height: 1.1;
}

.name strong {
  font-weight: 700;
}

.job-title {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #666;
  margin-top: 10px;
  font-weight: 600;
}

.summary {
  margin-top: 15px;
  font-size: 11px;
  line-height: 1.6;
  color: #555;
  max-width: 90%;
}

.header-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 3px solid #f0f0f0;
}
.header-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.contact-bar {
  background: #f9f9f9;
  padding: 12px 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 10px;
  border-bottom: 1px solid #eaeaea;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #555;
}
.contact-item i {
  color: #333;
  font-size: 11px;
}
.contact-item a {
  color: #555;
  text-decoration: none;
  border-bottom: 1px dotted #999;
}

.content-grid {
  display: flex;
  flex: 1;
}

.col-main {
  flex: 2;
  padding: 30px 40px;
  border-right: 1px solid #f0f0f0;
}

.col-side {
  flex: 1;
  padding: 30px 30px;
  background: #fff; 
}

.section-title {
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: #222;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.section-title::after {
  content: '';
  flex: 1;
  height: 2px;
  background: #222;
  margin-left: 10px;
  opacity: 0.1;
}

.item-block {
  margin-bottom: 25px;
}

.item-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}

.item-role {
  font-size: 14px;
  font-weight: 700;
  color: #222;
}

.item-date {
  font-size: 10px;
  font-weight: 600;
  color: #888;
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 2px;
}

.item-sub {
  font-size: 12px;
  font-weight: 600;
  color: #555;
  margin-bottom: 8px;
  font-style: italic;
}

.item-desc {
  font-size: 11px;
  line-height: 1.6;
  color: #444;
}

.project-link {
  font-size: 10px;
  color: #0066cc;
  text-decoration: none;
  margin-left: 8px;
}

.side-block {
  margin-bottom: 25px;
}

.skill-group {
  margin-bottom: 15px;
}
.skill-label {
  font-size: 10px;
  font-weight: 700;
  color: #666;
  margin-bottom: 6px;
  text-transform: uppercase;
}
.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tag {
  font-size: 10px;
  background: #f0f0f0;
  color: #333;
  padding: 3px 8px;
  border-radius: 2px;
}

.edu-item, .cert-item {
  margin-bottom: 15px;
  border-left: 2px solid #ddd;
  padding-left: 10px;
}
.edu-degree {
  font-size: 11px;
  font-weight: 700;
  color: #222;
  display: block;
}
.edu-school {
  font-size: 10px;
  color: #555;
  display: block;
  margin-top: 2px;
}
.edu-year {
  font-size: 9px;
  color: #888;
  display: block;
  margin-top: 2px;
}

.lang-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: 10px;
  border-bottom: 1px dotted #eee;
  padding-bottom: 2px;
}
`;
