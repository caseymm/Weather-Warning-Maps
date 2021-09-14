// require fs and puppeteer
import fs from "fs";
import puppeteer from "puppeteer";

async function captureScreenshot() {
  // if screenshots directory is not exist then create one
  if (!fs.existsSync("screenshots")) {
    fs.mkdirSync("screenshots");
  }

  let browser = null;

  try {
    // launch headless Chromium browser
    browser = await puppeteer.launch({ headless: true });

    // create new page object
    const page = await browser.newPage();

    // set viewport width and height
    await page.setViewport({ width: 1440, height: 1080 });

    await page.goto("https://caseymm.github.io/mbx-devour/?url=https://red-flag-warnings.s3.us-west-1.amazonaws.com/latest.json&fill=e60000&fill-opacity=.6", { waitUntil: 'networkidle0' });

    // capture screenshot and store it into screenshots directory.
    await page.screenshot({ path: `screenshots/test.jpeg` });
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
  } finally {
    await browser.close();
    console.log(`\n🎉 screenshots captured.`);
  }
}

captureScreenshot();