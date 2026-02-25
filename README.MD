# AI CV Builder (React + Express + OpenAI)

A full-stack web application for creating a professional CV with live preview, AI-powered text improvements, server-side saving, and A4 PDF export.

---

## ✨ Features

### 📝 CV Editor (React)
- Personal details (Full Name, Email, Phone, Location, LinkedIn)
- Professional Summary
- Skills (Add / Remove)
- Work Experience (Add / Remove + AI rewrite for description)
- Education (Add / Remove)

### ⚡ Live Preview
- Updates instantly while typing
- Clean structured layout
- Section separation styling

### 💾 Save & Load
- Save CV to Express server
- Load saved CV in Preview page

### 🤖 AI Improvements (OpenAI API)
- Rewrite Professional Summary (polished & professional)
- Rewrite Experience Description (action-based & CV-ready)
- Keeps original meaning
- Does NOT invent new skills or experience

### 📄 PDF Export
- Proper A4 layout
- Generated using @react-pdf/renderer
- Clean and printable format

---

## 🧱 Tech Stack

### Frontend
- React + Vite
- React Router
- Context API
- Fetch API

### Backend
- Node.js
- Express
- CORS
- dotenv
- OpenAI SDK

### PDF Generation
- @react-pdf/renderer

---

## ▶️ Run Locally

### 1. Clone Repository
git clone https://github.com/your-username/ai-cv-builder.git
cd ai-cv-builder

### 2. Setup Server
cd server
npm install

Create a .env file:
OPENAI_API_KEY=your_openai_api_key_here

Start server:
node index.js

Server runs on:
http://localhost:3001

### 3. Setup Client
Open new terminal:
cd client
npm install
npm run dev

Client runs on:
http://localhost:5173

---

## 🔐 Security
- Do NOT commit your .env file.
- Add .env to .gitignore.

---

## 🚀 Possible Improvements
- Multiple CV templates
- Profile picture upload
- DOCX export
- Authentication system
- Multiple saved CVs

---

## 🎓 Academic Project
Developed as part of a Fullstack Software Engineering course demonstrating:
- React state management
- REST API development
- AI integration
- PDF generation
- Client-server architecture

---

## License
Academic / Portfolio use.