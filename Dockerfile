FROM node:16-alpine
COPY src src
WORKDIR /
RUN npm install
ENTRYPOINT [ "node", "/src/index.js" ]