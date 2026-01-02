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
font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
color: #000;
line-height: 1.3;
font-size: 9.5pt;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
box-sizing: border-box;
}
`;

const HeaderContainer = styled.div`display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;`;

const ContactSide = styled.div`width: 30%; font-size: 8.5pt; line-height: 1.4; color: #333;`;

const LeftContact = styled(ContactSide)`text-align: left;`;

const RightContact = styled(ContactSide)`text-align: right; color: #0056b3;`;

const CenterHeader = styled.div`width: 40%; text-align: center;`;

const Name = styled.h1`font-size: 24pt; font-weight: 500; margin: 0; color: #000;`;

const Subtitle = styled.div`font-size: 11pt; color: #4a76a8; font-weight: 500; margin-top: 2px;`;

const SectionHeader = styled.div`border-bottom: 2px solid #4a76a8; margin-top: 15px; margin-bottom: 8px; padding-bottom: 2px;`;

const SectionTitle = styled.h2`font-size: 10pt; font-weight: bold; text-transform: uppercase; color: #4a76a8; margin: 0;`;

const Summary = styled.p`margin: 5px 0; text-align: justify; font-size: 9pt;`;

const ExperienceItem = styled.div`margin-bottom: 12px;`;

const FlexRow = styled.div`display: flex; justify-content: space-between; align-items: baseline;`;

const BoldText = styled.span`font-weight: bold; text-transform: uppercase;`;

const ItalicText = styled.div`font-style: italic; font-size: 9pt; margin-bottom: 4px;`;

const List = styled.ul`margin: 0; padding-left: 18px; list-style-type: disc;`;

const ListItem = styled.li`margin-bottom: 2px; font-size: 9pt;`;

const SkillRow = styled.div`display: grid; grid-template-columns: 180px 1fr; margin-bottom: 4px; font-size: 9pt;`;

const SkillLabel = styled.span`font-weight: bold;`;

export const T15 = ({ jsonData }) => {
  const contact = jsonData.contactInfo || {};
  const description = jsonData.Description?.UserDescription || '';
  const work = jsonData.workExperience || [];
  const education = jsonData.education || [];
  const projects = jsonData.projects || [];
  const certificates = jsonData.certificates || [];
  const skills = jsonData.skills || {};

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        <HeaderContainer>
          <LeftContact>
            <div>{contact.phoneNumber}</div>
            <div>{contact.Location}</div>
            <div>{contact.emailAddress}</div>
          </LeftContact>

          <CenterHeader>
            <Name>{contact.fullName}</Name>
            <Subtitle>{work[0]?.jobTitle || 'Professional'}</Subtitle>
          </CenterHeader>

          <RightContact>
            <div>{contact.portfolio?.replace(/^https?:\/\//, '')}</div>
          </RightContact>
        </HeaderContainer>

        {description && (
          <Summary>{description}</Summary>
        )}

        <SectionHeader>
          <SectionTitle>Skills</SectionTitle>
        </SectionHeader>
        {skills.hardSkills && (
          <SkillRow>
            <SkillLabel>Technical Skills</SkillLabel>
            <span>{skills.hardSkills}</span>
          </SkillRow>
        )}
        {skills.softSkills && (
          <SkillRow>
            <SkillLabel>Professional Skills</SkillLabel>
            <span>{skills.softSkills}</span>
          </SkillRow>
        )}

        {work.length > 0 && (
          <>
            <SectionHeader>
              <SectionTitle>Technical Experience</SectionTitle>
            </SectionHeader>
            {work.map((item, index) => (
              <ExperienceItem key={index}>
                <FlexRow>
                  <BoldText>{item.jobTitle}</BoldText>
                  <BoldText>{item.WorkDuration}</BoldText>
                </FlexRow>
                <FlexRow>
                  <ItalicText>{item.companyName}</ItalicText>
                </FlexRow>
                {item.keyAchievements && (
                  <List>
                    {item.keyAchievements.split('\n').filter(a => a.trim()).map((achievement, i) => (
                      <ListItem key={i}>{achievement.replace(/^[•*-]\s*/, '')}</ListItem>
                    ))}
                  </List>
                )}
              </ExperienceItem>
            ))}
          </>
        )}

        {projects.length > 0 && (
          <>
            <SectionHeader>
              <SectionTitle>Projects</SectionTitle>
            </SectionHeader>
            {projects.map((item, index) => (
              <ExperienceItem key={index}>
                <FlexRow>
                  <BoldText>{item.projectTitle}</BoldText>
                </FlexRow>
                <ItalicText>{item.toolsTechUsed}</ItalicText>
                <Summary style={{ fontSize: '9pt', marginTop: '2px' }}>{item.projectDescription}</Summary>
              </ExperienceItem>
            ))}
          </>
        )}

        {education.length > 0 && (
          <>
            <SectionHeader>
              <SectionTitle>Education</SectionTitle>
            </SectionHeader>
            {education.map((item, index) => (
              <ExperienceItem key={index}>
                <FlexRow>
                  <BoldText>{item.degreeName}</BoldText>
                  <BoldText>{item.graduationYear}</BoldText>
                </FlexRow>
                <ItalicText>{item.institutionName} {item.currentCGPA ? `| CGPA: ${item.currentCGPA}` : ''}</ItalicText>
              </ExperienceItem>
            ))}
          </>
        )}

        {certificates.length > 0 && (
          <>
            <SectionHeader>
              <SectionTitle>Activities & Certifications</SectionTitle>
            </SectionHeader>
            {certificates.map((item, index) => (
              <FlexRow key={index} style={{ marginBottom: '4px' }}>
                <span style={{ fontSize: '9pt' }}><span style={{ fontWeight: 'bold' }}>{item.certificateName}</span>, {item.providerName}</span>
                <span style={{ fontSize: '9pt' }}>{item.courseDuration}</span>
              </FlexRow>
            ))}
          </>
        )}
      </div>
    </StyledWrapper>

  );
};

export const T15Css = `@media print { * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } body { margin: 0; padding: 0; } @page { size: A4 portrait; margin: 0; } }`;