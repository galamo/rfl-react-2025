FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY server.js /usr/src/app/server.js
COPY dist /usr/src/app/dist

EXPOSE 2200
CMD [ "npm", "start" ]
