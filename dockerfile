
FROM node:16-alpine

WORKDIR /app

COPY package.json ./

RUN npm ci --force

RUN apt-get update && apt-get install -y python3 build-essential


RUN npm uninstall bcrypt && npm install bcrypt

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]

EXPOSE 4000