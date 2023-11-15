#!/bin/sh
set -e
db/manage.py deploy $1
touch db/project/wsgi.py
