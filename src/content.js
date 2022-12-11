import { getAndInsertRatings } from "./functions.js";

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getAndInsertRatings") {
    getAndInsertRatings();
  }
});
