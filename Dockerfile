FROM node:16-alpine
COPY ./ ./
WORKDIR ./
RUN npm install
RUN npx playwright install
ENTRYPOINT [ "node", "/src/action.js" ]