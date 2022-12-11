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
