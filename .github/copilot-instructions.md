# Copilot instructions for Invoice System

This file helps AI coding agents get productive quickly in this repository. Be concise and reference concrete files.

## Big picture
- Monorepo with a Django REST backend (`backend/` root) and a Vite + React frontend (`frontend/`).
- Backend: Django 4.x + Django REST Framework (JWT auth via `rest_framework_simplejwt`), API surfaced under `/api/` (see `backend/urls.py`).
- Frontend: TypeScript + React (Vite) in `frontend/` talking to backend API at `VITE_API_URL` or `http://localhost:8000` (see `frontend/src/api.ts`).
- Data flow: Client calls `/api/invoices/` and `/api/transactions/`. Invoices are created via `invoices.views.InvoiceViewSet` and transactions stored in `transactions.models.Transaction`.

## Key files to read first
- `manage.py` — entrypoint for Django commands.
- `backend/settings.py` — configuration (installed apps, middleware, DB via `DATABASE_URL`, static files, CORS, JWT config).
- `backend/urls.py` — main router, registers `InvoiceViewSet` and `TransactionViewSet`, and token endpoints.
- `invoices/models.py`, `invoices/serializers.py`, `invoices/views.py` — invoice domain logic, invoice creation and `pay` action.
- `transactions/models.py`, `transactions/serializers.py`, `transactions/views.py` — transaction model and read-only viewset.
- `frontend/src/api.ts` — axios instance and auth header behavior (reads `localStorage.access`).
- `frontend/src/pages/*` — UI pages illustrating API usage (create invoice, invoice detail, listing).

## How to run locally (developer workflow)
Use the repo root. The project includes a virtualenv at `venv/` in the repo (common for this workspace). Two options are provided: activate venv or call the explicit interpreter.

Activate & run (bash on Windows):
```bash
source "$(pwd)/venv/Scripts/activate"
pip install -r requirements.txt
python manage.py migrate --noinput
python manage.py runserver 0.0.0.0:8000
```

Or explicit interpreter (no activate):
```bash
"$PWD/venv/Scripts/python.exe" -m pip install -r requirements.txt
"$PWD/venv/Scripts/python.exe" manage.py migrate --noinput
"$PWD/venv/Scripts/python.exe" manage.py runserver
```

Frontend (in a separate terminal):
```bash
cd frontend
npm install
npm run dev
```

There are helper scripts `run_local.sh` and `run_local.bat` in repo root that start backend and frontend for local development.

## Tests
- Backend tests live under each app: `invoices/tests.py` and `transactions/tests.py`. Use the venv python to run tests:
```bash
"$PWD/venv/Scripts/python.exe" manage.py test
```

## Patterns & conventions
- API viewsets: use DRF ViewSets registered with `routers.DefaultRouter()` in `backend/urls.py`. Look for `basename='invoice'` and `basename='transaction'`.
- Authentication: JWT tokens via endpoints `api/token/` and `api/token/refresh/`. Frontend stores `access` token in `localStorage` and attaches it in `Authorization: Bearer <token>` (see `frontend/src/api.ts`).
- Domain responsibilities:
  - `invoices` app owns invoice creation and status transitions (see `InvoiceViewSet.pay` and serializer logic).
  - `transactions` app is read-only via API; transactions are created by invoice-related logic.
- Static files: backend collects to `staticfiles/` and uses WhiteNoise for serving in production (see `backend/settings.py`).
- Database: default uses `sqlite:///db.sqlite3` when `DATABASE_URL` is not provided.

## Integration & deployment hints
- Dockerfiles exist for frontend and backend; backend Dockerfile runs `gunicorn backend.wsgi:application`. See `Dockerfile` and `frontend/Dockerfile`.
- Nginx config for frontend proxies `/api/` to internal backend service name `backend:8000` (see `frontend/nginx.conf`).

## Typical fixes you may need to implement
- Ensure serializers and viewset actions maintain consistent field names (e.g. invoice `reference` vs `id` used in tests and frontend). Check `invoices/serializers.py` for creation hooks that also create `Transaction` records.
- Frontend expects `invoice.items` and `invoice.total` fields; ensure serializer returns nested `items` and total calculation.

## Safety and dev-scoped defaults
- `DEBUG` default is enabled via `python-decouple` fallback in `backend/settings.py`. Avoid enabling CORS_ALLOW_ALL_ORIGINS in production — it's present for dev convenience.

## Where to look when something breaks
- Startup/import errors: `backend/wsgi.py` logs exceptions during `get_wsgi_application()` — useful in containers.
- API auth errors: confirm tokens are requested at `POST /api/token/` and that frontend `localStorage.access` is present.
- DB/test failures: run `manage.py test` and inspect failing test traces in `invoices/tests.py` and `transactions/tests.py`.

## Example tasks for an AI agent
- Implement an `InvoiceSerializer` change so `total` is computed server-side and returned in list/detail responses. Files: `invoices/serializers.py`, `invoices/models.py` (if needed), `invoices/tests.py`.
- Add pagination or improve filtering on `InvoiceViewSet` — see `REST_FRAMEWORK` defaults in `backend/settings.py` and `invoices/views.py`.

If anything in this doc is unclear or you want more detail around tests, deployment, or a specific file, say which area and I will expand the doc.
