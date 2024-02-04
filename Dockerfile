# Build stage
FROM node:16 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Add your entrypoint script
COPY run.sh ./run.sh
RUN chmod +x ./run.sh
ENTRYPOINT ["sh", "./run.sh"]

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
