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

# Expose the port on which your server runs
EXPOSE 4000

# Start the server
CMD ["npm", "start"]