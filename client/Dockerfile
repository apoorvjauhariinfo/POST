# Use the official Node.js image as the base
FROM node:lts-bullseye

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight server to serve the built React app
FROM nginx:stable-alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]