# syntax=docker/dockerfile:1.4
#
# 1. For build React app
FROM node:lts AS development

# Set working directory
WORKDIR /frontend

# 
COPY /frontend/package.json /frontend/package.json
# COPY package-lock.json frontend/package-lock.json

# Same as npm install
RUN npm i

COPY . /frontend

# CMD [ "npm", "start" ]

FROM development AS build

CMD [ "npm", "run", "build"]

COPY /frontend/build /frontend/build


FROM development as dev-envs
RUN <<EOF
apt update
apt install -y --no-install-recommends git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

CMD [ "serve", "/frontend/build", "-l 8080" ]
