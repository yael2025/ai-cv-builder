import { createContext, useContext, useState } from "react";

const CvContext = createContext(null);

const emptyCv = {
    personal:{
        fullName:"",
        email:"",
        phone:"",
        location:"",
        linkedin:"",
    },
    summary:"", 
    education:[],
    skills: [], 
    experiences: [],
}

export function CvProvider({ children }) {
    const [cv , setCv] = useState(() => emptyCv);

    const updatePersonal = (field, value)=>{
        setCv((prev)=>({
            ...prev,
            personal:{...prev.personal, [field]: value},
        }));
    };

    const setSummary  = (value)=>{
        setCv((prev)=> ({...prev, summary:value}));
    };

    const addEducation = (edu) => {
      setCv((prev) => ({
          ...prev,
          education: [...prev.education, edu]
      }));
  };
  

    const addSkill = (skill) => {
        console.log("addSkill received:", skill, typeof skill);
        if(typeof skill!=="string") return
        const s = skill.trim();
        if (!s) return;
        setCv((prev) => ({ ...prev, skills: [...prev.skills, s] }));
      };

      const removeSkill = (index) => {
        setCv((prev) => ({
          ...prev,
          skills: prev.skills.filter((_, i) => i !== index),
        }));
      };

      const addExperience = (exp) => {
        setCv((prev) => ({ ...prev, experiences: [...prev.experiences, exp] }));
      };

      const removeExperience = (index) => {
        setCv((prev) => ({
          ...prev,
          experiences: prev.experiences.filter((_, i) => i !== index),
        }));
      };

      const value = {
        cv,
        setCv,
        emptyCv,
        updatePersonal,
        setSummary,
        addEducation,
        addSkill,
        removeSkill,
        addExperience,
        removeExperience,
      };
    
      return <CvContext.Provider value={value}>{children}</CvContext.Provider>;

}

export function useCv() {
    const ctx = useContext(CvContext);
    if (!ctx) throw new Error("useCv must be used inside CvProvider");
    return ctx;
  }
