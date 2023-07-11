FROM node:18-alpine

RUN mkdir -p /api

RUN mkdir -p /api/logs

WORKDIR /api

COPY package.json ./

RUN npm install

COPY ./ ./

RUN npm run build

RUN ln -snf /usr/share/zoneinfo/America/Mexico_City /etc/localtime && echo America/Mexico_City > /etc/timezone

EXPOSE 3000

CMD [ "npm", "run", "serve" ]
