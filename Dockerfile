# syntax=docker/dockerfile:1.4
#
# 1. For build React app
FROM node:lts AS development

# Set working directory
WORKDIR /frontend

# Copy package.json and package-lock.json (if available)
COPY /frontend/package.json /frontend/package.json
# COPY package-lock.json frontend/package-lock.json

# Install dependencies
RUN npm i

# Copy all files to the container
COPY . /frontend

# Build the React app
RUN npm run build

# Serve the app
FROM node:lts AS serve

# Copy the build output to the serve stage
COPY --from=development /frontend/build /frontend/build

# Set the command to serve the app
CMD [ "serve", "/frontend/build", "-l", "8080" ]

# Optional: Set up development environment
FROM node:lts AS dev-envs

# Install necessary packages
RUN apt update && \
    apt install -y --no-install-recommends git && \
    useradd -s /bin/bash -m vscode && \
    groupadd docker && \
    usermod -aG docker vscode

# Install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
