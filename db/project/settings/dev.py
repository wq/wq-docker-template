import sys
import mimetypes
from .base import *


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-dev"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["localhost"]
CSRF_TRUSTED_ORIGINS = ["http://localhost:5173"]


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases
DATABASES = {
    "default": {
        "ENGINE": "django.contrib.gis.db.backends.postgis",
        "NAME": "project",
        "USER": "postgres",
        "PASSWORD": "",
        "HOST": "localhost",
        "PORT": "",
    }
}

try:
    # Try to create dev database in container
    import psycopg2

    conn = psycopg2.connect(
        "host={HOST} user={USER}".format(**DATABASES["default"])
    )
    conn.set_session(autocommit=True)
    conn.cursor().execute(
        "CREATE DATABASE {NAME}".format(**DATABASES["default"])
    )
except (psycopg2.errors.DuplicateDatabase, psycopg2.OperationalError):
    pass
