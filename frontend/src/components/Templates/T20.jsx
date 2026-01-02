import React from 'react';
import styled from 'styled-components';

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
padding: 15mm !important;
box-shadow: none !important;
}
}

.resume {
width: 210mm;
min-height: 297mm;
padding: 15mm;
margin: 20px auto;
background-color: white;
font-family: 'Helvetica', 'Arial', sans-serif;
color: #000;
line-height: 1.3;
font-size: 9.5pt;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
box-sizing: border-box;
}
`;

const Header = styled.header`margin-bottom: 12px;`;

const NameRow = styled.div`display: flex; align-items: baseline; gap: 10px; margin-bottom: 5px;`;

const FullName = styled.h1`font-size: 24pt; font-weight: bold; margin: 0;`;

const JobTitleLabel = styled.span`font-size: 16pt; font-style: italic; font-weight: normal; color: #333;`;

const ContactInfoRow = styled.div`display: flex; gap: 15px; font-size: 9pt; margin-bottom: 15px; align-items: center;`;

const ContactItem = styled.div`display: flex; align-items: center; gap: 5px;`;

const Summary = styled.div`margin-bottom: 20px; text-align: justify; font-size: 9.5pt;`;

const Section = styled.section`margin-bottom: 15px;`;

const SectionTitle = styled.h2`font-size: 11pt; font-weight: bold; text-transform: uppercase; margin: 0 0 3px 0; border-bottom: 1px solid #000; padding-bottom: 2px;`;

const EntryContainer = styled.div`display: flex; margin-top: 10px; margin-bottom: 12px;`;

const LeftCol = styled.div`width: 120px; flex-shrink: 0; font-size: 9pt; font-weight: 500;`;

const RightCol = styled.div`flex-grow: 1;`;

const CompanyName = styled.div`font-weight: bold; font-size: 10pt;`;

const RoleName = styled.div`font-style: italic; font-size: 9pt; margin-bottom: 4px;`;

const BulletList = styled.ul`margin: 0; padding-left: 18px; list-style-type: disc;`;

const BulletItem = styled.li`margin-bottom: 2px; font-size: 9.2pt;`;

const SkillRow = styled.div`margin-top: 5px; display: flex; gap: 5px; font-size: 9.5pt;`;

const SkillType = styled.span`font-weight: bold;`;

export const T20 = ({ jsonData }) => {
  const contact = jsonData?.contactInfo || {};
  const description = jsonData?.Description?.UserDescription || '';
  const work = jsonData?.workExperience || [];
  const education = jsonData?.education || [];
  const projects = jsonData?.projects || [];
  const certificates = jsonData?.certificates || [];
  const hardSkills = jsonData?.skills?.hardSkills || '';
  const softSkills = jsonData?.skills?.softSkills || '';

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        <Header>
          <NameRow>
            <FullName>{contact.fullName}</FullName>
            <JobTitleLabel>{work[0]?.jobTitle}</JobTitleLabel>
          </NameRow>

          <ContactInfoRow>
            <ContactItem>
              <span>✉</span> {contact.emailAddress}
            </ContactItem>
            <ContactItem>
              <span>📞</span> {contact.phoneNumber}
            </ContactItem>
            <ContactItem>
              <span>📍</span> {contact.Location}
            </ContactItem>
            {contact.portfolio && (
              <ContactItem>
                <span>🔗</span> {contact.portfolio.replace(/^https?:\/\//, '')}
              </ContactItem>
            )}
          </ContactInfoRow>
        </Header>

        {description && <Summary>{description}</Summary>}

        {work.length > 0 && (
          <Section>
            <SectionTitle>Professional Experience</SectionTitle>
            {work.map((item, index) => (
              <EntryContainer key={index}>
                <LeftCol>
                  <div>{item.WorkDuration}</div>
                  <div style={{ color: '#666' }}>{contact.Location}</div>
                </LeftCol>
                <RightCol>
                  <CompanyName>{item.companyName}</CompanyName>
                  <RoleName>{item.jobTitle}</RoleName>
                  {item.keyAchievements && (
                    <BulletList>
                      {item.keyAchievements.split('\n').filter(line => line.trim()).map((bullet, i) => (
                        <BulletItem key={i}>{bullet.replace(/^[•*-]\s*/, '')}</BulletItem>
                      ))}
                    </BulletList>
                  )}
                </RightCol>
              </EntryContainer>
            ))}
          </Section>
        )}

        {education.length > 0 && (
          <Section>
            <SectionTitle>Education</SectionTitle>
            {education.map((item, index) => (
              <EntryContainer key={index}>
                <LeftCol>
                  {item.graduationYear}
                </LeftCol>
                <RightCol>
                  <CompanyName>{item.institutionName}</CompanyName>
                  <RoleName>{item.degreeName} {item.currentCGPA ? `| CGPA: ${item.currentCGPA}` : ''}</RoleName>
                </RightCol>
              </EntryContainer>
            ))}
          </Section>
        )}

        {(hardSkills || softSkills) && (
          <Section>
            <SectionTitle>Skills</SectionTitle>
            {hardSkills && (
              <SkillRow>
                <SkillType>Technical Skills:</SkillType>
                <span>{hardSkills}</span>
              </SkillRow>
            )}
            {softSkills && (
              <SkillRow>
                <SkillType>Soft Skills:</SkillType>
                <span>{softSkills}</span>
              </SkillRow>
            )}
          </Section>
        )}

        {projects.length > 0 && (
          <Section>
            <SectionTitle>Projects</SectionTitle>
            {projects.map((item, index) => (
              <EntryContainer key={index}>
                <LeftCol>
                  {item.toolsTechUsed}
                </LeftCol>
                <RightCol>
                  <CompanyName>{item.projectTitle}</CompanyName>
                  <div style={{ fontSize: '9.2pt', marginTop: '2px' }}>{item.projectDescription}</div>
                </RightCol>
              </EntryContainer>
            ))}
          </Section>
        )}

        {certificates.length > 0 && (
          <Section>
            <SectionTitle>Certifications & Activities</SectionTitle>
            {certificates.map((item, index) => (
              <EntryContainer key={index} style={{ marginTop: '5px', marginBottom: '5px' }}>
                <LeftCol>{item.courseDuration}</LeftCol>
                <RightCol>
                  <CompanyName>{item.certificateName}</CompanyName>
                  <RoleName>{item.providerName}</RoleName>
                </RightCol>
              </EntryContainer>
            ))}
          </Section>
        )}
      </div>
    </StyledWrapper>
  );
};

export const T20Css = `@media print { .resume { width: 210mm !important; max-width: 210mm !important; min-height: 297mm !important; margin: 0 !important; padding: 15mm !important; } }`;