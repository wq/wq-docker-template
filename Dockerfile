FROM ghcr.io/wq/base:main
COPY . /project
WORKDIR /project/app
RUN npm install
WORKDIR /project
RUN python -m pip install -r requirements.txt
RUN python db/manage.py deploy `cat version.txt`
WORKDIR /project/db
EXPOSE 8080 2222
ENTRYPOINT ["./entrypoint.sh"]
