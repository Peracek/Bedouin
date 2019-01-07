FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run server-build
RUN npm run client-build

EXPOSE 3001
CMD [ "node", "build/index.js" ]