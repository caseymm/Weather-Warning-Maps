FROM node:16-alpine
COPY ./ ./
WORKDIR ./
RUN rm -rf /node-modules
RUN npm install
ENTRYPOINT [ "node", "/src/action.js" ]