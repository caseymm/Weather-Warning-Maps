FROM node:16-alpine
COPY ./ ./
WORKDIR ./
RUN npm install
ENTRYPOINT [ "node", "/src/action.js" ]