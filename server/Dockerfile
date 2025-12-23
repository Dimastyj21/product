# Базовый образ с Node.js
FROM node:20-alpine

# Папка в контейнере для приложения
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости (npm ci быстрее и чище)
RUN npm install --omit=dev

# Копируем весь код сервера внутрь контейнера
COPY . .

RUN npm run build

# Указываем порт, который экспонируется (опционально)
EXPOSE 3000

# Команда для старта сервера
CMD ["node", "dist/main.js"]