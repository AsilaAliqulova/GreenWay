# Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package.json ./

RUN npm ci --force

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]

EXPOSE 4000