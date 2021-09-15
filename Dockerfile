FROM node:14.17-alpine
COPY ./ ./
WORKDIR ./
RUN npm install
ENTRYPOINT [ "node", "/src/action.js" ]