FROM node:16-alpine
COPY ./ ./
WORKDIR ./
RUN PLAYWRIGHT_BROWSERS_PATH=/usr/lib/playwright yarn add playwright-chromium@1.11.1
RUN npm install
ENTRYPOINT [ "node", "/src/action.js" ]