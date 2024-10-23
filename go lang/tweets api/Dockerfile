FROM golang:1.22-alpine

WORKDIR /app

COPY go.mod ./

RUN go mod download
RUN apk --no-cache add postgresql-client

COPY . .

RUN go build -o main .

EXPOSE 3000

CMD [ "./main" ]