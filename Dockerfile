FROM node:latest
EXPOSE 3000
WORKDIR /usr/src/app
RUN npm install wait-on -g
RUN npm install pm2 -g
ADD package.json /usr/src/app/package.json
ADD node_modules /usr/src/app/node_modules
RUN npm install
ADD .env /usr/src/app/.env
ADD start.sh /usr/src/app/start.sh
