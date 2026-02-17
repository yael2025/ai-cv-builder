import { useState } from "react";
import { useCv } from "../context/CvContext";
import { useNavigate } from "react-router-dom";
import CvPreviewLive from "../components/CvPreviewLive";
import { saveCv } from "../services/api";


import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import PersonalDetailsForm from "../components/PersonalDetailsForm";
import SummaryForm from "../components/SummaryForm";
import SkillsForm from "../components/SkillsForm";



function Editor(){

    
    const navigate = useNavigate();

    const { cv } = useCv()

     const handleSave = async () => {
        try {
          await saveCv(cv);
          alert("CV saved successfully!");
          navigate("/preview");
        } catch (error) {
          alert("Error saving CV");
        }
      };

    return (
        
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
    
    {/* Left side – Forms */}
    <div>
        <PersonalDetailsForm />
        <SummaryForm />
        <SkillsForm />
        <EducationForm />
        <ExperienceForm />

        <button
        className="primary"
        style={{ marginTop: "20px" }}
        onClick={handleSave}
        >
        Save CV
        </button>
    </div>

    {/* Right side – Live Preview */}
    <div className="card">
        <h2>Live Preview</h2>
        <CvPreviewLive />
    </div>

    </div>
   
    )
}

export default Editor