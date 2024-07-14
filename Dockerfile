FROM node:18

WORKDIR /app

COPY ./server/package.json /app

RUN npm install

COPY ./server .

RUN npm run build

CMD ["npm", "run", "start:dev"]
