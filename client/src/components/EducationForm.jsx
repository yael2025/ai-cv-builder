import { useState } from "react";
import { useCv } from "../context/CvContext";

function EducationForm() {
  const { addEducation } = useCv();

  const [eduDraft, setEduDraft] = useState({
    school: "",
    degree: "",
    startYear: "",
    endYear: "",
  });

  const [error, setError] = useState("");

  const handleValidate = () => {
    if (!eduDraft.school.trim()) {
      setError("School is required");
      return;
    }

    if (!eduDraft.degree.trim()) {
      setError("Degree is required");
      return;
    }

    const start = eduDraft.startYear;
    const end = eduDraft.endYear;

    if (start && end && Number(start) > Number(end)) {
      setError("Start Year cannot be greater than End Year");
      return;
    }

    alert("Education details are valid");
  };

  return (
    <div className="card">
      <h2>Education</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="School"
        value={eduDraft.school}
        onChange={(e) => {
          setEduDraft({ ...eduDraft, school: e.target.value });
          if (error) setError("");
        }}
      />

      <input
        type="text"
        placeholder="Degree"
        value={eduDraft.degree}
        onChange={(e) => {
          setEduDraft({ ...eduDraft, degree: e.target.value });
          if (error) setError("");
        }}
      />

      <input
        type="number"
        placeholder="Start Year"
        value={eduDraft.startYear}
        onChange={(e) => {
          setEduDraft({ ...eduDraft, startYear: e.target.value });
          if (error) setError("");
        }}
      />

      <input
        type="number"
        placeholder="End Year"
        value={eduDraft.endYear}
        onChange={(e) => {
          setEduDraft({ ...eduDraft, endYear: e.target.value });
          if (error) setError("");
        }}
      />

      <button onClick={handleValidate}>
        Validate Education
      </button>

      <button
        className="primary"
        onClick={() => {
          if (!eduDraft.school || !eduDraft.degree) return;

          addEducation(eduDraft);

          setEduDraft({
            school: "",
            degree: "",
            startYear: "",
            endYear: "",
          });

          setError("");
        }}
      >
        Save Education
      </button>
    </div>
  );
}

export default EducationForm;
