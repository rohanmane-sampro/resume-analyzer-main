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
line-height: 1.4;
font-size: 10pt;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
box-sizing: border-box;
}
`;

const Header = styled.header`margin-bottom: 25px;`;

const NameContainer = styled.div`display: flex; align-items: baseline; gap: 10px; margin-bottom: 10px;`;

const Name = styled.h1`font-family: 'Times New Roman', Times, serif; font-size: 26pt; font-weight: bold; margin: 0; color: #000;`;

const Title = styled.span`font-family: 'Times New Roman', Times, serif; font-size: 14pt; font-style: italic; color: #333;`;

const ContactBar = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
font-size: 9pt;
row-gap: 5px;

.contact-item {
display: flex;
align-items: center;
gap: 8px;
}

svg {
width: 12px;
height: 12px;
}
`;

const Section = styled.section`margin-top: 20px;`;

const SectionTitle = styled.h2`font-family: 'Times New Roman', Times, serif; font-size: 12pt; font-weight: bold; margin: 0 0 5px 0;`;

const Hr = styled.hr`border: none; border-top: 1px solid #000; margin-bottom: 15px;`;

const SplitLayout = styled.div`display: grid; grid-template-columns: 160px 1fr; margin-bottom: 15px; gap: 20px;`;

const LeftCol = styled.div`font-size: 9pt; font-weight: bold;`;

const RightCol = styled.div``;

const JobTitle = styled.div`font-weight: bold; font-size: 10pt;`;

const CompanyName = styled.div`font-style: italic; font-size: 9.5pt; margin-bottom: 5px;`;

const BulletList = styled.ul`margin: 5px 0 0 0; padding-left: 15px; list-style-type: disc;`;

const BulletItem = styled.li`margin-bottom: 3px; font-size: 9.5pt;`;

const SkillsGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 40px; column-gap: 40px;`;

const SkillItem = styled.div`display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 9.5pt;`;

const DotContainer = styled.div`display: flex; gap: 4px;`;

const Dot = styled.div`width: 8px; height: 8px; border-radius: 50%; background-color: ${props => props.active ? '#000' : '#e0e0e0'};`;

const LanguageList = styled.div`display: flex; gap: 30px; font-size: 9.5pt; & > div::before { content: '• '; }`;

export const T24 = ({ jsonData }) => {
  const { contactInfo, Description, workExperience, education, skills, projects, certificates } = jsonData;

  const renderDots = (count = 5) => {
    return (
      <DotContainer>
        {[...Array(5)].map((_, i) => (
          <Dot key={i} active={i < count} />
        ))}
      </DotContainer>
    );
  };

  const allHardSkills = skills?.hardSkills ? skills.hardSkills.split(',').map(s => s.trim()) : [];
  const allSoftSkills = skills?.softSkills ? skills.softSkills.split(',').map(s => s.trim()) : [];

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">
        <Header>
          <NameContainer>
            <Name>{contactInfo?.fullName || 'Andrew O\'Sullivan'}</Name>
            <Title>Product Manager</Title>
          </NameContainer>
          <ContactBar>
            <div className="contact-item">
              <span>📍 {contactInfo?.Location || 'Address'}</span>
            </div>
            <div className="contact-item">
              <span>✉️ {contactInfo?.emailAddress || 'email@example.com'}</span>
            </div>
            <div className="contact-item">
              <span>📞 {contactInfo?.phoneNumber || '+01 0000000'}</span>
            </div>
            <div className="contact-item">
              <span>in {contactInfo?.portfolio?.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '') || 'linkedin.com/user'}</span>
            </div>
          </ContactBar>
        </Header>

        <Section>
          <SectionTitle>Profile</SectionTitle>
          <Hr />
          <div style={{ fontSize: '9.5pt' }}>
            {Description?.UserDescription || 'Experienced Product Manager with a proven track record...'}
          </div>
        </Section>

        {workExperience?.length > 0 && (
          <Section>
            <SectionTitle>Professional Experience</SectionTitle>
            <Hr />
            {workExperience.map((job, index) => (
              <SplitLayout key={index}>
                <LeftCol>
                  {job.WorkDuration || 'Dates'}
                  <div style={{ fontWeight: 'normal', marginTop: '2px' }}>{contactInfo?.Location?.split(',').pop().trim()}</div>
                </LeftCol>
                <RightCol>
                  <JobTitle>{job.jobTitle || 'Job Title'}</JobTitle>
                  <CompanyName>{job.companyName || 'Company Name'}</CompanyName>
                  <BulletList>
                    {job.keyAchievements?.split('\n').map((achievement, i) => (
                      <BulletItem key={i}>{achievement.replace(/^[•-]\s*/, '')}</BulletItem>
                    ))}
                  </BulletList>
                </RightCol>
              </SplitLayout>
            ))}
          </Section>
        )}

        {education?.length > 0 && (
          <Section>
            <SectionTitle>Education</SectionTitle>
            <Hr />
            {education.map((edu, index) => (
              <SplitLayout key={index}>
                <LeftCol>{edu.graduationYear || 'Dates'}</LeftCol>
                <RightCol>
                  <JobTitle>{edu.degreeName || 'Degree Name'}</JobTitle>
                  <CompanyName>{edu.institutionName || 'Institution Name'}</CompanyName>
                  {edu.currentCGPA && <div style={{ fontSize: '9pt' }}>CGPA: {edu.currentCGPA}</div>}
                </RightCol>
              </SplitLayout>
            ))}
          </Section>
        )}

        <Section>
          <SectionTitle>Skills</SectionTitle>
          <Hr />
          <SkillsGrid>
            {allHardSkills.slice(0, 6).map((skill, index) => (
              <SkillItem key={index}>
                {skill}
                {renderDots(5 - (index % 2))}
              </SkillItem>
            ))}
          </SkillsGrid>
        </Section>

        {allSoftSkills.length > 0 && (
          <Section>
            <SectionTitle>Languages</SectionTitle>
            <Hr />
            <LanguageList>
              {allSoftSkills.map((lang, index) => (
                <div key={index}>{lang}</div>
              ))}
            </LanguageList>
          </Section>
        )}

        {certificates?.length > 0 && (
          <Section>
            <SectionTitle>Awards & Certifications</SectionTitle>
            <Hr />
            {certificates.map((cert, index) => (
              <SplitLayout key={index}>
                <LeftCol>{cert.certificateName}</LeftCol>
                <RightCol>
                  <div style={{ fontStyle: 'italic' }}>{cert.providerName}</div>
                  <div style={{ fontSize: '9pt' }}>{cert.courseDuration}</div>
                </RightCol>
              </SplitLayout>
            ))}
          </Section>
        )}

        <Section style={{ marginTop: '30px' }}>
          <SectionTitle>Favorite Quote</SectionTitle>
          <Hr />
          <SplitLayout>
            <LeftCol>Eric Ries</LeftCol>
            <RightCol>
              <div style={{ fontStyle: 'italic', fontSize: '9.5pt' }}>
                "The best product is the one that solves a problem for the customer."
              </div>
            </RightCol>
          </SplitLayout>
        </Section>
      </div>
    </StyledWrapper>
  );
};

export const T24Css = `
.resume {
width: 210mm;
min-height: 297mm;
padding: 15mm;
margin: 20px auto;
background-color: white;
font-family: 'Helvetica', 'Arial', sans-serif;
color: #000;
line-height: 1.4;
font-size: 10pt;
box-sizing: border-box;
}

h1, h2 {
margin: 0;
}

@media print {
.resume {
margin: 0;
box-shadow: none;
}
}
`;