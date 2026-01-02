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
padding: 25mm 20mm !important;
box-shadow: none !important;
}
}

.resume {
width: 210mm;
min-height: 297mm;
padding: 20mm;
margin: 20px auto;
background-color: white;
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
color: #333;
line-height: 1.5;
font-size: 10pt;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
box-sizing: border-box;
}
`;

const Header = styled.header`text-align: center; margin-bottom: 40px;`;

const Name = styled.h1`font-size: 32pt; font-weight: 300; text-transform: uppercase; margin: 0; letter-spacing: 6px; color: #1a1a1a;`;

const ContactInfo = styled.div`display: flex; justify-content: center; gap: 15px; font-size: 9pt; color: #666; margin-top: 10px; flex-wrap: wrap;`;

const Section = styled.section`margin-bottom: 25px;`;

const SectionHeader = styled.div`background-color: #f7f7f7; padding: 8px 15px; margin-bottom: 15px;`;

const SectionTitle = styled.h2`font-size: 12pt; font-weight: 600; text-transform: uppercase; margin: 0; letter-spacing: 2px; color: #444;`;

const Entry = styled.div`margin-bottom: 15px; padding: 0 5px;`;

const EntryRow = styled.div`display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;`;

const EntryMain = styled.div`font-size: 10.5pt; color: #222;`;

const EntryTitle = styled.span`font-weight: 500;`;

const EntrySub = styled.span`color: #666; margin-left: 4px;`;

const EntryDate = styled.span`font-size: 9.5pt; color: #888; white-space: nowrap;`;

const Description = styled.div`font-size: 9.5pt; color: #555; margin-top: 4px; text-align: justify;`;

const BulletList = styled.ul`margin: 5px 0 0 18px; padding: 0; list-style-type: disc; color: #555;`;

const BulletItem = styled.li`margin-bottom: 3px; font-size: 9.5pt;`;

const SkillsGrid = styled.div`display: flex; flex-direction: column; gap: 8px; padding: 0 5px;`;

const SkillRow = styled.div`display: flex; gap: 8px; font-size: 9.5pt;`;

const SkillLabel = styled.span`font-weight: 600; min-width: 120px; color: #333;`;

const SkillValues = styled.span`color: #555;`;

export const T30 = ({ jsonData }) => {
  const { contactInfo, Description: userDesc, workExperience, education, projects, skills, certificates } = jsonData;

  const hardSkills = skills?.hardSkills ? skills.hardSkills.split(',').filter(s => s.trim()) : [];
  const softSkills = skills?.softSkills ? skills.softSkills.split(',').filter(s => s.trim()) : [];

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        <Header>
          <Name>{contactInfo?.fullName || 'Alexander Chen'}</Name>
          <ContactInfo>
            {contactInfo?.emailAddress && <span>{contactInfo.emailAddress}</span>}
            {contactInfo?.phoneNumber && <span>• {contactInfo.phoneNumber}</span>}
            {contactInfo?.Location && <span>• {contactInfo.Location}</span>}
            {contactInfo?.portfolio && <span>• {contactInfo.portfolio.replace(/^https?:\/\//, '')}</span>}
          </ContactInfo>
        </Header>

        {userDesc?.UserDescription && (
          <Section>
            <SectionHeader>
              <SectionTitle>Summary</SectionTitle>
            </SectionHeader>
            <Description style={{ padding: '0 5px' }}>
              {userDesc.UserDescription}
            </Description>
          </Section>
        )}

        {workExperience && workExperience.length > 0 && (
          <Section>
            <SectionHeader>
              <SectionTitle>Experience</SectionTitle>
            </SectionHeader>
            {workExperience.map((job, index) => (
              <Entry key={index}>
                <EntryRow>
                  <EntryMain>
                    <EntryTitle>{job.jobTitle}</EntryTitle>
                    <EntrySub>, {job.companyName}</EntrySub>
                  </EntryMain>
                  <EntryDate>{job.WorkDuration}</EntryDate>
                </EntryRow>
                {job.keyAchievements && (
                  <BulletList>
                    {job.keyAchievements.split('\n').filter(line => line.trim()).map((bullet, i) => (
                      <BulletItem key={i}>{bullet.replace(/^[•*-]\s*/, '')}</BulletItem>
                    ))}
                  </BulletList>
                )}
              </Entry>
            ))}
          </Section>
        )}

        {education && education.length > 0 && (
          <Section>
            <SectionHeader>
              <SectionTitle>Education</SectionTitle>
            </SectionHeader>
            {education.map((edu, index) => (
              <Entry key={index}>
                <EntryRow>
                  <EntryMain>
                    <EntryTitle>{edu.degreeName}</EntryTitle>
                    <EntrySub>, {edu.institutionName}</EntrySub>
                  </EntryMain>
                  <EntryDate>{edu.graduationYear}</EntryDate>
                </EntryRow>
                {edu.currentCGPA && <Description>GPA: {edu.currentCGPA}</Description>}
              </Entry>
            ))}
          </Section>
        )}

        {projects && projects.length > 0 && (
          <Section>
            <SectionHeader>
              <SectionTitle>Projects</SectionTitle>
            </SectionHeader>
            {projects.map((proj, index) => (
              <Entry key={index}>
                <EntryRow>
                  <EntryMain>
                    <EntryTitle>{proj.projectTitle}</EntryTitle>
                    {proj.toolsTechUsed && <EntrySub>| {proj.toolsTechUsed}</EntrySub>}
                  </EntryMain>
                </EntryRow>
                <Description>{proj.projectDescription}</Description>
              </Entry>
            ))}
          </Section>
        )}

        {certificates && certificates.length > 0 && (
          <Section>
            <SectionHeader>
              <SectionTitle>Certifications</SectionTitle>
            </SectionHeader>
            {certificates.map((cert, index) => (
              <Entry key={index} style={{ marginBottom: '8px' }}>
                <EntryRow>
                  <EntryMain>
                    <EntryTitle>{cert.certificateName}</EntryTitle>
                    <EntrySub>— {cert.providerName}</EntrySub>
                  </EntryMain>
                  <EntryDate>{cert.courseDuration}</EntryDate>
                </EntryRow>
              </Entry>
            ))}
          </Section>
        )}

        {(hardSkills.length > 0 || softSkills.length > 0) && (
          <Section>
            <SectionHeader>
              <SectionTitle>Skills</SectionTitle>
            </SectionHeader>
            <SkillsGrid>
              {hardSkills.length > 0 && (
                <SkillRow>
                  <SkillLabel>Technical</SkillLabel>
                  <SkillValues>{hardSkills.join(', ')}</SkillValues>
                </SkillRow>
              )}
              {softSkills.length > 0 && (
                <SkillRow>
                  <SkillLabel>Professional</SkillLabel>
                  <SkillValues>{softSkills.join(', ')}</SkillValues>
                </SkillRow>
              )}
            </SkillsGrid>
          </Section>
        )}
      </div>
    </StyledWrapper>
  );
};

export const T30Css = `
@import url('[https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap](https://www.google.com/search?q=https://fonts.googleapis.com/css2%3Ffamily%3DInter:wght%40300%3B400%3B500%3B600%26display%3Dswap)');

.resume {
background-color: white;
box-sizing: border-box;
}

@media print {
.resume {
margin: 0;
box-shadow: none;
}
}
`;