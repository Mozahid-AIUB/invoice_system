"""
WSGI config for backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
import logging
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

logger = logging.getLogger(__name__)

try:
	application = get_wsgi_application()
except Exception:
	# Log the full exception to stderr so it's visible in most hosting/logging setups
	logger.exception("Failed to get WSGI application")
	# Re-raise so process managers (or Django's runserver) see the error
	raise
