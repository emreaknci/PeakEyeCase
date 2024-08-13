FROM golang:1.22.5-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o main .

FROM alpine:latest

WORKDIR /root/

COPY --from=builder /app/main .
COPY --from=builder /app/.env ./
COPY --from=builder /app/seedDataUploads /root/seedDataUploads/
COPY --from=builder /app/uploads /root/uploads/


CMD ["./main"]