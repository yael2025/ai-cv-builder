import { useCv } from "../context/CvContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCv } from "../services/api";

function Preview() {

  
  const [cv, setCv] = useState(null)
  const [error, setError] = useState("")
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchCv = async ()=>{

      try{
        const data = await getCv()
        setCv(data)
      }catch(err){
        setError("No CVfound on server")
      }
    }
    fetchCv()
  },[]);

  if( error){
    return(
      <div style={{padding:"40px"}} >
        <p style={{color:"red"}}>{error}</p>
        <button className="secondary" onClick={()=> navigate("/editor")}>
          Back to Editor 
        </button>
      </div > 
    )
  }

  if(!cv){
    return <p style={{padding:"40px"}}> Loading...</p>
  }

  return(

    <div style={{padding:"40px", maxWidth:"800px", margin:"0 auto"}}>
      <h1> {cv.personal.fullName} </h1>
      <p>
        {cv.personal.email} | {cv.personal.phone}
      </p>
      <p>
      {cv.personal.location}{" "}
      {cv.personal.linkedin  && (
        <> | {cv.personal.linkedin} </>
      )}
      </p>

      <hr />

      <h2>Professional Summary</h2>
      <p>{cv.summary}</p>

      <hr />

      <h2>Skills</h2>
      <ul>
        {cv.skills.map((skill, index) => (
          <li key={index} > {skill} </li>
        ))}
      </ul>

      <hr />
      <h2>Education</h2>
      <p>
        <strike> {cv.education.degree} </strike> -{" "}
        {cv.education.school}
      </p>
      {(cv.education.startYear || cv.education.endYear) && (
        <p>
          {cv.education.startYear} - {cv.education.endYear}
        </p>
       )}

       <hr />

       <h2>Experience</h2>
       {cv.experiences.map((exp, index)=>(
        <div key={index} style={{marginBottom:"20px"}} >
          <strong> {exp.role}</strong> - {exp.company}
          <br />
          {exp.startDate} - {exp.endDate}
          <p>{exp.description}</p>
        </div>
       ))}

    <button onClick={() => navigate("/editor")}
      style={{
        marginTop:"30px",
        padding:"10px, 20px",
        fontSize: "16px",
        backgroundColor:"#111",
        color:"white",
        border: "none",
        borderRadius:"4px",
        cursor:"pointer"
      }}>
      Back to Editor
    </button>
    </div>
  )
}

export default Preview