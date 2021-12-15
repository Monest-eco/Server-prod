FROM node:14.18-alpine

LABEL maintainer="monest.eco@gmail.com"

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .
