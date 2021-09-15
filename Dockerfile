FROM node:16-alpine
COPY ./ ./
WORKDIR ./
RUN npm install
RUN npm install playwright
ENTRYPOINT [ "node", "/src/action.js" ]