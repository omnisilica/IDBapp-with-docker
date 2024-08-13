
FROM node:18-alpine

WORKDIR /IDBapp/banking-app-node

COPY . /IDBapp/banking-app-node/

RUN npm install

RUN npm install dotenv

EXPOSE 3000

CMD ["npm", "run", "dev"]