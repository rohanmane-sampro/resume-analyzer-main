import React from 'react';
import styled from 'styled-components';

const PRIMARY_COLOR = '#7030A0';
const TEXT_COLOR = '#333333';
const LIGHT_TEXT = '#666666';
const LINK_COLOR = '#0056b3';

const StyledWrapper = styled.div`
  @media print {
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      margin: 0;
      padding: 0;
      background-color: white !important;
    }
    @page {
      size: A4 portrait;
      margin: 0;
    }
    .resume {
      width: 210mm !important;
      max-width: 210mm !important;
      min-height: 297mm !important;
      margin: 0 !important;
      padding: 20px !important;
      box-shadow: none !important;
    }
  }

  .resume {
    width: 210mm;
    min-height: 297mm;
    padding: 20px;
    margin: 20px auto;
    background-color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: ${TEXT_COLOR};
    line-height: 1.4;
    font-size: 11pt;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;
`;

const Name = styled.h1`
  color: ${PRIMARY_COLOR};
  font-size: 24pt;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0 0 10px 0;
  letter-spacing: 1px;
`;

const ContactInfo = styled.div`
  font-size: 9.5pt;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  gap: 10px;
  color: ${LINK_COLOR};

  span {
    color: ${TEXT_COLOR};
  }
`;

const Location = styled.div`
  font-size: 9.5pt;
  margin-bottom: 10px;
`;

const Section = styled.section`
  margin-bottom: 18px;
`;

const SectionTitle = styled.h2`
  color: ${PRIMARY_COLOR};
  font-size: 13pt;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0 0 4px 0;
  display: block;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1.5px solid #000;
  margin-bottom: 10px;
`;

const SummaryText = styled.p`
  font-size: 10pt;
  text-align: justify;
  margin: 0;
`;

const EntryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 2px;
`;

const EntryTitle = styled.span`
  font-weight: bold;
  font-size: 10.5pt;
`;

const EntryDate = styled.span`
  font-size: 9.5pt;
  font-weight: normal;
`;

const EntrySubTitle = styled.div`
  font-size: 10pt;
  margin-bottom: 4px;
`;

const List = styled.ul`
  margin: 4px 0 10px 0;
  padding-left: 18px;
  list-style-type: disc;
`;

const ListItem = styled.li`
  font-size: 10pt;
  margin-bottom: 3px;
`;

const ProjectEntry = styled.div`
  margin-bottom: 10px;
`;

const ProjectTitle = styled.div`
  font-weight: bold;
  font-size: 10.5pt;
`;

const ProjectDetails = styled.div`
  font-size: 10pt;
  span {
    font-weight: normal;
  }
`;

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4px;
`;

const CertItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10pt;

  .left {
    display: flex;
    gap: 15px;
    width: 70%;
  }
  .cert-name {
    font-weight: bold;
    min-width: 180px;
  }
  .cert-issuer {
    color: ${TEXT_COLOR};
  }
  .cert-date {
    font-weight: normal;
    text-align: right;
  }
`;

const SkillsSection = styled.div`
  font-size: 10pt;
  margin-top: 5px;
  line-height: 1.6;
`;

const SkillGroup = styled.div`
  margin-bottom: 4px;
`;

const SkillLabel = styled.span`
  font-weight: bold;
`;

export const T12 = ({ jsonData }) => {
  // Map existing jsonData structure to expected format
  const name = jsonData.contactInfo?.fullName || 'Your Name';
  const email = jsonData.contactInfo?.emailAddress || 'email@example.com';
  const phone = jsonData.contactInfo?.phoneNumber || '+123456789';
  const portfolio = jsonData.contactInfo?.portfolio || '';
  const location = jsonData.contactInfo?.Location || 'City, Country';
  const summary = jsonData.Description?.UserDescription || '';

  const workExperience = jsonData.workExperience || [];
  const education = jsonData.education || [];
  const projects = jsonData.projects || [];
  const certificates = jsonData.certificates || [];

  const hardSkills = jsonData.skills?.hardSkills
    ? jsonData.skills.hardSkills.split(',').map(s => s.trim()).filter(s => s !== '')
    : [];
  const softSkills = jsonData.skills?.softSkills
    ? jsonData.skills.softSkills.split(',').map(s => s.trim()).filter(s => s !== '')
    : [];

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        <Header>
          <Name>{name}</Name>
          <ContactInfo>
            <a href={`mailto:${email}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {email}
            </a>
            <span>|</span>
            <span>{phone}</span>
            <span>|</span>
            <a href={portfolio} style={{ textDecoration: 'none', color: 'inherit' }}>
              {portfolio.replace(/^https?:\/\//, '')}
            </a>
          </ContactInfo>
          <Location>{location}</Location>
        </Header>

        {summary && (
          <Section>
            <SectionTitle>Summary</SectionTitle>
            <Divider />
            <SummaryText>{summary}</SummaryText>
          </Section>
        )}

        {workExperience.length > 0 && (
          <Section>
            <SectionTitle>Work Experience</SectionTitle>
            <Divider />
            {workExperience.map((job, index) => (
              <div key={index} style={{ marginBottom: '12px' }}>
                <EntryHeader>
                  <EntryTitle>
                    {job.companyName || 'Company'} | {job.jobTitle || 'Position'}
                  </EntryTitle>
                  <EntryDate>{job.WorkDuration || 'Duration'}</EntryDate>
                </EntryHeader>
                <SummaryText>{job.keyAchievements || 'Responsibilities and achievements'}</SummaryText>
              </div>
            ))}
          </Section>
        )}

        {education.length > 0 && (
          <Section>
            <SectionTitle>Education</SectionTitle>
            <Divider />
            {education.map((edu, index) => (
              <div key={index} style={{ marginBottom: '8px' }}>
                <EntryHeader>
                  <EntryTitle>{edu.degreeName || 'Degree'}</EntryTitle>
                  <EntryDate>{edu.graduationYear || 'Year'}</EntryDate>
                </EntryHeader>
                <EntrySubTitle>
                  {edu.institutionName || 'University'} | {edu.currentCGPA ? `CGPA: ${edu.currentCGPA}` : ''}
                </EntrySubTitle>
              </div>
            ))}
          </Section>
        )}

        {projects.length > 0 && (
          <Section>
            <SectionTitle>Projects</SectionTitle>
            <Divider />
            {projects.map((project, index) => (
              <ProjectEntry key={index}>
                <ProjectTitle>• {project.projectTitle || 'Project Name'}</ProjectTitle>
                <ProjectDetails>
                  {project.toolsTechUsed || ''} – {project.projectDescription || ''}
                </ProjectDetails>
              </ProjectEntry>
            ))}
          </Section>
        )}

        {certificates.length > 0 && (
          <Section>
            <SectionTitle>Certifications</SectionTitle>
            <Divider />
            <CertGrid>
              {certificates.map((cert, index) => (
                <CertItem key={index}>
                  <div className="left">
                    <span className="cert-name">{cert.certificateName || 'Certificate'}</span>
                    <span>—</span>
                    <span className="cert-issuer">{cert.providerName || 'Provider'}</span>
                  </div>
                  <span className="cert-date">({cert.courseDuration || 'Date'})</span>
                </CertItem>
              ))}
            </CertGrid>
          </Section>
        )}

        {(hardSkills.length > 0 || softSkills.length > 0) && (
          <Section>
            <SectionTitle>Skills</SectionTitle>
            <Divider />
            <SkillsSection>
              {hardSkills.length > 0 && (
                <SkillGroup>
                  <SkillLabel>Technical Skills: </SkillLabel>
                  <span>{hardSkills.join(', ')}</span>
                </SkillGroup>
              )}
              {softSkills.length > 0 && (
                <SkillGroup>
                  <SkillLabel>Soft Skills: </SkillLabel>
                  <span>{softSkills.join(', ')}</span>
                </SkillGroup>
              )}
            </SkillsSection>
          </Section>
        )}
      </div>
    </StyledWrapper>
  );
};

export const T12Css = `
@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  body {
    margin: 0;
    padding: 0;
    background-color: white !important;
  }
  @page {
    size: A4 portrait;
    margin: 0;
  }
  .resume {
    width: 210mm !important;
    max-width: 210mm !important;
    min-height: 297mm !important;
    margin: 0 !important;
    padding: 20px !important;
    box-shadow: none !important;
  }
}

.resume {
  width: 210mm;
  min-height: 297mm;
  padding: 20px;
  margin: 20px auto;
  background-color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333333;
  line-height: 1.4;
  font-size: 11pt;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333333;
  background: white;
}

h1, h2, h3 {
  margin: 0;
}

ul {
  padding-left: 20px;
  margin: 5px 0;
}

li {
  margin-bottom: 2px;
}

a {
  color: inherit;
  text-decoration: none;
}
`;