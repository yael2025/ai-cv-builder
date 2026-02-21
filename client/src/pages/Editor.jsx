import { useState } from "react";
import { useCv } from "../context/CvContext";
import { useNavigate } from "react-router-dom";
import CvPreviewLive from "../components/CvPreviewLive";
import { saveCv } from "../services/api";
import { useRef } from "react";
import jsPDF from "jspdf"
import html2canvas from "html2canvas"


import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import PersonalDetailsForm from "../components/PersonalDetailsForm";
import SummaryForm from "../components/SummaryForm";
import SkillsForm from "../components/SkillsForm";



function Editor(){

  const previewRef = useRef();

    
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

      const handleDownloadPDF = async ()=>{
        const element = previewRef.current;

        const canvas = await html2canvas(element,{
          scale:2,
        });

        const imgData = canvas.toDataURL("image/png")

        const pdf = new jsPDF("p", "mm", "a4");

        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        pdf.save("my-cv.pdf")
      }

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

        <button 
        className="primary"
        style={{marginTop:"10px"}}
        onClick={handleDownloadPDF}
        >
        Download as PDF
        </button>

      
    </div>

    {/* Right side – Live Preview */}
    <div className="card" ref={previewRef}>
        <h2>Live Preview</h2>
        <CvPreviewLive />
    </div>

    </div>
   
    )
}

export default Editor