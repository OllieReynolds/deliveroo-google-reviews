# deliveroo-google-reviews

- Overlays google reviews on Deliveroo on any /menu page
- Uses geohash of signed in Deliveroo user and queries Maps API for the rating for the restaurant
- Restaurant name is retrieved using CSS selectors on /menu page
- Google reviews will display on the same line as the Deliveroo rating
- Only active on /menu page of Deliveroo website

## Prerequisites

1. NodeJS v14.16.0 or compatible
2. Google Places API Key: https://developers.google.com/maps/documentation/places/web-service/cloud-setup

## Build

1. Clone the repo
2. Create .env file in root of project directory
3. Set your Google Places API key in .env file in root of project directory
4. Run `npm i`
5. Run `npm run build`
6. Load `/dist` directory into `chrome://extensions` in Google Chrome
