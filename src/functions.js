import { getRestaurants } from "./restaurants.js";
import { getRating, insertRatings } from "./ratings.js";

async function getAndInsertRatings() {
  // Get the list of restaurants
  var restaurants = getRestaurants();

  // Map the list of restaurants to an array of ratings
  var ratings = await Promise.all(
    restaurants.map(async (restaurant) => {
      // Get the name of the restaurant
      var restaurantName =
        restaurant.querySelector(".restaurant-name").textContent;

      // Get the rating for the restaurant
      var rating = await getRating(restaurantName);

      return rating;
    })
  );

  // Call the insertRatings function
  insertRatings(restaurants, ratings);
}
