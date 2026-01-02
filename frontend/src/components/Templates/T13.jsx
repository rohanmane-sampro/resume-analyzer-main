import React from 'react';
import styled from 'styled-components';

const PRIMARY_DARK = '#2d3e50';
const TEXT_COLOR = '#000000';
const SECONDARY_TEXT = '#333333';
const HEADER_TEXT = '#ffffff';

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
padding: 0 !important;
box-shadow: none !important;
}
}

.resume {
width: 210mm;
min-height: 297mm;
margin: 20px auto;
background-color: white;
font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
color: ${TEXT_COLOR};
line-height: 1.5;
font-size: 10pt;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
position: relative;
display: flex;
flex-direction: column;
}
`;

const Header = styled.header`background-color: ${PRIMARY_DARK}; color: ${HEADER_TEXT}; padding: 40px 50px; display: flex; justify-content: space-between; align-items: flex-start;`;

const HeaderLeft = styled.div`flex: 1;`;

const ResumeLabel = styled.div`text-transform: uppercase; letter-spacing: 5px; font-size: 10pt; margin-bottom: 5px; opacity: 0.9;`;

const FullName = styled.h1`font-size: 32pt; font-weight: 800; text-transform: uppercase; margin: 0; line-height: 1;`;

const JobTitle = styled.div`font-size: 14pt; margin-top: 8px; margin-bottom: 25px; opacity: 0.8; font-weight: 300;`;

const ContactGrid = styled.div`display: grid; grid-template-columns: auto auto; gap: 10px 30px; font-size: 9pt;`;

const ContactItem = styled.div`
display: flex;
align-items: center;
gap: 8px;

svg {
width: 14px;
height: 14px;
fill: currentColor;
}
`;

const ProfileFrame = styled.div`
width: 100px;
height: 100px;
border: 2px solid white;
display: flex;
align-items: center;
justify-content: center;
overflow: hidden;
background: rgba(255, 255, 255, 0.1);

svg {
width: 80%;
height: 80%;
fill: white;
}
`;

const ContentBody = styled.div`padding: 30px 50px; display: flex; flex-direction: column; gap: 25px;`;

const Section = styled.section`display: flex; flex-direction: column;`;

const SectionTitle = styled.h2`font-size: 12pt; font-weight: 800; text-transform: uppercase; margin: 0 0 10px 0; color: #000;`;

const BodyText = styled.div`font-size: 9.5pt; color: ${SECONDARY_TEXT}; text-align: justify;`;

const List = styled.ul`margin: 5px 0 0 0; padding-left: 18px; list-style-type: disc;`;

const ListItem = styled.li`margin-bottom: 3px; font-size: 9.5pt; color: ${SECONDARY_TEXT};`;

const EntryHeader = styled.div`display: flex; justify-content: space-between; align-items: baseline; margin-top: 10px;`;

const EntryMain = styled.div`font-weight: 700; font-size: 10.5pt;`;

const EntrySub = styled.div`font-size: 10pt; font-weight: 500; margin-bottom: 5px;`;

const RightInfo = styled.div`font-weight: 500; font-size: 9.5pt;`;

const ProjectEntry = styled.div`margin-top: 10px;`;

export const T13 = ({ jsonData }) => {
  const { contactInfo, Description, workExperience, education, projects, certificates, skills } = jsonData;

  const hSkills = skills?.hardSkills ? skills.hardSkills.split(',').map(s => s.trim()).filter(s => s) : [];
  const sSkills = skills?.softSkills ? skills.softSkills.split(',').map(s => s.trim()).filter(s => s) : [];

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        <Header>
          <HeaderLeft>
            <ResumeLabel>Resume</ResumeLabel>
            <FullName>{contactInfo?.fullName || 'John Doe'}</FullName>
            <JobTitle>{workExperience?.[0]?.jobTitle || 'Software Developer'}</JobTitle>

            <ContactGrid>
              <ContactItem>
                <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
                {contactInfo?.phoneNumber}
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                {contactInfo?.portfolio?.replace(/^https?:\/\//, '')}
              </ContactItem>
              <ContactItem>
                <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                {contactInfo?.emailAddress}
              </ContactItem>
              <ContactItem>
                <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                {contactInfo?.Location}
              </ContactItem>
            </ContactGrid>
          </HeaderLeft>

          <ProfileFrame>
            <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
          </ProfileFrame>
        </Header>

        <ContentBody>
          {Description?.UserDescription && (
            <Section>
              <SectionTitle>Status</SectionTitle>
              <BodyText>{Description.UserDescription}</BodyText>
            </Section>
          )}

          {(hSkills.length > 0 || sSkills.length > 0) && (
            <Section>
              <SectionTitle>Skills</SectionTitle>
              <List>
                {hSkills.map((skill, i) => <ListItem key={i}>{skill}</ListItem>)}
                {sSkills.map((skill, i) => <ListItem key={i}>{skill}</ListItem>)}
              </List>
            </Section>
          )}

          {workExperience?.length > 0 && (
            <Section>
              <SectionTitle>Experience</SectionTitle>
              {workExperience.map((work, i) => (
                <div key={i} style={{ marginBottom: '15px' }}>
                  <EntryHeader>
                    <EntryMain>{work.companyName}</EntryMain>
                    <RightInfo>{work.WorkDuration}</RightInfo>
                  </EntryHeader>
                  <EntrySub>{work.jobTitle}</EntrySub>
                  {work.keyAchievements && (
                    <List>
                      {work.keyAchievements.split('\n').filter(a => a.trim()).map((achievement, j) => (
                        <ListItem key={j}>{achievement.replace(/^[•*-]\s*/, '')}</ListItem>
                      ))}
                    </List>
                  )}
                </div>
              ))}
            </Section>
          )}

          {education?.length > 0 && (
            <Section>
              <SectionTitle>Education</SectionTitle>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <EntryHeader>
                    <EntryMain>{edu.degreeName}</EntryMain>
                    <RightInfo>{edu.currentCGPA ? `CGPA: ${edu.currentCGPA}` : edu.graduationYear}</RightInfo>
                  </EntryHeader>
                  <EntrySub>{edu.institutionName}</EntrySub>
                </div>
              ))}
            </Section>
          )}

          {projects?.length > 0 && (
            <Section>
              <SectionTitle>Projects</SectionTitle>
              {projects.map((proj, i) => (
                <ProjectEntry key={i}>
                  <EntryMain>{proj.projectTitle}</EntryMain>
                  <BodyText style={{ marginTop: '2px' }}>
                    <strong>{proj.toolsTechUsed}</strong> — {proj.projectDescription}
                  </BodyText>
                </ProjectEntry>
              ))}
            </Section>
          )}

          {certificates?.length > 0 && (
            <Section>
              <SectionTitle>Certifications</SectionTitle>
              {certificates.map((cert, i) => (
                <div key={i} style={{ marginBottom: '5px' }}>
                  <EntryHeader>
                    <EntryMain>{cert.certificateName}</EntryMain>
                    <RightInfo>{cert.courseDuration}</RightInfo>
                  </EntryHeader>
                  <EntrySub>{cert.providerName}</EntrySub>
                </div>
              ))}
            </Section>
          )}
        </ContentBody>
      </div>
    </StyledWrapper>

  );
};

export const T13Css = `@media print { * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } .resume { width: 210mm !important; height: 297mm !important; box-shadow: none !important; margin: 0 !important; } } .resume { background-color: white; }`;