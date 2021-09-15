FROM node:14.17-alpine
COPY ./ ./
WORKDIR ./
RUN npm install
RUN npm i --save playwright
ENTRYPOINT [ "node", "/src/action.js" ]