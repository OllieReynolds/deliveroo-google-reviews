chrome.runtime.onMessage.addListener(async function (
    msg,
    sender,
    sendResponse
) {
    console.log('received ' + msg.type);
    if (msg.type === 'ACTIVITY_HISTORY_READY') {
        const response: Response = await fetch(
            `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${'foo'}&inputtype=textquery&fields=rating&key=YOUR_API_KEY`
        );

        console.log(response.status);
        console.log(response.statusText);

        const data: unknown = await response.json();

        console.log(data);

        sendResponse(data);
    }
});
