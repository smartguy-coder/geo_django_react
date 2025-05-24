FROM node:21-alpine

WORKDIR /app

# Кешування залежностей
COPY package*.json ./
RUN npm install

# Копіюємо все інше
COPY . .

# Відкриваємо порт Vite
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
