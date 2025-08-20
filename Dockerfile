# Stage 1: Build React App
FROM node:20-alpine as build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built app from Stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: copy custom nginx config (for SPA routing)
# If you don't have special routing, you can skip this line
# COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Expose port
EXPOSE 8080

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
