
# 🎯 Remote Interview & AI Coding Platform

## 📌 Overview
A full-stack platform for conducting **remote technical interviews** with integrated **video calling, real-time coding editor, AI-powered mock interviews, and plagiarism detection**.  
Built using **Django (backend), Vite + React (frontend), Tailwind CSS (UI)**, and **AI APIs (OpenAI/CodeT5 for code review, Whisper for speech-to-text)**.

This project is inspired by HackerRank, CoderPad, and Google Meet – making it an **industry-level HR Tech + EdTech solution**.

---

## 🚨 Problem
Companies face challenges in hiring due to:
- Inefficient remote interviews.
- Lack of real-time coding collaboration.
- Difficulties in evaluating candidates fairly.
- Risk of plagiarism during online assessments.

---

## 💡 Solution
This platform provides:
- **Video + Screen Sharing** for live interviews.
- **Collaborative Coding Editor** with multiple languages.
- **AI-powered Code Review & Feedback** (via OpenAI/CodeT5).
- **AI Mock Interviewer** for practice before real interviews.
- **Plagiarism Detection** using AI + pattern analysis.
- **Interview Recording & Reports** for HR teams.

---

## ✨ Features
- 🔐 Authentication (JWT, Role-based: Candidate/Interviewer/Admin)
- 📹 Video Calling (WebRTC / Agora / Twilio)
- 👨‍💻 Real-time Collaborative Coding (Monaco Editor + WebSockets)
- 🤖 AI Mock Interview (Q&A + feedback)
- 🧠 AI Code Quality Review (using OpenAI API / HuggingFace models)
- 🕵️ Plagiarism Detection (code similarity analysis)
- 📊 Interview Reports (candidate performance analytics)
- 🗂️ Admin Dashboard (manage users, interviews, reports)

---

## 🛠️ Tech Stack
### Frontend
- ⚛️ React (with Vite for fast builds)
- 🎨 Tailwind CSS (UI styling)
- 🔄 WebSockets for real-time editor

### Backend
- 🐍 Django + Django REST Framework
- 🔄 Django Channels (WebSockets for live coding & chat)
- 🗄️ PostgreSQL (database)
- 🔐 JWT Authentication

### AI & APIs
- 🤖 OpenAI API (Mock interview Q&A, code review)
- 🧑‍💻 HuggingFace CodeT5 / Codex (code suggestions)
- 🗣️ Whisper API (speech-to-text for AI interviewer)
- 📹 WebRTC/Agora/Twilio SDK (video calling)

### DevOps
- 🚀 Deployment: Vercel (frontend), Render/Heroku (backend)
- 🐳 Docker (optional)
- ☁️ Cloud Storage (AWS S3/GCP for recordings)

---

## 📂 Project Structure
