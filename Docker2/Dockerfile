FROM node:16.15.1

WORKDIR /app

COPY package.json /app

RUN npm install

COPY routes/ ./routes

COPY uploads/ ./uploads

COPY views/ ./views

COPY index.js ./

CMD ["node", "index.js"]