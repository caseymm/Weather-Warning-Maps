import fetch from 'node-fetch';
import twitter from 'twitter-lite';
import dateFormat from 'dateformat';
import { events } from './weather-events.js';
import { uploadFile } from './actions.js';

const now = new Date();
const dateStr = dateFormat(now, "mm-d-yyyy-hhMMss");

const client = new twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,  
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,  
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,  
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

let haveUpdates = [];
let ct = 0;

async function getLatestRFW(weatherEvent){
    console.log(weatherEvent)
    const folder = events[weatherEvent].folder;

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
      await uploadFile(`${folder}/${dateStr}`, JSON.stringify(json), 'json');
      await uploadFile(`${folder}/latest`, JSON.stringify(json), 'json');

      if(json.features.length === 0){
        const status = {
          status: events[weatherEvent].alt_message
        };
        client.post('statuses/update', status).then(result => {
          console.log('You successfully tweeted this : "' + result.text + '"');
        }).catch(console.error);
      } else {
        // doing this because I'm trying to bust the cache on the latest data
        haveUpdates.push(weatherEvent)
      }
      ct++;
      if(ct === Object.keys(events).length){
        // Write the file
        await uploadFile(`events-to-update`, JSON.stringify(haveUpdates), 'json');
      }
    }
}

Object.keys(events).forEach((weatherEvent, idx) => {
  getLatestRFW(weatherEvent);
})


