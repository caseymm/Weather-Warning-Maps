import AWS from 'aws-sdk';
import fetch from 'node-fetch';
import twitter from 'twitter-lite';
import playwright from 'playwright';
import dateFormat from 'dateformat';

const events = {
  'Red Flag Warning': {
    'folder': 'rfw',
    'color': 'e60000',
    'message': '🚩 New Red Flag Warning 🚩 \n\nA Red Flag Warning has been issued for these areas. Weather events which may result in extreme fire behavior will occur within 24 hours. This is the highest alert. Please use extreme caution.',
    'alt_message': '🚩 Cleared: Red Flag Warning 🚩 \n\nThere are currently no Red Flag Warnings.'
  },
  'Fire Weather Watch': {
    'folder': 'fww',
    'color': 'ff6d05',
    'message': '🏳 New Fire Weather Watch Alert 🏳 \n\nA Fire Weather Watch has been issued for these areas. Weather events which may result in extreme fire behavior could exist in the next 12-72 hours.',
    'alt_message': '🏳 Cleared: Fire Weather Watch Alert 🏳 \n\nThere are currently no areas under a Fire Weather Watch Alert.'
  },
  'Severe Thunderstorm Watch': {
    'folder': 'stw',
    'color': '808c9e',
    'message': '⛈ New Severe Thunderstorm Watch ⛈ \n\nConditions are favorable for the development of severe thunderstorms in and close to the watch area.',
    'alt_message': '⛈ Cleared: Severe Thunderstorm Watch ⛈ \n\nThere are currently no areas under advisement for Severe Thunderstorm Watch.'
  },
  'Severe Thunderstorm Warning': {
    'folder': 'stwarning',
    'color': '808c9e',
    'message': '⛈ New Severe Thunderstorm Warning ⛈ \n\nA thunderstorm producing hail one inch or larger in diameter and/or winds equal or exceed 58 miles an hour has been reported. People in the affected area should seek safe shelter immediately.',
    'alt_message': '⛈ Cleared: Severe Thunderstorm Warning ⛈ \n\nThere are currently no areas under advisement for Severe Thunderstorm Warning.'
  },
  'Flash Flood Watch': {
    'folder': 'ffw',
    'color': '00008a',
    'message': '🌊 New Flash Flood Watch 🌊 \n\nConditions exist or are developing that that are favorable for flash flooding in and close to the watch area.',
    'alt_message': '🌊 Cleared: Flash Flood Watch 🌊 \n\nThere are currently no areas under advisement for Flash Flooding.'
  },
  'Flash Flood Warning': {
    'folder': 'ffwarning',
    'color': '00008a',
    'message': '🌊 New Flash Flood Warning 🌊 \n\nFlash flooding is in progress, imminent, or highly likely. Please seek shelter.',
    'alt_message': '🌊 Cleared: Flash Flood Warning 🌊 \n\nThere are currently no areas under advisement for Flash Flooding.'
  },
}

const now = new Date();
const dateStr = dateFormat(now, "mm-d-yyyy-hhMMss");

const client = new twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,  
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,  
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,  
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
const uploadClient = new twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,  
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,  
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,  
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  subdomain: "upload"
});

// The name of the bucket that you have created
const BUCKET_NAME = 'weather-warnings';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET
});

const uploadFile = (name, data, ext) => {

  // Setting up S3 upload parameters
  const params = {
      Bucket: BUCKET_NAME,
      Key: `${name}.${ext}`, // File name you want to save as in S3
      Body: data
  };

  // Uploading files to the bucket
  s3.upload(params, function(err, data) {
      if (err) {
          throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
  });
};

async function getObject (bucket, objectKey) {
  try {
    const params = {
      Bucket: bucket,
      Key: objectKey 
    }

    const data = await s3.getObject(params).promise();
    return data.Body.toString('base64');
  } catch (e) {
    throw new Error(`Could not retrieve file from S3: ${e.message}`)
  }
}

async function useTheData(folder, color){
  // this is where screenshot stuff goes
  const browser = await playwright['chromium'].launch();
  const context = await browser.newContext({
    deviceScaleFactor: 2
  });
  const page = await context.newPage();
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.goto(`https://caseymm.github.io/mbx-devour/?url=https://weather-warnings.s3.us-west-1.amazonaws.com/${folder}/latest.json&fill=${color}&fill-opacity=.6`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#hidden', {state: 'hidden'});
  const screenshot = await page.screenshot();
  uploadFile(`${folder}/latest-img`, screenshot, 'png');
  uploadFile(`${folder}/${dateStr}-img`, screenshot, 'png');
  await browser.close();
}

async function getLatestRFW(weatherEvent){
    console.log(weatherEvent)
    const folder = events[weatherEvent].folder;
    const color = events[weatherEvent].color;
    let message = events[weatherEvent].message;

    const rfwUrl = `https://services9.arcgis.com/RHVPKKiFTONKtxq3/ArcGIS/rest/services/NWS_Watches_Warnings_v1/FeatureServer/9/query?where=Event%3D%27${weatherEvent}%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=`;
    const resp = await fetch(rfwUrl);
    const json = await resp.json()

    const latestFileUrl = `https://weather-warnings.s3.amazonaws.com/${folder}/latest.json`;
    const respLatest = await fetch(latestFileUrl);
    const jsonLatest = await respLatest.json();

    // if what we just pulls doesn't equal the lastest version we have, save it
    if(JSON.stringify(json) === JSON.stringify(jsonLatest)){
      console.log(`no new ${weatherEvent} data`);
    } else {
      uploadFile(`${folder}/${dateStr}`, JSON.stringify(json), 'json');
      uploadFile(`${folder}/latest`, JSON.stringify(json), 'json');

      useTheData(folder, color).then(stuff => {
        getObject(BUCKET_NAME, `${folder}/latest-img.png`).then(img => {
          uploadClient.post('media/upload', { media: img }).then(result => {
            let status = {
              status: message,
              media_ids: result.media_id_string
            }
            if(json.features.length === 0){
              status = {
                status: events[weatherEvent].alt_message
              }
            }
            client.post('statuses/update', status).then(result => {
              console.log('You successfully tweeted this : "' + result.text + '"');
            }).catch(console.error);
          }).catch(console.error);
        });
      })
    }
}

Object.keys(events).forEach(weatherEvent => {
  getLatestRFW(weatherEvent);
})


