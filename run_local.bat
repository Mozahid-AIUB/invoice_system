@echo off
echo Starting backend and frontend for Invoice System
echo Starting Django backend...
call venv\Scripts\activate
python manage.py runserver 0.0.0.0:8000
echo Now starting frontend...
cd frontend
npm install --no-audit --no-fund
npm run dev
