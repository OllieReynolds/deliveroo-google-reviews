import { getRestaurants } from "./restaurants.js";
import { getRatings, insertRatings } from "./ratings.js";

// Define the getAndInsertRatings function
async function getAndInsertRatings() {
    try {
        // Get the list of restaurants on the page
        var restaurants = getRestaurants();

        // Get the ratings for the restaurants
        var ratings = await getRatings(restaurants);

        // Insert the ratings into the page
        insertRatings(restaurants, ratings);
    } catch (error) {
        // Log the error if something went wrong
        console.error(error);
    }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getAndInsertRatings") {
    getAndInsertRatings();
  }
});
