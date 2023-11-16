#!/bin/bash
if [[ -v WEBSITE_SITE_NAME ]]; then
    export >> /etc/profile
    service ssh start
fi
gunicorn project.wsgi -b :8080 --workers 2 --access-logfile -
