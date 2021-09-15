FROM node:16-alpine
COPY ./ ./
WORKDIR ./
RUN npm install
RUN npm i --save playwright
ENTRYPOINT [ "node", "/src/action.js" ]