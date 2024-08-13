
FROM node:18-alpine

WORKDIR /IDBapp/banking-app-react

COPY . /IDBapp/banking-app-react/

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]