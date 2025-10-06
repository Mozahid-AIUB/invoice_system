#!/usr/bin/env bash
# Simple script to run backend and frontend for local development
set -e
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "Running from $ROOT_DIR"

echo "Starting Django backend..."
"$ROOT_DIR/venv/Scripts/python.exe" manage.py runserver 0.0.0.0:8000 &
BACK_PID=$!
echo "Django running with PID $BACK_PID"

echo "Starting frontend (Vite)..."
cd frontend
npm install --no-audit --no-fund
npm run dev &
FRONT_PID=$!
echo "Vite running with PID $FRONT_PID"

echo "Servers started. Backend: http://localhost:8000  Frontend: http://localhost:5173"
echo "To stop, run: kill $BACK_PID $FRONT_PID"
