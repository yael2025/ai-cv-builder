import { useState } from "react";
import { useCv } from "../context/CvContext";

function SkillsForm() {
  const { cv, addSkill, removeSkill } = useCv();
  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="card">
      <h2>Skills</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Add a skill"
        value={skillInput}
        onChange={(e) => {
            setSkillInput(e.target.value);
            if (error) setError("");
          }}
      />

      <button
        onClick={() => {
            const value = skillInput.trim();
            if (!value) {
              setError("Skill cannot be empty");
              return;
            }
            if (
              cv.skills.some(
                (s) => s.toLowerCase() === value.toLowerCase()
              )
            ) {
              setError("Skill already exists");
              return;
            }
            addSkill(value);
            setSkillInput("");
            setError("");
          }}
      >
        Add Skill
      </button>
      <ul>
        {cv.skills.map((skill, index) => (
          <li key={index}>
            {skill}
            <button
              onClick={() => removeSkill(index)}
              style={{ marginLeft: "8px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkillsForm;
