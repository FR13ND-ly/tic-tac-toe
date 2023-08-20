FROM node:18 AS build

WORKDIR /app/frontend

COPY frontend/package*.json ./

RUN npm i

RUN npm install -g @angular/cli

COPY frontend/ .

RUN npm run build

CMD ["node", "server.js"]

# #backend
# WORKDIR /app/backend

# COPY backend/package*.json ./

# RUN npm i

# COPY backend/ .

# WORKDIR /app

# COPY start.sh /app/start.sh

# RUN chmod +x /app/start.sh

# EXPOSE 4200 5000

# CMD ["/app/start.sh"]
