# Containerizing Angular Applications

## Step 1: Create a Dockerfile

```dockerfile
# Use an official Node runtime as a base image
FROM node:14-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the entire application
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use Nginx as the final base image
FROM nginx:alpine

# Copy the Angular build files to the Nginx web server directory
COPY --from=build /app/dist/* /usr/share/nginx/html/

# Expose the port on which Nginx will run
EXPOSE 80

# Command to start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]

```

## Step 2: Create a Docker compose file

```yaml
version: '3'
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "80:80"
```

## Step 3: Build the Docker Image:

```bash
docker build -t my-angular-app .
```

## Step 4: Run the Docker Container:

```bash
docker-compose up
```
