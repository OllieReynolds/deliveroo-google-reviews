import Geohash from 'latlon-geohash';

async function getRating(msg: any) {
    const geohash = msg.geohash;
    const latlon = Geohash.decode(geohash);

    const req = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=rating%2Cuser_ratings_total&input=${msg.restaurant}&inputtype=textquery&locationbias=circle:5000@${latlon.lat}, ${latlon.lon}&key=${process.env.API_KEY}`;

    console.log(`Request firing to: ${req}`);

    const response: Response = await fetch(req);

    const resPayload: any = await response.json();

    console.log(`Response received: ${JSON.stringify(resPayload)}`);

    return {
        rating: resPayload.candidates[0].rating,
        user_ratings_total: resPayload.candidates[0].user_ratings_total
    };
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    getRating(msg).then((res) => {
        sendResponse({ success: true, data: res });
    });

    return true;
});
