import { useCv } from "../context/CvContext";

function CvPreviewLive() {
  const { cv } = useCv();

  return (
    <div className="cv-document">

      {/* Header */}
      <div className="cv-header">
        <div className="cv-name">{cv.personal?.fullName}</div>
        <div className="cv-muted">
          {cv.personal?.email} | {cv.personal?.phone}
        </div>
        <div className="cv-muted">
          {cv.personal?.location} | {cv.personal?.linkedin}
        </div>
      </div>

      {/* Summary */}
      {cv.summary && (
        <div className="cv-section">
          <h3>Summary</h3>
          <p>{cv.summary}</p>
        </div>
      )}

      {/* Skills */}
      {cv.skills.length > 0 && (
        <div className="cv-section">
          <h3>Skills</h3>
          <ul>
            {cv.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Experience */}
      {cv.experiences.length > 0 && (
        <div className="cv-section">
          <h3>Experience</h3>
          {cv.experiences.map((exp, index) => (
            <div key={index} className="cv-item">
              <strong>{exp.role}</strong> – {exp.company}
              <div className="cv-muted">
                {exp.startDate} {exp.endDate && `- ${exp.endDate}`}
              </div>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {cv.education.length > 0 && (
        <div className="cv-section">
          <h3>Education</h3>
          {cv.education.map((edu, index) => (
            <div key={index} className="cv-item">
              <strong>{edu.school}</strong> - {edu.degree}
              <div className="cv-muted">
                {edu.startYear} {edu.endYear && `- ${edu.endYear}`}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default CvPreviewLive;
