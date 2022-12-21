# google-review-extension

Overlays google reviews on Deliveroo

## Prerequisites

1. NodeJS v14.16.0 or compatible
2. Google Places API Key: https://developers.google.com/maps/documentation/places/web-service/cloud-setup

## Build

1. Clone the repo
2. Create .env file in root of project directory
3. Set your Google Places API key in .env file in root of project directory
4. Run `npm i`
5. Run `npm run build`
6. Root directory of extension lives in dist folder - load into chrome://extensions
