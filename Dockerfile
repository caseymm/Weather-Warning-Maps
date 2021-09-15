FROM node:16-alpine
COPY ./ ./
WORKDIR ./
RUN npm install
RUN npx playwright install chromium
ENTRYPOINT [ "node", "/src/action.js" ]