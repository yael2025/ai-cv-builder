const express = require("express");
const cors = require("cors");


const app = express();
const PORT = 3001;
let savedCv = null;

app.use(cors());
app.use(express.json());

require("dotenv").config()

const OpenAI = require("openai")

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/api/test", (req, res) => {
    res.json({ message: "Server is running" });
  });

app.post("/api/cv/save", (req, res)=>{
  const {cvData} = req.body;
  if(!cvData){
    return res.status(400).json({error: "No CV data provided"})
  }
  savedCv = cvData
  //console.log("SAVED CV:", savedCv);
  res.json({massage: "CV saved successfully"})
})

app.get("/api/cv", (req, res)=>{
  if(!savedCv){
    return res.status(404).json({error:"No CV saved yet"})
  }

  res.json(savedCv)
})

app.post("/api/improve-summary", async (req, res) => {
  //console.log("NEW AI SUMMARY ENDPOINT HIT");
  try{
    const {summary} = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages:[
        {
          role:"system",
          content: "You are a professional CV writer"
        },
        {
          role:"user",
          content:
          `Rewrite the following professional summary to sound polished, confident, and suitable for a junior software developer position.

          Important rules:
          - Completely rewrite the text (do not just add sentences).
          - Keep the original meaning.
          - Do NOT invent new skills or experience.
          - Make it specific to technology and software development.
          - Keep it concise (3-4 sentences max).

          Original summary:
          ${summary} `
        }
      ],
      temperature:0.7
    })

    //console.log("REQ BODY:", req.body);
    //console.log("FULL AI RESPONSE:", completion);

    if (!summary || summary.trim() === "") {
      return res.json({ improvedText: "No summary text provided." });
    }

    const improvedText = completion.choices?.[0]?.message?.content || "AI did not return text"
    res.json({improvedText})
  }
  catch(error){
    console.error(error)
    res.status(500).json({error:"AI improvement failed"})
  }
});



app.post("/api/improve-experience", async (req, res)=>{
  try{
    const { description } = req.body;

    if(!description || description.trim()===""){
      return res.json({improvedText:"No description provided"});
    }

    const completion = await openai.chat.completions.create({
      model:"gpt-4o-mini",
      messages:[
        {
          role: "system",
          content: "You are professional CV writing assistant"
        },
        {
          role: "user",
          content: 
          `Rewrite the following job experience description to sound professional and suitable for a CV.
          Important:
          - Do NOT invent achievements or metrics.
          - Do NOT add experience that was not mentioned.
          - Keep the original meaning.
          - Make it concise and professional.
          - Use action verbs.
          Text:
          ${description}`
        }
      ],
      temperature:0.7
    });

    const improvedText= completion.choices?.[0]?.message?.content || "";

    res.json({improvedText})
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: "AI improving failed"})
    
  }
})


require("dotenv").config()




app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

