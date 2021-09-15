FROM node:16-alpine
COPY ./ ./
WORKDIR ./
RUN npm install
RUN npm install playwright-chromium@1.11.1
ENTRYPOINT [ "node", "/src/action.js" ]