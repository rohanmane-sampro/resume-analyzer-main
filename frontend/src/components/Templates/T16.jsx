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
font-family: 'Times New Roman', Times, serif;
color: #000;
line-height: 1.2;
font-size: 10pt;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
box-sizing: border-box;
}
`;

const Header = styled.header`text-align: center; margin-bottom: 15px;`;

const Name = styled.h1`font-size: 18pt; font-weight: bold; text-transform: uppercase; margin: 0 0 5px 0; letter-spacing: 1px;`;

const ContactLine = styled.div`font-size: 9pt; margin-bottom: 3px; display: flex; justify-content: center; gap: 8px; font-family: Arial, sans-serif;`;

const LinkLine = styled.div`
font-size: 9pt;
color: #00a0dc;
display: flex;
justify-content: center;
gap: 10px;
font-family: Arial, sans-serif;

a {
color: #00a0dc;
text-decoration: none;
}
`;

const Section = styled.section`margin-top: 12px;`;

const SectionTitle = styled.h2`font-size: 11pt; font-weight: bold; text-transform: uppercase; margin: 0 0 2px 0; border-bottom: 1px solid #000; padding-bottom: 1px;`;

const ProjectHeader = styled.div`display: flex; gap: 5px; margin-top: 8px; font-weight: bold;`;

const TechStack = styled.span`font-weight: normal; font-size: 9.5pt;`;

const List = styled.ul`margin: 3px 0 8px 18px; padding: 0; list-style-type: disc;`;

const ListItem = styled.li`margin-bottom: 2px; font-size: 9.5pt;`;

const SkillRow = styled.div`display: flex; margin-top: 6px; font-size: 9.5pt;`;

const SkillLabel = styled.div`width: 120px; font-weight: bold;`;

const SkillContent = styled.div`flex: 1;`;

const EntryRow = styled.div`display: flex; justify-content: space-between; margin-top: 8px; font-size: 10pt;`;

const EntryLeft = styled.div`font-weight: bold;`;

const EntryRight = styled.div`text-align: right;`;

const SubText = styled.div`font-size: 9.5pt; margin-bottom: 2px;`;

export const T16 = ({ jsonData }) => {
  const { contactInfo, Description, workExperience, education, projects, skills, certificates } = jsonData;

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        <Header>
          <Name>{contactInfo?.fullName}</Name>
          <ContactLine>
            <span>{contactInfo?.phoneNumber}</span>
            <span>•</span>
            <span>{contactInfo?.Location}</span>
          </ContactLine>
          <LinkLine>
            <a href={`mailto:${contactInfo?.emailAddress}`}>{contactInfo?.emailAddress}</a>
            <span>•</span>
            <a href={contactInfo?.portfolio}>{contactInfo?.portfolio?.replace(/^https?:\/\//, '')}</a>
          </LinkLine>
        </Header>

        {projects && projects.length > 0 && (
          <Section>
            <SectionTitle>Projects</SectionTitle>
            {projects.map((proj, index) => (
              <div key={index}>
                <ProjectHeader>
                  <span>{proj.projectTitle}</span>
                  <TechStack>{proj.toolsTechUsed}</TechStack>
                </ProjectHeader>
                <List>
                  {proj.projectDescription?.split('\n').filter(line => line.trim()).map((line, i) => (
                    <ListItem key={i}>{line.replace(/^[•*-]\s*/, '')}</ListItem>
                  ))}
                </List>
              </div>
            ))}
          </Section>
        )}

        <Section>
          <SectionTitle>Skills</SectionTitle>
          {skills?.hardSkills && (
            <SkillRow>
              <SkillLabel>Technical Skills</SkillLabel>
              <SkillContent>{skills.hardSkills}</SkillContent>
            </SkillRow>
          )}
          {skills?.softSkills && (
            <SkillRow>
              <SkillLabel>Soft Skills</SkillLabel>
              <SkillContent>{skills.softSkills}</SkillContent>
            </SkillRow>
          )}
        </Section>

        {education && education.length > 0 && (
          <Section>
            <SectionTitle>Education</SectionTitle>
            {education.map((edu, index) => (
              <div key={index}>
                <EntryRow>
                  <EntryLeft>{edu.degreeName}</EntryLeft>
                  <EntryRight>{edu.graduationYear}</EntryRight>
                </EntryRow>
                <SubText>{edu.institutionName}{edu.currentCGPA ? `, CGPA: ${edu.currentCGPA}` : ''}</SubText>
              </div>
            ))}
          </Section>
        )}

        {workExperience && workExperience.length > 0 && (
          <Section>
            <SectionTitle>Work Experience</SectionTitle>
            {workExperience.map((work, index) => (
              <div key={index}>
                <EntryRow>
                  <EntryLeft>{work.jobTitle} {work.companyName ? `, ${work.companyName}` : ''}</EntryLeft>
                  <EntryRight>{work.WorkDuration}</EntryRight>
                </EntryRow>
                {work.keyAchievements && (
                  <List>
                    {work.keyAchievements.split('\n').filter(line => line.trim()).map((line, i) => (
                      <ListItem key={i}>{line.replace(/^[•*-]\s*/, '')}</ListItem>
                    ))}
                  </List>
                )}
              </div>
            ))}
          </Section>
        )}

        {certificates && certificates.length > 0 && (
          <Section>
            <SectionTitle>Certifications</SectionTitle>
            {certificates.map((cert, index) => (
              <EntryRow key={index} style={{ marginTop: '4px' }}>
                <EntryLeft>{cert.certificateName} - {cert.providerName}</EntryLeft>
                <EntryRight>{cert.courseDuration}</EntryRight>
              </EntryRow>
            ))}
          </Section>
        )}
      </div>
    </StyledWrapper>

  );
};

export const T16Css = `.resume { background-color: white; color: #000; } @media print { .resume { box-shadow: none; } }`;