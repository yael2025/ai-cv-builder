import { useState } from "react";
import { useCv } from "../context/CvContext";
import { improveExperience } from "../services/api";



function ExperienceForm() {
  const { cv, addExperience } = useCv();
  const [aiExpSuggestion, setAiExpSuggestion] = useState("");
  const [activeExpIndex, setActiveExpIndex] = useState(null);
  const [originalExpDesc, setOriginalExpDesc] = useState("");


  const [expDraft, setExpDraft] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [ improvedText, setImprovedText] = useState("")
  const [ loading, setLoading] = useState(false)

  const [error, setError] = useState("");

  const handleSave = () => {
    if (
      !expDraft.role.trim() ||
      !expDraft.company.trim() ||
      !expDraft.description.trim()
    ) {
      setError("Role, Company and Description are required");
      return;
    }

    addExperience(expDraft);

    setExpDraft({
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    });

    setError("");
  };

  return (
    <div className="card">
      <h2>Experience</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Role"
        value={expDraft.role}
        onChange={(e) =>
          setExpDraft({ ...expDraft, role: e.target.value })
        }
      />

      <br />

      <input
        type="text"
        placeholder="Company"
        value={expDraft.company}
        onChange={(e) =>
          setExpDraft({ ...expDraft, company: e.target.value })
        }
      />

      <br />

      <input
        type="text"
        placeholder="Start Date"
        value={expDraft.startDate}
        onChange={(e) =>
          setExpDraft({ ...expDraft, startDate: e.target.value })
        }
      />

      <br />

      <input
        type="text"
        placeholder="End Date"
        value={expDraft.endDate}
        onChange={(e) =>
          setExpDraft({ ...expDraft, endDate: e.target.value })
        }
      />

      <br />

      <textarea
        placeholder="Description"
        value={expDraft.description}
        onChange={(e) =>
          setExpDraft({ ...expDraft, description: e.target.value })
        }
      />

      <br />

      <button
      type="button"
      disabled={loading}
      onClick={async ()=>{
        if(!expDraft.description.trim()) return

        try{
          setLoading(true)

          const Improved = await improveExperience(expDraft.description)
          setImprovedText(Improved)
        }
        catch(error){
          console.error(error);
          alert("AI failed")
        }
        finally{
          setLoading(false)
        }
      }}
      >
        {loading ? "Imporving..." : "Improve Description with AI"}
      </button>

      {improvedText && (
        <div className="card" style={{marginTop: "10px"}}>
          <h4>Suggested Improvement:</h4>
          <p>{improvedText}</p>

          <button
          className="primary"
          style={{marginRight:"10px"}}
          onClick={()=>{
            setExpDraft({ ...expDraft, description:improvedText})
            setImprovedText("")
          }}
          >Accept
          </button>
           
           <button
           className="danger" 
           onClick={()=>{
            setImprovedText("")
           }}
           >
            Reject
           </button>


        </div>
      )}

      <button onClick={handleSave}>Save Experience</button>

      <ul>
        {cv.experiences.map((exp, index) => (
          <li key={index} style={{ marginBottom: "15px" }}>
            <strong>{exp.role}</strong> - {exp.company}
            <p>{exp.description}</p>
          
            <button
              onClick={async () => {
                setOriginalExpDesc(exp.description);
                setActiveExpIndex(index);
          
                const result = await improveExperience(exp.description);
                setAiExpSuggestion(result.improvedText);
              }}
            >
              Improve with AI
            </button>
          
            {aiExpSuggestion && activeExpIndex === index && (
              <div style={{ marginTop: "10px", border: "1px solid #ccc", padding: "10px" }}>
                <p>{aiExpSuggestion}</p>
          
                <button
                  onClick={() => {
                    cv.experiences[index].description = aiExpSuggestion;
                    setAiExpSuggestion("");
                  }}
                >
                  Accept
                </button>
          
                <button
                  onClick={() => {
                    cv.experiences[index].description = originalExpDesc;
                    setAiExpSuggestion("");
                  }}
                  style={{ marginLeft: "8px" }}
                >
                  Reject
                </button>
              </div>
            )}
          </li>
        
        ))}
      </ul>
    </div>
  );
}

export default ExperienceForm;
