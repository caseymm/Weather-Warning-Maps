FROM node:16-alpine
COPY ./ ./
WORKDIR ./
RUN npm install
# RUN PLAYWRIGHT_BROWSERS_PATH=/usr/lib/playwright npm install -g --unsafe-perm playwright-chromium@1.11.1
ENTRYPOINT [ "node", "/src/action.js" ]