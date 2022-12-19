window.addEventListener("load", getAndInsertRatings, false);

// #home-feed-container > div > ul > li:nth-child(2) > div.Carousel-7ebf786c2374ca6b > div > ul > li:nth-child(1) > div > div > a > span > span.HomeFeedUICard-ab5ca5bc562e50cd > div > ul > li:nth-child(1) > span > p
// #home-feed-container > div > ul > li:nth-child(2) > div.Carousel-7ebf786c2374ca6b > div > ul > li:nth-child(2) > div > div > a > span > span.HomeFeedUICard-ab5ca5bc562e50cd > div > ul > li:nth-child(1) > span > p

// #home-feed-container > div > ul > li:nth-child(2) > div.Carousel-7ebf786c2374ca6b > div > ul > li:nth-child(2) > div > div > a > span > span.HomeFeedUICard-ab5ca5bc562e50cd > div > ul > li:nth-child(1) > span > p

// #home-feed-container > div > ul > li:nth-child(6) > div.Carousel-7ebf786c2374ca6b > div > ul > li:nth-child(2) > div > div > a > span > span.HomeFeedUICard-ab5ca5bc562e50cd > div.HomeFeedUICard-b69bd49414a33f36.HomeFeedUICard-5d60bf3bab3dc6f0 > ul > li:nth-child(1) > span > p
// #home-feed-container > div > ul > li:nth-child(7) > div.Carousel-7ebf786c2374ca6b > div > ul > li:nth-child(2) > div > div > a > span > span.HomeFeedUICard-ab5ca5bc562e50cd > div.HomeFeedUICard-b69bd49414a33f36.HomeFeedUICard-5d60bf3bab3dc6f0 > ul > li:nth-child(1) > span > p

// Define the getAndInsertRatings function
async function getAndInsertRatings() {
  console.log("-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n");

  try {
    // Get the list of restaurants on the page
    var restaurants = getRestaurants();

    // Get the ratings for the restaurants
    var ratings = await getRatings(restaurants);

    // Insert the ratings into the page
    insertRatings(restaurants, ratings);
  } catch (error) {
    // Log the error if something went wrong
    console.log(error);
  }

  console.log("-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n-\n");
}

const RESTAURANT_NAME_SELECTOR = ".restaurant-name";
const RESTAURANT_ITEM_SELECTOR =
  "#home-feed-container > div > ul > li:nth-child(2) > div.Carousel-7ebf786c2374ca6b > div > ul > li:nth-child(1) > div > div > a > span > span.HomeFeedUICard-ab5ca5bc562e50cd > div > ul > li:nth-child(1) > span > p"; //".restaurant-item";
const RATINGS_CONTAINER_SELECTOR = ".ratings-container";
const DEFAULT_RESTAURANT_ITEM_SELECTOR = ".restaurant-item";
const DEFAULT_RATINGS_CONTAINER_SELECTOR = ".ratings-container";
const DEFAULT_RATING = "N/A";

function getContainer(restaurant, selector, defaultSelector) {
  // Get the container element for the rating using the desired selector
  var container = restaurant.querySelector(selector);

  if (!container) {
    // If the container element was not found, try using the default selector instead
    container = restaurant.querySelector(defaultSelector);

    if (!container) {
      // If the container element was not found using the default selector, throw an error
      throw new Error("Unable to find the container");
    }
  }

  return container;
}

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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
  }
}

function getRestaurants() {
  // Get the list of restaurants on the page using the desired selector
  var homeFeedGridList = document.querySelectorAll(
    "#home-feed-container > div > ul"
  )[0].childNodes;

  homeFeedGridList.forEach(restaurant => {
    try {
        //"div > div > a > span > span:nth-child(2) > div:nth-child(2) > ul > li:nth-child(1) > span > p"
        var restaurantInfoNode = restaurant.querySelector('div div a span span:nth-child(2) div:nth-child(2) ul');
        var restaurantName = restaurantInfoNode.querySelector('li:nth-child(1) span p').innerText;
        var restaurantRating = restaurantInfoNode.querySelector('li:nth-child(2) span p').innerText;
        var restaurantDistance = restaurantInfoNode.querySelector('li:nth-child(3) span p').innerText;
        console.log(`----------------------------------`)
        console.log(restaurantName);
        console.log(restaurantRating);
        console.log(restaurantDistance);
        console.log(`----------------------------------`)
      } catch (error) {
        // ignore
      }
  })

  console.log(`Retrieved ${homeFeedGridList.length} homeFeedGridList items.`);

  if (!restaurants.length) {
    // If no restaurants were found, try using the default selector instead
    restaurants = document.querySelectorAll(DEFAULT_RESTAURANT_ITEM_SELECTOR);

    if (!restaurants.length) {
      // If no restaurants were found using the default selector, throw an error
      throw new Error("No restaurants were found on the page");
    }
  }

  console.log(`Retrieved ${restaurants.length} restaurants.`);

  return restaurants;
}
