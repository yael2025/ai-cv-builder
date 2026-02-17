import { useCv } from "../context/CvContext";
import { useState } from "react";
import { improveSummary } from "../services/api";


function SummaryForm() {
  const { cv, setSummary } = useCv();

  const [error, setError] = useState("");

  const [aiSuggestion, setAiSuggestion] = useState("")
  const [originalSummary, setOriginalSummary] = useState("");

  const [ loading, setLoading] = useState(false)

  return (
    <div className="card">
      <h2>Professional Summary</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <textarea
        placeholder="Write a short professional summary..."
        value={cv.summary}
        onChange= {(e)=> {
            setSummary(e.target.value);
            if(error) setError("")
        }}
        rows={5}
        style={{ width: "100%" }}
      />

      <br />

      <button
       type="button"
       disabled={loading}
       onClick={async ()=>{
        if(!cv.summary.trim()) return;

        try{
          setLoading(true)
          setOriginalSummary(cv.summary)

          const result = await improveSummary(cv.summary);
          setAiSuggestion(result)
        }
        catch(error){
          console.error(error);
          alert("AI improving failed");
        }
        finally{
          setLoading(false)
        }
       }}
      >
       {loading ? "improving..." : "improving  with AI " }
      </button>

      {aiSuggestion && (
        <div style={{marginTop:"20px", border: "1px solid #ccc", padding:"15px"}}>
          <h3>AI Suggested Summary </h3>
          <p>{aiSuggestion}</p>

          <button onClick={()=>{
            setSummary(aiSuggestion);
            setAiSuggestion("")
          }}
          style={{marginRight:"10px"}}
          className="primary"
          >
            Accept
          </button>
          <button className="danger" onClick={()=>{
            setSummary(originalSummary);
            setAiSuggestion("")
          }}>
            Reject
          </button>
        </div>
      )}

      <button
        onClick={() => {
            if (!cv.summary.trim()) {
            setError("Summary is required");
            return;
            }

            if (cv.summary.trim().length < 20) {
            setError("Summary must be at least 20 characters");
            return;
            }

            alert("Summary is valid");
        }}
        >
        Validate Summary
        </button>
    </div>
  );
}

export default SummaryForm;
