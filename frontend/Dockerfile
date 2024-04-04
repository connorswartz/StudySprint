# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the frontend dependencies
RUN npm install

# Copy the frontend code to the working directory
COPY . .

# Build the frontend code
RUN npm run build

# Expose the port on which the frontend will run
EXPOSE 3000

# Serve the built frontend files using a static file server
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]