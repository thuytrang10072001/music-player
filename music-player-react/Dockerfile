# Stage 1: Build React app
FROM node:20.9.0-slim AS build

WORKDIR /app/frontend

# Copy package files
COPY package*.json ./

# Install dependencies with forced architecture
RUN npm install --legacy-peer-deps --fetch-timeout=60000 --fetch-retries=5

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:latest

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to Nginx root
COPY --from=build /app/frontend/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]