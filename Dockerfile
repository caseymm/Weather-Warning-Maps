FROM node:16-alpine
COPY dist dist
RUN npm install
ENTRYPOINT [ "node", "/src/index.js" ]