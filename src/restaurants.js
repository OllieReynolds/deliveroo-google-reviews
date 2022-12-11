import { RESTAURANT_ITEM_SELECTOR, DEFAULT_RESTAURANT_ITEM_SELECTOR } from "./constants.js";

function getRestaurants() {
    // Get the list of restaurants on the page using the desired selector
    var restaurants = document.querySelectorAll(RESTAURANT_ITEM_SELECTOR);

    if (!restaurants.length) {
        // If no restaurants were found, try using the default selector instead
        restaurants = document.querySelectorAll(DEFAULT_RESTAURANT_ITEM_SELECTOR);

        if (!restaurants.length) {
            // If no restaurants were found using the default selector, throw an error
            throw new Error("No restaurants were found on the page");
        }
    }

    return restaurants;
}
