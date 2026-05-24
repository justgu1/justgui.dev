FROM golang:1.25-alpine

WORKDIR /var/www/api

RUN apk add --no-cache git wget

COPY ./api/go.mod ./
COPY ./api/go.sum ./

RUN go mod download

COPY ./api .

EXPOSE 8080

CMD ["go", "run", "./cmd/api"]