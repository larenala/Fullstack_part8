FROM node:latest

WORKDIR /app
COPY . /app

RUN npm install
RUN npm install react-scripts@latest

EXPOSE 3000

CMD API_URL=http://localhost:4000 npm start
