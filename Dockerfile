FROM node:22-alpine

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g pm2

EXPOSE 5000

CMD ["pm2-runtime" , "npm", "start"]