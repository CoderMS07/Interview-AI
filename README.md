# 🎯 Interview-AI

**An AI-powered interview preparation platform.** Paste a job description, upload your resume, and get a personalized interview strategy in about 30 seconds: a match score, likely technical and behavioral questions (with the interviewer's intent and how to answer), skill gaps, a day-wise preparation roadmap, and an ATS-friendly resume tailored to the role.

Built with the **MERN stack** and **Google Gemini**.

---

## ✨ Features

- **Match score (0–100):** how well your profile fits the job description.
- **Technical questions:** likely questions, *why* the interviewer asks them, and how to approach the answer.
- **Behavioral questions:** same format, tuned to the role.
- **Skill gap analysis:** missing skills rated `low`, `medium`, or `high` severity.
- **Day-wise preparation roadmap:** focus areas and concrete tasks for each day.
- **Tailored resume PDF:** Gemini writes an ATS-friendly HTML resume for the target job, and Puppeteer renders it to a downloadable A4 PDF.
- **Report history:** every generated report is saved and can be reopened later.
- **Secure auth:** register/login with JWT in cookies, bcrypt-hashed passwords, and a token blacklist on logout.

## 🧰 Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, Vite 7, React Router 7, Axios, SCSS (Sass) |
| Backend | Node.js, Express 5, Mongoose 9 (MongoDB) |
| AI | Google Gemini via `@google/genai`, structured JSON output validated with Zod |
| Files & PDF | Multer (in-memory upload), `pdf-parse` (resume text extraction), Puppeteer (HTML → PDF) |
| Auth | JSON Web Tokens, `bcryptjs`, `cookie-parser` |

## 🔄 How It Works

```
Resume (PDF) + Job Description + Self Description
                    │
                    ▼
     Express API  ──►  pdf-parse extracts resume text
                    │
                    ▼
     Gemini (structured JSON, Zod schema)
                    │
                    ▼
     Report saved to MongoDB  ──►  React dashboard
                                   (Technical · Behavioral · Road Map)
                    │
                    ▼
     "Download Resume": Gemini → HTML → Puppeteer → PDF
```

## 📁 Project Structure

```
Interview-AI/
├── Frontend/                     # React + Vite client
│   └── src/
│       ├── app.routes.jsx        # Routes: /login, /register, /, /interview/:interviewId
│       ├── features/
│       │   ├── auth/             # Login, Register, auth context, useAuth, Protected route
│       │   └── interview/        # Home (create plan), Interview (report view), hooks, API
│       └── style/                # Shared SCSS
└── backend/
    ├── server.js                 # Entry point (port 3000)
    └── src/
        ├── app.js                # Express app, CORS, routes
        ├── config/database.js    # MongoDB connection
        ├── controllers/          # auth + interview controllers
        ├── middlewares/          # JWT auth, file upload (multer)
        ├── models/               # User, InterviewReport, Blacklist token
        ├── routes/               # auth.routes.js, interview.routes.js
        └── services/ai.service.js# Gemini calls + Puppeteer PDF generation
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm
- A MongoDB database ([local](https://www.mongodb.com/docs/manual/installation/) or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Google Gemini API key](https://aistudio.google.com/apikey)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/Interview-AI.git
cd Interview-AI
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `backend/.env` file:

```env
MONGO_URI=mongodb://localhost:27017/interview-ai
JWT_SECRET=replace_with_a_long_random_string
GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

Start the server (runs on **http://localhost:3000**):

```bash
npm run dev
```

### 3. Set up the frontend

In a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

Open **http://localhost:5173**, create an account, and generate your first interview plan.

> The backend only allows CORS from `http://localhost:5173`, and the frontend calls `http://localhost:3000`. If you change either port or deploy, update `backend/src/app.js` and the `baseURL` in the frontend API services.

## 🔐 Environment Variables

| Variable | Description |
| --- | --- |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign and verify JWTs |
| `GOOGLE_GENAI_API_KEY` | Google Gemini API key |

## 📡 API Reference

Base URL: `http://localhost:3000/api`

### Auth

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | Public | Register with `username`, `email`, `password` |
| `POST` | `/auth/login` | Public | Login with `email`, `password` |
| `GET` | `/auth/logout` | Public | Clear the cookie and blacklist the token |
| `GET` | `/auth/get-me` | Private | Get the current user |

### Interview

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/interview/` | Private | Generate a report. `multipart/form-data` with `resume` (PDF, max 3 MB), `jobDescription`, `selfDescription` |
| `GET` | `/interview/` | Private | List all of your reports (summary view) |
| `GET` | `/interview/report/:interviewId` | Private | Get a full report |
| `POST` | `/interview/resume/pdf/:interviewReportId` | Private | Generate and download a tailored resume PDF |

## 🗺️ Roadmap

- [ ] Support DOCX resume parsing (the UI accepts it, the backend currently parses PDF only)
- [ ] Mock interview mode with answer feedback
- [ ] Export the full report as PDF
- [ ] Docker setup for one-command local development
- [ ] Deployment guide (Render / Vercel)

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request

## 📄 License

Distributed under the ISC License.

---

<p align="center">Built with ❤️ by <a href="https://github.com/CoderMS07">Savan</a></p>
