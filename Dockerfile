FROM node:16-alpine
COPY ./ ./
WORKDIR ./
RUN npm install
RUN PLAYWRIGHT_BROWSERS_PATH=/usr/lib/playwright yarn add playwright-chromium@1.11.1
ENTRYPOINT [ "node", "/src/action.js" ]