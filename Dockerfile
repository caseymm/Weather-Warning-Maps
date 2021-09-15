FROM node:16-alpine
COPY ./ ./
WORKDIR ./
RUN npm install
# RUN PLAYWRIGHT_BROWSERS_PATH=/github/home/.cache/ms-playwright/chromium-907428/chrome-linux/chrome npm install -g --unsafe-perm playwright-chromium@1.11.1
ENTRYPOINT [ "node", "/src/action.js" ]