# Weather Warning Maps

### This action:
- pulls the latest data from the National Weather service
- uploads the data to s3
  - if data is new, the action:
    - takes a screenshot via [mbx-devour](https://github.com/caseymm/mbx-devour)
    - tweets a screenshot (or an update saying the watch/warning has been removed)

### Types of weather being mapped:
- Red Flag Warning
- Fire Weather Watch
- Severe Thunderstorm Watch
- Severe Thunderstorm Warning
- Flash Flood Watch
- Flash Flood Warning

### How to run
`yarn run-script`

*There is no build action since this script is being run by github actions
