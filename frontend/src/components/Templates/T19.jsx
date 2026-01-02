import React from 'react';
import styled from 'styled-components';

const PRIMARY_DARK = '#34495e';
const ACCENT_BLUE = '#2980b9';
const BORDER_COLOR = '#dcdde1';
const TEXT_MAIN = '#2f3640';
const TEXT_LIGHT = '#7f8c8d';

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
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
color: ${TEXT_MAIN};
line-height: 1.5;
font-size: 10pt;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
display: flex;
position: relative;
}
`;

const Sidebar = styled.aside`width: 35%; background-color: #f9f9f9; border-right: 1px solid ${BORDER_COLOR}; padding: 0 0 20px 0; display: flex; flex-direction: column;`;

const HeaderAccent = styled.div`background-color: ${PRIMARY_DARK}; height: 40px; width: 100%; position: relative; &::after { content: ''; position: absolute; right: 0; bottom: 0; width: 0; height: 0; border-style: solid; border-width: 0 0 40px 40px; border-color: transparent transparent white transparent; }`;

const ProfileSection = styled.div`padding: 20px 30px; text-align: left;`;

const ProfileImage = styled.div`width: 100%; aspect-ratio: 4/5; background-color: #eee; margin-bottom: 20px; background-image: url('[https://via.placeholder.com/200x250](https://via.placeholder.com/200x250)'); background-size: cover; background-position: center;`;

const FullName = styled.h1`font-size: 18pt; font-weight: 500; margin: 0; color: ${PRIMARY_DARK};`;

const SidebarSubTitle = styled.div`font-size: 9pt; color: ${TEXT_LIGHT}; margin-bottom: 15px; line-height: 1.2;`;

const ContactList = styled.ul`list-style: none; padding: 0; margin: 0 0 30px 0;`;

const ContactItem = styled.li`
font-size: 8.5pt;
margin-bottom: 8px;
display: flex;
align-items: center;
gap: 8px;
color: ${TEXT_MAIN};

&::before {
content: '▶';
font-size: 6pt;
color: ${PRIMARY_DARK};
}
`;

const SidebarSectionTitle = styled.h2`font-size: 14pt; font-weight: 400; color: ${TEXT_LIGHT}; margin: 0 0 10px 0; padding-bottom: 5px; border-bottom: 1.5px solid ${BORDER_COLOR}; width: fit-content; min-width: 80px;`;

const SkillContainer = styled.div`margin-bottom: 12px;`;

const SkillLabel = styled.div`display: flex; justify-content: space-between; font-size: 8.5pt; font-weight: 600; margin-bottom: 4px;`;

const ProgressBar = styled.div`height: 6px; background-color: #ddd; position: relative; overflow: hidden; &::after { content: ''; position: absolute; left: 0; top: 0; height: 100%; width: ${props => props.width || '80%'}; background-color: ${PRIMARY_DARK}; }`;

const MainContent = styled.main`width: 65%; padding: 40px 40px;`;

const Section = styled.section`margin-bottom: 35px;`;

const SectionTitle = styled.h2`font-size: 16pt; font-weight: 400; color: ${TEXT_LIGHT}; margin: 0 0 15px 0; padding-bottom: 5px; border-bottom: 1.5px solid ${BORDER_COLOR}; width: fit-content; min-width: 150px;`;

const BiographyText = styled.p`font-size: 10pt; color: ${TEXT_MAIN}; text-align: justify; margin: 0;`;

const ExperienceEntry = styled.div`margin-bottom: 25px; position: relative;`;

const EntryHeader = styled.div`display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;`;

const JobInfo = styled.div`flex: 1;`;

const JobTitle = styled.div`font-weight: bold; font-size: 10.5pt; color: ${TEXT_MAIN};`;

const CompanyName = styled.div`font-size: 9.5pt; color: ${TEXT_LIGHT};`;

const DateBadge = styled.div`background-color: ${PRIMARY_DARK}; color: white; font-size: 8.5pt; padding: 4px 12px; font-weight: bold; white-space: nowrap;`;

const DescriptionList = styled.ul`margin: 10px 0 0 0; padding-left: 0; list-style: none; font-size: 9.5pt; color: ${TEXT_MAIN};`;

const DescriptionItem = styled.li`margin-bottom: 5px; position: relative; padding-left: 0;`;

export const T19 = ({ jsonData }) => {
  const hardSkills = jsonData.skills?.hardSkills ? jsonData.skills.hardSkills.split(',') : [];
  const softSkills = jsonData.skills?.softSkills ? jsonData.skills.softSkills.split(',') : [];

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        <Sidebar>
          <HeaderAccent />
          <ProfileSection>
            <ProfileImage />
            <FullName>{jsonData.contactInfo?.fullName}</FullName>
            <SidebarSubTitle>
              {jsonData.workExperience?.[0]?.jobTitle || 'Professional'}
            </SidebarSubTitle>

            <ContactList>
              {jsonData.contactInfo?.phoneNumber && <ContactItem>{jsonData.contactInfo.phoneNumber}</ContactItem>}
              {jsonData.contactInfo?.Location && <ContactItem>{jsonData.contactInfo.Location}</ContactItem>}
              {jsonData.contactInfo?.emailAddress && <ContactItem>{jsonData.contactInfo.emailAddress}</ContactItem>}
              {jsonData.contactInfo?.portfolio && <ContactItem>{jsonData.contactInfo.portfolio}</ContactItem>}
            </ContactList>

            <SidebarSectionTitle>Skills</SidebarSectionTitle>
            {hardSkills.map((skill, index) => (
              <SkillContainer key={index}>
                <SkillLabel>
                  <span>{skill.trim()}</span>
                  <span style={{ color: TEXT_LIGHT, fontWeight: 400 }}>Exp.</span>
                </SkillLabel>
                <ProgressBar width={`${95 - (index * 8)}%`} />
              </SkillContainer>
            ))}
            {softSkills.map((skill, index) => (
              <SkillContainer key={index}>
                <SkillLabel>
                  <span>{skill.trim()}</span>
                </SkillLabel>
                <ProgressBar width="70%" />
              </SkillContainer>
            ))}
          </ProfileSection>
        </Sidebar>

        <MainContent>
          {jsonData.Description?.UserDescription && (
            <Section>
              <SectionTitle>Biography</SectionTitle>
              <BiographyText>{jsonData.Description.UserDescription}</BiographyText>
            </Section>
          )}

          {jsonData.workExperience && jsonData.workExperience.length > 0 && (
            <Section>
              <SectionTitle>Work experience</SectionTitle>
              {jsonData.workExperience.map((exp, index) => (
                <ExperienceEntry key={index}>
                  <EntryHeader>
                    <JobInfo>
                      <JobTitle>{exp.jobTitle}</JobTitle>
                      <CompanyName>{exp.companyName}</CompanyName>
                    </JobInfo>
                    <DateBadge>{exp.WorkDuration}</DateBadge>
                  </EntryHeader>
                  <DescriptionList>
                    <DescriptionItem>
                      {exp.keyAchievements || 'Job details and responsibilities go here.'}
                    </DescriptionItem>
                  </DescriptionList>
                </ExperienceEntry>
              ))}
            </Section>
          )}

          {jsonData.education && jsonData.education.length > 0 && (
            <Section>
              <SectionTitle>Education</SectionTitle>
              {jsonData.education.map((edu, index) => (
                <ExperienceEntry key={index}>
                  <EntryHeader>
                    <JobInfo>
                      <JobTitle>{edu.degreeName}</JobTitle>
                      <CompanyName>{edu.institutionName}</CompanyName>
                    </JobInfo>
                    <DateBadge>{edu.graduationYear}</DateBadge>
                  </EntryHeader>
                  {edu.currentCGPA && (
                    <DescriptionList>
                      <DescriptionItem>CGPA: {edu.currentCGPA}</DescriptionItem>
                    </DescriptionList>
                  )}
                </ExperienceEntry>
              ))}
            </Section>
          )}
        </MainContent>
      </div>
    </StyledWrapper>
  );
};

export const T19Css = `.resume { background-color: white; } @media print { .resume { box-shadow: none !important; } }`;