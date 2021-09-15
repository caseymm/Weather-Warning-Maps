FROM node:16-alpine
COPY ./ ./
WORKDIR ./
RUN ls
RUN rm -rf /node-modules
RUN npm install
ENTRYPOINT [ "node", "/src/action.js" ]