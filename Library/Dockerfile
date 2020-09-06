FROM node:latest

WORKDIR /app
COPY . /app

RUN npm install
EXPOSE 4000

CMD FRONT_URL=http://localhost:3000 npm start
