FROM node:12.18.4-alpine

RUN apk add --no-cache tzdata
ENV TZ='Asia/Seoul'

WORKDIR /app

COPY . /app

ENTRYPOINT npm start
