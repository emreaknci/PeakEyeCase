# 1. Go uygulaması için baz imaj
FROM golang:1.22.5-alpine AS builder

# 2. Çalışma dizinini ayarla
WORKDIR /app

# 3. Modül dosyalarını kopyala ve bağımlılıkları yükle
COPY go.mod go.sum ./
RUN go mod download

# 4. Uygulama kodlarını kopyala
COPY . .

# 5. Uygulamayı inşa et
RUN go build -o main .

# 6. Çalışma imajı oluştur
FROM alpine:latest

# 7. Çalışma dizinini ayarla
WORKDIR /root/

# 8. Derlenen dosyayı kopyala
COPY --from=builder /app/main .
COPY --from=builder /app/.env ./

# 9. Uygulamayı başlat
CMD ["./main"]
