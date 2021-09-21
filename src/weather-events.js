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
  'Hurricane Watch': {
    'folder': 'hw',
    'color': '00ceed',
    'message': '🌀 New Hurricane Watch 🌀 \n\nA tropical cyclone containing winds of at least 74 MPH poses a possible threat, generally within 48 hours. A watch does not mean hurricane conditions will occur, only that these conditions are possible.',
    'alt_message': '🌀 Cleared: Hurricane Watch 🌀 \n\nThere are currently no areas under advisement for Hurricane Watch.'
  },
  'Hurricane Warning': {
    'folder': 'hwarning',
    'color': '00ceed',
    'message': '🌀 New Hurricane Warning 🌀 \n\nHurricane conditions (sustained winds of 74 mph+) are expected in this area. This warning is usually issued 36 hours in advance of tropical storm-force winds to give you time to complete your preparations. Evacuate immediately if so ordered.',
    'alt_message': '🌀 Cleared: Hurricane Warning 🌀 \n\nThere are currently no areas under advisement for Hurricane Warning.'
  },
  'Tornado Watch': {
    'folder': 'tw',
    'color': 'f0c829',
    'message': '🌪 New Tornado Watch 🌪 \n\nConditions are favorable for the development of tornadoes in and close to the watch area. This type of alert is usually issued for a duration of 4 to 8 hours.',
    'alt_message': '🌪 Cleared: Tornado Watch 🌪 \n\nThere are currently no areas under advisement for Tornado Watch.'
  },
  'Tornado Warning': {
    'folder': 'twarning',
    'color': 'f0c829',
    'message': '🌪 New Tornado Warning 🌪 \n\nA tornado is indicated by the WSR-88D radar or has been sighted by spotters. People in the affected area should seek safe shelter immediately.',
    'alt_message': '🌪 Cleared: Tornado Warning 🌪 \n\nThere are currently no Tornado Warnings in place.'
  },
  'Tropical Storm Watch': {
    'folder': 'tsw',
    'color': '017a01',
    'message': '☔️ New Tropical Storm Watch ☔️ \n\nTropical storm conditions (sustained winds of 39 to 73 mph) are possible within the specified area within 48 hours.',
    'alt_message': '☔️ Cleared: Tropical Storm Watch ☔️ \n\nThere are currently no areas under advisement for Tropical Storm Watch.'
  },
  'Tropical Storm Warning': {
    'folder': 'tswarning',
    'color': '017a01',
    'message': '☔️ New Tropical Storm Warning ☔️ \n\nTropical storm conditions (sustained winds of 39 to 73 mph) are expected within your area within 36 hours.',
    'alt_message': '☔️ Cleared: Tropical Storm Warning ☔️ \n\nThere are currently no Tropical Storm Warnings in place.'
  }
};

export { events };