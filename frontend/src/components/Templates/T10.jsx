import React from "react";
import styled from "styled-components";

/* ---------- Styled Wrapper ---------- */
const StyledWrapper = styled.div`
  @media print {
    @page {
      size: A4;
      margin: 0;
    }
    body {
      background: white !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .resume {
      box-shadow: none !important;
      margin: 0 !important;
    }
  }

  body {
    background: #f4f4f4;
  }

  .resume {
    width: 210mm;
    min-height: 297mm;
    margin: 20px auto;
    background: white;
    font-family: "Segoe UI", Arial, sans-serif;
    box-shadow: 0 0 15px rgba(0,0,0,0.15);
  }

  /* ---------- HEADER ---------- */
  .header {
    background: linear-gradient(135deg, #b6dff3, #dff1fb);
    padding: 35px;
    text-align: center;
  }

  .header h1 {
    margin: 0;
    font-size: 36px;
    font-weight: 700;
    color: #333;
  }

  .header h2 {
    margin-top: 6px;
    font-size: 16px;
    font-weight: 500;
    color: #555;
  }

  /* ---------- MAIN GRID ---------- */
  .main {
    display: grid;
    grid-template-columns: 30% 70%;
  }

  /* ---------- LEFT COLUMN ---------- */
  .left {
    padding: 25px;
    border-right: 2px solid #ddd;
    font-size: 14px;
  }

  .left-section {
    margin-bottom: 25px;
  }

  .left-title {
    font-weight: 700;
    color: #1e88c9;
    margin-bottom: 10px;
    text-transform: uppercase;
    font-size: 14px;
  }

  .left-item {
    margin-bottom: 6px;
    color: #333;
  }

  .list {
    padding-left: 18px;
  }

  .list li {
    margin-bottom: 6px;
  }

  /* ---------- RIGHT COLUMN ---------- */
  .right {
    padding: 25px 30px;
    font-size: 14px;
  }

  .section {
    margin-bottom: 25px;
  }

  .section-title {
    font-weight: 700;
    color: #1e88c9;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 6px;
    margin-bottom: 12px;
    text-transform: uppercase;
    font-size: 15px;
  }

  .item-title {
    font-weight: 700;
    color: #333;
  }

  .item-subtitle {
    font-weight: 600;
    color: #555;
    margin-bottom: 4px;
  }

  .item-date {
    float: right;
    font-style: italic;
    color: #777;
    font-size: 12px;
  }

  .description {
    margin-top: 6px;
    line-height: 1.6;
    color: #444;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .skill {
    background: #eef6fb;
    padding: 6px 10px;
    border-radius: 4px;
    text-align: center;
    font-size: 13px;
  }
`;

/* ---------- COMPONENT ---------- */
export const T8 = ({ jsonData }) => {

  const hardSkills = jsonData.skills?.hardSkills
    ? jsonData.skills.hardSkills.split(",").map(s => s.trim())
    : [];

  const softSkills = jsonData.skills?.softSkills
    ? jsonData.skills.softSkills.split(",").map(s => s.trim())
    : [];

  const languages = jsonData.contactInfo?.Languages
    ? jsonData.contactInfo.Languages.split(",").map(l => l.trim())
    : [];

  return (
    <StyledWrapper>
      <div className="resume" id="capture-content">

        {/* ---------- HEADER ---------- */}
        <div className="header">
          <h1>{jsonData.contactInfo?.fullName || "Jane Smith"}</h1>
          <h2>{jsonData.contactInfo?.jobTitle || "Full Stack Developer"}</h2>
        </div>

        {/* ---------- MAIN CONTENT ---------- */}
        <div className="main">

          {/* ---------- LEFT COLUMN ---------- */}
          <div className="left">

            <div className="left-section">
              <div className="left-title">Contact</div>
              <div className="left-item">{jsonData.contactInfo?.phoneNumber}</div>
              <div className="left-item">{jsonData.contactInfo?.emailAddress}</div>
              <div className="left-item">{jsonData.contactInfo?.portfolio}</div>
              <div className="left-item">{jsonData.contactInfo?.Location}</div>
            </div>

            <div className="left-section">
              <div className="left-title">Education</div>
              {jsonData.education?.map((edu, i) => (
                <div key={i}>
                  <strong>{edu.degreeName}</strong><br />
                  {edu.institutionName}<br />
                  {edu.graduationYear}<br />
                  {edu.currentCGPA && `CGPA: ${edu.currentCGPA}`}
                </div>
              ))}
            </div>

            <div className="left-section">
              <div className="left-title">Soft Skills</div>
              <ul className="list">
                {softSkills.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>

            <div className="left-section">
              <div className="left-title">Languages</div>
              <ul className="list">
                {languages.map((l, i) => <li key={i}>{l}</li>)}
              </ul>
            </div>

          </div>

          {/* ---------- RIGHT COLUMN ---------- */}
          <div className="right">

            {jsonData.Description?.UserDescription && (
              <div className="section">
                <div className="section-title">Profile Summary</div>
                <div className="description">
                  {jsonData.Description.UserDescription}
                </div>
              </div>
            )}

            {jsonData.workExperience?.length > 0 && (
              <div className="section">
                <div className="section-title">Work Experience</div>
                {jsonData.workExperience.map((we, i) => (
                  <div key={i}>
                    <div className="item-title">
                      {we.companyName}
                      <span className="item-date">{we.WorkDuration}</span>
                    </div>
                    <div className="item-subtitle">{we.jobTitle}</div>
                    <div className="description">{we.keyAchievements}</div>
                  </div>
                ))}
              </div>
            )}

            {hardSkills.length > 0 && (
              <div className="section">
                <div className="section-title">Technical Skills</div>
                <div className="skills-grid">
                  {hardSkills.map((s, i) => (
                    <div className="skill" key={i}>{s}</div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};