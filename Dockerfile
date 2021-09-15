FROM node:16-alpine
COPY ./ ./
WORKDIR ./
RUN npm install
RUN ls
RUN PLAYWRIGHT_BROWSERS_PATH=/usr/src/app/node_modules/playwright yarn add playwright-chromium@1.11.1
RUN npm config set unsafe-perm true
ENTRYPOINT [ "node", "/src/action.js" ]