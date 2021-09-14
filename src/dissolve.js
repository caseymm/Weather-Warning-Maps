// this does not Work -- either too big or malformed

import simplify from '@turf/simplify';
// import rewind from '@mapbox/geojson-rewind';
import gp from "geojson-precision";
import dissolve from 'geojson-dissolve';
import * as data from '../test-geojson.js';
import mapCoordinates from 'geojson-apply-right-hand-rule';


// const dissolved = dissolve(data.default);
var options = {tolerance: 0.15, highQuality: true, mutate: true};
var simplified = simplify(data.default, options);
// console.log(simplified)

const trimmed = gp.parse(simplified, 1);

let fc = {"type":"FeatureCollection","features": []};

trimmed.features.forEach(f => {
  if (f.geometry.type === 'MultiPolygon'){
    for (var i=0; i < f.geometry.coordinates.length; i++){
      let polygon = {
          'type':'Polygon', 
          'coordinates': f.geometry.coordinates[i]
      };

      let feature = {
        type: 'Feature',
        // geometry: rewind(polygon),
        geometry: polygon,
        properties: {"fill": "#e60000","fill-opacity": .6}
      }

      fc.features.push(feature);
    }
  } else {
    f.properties = {"fill": "#e60000","fill-opacity": .6};
    fc.features.push(f);
  }
})

// console.log(JSON.stringify(rewind(fc, false)))

const dataStr = encodeURIComponent(JSON.stringify(rewind(fc, false)));
const imageData = `https://api.mapbox.com/styles/v1/caseymmiler/cktf3jdcs2ws819qttibvokom/static/geojson(${dataStr})/auto/500x600@2x?before_layer=admin-0-boundary&access_token=pk.eyJ1IjoiY2FzZXltbWlsZXIiLCJhIjoiY2lpeHY1bnJ1MDAyOHVkbHpucnB1dGRmbyJ9.TzUoCLwyeDoLjh3tkDSD4w`
console.log(imageData);