chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getRatings") {
        // Retrieve ratings from Google Reviews and insert them into the page
        // ...
    }
});
