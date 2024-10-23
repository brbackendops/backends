FROM golang:1.22-alpine

WORKDIR /app

COPY go.mod ./
COPY go.sum ./

RUN go mod download
RUN apk --no-cache add postgresql-client

COPY . .

RUN go build -o main .
EXPOSE 4000


ENV DB_HOST=db
ENV DB_PORT=5432
ENV DB_USER=postgres
ENV DB_PASSWORD=password
ENV DB_NAME=ecomgolang
ENV LOCAL_ENV=false


CMD ["go","run","main.go"]


LABEL author="rohit br"
LABEL email="rohitbr@proton.me"


