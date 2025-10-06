Invoice System
=================

Backend: Django + DRF

Quick start

- Create and activate a virtualenv
- Install requirements: pip install -r requirements.txt
- Run migrations: python manage.py makemigrations && python manage.py migrate
- Create superuser: python manage.py createsuperuser
- Run server: python manage.py runserver

Auth

Obtain JWT token:

POST /api/token/ with {"username":"...","password":"..."}

APIs

- /api/invoices/  (CRUD, POST to create invoice)
- /api/invoices/{id}/pay/  (POST to mark as paid)
- /api/transactions/ (list transactions)
- Swagger UI: /swagger/

Notes

 - Invoice total is computed from items on create. A Sale transaction is created on invoice creation. A Payment transaction is created when paying an invoice.
 - Tests are provided under `invoices/tests.py` and `transactions/tests.py`.

GitHub and Deployment
---------------------

If you want to push this project to your GitHub repository (for example: https://github.com/Mozahid-AIUB/Django_shop_management), here are the commands to run locally:

```bash
git init
git add .
git commit -m "Initial invoice system with API, tests, and admin"
git branch -M main
git remote add origin https://github.com/Mozahid-AIUB/Django_shop_management.git
git push -u origin main
```

Recommended deployment:
- Backend: Render (https://render.com) or Railway. Use the `Procfile` and set `SECRET_KEY`, `DATABASE_URL` and other env vars in the service settings.
- Frontend: Vercel (if you build a React app) — connect the frontend repo and set the API URL in environment variables.

Render backend quick steps
1. Create a new Web Service on Render and connect your GitHub repo.
2. For Environment, choose "Docker" or "Python" (select the Python environment). Build command: `pip install -r requirements.txt && python manage.py migrate --noinput && python manage.py collectstatic --noinput`.
3. Start command: `gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT`.
4. Add environment variables: `SECRET_KEY`, `DATABASE_URL`, `ALLOWED_HOSTS`.

Production security notes
- Set `DEBUG=False` in environment variables for production.
- Use a long, random `SECRET_KEY` (at least 50 characters) and keep it secret.
- Set `ALLOWED_HOSTS` to your service domain(s).
- Enable `SECURE_SSL_REDIRECT=True`, `SESSION_COOKIE_SECURE=True`, and `CSRF_COOKIE_SECURE=True` when serving over HTTPS.
- Consider enabling HSTS by setting `SECURE_HSTS_SECONDS` to a suitable value after you confirm HTTPS is working.


Vercel frontend quick steps
1. From Vercel dashboard, import your frontend repo (or same repo if mono-repo).
2. Set build command (for Vite): `npm run build`, output directory: `dist`.
3. Set environment variable pointing to your backend API URL.

If you'd like, I can push this repo to your GitHub for you and set up Render + Vercel; I will need push access to the repository (or you can add me as a collaborator). Otherwise, run the git commands above and then follow Render/Vercel's web setup.

