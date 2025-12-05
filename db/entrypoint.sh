#!/bin/bash
if [[ -v WEBSITE_SITE_NAME ]]; then
    export >> /etc/profile
    service ssh start
fi

daphne -b 0.0.0.0 -p 8080 project.asgi:application
