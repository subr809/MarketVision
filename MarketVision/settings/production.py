from .base import *
import django_heroku

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

DEBUG = False

ALLOWED_HOSTS = ['*']

#SECURE_SSL_REDIRECT = True

#SESSION_COOKIE_SECURE = True

#CSRF_COOKIE_SECURE = True

SECURE_BROWSER_XSS_FILTER = True

django_heroku.settings(locals())
