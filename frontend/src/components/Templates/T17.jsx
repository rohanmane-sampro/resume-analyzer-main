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
padding: 0 !important;
box-shadow: none !important;
}
}

.resume {
width: 210mm;
min-height: 297mm;
margin: 20px auto;
background-color: white;
font-family: 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif;
color: #444;
line-height: 1.5;
font-size: 10pt;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
box-sizing: border-box;
}
`;

const Header = styled.header`background-color: #f1f2f2; padding: 40px 50px; display: flex; align-items: center; gap: 30px;`;

const Avatar = styled.div`width: 120px; height: 120px; border-radius: 50%; background-color: #ddd; overflow: hidden; flex-shrink: 0; display: flex; align-items: center; justify-content: center; svg { width: 100%; height: 100%; fill: #999; }`;

const HeaderInfo = styled.div`flex-grow: 1;`;

const Name = styled.h1`font-family: 'Georgia', serif; font-size: 26pt; font-weight: bold; color: #333; margin: 0 0 5px 0;`;

const HeaderSubtitle = styled.div`font-size: 13pt; color: #666; margin-bottom: 20px;`;

const ContactGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 8px 20px; font-size: 9pt; color: #555;`;

const ContactLink = styled.a`text-decoration: none; color: inherit; display: flex; align-items: center; gap: 8px;`;

const Section = styled.section`padding: 0 50px; margin-top: 25px;`;

const SectionHeader = styled.h2`background-color: #f1f2f2; font-size: 11pt; font-weight: bold; text-transform: uppercase; text-align: center; padding: 6px 0; margin: 0 0 15px 0; color: #333; letter-spacing: 1px;`;

const Row = styled.div`display: flex; margin-bottom: 20px; gap: 20px;`;

const LeftCol = styled.div`width: 120px; flex-shrink: 0; font-size: 9.5pt; color: #666;`;

const RightCol = styled.div`flex-grow: 1;`;

const EntryTitle = styled.div`font-weight: bold; font-size: 10.5pt; color: #222;`;

const EntrySubtitle = styled.div`font-size: 10pt; color: #555; margin-bottom: 5px;`;

const List = styled.ul`margin: 5px 0 0 0; padding-left: 18px; list-style-type: disc;`;

const ListItem = styled.li`margin-bottom: 3px; font-size: 9.5pt; color: #444;`;

const SkillGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;`;

const SkillItem = styled.div`display: flex; align-items: flex-start; gap: 8px; font-size: 9.5pt; &::before { content: "•"; color: #333; }`;

export const T17 = ({ jsonData }) => {
  const {
    contactInfo,
    Description,
    workExperience,
    education,
    projects,
    certificates,
    skills
  } = jsonData;

  const hardSkillsList = skills?.hardSkills ? skills.hardSkills.split(',').map(s => s.trim()) : [];
  const softSkillsList = skills?.softSkills ? skills.softSkills.split(',').map(s => s.trim()) : [];
  const allSkills = [...hardSkillsList, ...softSkillsList];

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        <Header>
          <Avatar>
            <svg viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </Avatar>
          <HeaderInfo>
            <Name>{contactInfo?.fullName}</Name>
            <HeaderSubtitle>{workExperience?.[0]?.jobTitle || 'Professional'}</HeaderSubtitle>
            <ContactGrid>
              <ContactLink href={`mailto:${contactInfo?.emailAddress}`}>
                {contactInfo?.emailAddress}
              </ContactLink>
              <ContactLink href={`tel:${contactInfo?.phoneNumber}`}>
                {contactInfo?.phoneNumber}
              </ContactLink>
              <div>{contactInfo?.Location}</div>
              <ContactLink href={contactInfo?.portfolio} target="_blank">
                {contactInfo?.portfolio?.replace(/^https?:\/\//, '')}
              </ContactLink>
            </ContactGrid>
          </HeaderInfo>
        </Header>

        {Description?.UserDescription && (
          <Section>
            <SectionHeader>Profile</SectionHeader>
            <BodyText style={{ textAlign: 'justify', fontSize: '10pt' }}>
              {Description.UserDescription}
            </BodyText>
          </Section>
        )}

        {workExperience?.length > 0 && (
          <Section>
            <SectionHeader>Work Experience</SectionHeader>
            {workExperience.map((work, index) => (
              <Row key={index}>
                <LeftCol>
                  {work.WorkDuration}
                </LeftCol>
                <RightCol>
                  <EntryTitle>{work.companyName}</EntryTitle>
                  <EntrySubtitle>{work.jobTitle}</EntrySubtitle>
                  {work.keyAchievements && (
                    <List>
                      {work.keyAchievements.split('\n').filter(a => a.trim()).map((achievement, i) => (
                        <ListItem key={i}>{achievement.replace(/^[•*-]\s*/, '')}</ListItem>
                      ))}
                    </List>
                  )}
                </RightCol>
              </Row>
            ))}
          </Section>
        )}

        {education?.length > 0 && (
          <Section>
            <SectionHeader>Education</SectionHeader>
            {education.map((edu, index) => (
              <Row key={index}>
                <LeftCol>
                  {edu.graduationYear}
                </LeftCol>
                <RightCol>
                  <EntryTitle>{edu.degreeName}</EntryTitle>
                  <EntrySubtitle>{edu.institutionName} {edu.currentCGPA ? `| CGPA: ${edu.currentCGPA}` : ''}</EntrySubtitle>
                </RightCol>
              </Row>
            ))}
          </Section>
        )}

        {allSkills.length > 0 && (
          <Section>
            <SectionHeader>Skills</SectionHeader>
            <SkillGrid>
              {allSkills.map((skill, index) => (
                <SkillItem key={index}>{skill}</SkillItem>
              ))}
            </SkillGrid>
          </Section>
        )}

        {projects?.length > 0 && (
          <Section>
            <SectionHeader>Projects</SectionHeader>
            {projects.map((proj, index) => (
              <Row key={index}>
                <LeftCol>
                  {proj.toolsTechUsed}
                </LeftCol>
                <RightCol>
                  <EntryTitle>{proj.projectTitle}</EntryTitle>
                  <div style={{ fontSize: '9.5pt', color: '#444', marginTop: '4px' }}>
                    {proj.projectDescription}
                  </div>
                </RightCol>
              </Row>
            ))}
          </Section>
        )}

        {certificates?.length > 0 && (
          <Section>
            <SectionHeader>Awards & Certifications</SectionHeader>
            {certificates.map((cert, index) => (
              <Row key={index} style={{ marginBottom: '10px' }}>
                <LeftCol>
                  {cert.courseDuration}
                </LeftCol>
                <RightCol>
                  <EntryTitle>{cert.certificateName}</EntryTitle>
                  <EntrySubtitle>{cert.providerName}</EntrySubtitle>
                </RightCol>
              </Row>
            ))}
          </Section>
        )}
      </div>
    </StyledWrapper>
  );
};

const BodyText = styled.div`line-height: 1.6;`;

export const T17Css = `@media print { * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } .resume { box-shadow: none !important; margin: 0 !important; } }`;