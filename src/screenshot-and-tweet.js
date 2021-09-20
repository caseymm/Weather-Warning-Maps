import fetch from 'node-fetch';
import twitter from 'twitter-lite';
import { events } from './weather-events.js';
import { useTheData } from './actions.js';

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

async function screenshotAndTweet(weatherEvent){
  console.log(weatherEvent)
  const folder = weatherEvent.folder;
  const color = weatherEvent.color;
  let message = weatherEvent.message;

  useTheData(folder, color).then(img => {
    uploadClient.post('media/upload', { media_data: img.toString('base64') }).then(result => {
      const status = {
        status: message,
        media_ids: result.media_id_string
      }
      client.post('statuses/update', status).then(result => {
        console.log('You successfully tweeted this : "' + result.text + '"');
      }).catch(console.error);
    }).catch(console.error);
  });
}

async function getWeatherEvents(){
  const latestFileUrl = `https://weather-warnings.s3.amazonaws.com/events-to-update.json`;
  const respLatest = await fetch(latestFileUrl);
  const weatherEvents = await respLatest.json();
  if(weatherEvents.length > 0){
    weatherEvents.forEach(we => {
      screenshotAndTweet(events[we]);
    })
  } else {
    console.log('Nothing to update');
  }
}

getWeatherEvents();