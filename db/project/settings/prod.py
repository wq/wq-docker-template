from .base import *
import dj_database_url
import os


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True if os.getenv("DEBUG") else False

ALLOWED_HOSTS = [os.getenv("WEBSITE_HOSTNAME") or "localhost"]
CSRF_TRUSTED_ORIGINS = [f"https://{host}" for host in ALLOWED_HOSTS]


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases
DATABASES = {"default": dj_database_url.config()}

STORAGES = {
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedStaticFilesStorage",
    },
}
