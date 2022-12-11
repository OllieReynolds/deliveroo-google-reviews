import {
  RATINGS_CONTAINER_SELECTOR,
  DEFAULT_RATINGS_CONTAINER_SELECTOR,
  DEFAULT_RATING,
} from "./constants.js";

import getContainer from './utils.js'

async function getRating(name) {
  try {
    // Send a request to the Google Places API to get the rating for the restaurant
    var response = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${name}&inputtype=textquery&fields=rating&key=YOUR_API_KEY`
    );

    // Parse the response as JSON
    var data = await response.json();

    // Get the rating from the response, or use the default rating if the rating is not found
    var rating = data.candidates[0].rating || DEFAULT_RATING;

    return rating;
  } catch (error) {
    // If something went wrong, log the error and return the default rating
    console.error(error);
    return DEFAULT_RATING;
  }
}

async function getRatings(restaurants) {
  // Initialize an empty array to store the ratings
  var ratings = [];

  try {
    // Iterate over the list of restaurants
    for (var restaurant of restaurants) {
      // Get the name of the restaurant
      var name = restaurant.querySelector(RESTAURANT_NAME_SELECTOR).innerText;

      // Get the rating for the restaurant
      var rating = await getRating(name);

      // Add the rating to the array of ratings
      ratings.push(rating);
    }
  } catch (error) {
    // If something went wrong, log the error
    console.error(error);
  }

  return ratings;
}

function insertRatings(restaurants, ratings) {
  try {
    // Iterate over the list of restaurants and their ratings
    for (var i = 0; i < restaurants.length; i++) {
      var restaurant = restaurants[i];
      var rating = ratings[i];

      // Get the container element for the rating using the desired selector
      var container = getContainer(
        restaurant,
        RATINGS_CONTAINER_SELECTOR,
        DEFAULT_RATINGS_CONTAINER_SELECTOR
      );

      // Create the rating element
      var ratingElement = document.createElement("div");
      ratingElement.classList.add("rating");
      ratingElement.innerText = rating;

      // Insert the rating element into the container
      container.appendChild(ratingElement);
    }
  } catch (error) {
    // If something went wrong, log the error
    console.error(error);
  }
}
