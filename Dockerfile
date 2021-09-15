FROM node:16-alpine
COPY ./ ./
WORKDIR ./
RUN npm install
RUN ls
RUN PLAYWRIGHT_BROWSERS_PATH=/node_modules/playwright yarn add playwright-chromium@1.11.1
ENTRYPOINT [ "node", "/src/action.js" ]