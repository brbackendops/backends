ARG VERSION_TYPE

FROM node:${VERSION_TYPE} AS node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV API_KEY=f80ab2bd14208aa975c43d99
ENV API_URL=https://v6.exchangerate-api.com/v6/f80ab2bd14208aa975c43d99
ENV PORT=4000

EXPOSE 4000

CMD [ "node" , "index.js" ]
