
# Invoice System — Open Source & Self-Hosting Guide

This project is a full-stack Invoice System built with Django REST Framework (backend) and React + Vite (frontend). It is open source and ready for self-hosting, local development, and contribution.

---

## Features
- Modern Django REST API (JWT auth, pagination, filtering)
- React + Vite frontend (TypeScript, Tailwind, PDF export)
- Docker & Docker Compose for easy deployment
- Ready for cloud (Render, Railway, Vercel, etc.)
- Open to contributions! See below for how to get started.

---
Invoice System

A full-stack Invoice Management System built with Django REST Framework (backend) and React + Vite (frontend).

Frontend live: https://invoice-system-1.onrender.com
Backend live: https://invoice-system-cik9.onrender.com

## 1. Local Development (from scratch)

### Prerequisites
- Python 3.11+
- Node.js 18+
- Git

### Quickstart (Windows/macOS/Linux)

Clone the repo and enter the directory:

```bash
git clone https://github.com/YOUR_USERNAME/invoice_system.git
cd invoice_system
```

#### Backend setup
```bash
# Create virtualenv (Windows)
python -m venv venv
venv\Scripts\activate
# Or (macOS/Linux)
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# (Optional) Create admin user
python manage.py createsuperuser

# Start backend
python manage.py runserver
# API docs: http://localhost:8000/swagger/
```

#### Frontend setup
```bash
cd frontend
npm install
npm run dev
# App: http://localhost:5173
```

#### One-click local run (both servers)
- Windows: double-click `run_local.bat`
- macOS/Linux: `./run_local.sh`

---

## 2. Docker & Docker Compose

You can run the whole stack with Docker:

```bash
docker-compose up --build
# Backend: http://localhost:8000
# Frontend: http://localhost:5173
```

---

## 3. Deployment (Cloud/Production)

### Backend (Render, Railway, etc.)
- Use the provided `Dockerfile` or deploy as a Python app.
- Set env vars: `SECRET_KEY`, `DATABASE_URL`, `ALLOWED_HOSTS`, `DEBUG=False`.
- Start command: `gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT`

### Frontend (Vercel, Netlify, etc.)
- Build command: `npm run build`
- Output dir: `dist`
- Set env var `VITE_API_URL` to your backend URL

---

## 4. API Overview

- `POST /api/token/` — obtain JWT token
- `GET /api/invoices/` — list invoices
- `POST /api/invoices/` — create invoice
- `POST /api/invoices/{id}/pay/` — mark invoice as paid
- `GET /api/transactions/` — list transactions
- Swagger docs: `/swagger/`

---

## 5. Contributing

We welcome contributions! To get started:

1. Fork this repo on GitHub
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/invoice_system.git`
3. Create a new branch: `git checkout -b feature/your-feature`
4. Make your changes (see `invoices/`, `frontend/src/pages/`)
5. Add tests if needed (`invoices/tests.py`, `transactions/tests.py`)
6. Commit and push: `git add . && git commit -m "Describe your change" && git push`
7. Open a Pull Request on GitHub

---

## 6. Troubleshooting & FAQ

- If `npm install` fails: check Node.js version (18+), delete `node_modules` and try again.
- If backend fails: check Python version, activate venv, install requirements.
- If ports are busy: change them in `run_local.sh`/`run_local.bat` and `frontend/package.json`.
- For CORS/API issues: ensure `VITE_API_URL` matches backend URL.

---

## 7. Security & Production Notes

- Set `DEBUG=False` and use a strong `SECRET_KEY` in production.
- Set `ALLOWED_HOSTS` to your domain(s).
- Use HTTPS and set secure cookie settings.

---

## 8. License

This project is open source under the MIT License. Contributions welcome!

