import { useCv } from "../context/CvContext";
import { useState } from "react";

function PersonalDetailsForm(){

    const { cv, updatePersonal } = useCv();
    const [error, setError] = useState("");

    return(

        <div className="card">
            <h2>Personal Details</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                type="text"
                placeholder="Full Name"
                value={cv.personal.fullName}
                onChange={(e) => {
                    updatePersonal("fullName", e.target.value);
                    if (error) setError("");
                  }}
            />

         <br />

            <input
                type="email"
                placeholder="Email"
                value={cv.personal.email}
                onChange={(e) =>
                    updatePersonal("email", e.target.value)
                }
            />

            <br />

            <input
                type="text"
                placeholder="Phone"
                value={cv.personal.phone}
                onChange={(e) =>
                    updatePersonal("phone", e.target.value)
                }
            />

            <br />

            <input
                type="text"
                placeholder="Location"
                value={cv.personal.location}
                onChange={(e) =>
                    updatePersonal("location", e.target.value)
                }
            />

            <br />

            <input
                type="text"
                placeholder="LinkedIn"
                value={cv.personal.linkedin}
                onChange={(e) =>
                    updatePersonal("linkedin", e.target.value)
                }
            />

            <button 
            onClick={()=>{
                if(!cv.personal.fullName.trim()){
                    setError("Full Name is required")
                    return
                }
                if (
                    !cv.personal.email.trim() ||
                    !cv.personal.email.includes("@")
                  ) {
                    setError("Valid email is required");
                    return;
                  }

                if (!cv.personal.phone.trim()) {
                setError("Phone is required");
                return;
                }

                if (cv.personal.location && !cv.personal.location.trim()) {
                    setError("Location cannot be empty");
                    return;
                  }

                  if (
                    cv.personal.linkedin &&
                    !cv.personal.linkedin.includes("linkedin.com")
                  ) {
                    setError("LinkedIn URL must contain linkedin.com");
                    return;
                  }

                alert("Personal details are valid");
            }}
            >
            Validate Personal Details
            </button>

        </div>
    )

}

export default PersonalDetailsForm;