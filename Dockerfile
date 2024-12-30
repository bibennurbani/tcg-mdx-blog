# Use the official Node.js 20 image as a parent image
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml (if available)
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of your app's source code, excluding the public folder
COPY . .

# Build Next.js app
RUN pnpm build

# Expose the port Next.js runs on
EXPOSE 3000

# Run the app
CMD ["pnpm", "start"]

