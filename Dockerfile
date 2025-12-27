
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build command from user input
RUN npm run build

EXPOSE 3000

# Start command from user input
CMD ["npm", "start"]
