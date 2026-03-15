FluentAI Prep

FluentAI Prep is an AI-powered English learning platform designed for students preparing for international exams like IELTS and TOEFL.

The application uses multiple AI providers to analyze English sentences, improve vocabulary, evaluate essays, and provide grammar corrections with clear explanations.

---

Features

AI Grammar Checker

Corrects sentences and explains grammar rules.

Example:
Input
"she do like apples"

Output
Correct Sentence: She likes apples.

---

Word Meaning Explainer

Explains difficult English words with examples and synonyms.

---

Sentence Paraphraser

Improves sentences using more advanced vocabulary.

---

Vocabulary Builder

Generates topic-based advanced English vocabulary.

---

IELTS Essay Evaluator

Provides estimated band score and suggestions for improvement.

---

Daily Vocabulary

Displays a new English word each day.

---

AI Chat History

Previous analyses are saved and displayed in a chat-style interface.

---

Multi-AI Fallback System

The backend automatically switches between AI providers.

Order:

Gemini → Groq → OpenAI

This ensures the system continues working even if one provider fails.

---

Tech Stack

Frontend
React
TailwindCSS
Axios

Backend
Node.js
Express

AI Providers
Gemini API
Groq API
OpenAI API

Database
MongoDB Atlas

Authentication
JWT

---

Architecture

Frontend (React + Tailwind)
↓
Express Backend
↓
Prompt Engine
↓
AI Provider Layer
↓
MongoDB Atlas

---

Installation

Clone the repository

git clone https://github.com/YOUR_USERNAME/FluentAI-Prep.git

Install backend dependencies

cd server
npm install

Install frontend dependencies

cd ../client
npm install

Create ".env" inside server folder

PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret

GEMINI_API_KEY=your_key
GROQ_API_KEY=your_key
OPENAI_API_KEY=your_key

Run backend

cd server
npm run dev

Run frontend

cd client
npm run dev

---

Screenshots

(Add screenshots here once the UI is finished)

Example sections:

Dashboard
Grammar Correction
Essay Evaluation

---

Future Improvements

User dashboards
Saved vocabulary lists
Essay progress tracking
Practice tests for IELTS

---

Author

Aditya Varma