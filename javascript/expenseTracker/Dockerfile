FROM node:alpine

WORKDIR /app

COPY /package*.json ./

RUN npm install

COPY . .

RUN apk --no-cache add postgresql-client

ARG DHost
ARG DName
ARG DUser
ARG DPassword

ENV SECRET_KEY=128398qwjkehwe192038124712948
ENV HOST=${DHost}
ENV DB_NAME=${DName}
ENV DB_USERNAME=${DUser}
ENV DB_PASSWORD=${DPassword}

EXPOSE 5000

CMD [ "npm" , "start" ]