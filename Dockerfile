# Use the official Node.js 20 image as a parent image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of your app's source code, excluding the public folder
COPY . .
RUN rm -rf public

# Build your Next.js app
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
