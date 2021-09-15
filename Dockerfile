FROM node:16-alpine
COPY ./ ./
WORKDIR ./
RUN ls home
RUN npm install
ENTRYPOINT [ "node", "/src/action.js" ]