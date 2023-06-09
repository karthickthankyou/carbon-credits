# Choose the base image for the build stage
FROM node:16-alpine as build

# Create the working directory
WORKDIR /app

# Install python and make
RUN apk add --update --no-cache python3 make g++

# Copy the entire monorepo into the working directory
COPY . .

# Install dependencies
RUN npm install

# Build the application
RUN cd /app/apps/api && yarn run build

# Start the final image
FROM node:16-alpine

# Create a new directory for the app
WORKDIR /app

# Install python and make
RUN apk add --update --no-cache python3 make g++

# Copy the built files from the previous stage
COPY --from=build /app/apps/api/dist ./dist

# Copy the package.json file
COPY --from=build /app/apps/api/package.json ./package.json


# Install dependencies in the new directory
RUN npm install --omit=dev

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
