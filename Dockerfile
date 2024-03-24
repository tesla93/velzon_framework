# FROM node:alpine
# ENV NODE_ENV=production
# WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install
# COPY . .
# EXPOSE 3000
# RUN chown -R node /usr/src/app
# USER node
# CMD ["npm", "start"]

# FROM node:alpine
# WORKDIR /usr/src/app
# COPY . /usr/src/app
# RUN npm install -g @angular/cli
# RUN npm install
# CMD ["ng", "serve", "--host", "0.0.0.0"]

# Use the official Node.js 20 image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Angular CLI globally
# RUN npm install -g @angular/cli@17.0.0

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the working directory
COPY . .
# RUN NODE_OPTIONS=--max-old-space-size=8192 yarn build

# Build the Angular app
# RUN ng build --prod

# Expose port 80
EXPOSE 8050

# Start the Angular app
CMD ["npm", "start"]
