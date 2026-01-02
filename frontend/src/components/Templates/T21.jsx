import React from 'react';
import styled from 'styled-components';

const PRIMARY_GREEN = '#1b8b43';
const TEXT_DARK = '#333333';
const TEXT_LIGHT = '#666666';

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
padding: 20mm !important;
box-shadow: none !important;
}
}

.resume {
width: 210mm;
min-height: 297mm;
padding: 20mm;
margin: 20px auto;
background-color: white;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
color: ${TEXT_DARK};
line-height: 1.5;
font-size: 10pt;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
box-sizing: border-box;
overflow: hidden;
}
`;

const Header = styled.header`display: flex; flex-direction: column; margin-bottom: 25px;`;

const NameRow = styled.div`display: flex; align-items: baseline; gap: 15px; margin-bottom: 10px;`;

const Name = styled.h1`color: ${PRIMARY_GREEN}; font-size: 24pt; font-weight: bold; margin: 0;`;

const Title = styled.span`color: ${PRIMARY_GREEN}; font-size: 16pt; font-style: italic; font-weight: normal;`;

const ContactGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 8px 0; font-size: 9.5pt;`;

const ContactItem = styled.div`
display: flex;
align-items: center;
gap: 8px;
color: ${TEXT_DARK};

svg {
width: 14px;
height: 14px;
fill: #000;
}
`;

const Section = styled.section`margin-bottom: 20px;`;

const SectionTitle = styled.h2`color: ${PRIMARY_GREEN}; font-size: 13pt; font-weight: bold; margin: 0 0 10px 0; border-bottom: 2.5px solid ${PRIMARY_GREEN}; width: fit-content; padding-bottom: 2px;`;

const Entry = styled.div`display: grid; grid-template-columns: 180px 1fr; margin-bottom: 18px; gap: 20px;`;

const EntryLeft = styled.div`font-size: 9.5pt; color: ${TEXT_DARK}; line-height: 1.4;`;

const EntryRight = styled.div`display: flex; flex-direction: column;`;

const EntryHeader = styled.div`margin-bottom: 4px;`;

const EntryTitle = styled.span`font-weight: bold; font-size: 10.5pt;`;

const EntryCompany = styled.span`font-style: italic; color: ${TEXT_LIGHT}; font-size: 10.5pt; &::before { content: ', '; }`;

const Achievement = styled.div`font-size: 9.5pt; color: ${TEXT_DARK}; text-align: justify; margin-top: 4px;`;

const SkillsGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; padding-top: 10px;`;

const SkillList = styled.div`font-size: 9.5pt; display: flex; flex-direction: column; gap: 4px; &::before { content: '• '; color: ${TEXT_DARK}; font-weight: bold; display: inline-block; width: 0; margin-left: -12px; } padding-left: 12px;`;

export const T21 = ({ jsonData }) => {
  const contact = jsonData?.contactInfo || {};
  const work = jsonData?.workExperience || [];
  const education = jsonData?.education || [];
  const skills = jsonData?.skills || {};

  const hSkills = skills.hardSkills ? skills.hardSkills.split(',').map(s => s.trim()) : [];
  const sSkills = skills.softSkills ? skills.softSkills.split(',').map(s => s.trim()) : [];
  const allSkills = [...hSkills, ...sSkills];

  // Helper to chunk skills for the 3-column layout
  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };
  const skillChunks = chunkArray(allSkills, Math.ceil(allSkills.length / 3));

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        <Header>
          <NameRow>
            <Name>{contact.fullName}</Name>
            <Title>{work[0]?.jobTitle}</Title>
          </NameRow>
          <ContactGrid>
            <ContactItem>
              <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
              {contact.emailAddress}
            </ContactItem>
            <ContactItem>
              <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
              {contact.phoneNumber}
            </ContactItem>
            <ContactItem>
              <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
              {contact.Location}
            </ContactItem>
            <ContactItem>
              <svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
              {contact.portfolio?.replace(/^https?:\/\/(www\.)?/, '')}
            </ContactItem>
          </ContactGrid>
        </Header>

        {work.length > 0 && (
          <Section>
            <SectionTitle>Professional Experience</SectionTitle>
            {work.map((item, idx) => (
              <Entry key={idx}>
                <EntryLeft>
                  <div>{item.WorkDuration}</div>
                  <div style={{ color: TEXT_LIGHT }}>{contact.Location}</div>
                </EntryLeft>
                <EntryRight>
                  <EntryHeader>
                    <EntryTitle>{item.jobTitle}</EntryTitle>
                    <EntryCompany>{item.companyName}</EntryCompany>
                  </EntryHeader>
                  <Achievement>{item.keyAchievements}</Achievement>
                </EntryRight>
              </Entry>
            ))}
          </Section>
        )}

        {education.length > 0 && (
          <Section>
            <SectionTitle>Education</SectionTitle>
            {education.map((item, idx) => (
              <Entry key={idx}>
                <EntryLeft>
                  <div>{item.graduationYear}</div>
                  <div style={{ color: TEXT_LIGHT }}>{contact.Location}</div>
                </EntryLeft>
                <EntryRight>
                  <EntryHeader>
                    <EntryTitle>{item.degreeName}</EntryTitle>
                  </EntryHeader>
                  <Achievement style={{ fontStyle: 'italic', color: TEXT_LIGHT }}>
                    {item.institutionName}
                  </Achievement>
                </EntryRight>
              </Entry>
            ))}
          </Section>
        )}

        {allSkills.length > 0 && (
          <Section>
            <SectionTitle>Skills</SectionTitle>
            <SkillsGrid>
              {skillChunks.map((chunk, idx) => (
                <div key={idx}>
                  {chunk.map((skill, sIdx) => (
                    <SkillList key={sIdx}>{skill}</SkillList>
                  ))}
                </div>
              ))}
            </SkillsGrid>
          </Section>
        )}
      </div>
    </StyledWrapper>
  );
};

export const T21Css = `.resume { background-color: white; } @media print { .resume { box-shadow: none !important; } }`;