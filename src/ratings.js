async function getRating(name) {
  // Use the Google Maps API to search for the restaurant and get its rating
  var mapsUrl =
    "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
    encodeURIComponent(name) +
    "&key=YOUR_API_KEY";
  var response = await fetch(mapsUrl);

  if (!response.ok) {
    // If the response is not OK, throw an error
    throw new Error("Failed to retrieve ratings");
  }

  var data = await response.json();

  // Check if there are any results for the restaurant
  if (data.results.length > 0) {
    // Get the first result
    var result = data.results[0];
    // Return the rating for the result
    return result.rating;
  }
}

function insertRatings(restaurants, ratings) {
  // Iterate over the ratings array
  for (var i = 0; i < ratings.length; i++) {
    var rating = ratings[i];

    // Create a span element
    var ratingSpan = document.createElement("span");
    ratingSpan.classList.add("google-rating");
    ratingSpan.textContent = rating;

    // Insert the span element into the page
    restaurants[i].appendChild(ratingSpan);
  }
}
