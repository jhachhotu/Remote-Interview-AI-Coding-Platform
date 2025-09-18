
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

This repository contains both backend (Django) and frontend (Vite + React) in a single workspace.

```
.
├── backend/
│   ├── app/                # Django project (settings, urls, asgi, wsgi)
│   ├── interviews/         # Interview models & API
│   ├── realtime/           # Channels websockets (editor)
│   ├── users/              # Custom user & auth
│   └── manage.py
├── frontend/               # Vite + React + Tailwind app
│   ├── src/
│   │   ├── api/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.tsx
│   └── package.json
├── .env                    # Project env (see below)
├── requirements.txt        # Backend deps
└── README.md
```

---

## 🔧 Environment Variables

Create a `.env` in the project root (already scaffolded) and update values:

```
# Django
SECRET_KEY=your_django_secret
DEBUG=True
DATABASE_URL=postgresql://postgres.blsxaybnvpfthurgvoax:[YOUR-PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres

# Hugging Face
HF_API_KEY=your_huggingface_api_key

# Speech-to-Text
STT_API_KEY=your_google_stt_key

# Text-to-Speech
TTS_API_KEY=your_elevenlabs_key

# OpenAI (optional)
OPENAI_API_KEY=your_openai_key

# Optional Redis (for Channels in production)
# REDIS_URL=redis://localhost:6379/0
```

Frontend variables (copy `frontend/.env.example` to `frontend/.env`):

```
VITE_API_BASE_URL=http://localhost:8000
VITE_WS_BASE_URL=ws://localhost:8000
```

---

## ▶️ Running Locally

### 1) Backend (Django)

Prereqs: Python 3.11+ and `python3-venv` available on your system.

```
python3 -m venv .venv
. .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# From the project root (so DJANGO_SETTINGS_MODULE resolves):
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser

# Development server (HTTP only)
python manage.py runserver 0.0.0.0:8000
```

WebSocket endpoint will be available under `/ws/editor/<room_code>/`.

### 2) Frontend (Vite + React)

```
cd frontend
cp .env.example .env   # adjust API and WS URLs if needed
npm install
npm run dev
```

Open `http://localhost:5173`.

---

## 🔐 Auth & APIs

- `POST /api/auth/register/` — register new user
- `POST /api/auth/login/` — obtain JWT access/refresh (SimpleJWT)
- `GET /api/interviews/` — list interviews (requires auth)
- `GET /api/interviews/mine/` — list my interviews (requires auth)

Use the access token as `Authorization: Bearer <token>` from the frontend. CORS is enabled for all origins in development.

---

## 🧩 Realtime Editor (Channels)

- Frontend connects to `VITE_WS_BASE_URL/ws/editor/<room_code>/`
- Messages are broadcast to all participants in the room

For production use, configure `REDIS_URL` and a proper ASGI server (e.g., Daphne/Uvicorn) with sticky sessions.

---

## 📦 Building

Frontend:

```
cd frontend
npm run build
```

Backend: collect static (if serving assets via Django in production):

```
python manage.py collectstatic --noinput
```

---

## 🚀 Deployment Notes

- Frontend can be deployed to Vercel/Netlify. Set `VITE_API_BASE_URL`/`VITE_WS_BASE_URL` envs accordingly.
- Backend can be deployed to Render/Heroku/Fly. Use `DATABASE_URL` and configure `REDIS_URL` for Channels in production.
