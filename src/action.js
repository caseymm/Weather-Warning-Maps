import AWS from 'aws-sdk';
import fetch from 'node-fetch';

// Enter copied or downloaded access ID and secret key here
const ID = 'AKIA3ZAQNP727TDDT353';
const SECRET = '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';

// The name of the bucket that you have created
const BUCKET_NAME = 'red-flag-warnings';

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

const uploadFile = (name, data) => {
  // Read content from the file
  // const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
      Bucket: BUCKET_NAME,
      Key: `${name}.json`, // File name you want to save as in S3
      Body: JSON.stringify(data)
  };

  // Uploading files to the bucket
  s3.upload(params, function(err, data) {
      if (err) {
          throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
  });
};

async function getLatestRFW(){
  const rfwUrl = 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/ArcGIS/rest/services/NWS_Watches_Warnings_v1/FeatureServer/9/query?where=Event%3D%27Red+Flag+Warning%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=';
  const resp = await fetch(rfwUrl);
  const json = await resp.json()

  const latestFileUrl = 'https://red-flag-warnings.s3.amazonaws.com/latest.json';
  const respLatest = await fetch(latestFileUrl);
  const jsonLatest = await respLatest.json();

  // if what we just pulls doesn't equal the lastest version we have, save it
  if(JSON.stringify(json) !== JSON.stringify(jsonLatest)){
    uploadFile(new Date(), json);
    uploadFile('latest', json);
  } else {
    console.log('no new data');
  }
  
}

getLatestRFW();