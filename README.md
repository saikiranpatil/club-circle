<div align="center">

# 🔵 Club Circle

**Streamline your club's workflow with Kanban boards, RBAC, and smart notifications.**

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Stack](https://img.shields.io/badge/stack-MERN-yellow)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

[Live Demo](#) · [Report Bug](https://github.com/saikiranpatil/club-circle/issues) · [Request Feature](https://github.com/saikiranpatil/club-circle/issues)

</div>

---

## 📌 Overview

Club Circle is a full-stack task management platform built for college clubs and teams. It simplifies project execution by breaking work into tasks and subtasks, enforcing role-based access control, and keeping members informed via automated email notifications.

---

## 🎥 Demo

> [Watch the demo video](https://github.com/saikiranpatil/club-circle)

![screenshot placeholder](./public/screenshot.png)

---

## ✨ Features

- 🔐 JWT-based authentication with bcrypt password hashing
- 👥 Role-Based Access Control (Admin / Club Admin / Member)
- 📋 Task & subtask creation and management
- 📧 Email notifications for task assignments (via Google OAuth2)
- 🔑 Password recovery via email
- 📊 Kanban-style task board

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcrypt |
| Email | Nodemailer + Google OAuth2 |
| Dev Tools | ESLint, Vite |

---

## 🏗 Architecture

Monolithic full-stack app using a REST API with MVC pattern on the backend.
```
Client (React/Vite) → REST API (Express) → MongoDB
                            ↓
                     Nodemailer (Email)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Google API credentials (for email)

### Installation
```bash
git clone https://github.com/saikiranpatil/club-circle.git
cd club-circle

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install
```

### Environment Variables

Create a `.env` file in `/backend` using the template below:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
SMTP_SERVICE_PROVIDER=gmail
SMTP_EMAIL_ADDRESS=your@email.com
SMTP_CLIENT_ID=your_client_id
SMTP_CLIENT_SECRET=your_client_secret
SMTP_REFRESH_TOKEN=your_refresh_token
```

### Running Locally
```bash
# Start backend
cd backend && nodemon

# Start frontend (new terminal)
npm run dev
```

---

## 📁 Folder Structure
```
club-circle/
├── backend/          # Express API (routes, controllers, models)
├── src/              # React frontend
│   ├── components/
│   ├── pages/
│   └── services/
├── public/           # Static assets
└── vite.config.js
```

---

## 🔮 Future Improvements

- [ ] Admin dashboard UI
- [ ] Cloudinary file uploads for subtask responses
- [ ] Discussion forum for club members
- [ ] Real-time notifications (Socket.io)
- [ ] Docker + CI/CD pipeline

---

## 👤 Author

**Saikiran Patil**
- GitHub: [@saikiranpatil](https://github.com/saikiranpatil)

---

## 📄 License

MIT License — see [LICENSE](./LICENSE)