FROM node:12-alpine

MAINTAINER Eugen Buranov

ADD package.json /
RUN npm install --no-progress && rm -rf /root/.npm /tmp/npm*
RUN npm install -g --no-progress nodemon mocha sequelize-cli@6.2.0
RUN apk update
RUN apk add docker-cli