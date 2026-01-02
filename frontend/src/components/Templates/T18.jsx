import React from 'react';
import styled from 'styled-components';

const SIDEBAR_BG = '#41516c';
const SIDEBAR_TEXT = '#ffffff';
const MAIN_TEXT = '#000000';
const ACCENT_TEXT = '#41516c';
const DIVIDER_COLOR = '#ffffff';

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
display: flex;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
color: ${MAIN_TEXT};
line-height: 1.3;
font-size: 10pt;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
box-sizing: border-box;
}
`;

const Sidebar = styled.aside`width: 32%; background-color: ${SIDEBAR_BG}; color: ${SIDEBAR_TEXT}; padding: 30px 20px; display: flex; flex-direction: column;`;

const MainContent = styled.main`width: 68%; padding: 30px 25px; display: flex; flex-direction: column;`;

const Name = styled.h1`font-size: 18pt; font-weight: bold; text-transform: uppercase; margin: 0 0 20px 0; letter-spacing: 1px;`;

const AvatarPlaceholder = styled.div`
width: 140px;
height: 180px;
background-color: #ddd;
border-radius: 50% / 40%;
margin: 0 auto 30px auto;
border: 4px solid rgba(255, 255, 255, 0.2);
display: flex;
align-items: center;
justify-content: center;
overflow: hidden;

&::after {
content: 'Photo';
color: #666;
font-size: 10pt;
}
`;

const SidebarSection = styled.section`margin-bottom: 25px;`;

const SidebarTitle = styled.h2`font-size: 10pt; font-weight: bold; text-transform: uppercase; margin: 0 0 5px 0; border-bottom: 1px solid ${DIVIDER_COLOR}; padding-bottom: 2px;`;

const SidebarText = styled.p`font-size: 9pt; margin: 8px 0; line-height: 1.4; text-align: justify;`;

const ContactItem = styled.div`font-size: 8.5pt; margin-bottom: 8px; word-break: break-all;`;

const SkillGroup = styled.div`margin-top: 10px;`;

const SkillList = styled.ul`margin: 5px 0; padding-left: 15px; list-style-type: disc;`;

const SkillItem = styled.li`font-size: 9pt; margin-bottom: 3px;`;

const MainSection = styled.section`margin-bottom: 20px;`;

const MainTitle = styled.h2`font-size: 11pt; font-weight: bold; text-transform: uppercase; color: ${ACCENT_TEXT}; border-bottom: 2px solid #ccc; padding-bottom: 3px; margin-bottom: 10px;`;

const Entry = styled.div`margin-bottom: 15px;`;

const EntryHeader = styled.div`display: flex; justify-content: space-between; align-items: baseline;`;

const EntryTitle = styled.div`font-weight: bold; font-size: 10pt; text-transform: uppercase;`;

const EntryDate = styled.div`font-weight: bold; font-size: 9.5pt;`;

const EntrySub = styled.div`font-style: italic; font-size: 9.5pt; margin-bottom: 4px;`;

const BulletList = styled.ul`margin: 4px 0; padding-left: 15px; list-style-type: circle;`;

const BulletItem = styled.li`font-size: 9pt; margin-bottom: 2px; text-align: justify;`;

export const T18 = ({ jsonData }) => {
  const contact = jsonData?.contactInfo || {};
  const description = jsonData?.Description || {};
  const work = jsonData?.workExperience || [];
  const education = jsonData?.education || [];
  const projects = jsonData?.projects || [];
  const certificates = jsonData?.certificates || [];
  const skills = jsonData?.skills || {};

  const hardSkills = skills.hardSkills
    ? skills.hardSkills.split(',').map((s) => s.trim()).filter((s) => s !== '')
    : [];
  const softSkills = skills.softSkills
    ? skills.softSkills.split(',').map((s) => s.trim()).filter((s) => s !== '')
    : [];

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        <Sidebar>
          <Name>{contact.fullName}</Name>
          <AvatarPlaceholder />

          <SidebarSection>
            <SidebarTitle>Profile</SidebarTitle>
            <SidebarText>{description.UserDescription}</SidebarText>
          </SidebarSection>

          <SidebarSection>
            <SidebarTitle>Contact Details</SidebarTitle>
            <ContactItem>{contact.emailAddress}</ContactItem>
            <ContactItem>{contact.phoneNumber}</ContactItem>
            <ContactItem>{contact.portfolio}</ContactItem>
            <ContactItem>{contact.Location}</ContactItem>
          </SidebarSection>

          <SidebarSection>
            <SidebarTitle>Personal Information</SidebarTitle>
            <SidebarText>
              Citizenship: Global Citizen<br />
              Status: Professional Developer
            </SidebarText>
          </SidebarSection>

          <SidebarSection>
            <SidebarTitle>Skills</SidebarTitle>
            <SkillGroup>
              <SkillList>
                {hardSkills.map((skill, i) => (
                  <SkillItem key={i}>{skill}</SkillItem>
                ))}
                {softSkills.map((skill, i) => (
                  <SkillItem key={`soft-${i}`}>{skill}</SkillItem>
                ))}
              </SkillList>
            </SkillGroup>
          </SidebarSection>
        </Sidebar>

        <MainContent>
          {work.length > 0 && (
            <MainSection>
              <MainTitle>Experience</MainTitle>
              {work.map((job, index) => (
                <Entry key={index}>
                  <EntryHeader>
                    <EntryTitle>{job.jobTitle} at {job.companyName}</EntryTitle>
                    <EntryDate>{job.WorkDuration}</EntryDate>
                  </EntryHeader>
                  {job.keyAchievements && (
                    <BulletList>
                      {job.keyAchievements.split('\n').filter(a => a.trim()).map((achievement, i) => (
                        <BulletItem key={i}>{achievement.replace(/^[•*-]\s*/, '')}</BulletItem>
                      ))}
                    </BulletList>
                  )}
                </Entry>
              ))}
            </MainSection>
          )}

          {education.length > 0 && (
            <MainSection>
              <MainTitle>Education</MainTitle>
              {education.map((edu, index) => (
                <Entry key={index}>
                  <EntryHeader>
                    <EntryTitle>{edu.degreeName}</EntryTitle>
                    <EntryDate>{edu.graduationYear}</EntryDate>
                  </EntryHeader>
                  <EntrySub>{edu.institutionName}</EntrySub>
                  {edu.currentCGPA && <BulletItem>CGPA: {edu.currentCGPA}</BulletItem>}
                </Entry>
              ))}
            </MainSection>
          )}

          {certificates.length > 0 && (
            <MainSection>
              <MainTitle>Additional Education</MainTitle>
              {certificates.map((cert, index) => (
                <Entry key={index}>
                  <EntryHeader>
                    <EntryTitle>{cert.certificateName}</EntryTitle>
                    <EntryDate>{cert.courseDuration}</EntryDate>
                  </EntryHeader>
                  <EntrySub>{cert.providerName}</EntrySub>
                </Entry>
              ))}
            </MainSection>
          )}

          {projects.length > 0 && (
            <MainSection>
              <MainTitle>Projects</MainTitle>
              {projects.map((project, index) => (
                <Entry key={index}>
                  <EntryHeader>
                    <EntryTitle>{project.projectTitle}</EntryTitle>
                  </EntryHeader>
                  <EntrySub>{project.toolsTechUsed}</EntrySub>
                  <BulletItem>{project.projectDescription}</BulletItem>
                </Entry>
              ))}
            </MainSection>
          )}
        </MainContent>
      </div>
    </StyledWrapper>
  );
};

export const T18Css = `
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
display: flex !important;
}
}

.resume {
width: 210mm;
min-height: 297mm;
padding: 0;
margin: 20px auto;
background-color: white;
display: flex;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
color: #000000;
line-height: 1.3;
font-size: 10pt;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
overflow: hidden;
}

aside {
background-color: #41516c !important;
}
`;