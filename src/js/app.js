// An instance of our SimpleMap, created below when the window loads.
let map;

// Update the map to show markers for the set of observations
function updateMap(observations, map) {
  // Clear the current markers on the map (if any)
  map.clear();

  // TODO: call the Simple Map's addObservation method for every one
  // of the observations in order to add markers to the map.
  observations.forEach((observation) => {
    map.addObservation(observation);
  });
}

// Update the cards to show markers for the set of observations
function updateCards(observations) {
  // Remove any current data from the table
  clearCards();

  // Populate the cards with all observation data we want to show
  observations.forEach((observation) => {
    // TODO: call the buildRowForObservation function with the current observation
    // and use that to add it to the card with the addRowToTable function.
    addCard(buildCardForObservation(observation));
  });
}

// Show all species on the map and table
function showAll() {
  // Get all the observations from our data.js and format them so we can work with the data
  filter(null, "All Species");
}

// Show native species on the map and table
function showOnlyNative() {
  filter(filterOnlyNative, "Only Native Species");
}

// Show introduced species on the map and table
function showOnlyIntroduced() {
  // Get all the observations from our data.js and format them so we can work with the data
  filter(filterOnlyIntroduced, "Only Introduced Species");
}

function filter(filterType, title) {
  var temp = getAllObservations();
  if (filterType) {
    temp = filterType(temp);
  }
  updateMap(temp, map);
  updateCards(temp);
  updateTitle(`${title} (${temp.length})`);
}

function start() {
  // Create our map object for Seneca's Newnham campus
  map = new SimpleMap("map-container", 43.7955, -79.3496);

  // TODO: create click handlers for all three buttons.
  // The "All Species" button should call the showAll function.
  // The "Only Native Species" button should call the showOnlyNative function.
  // The "Only Introduced Species" button should call the showOnlyIntroduced function.
  // In your solution, show both ways of creating click event handlers (i.e.,
  // using the on* property and also addEventListener function).
  document.getElementById("show-all").addEventListener("click", showAll);
  document
    .getElementById("show-native")
    .addEventListener("click", showOnlyNative);
  document
    .getElementById("show-introduced")
    .addEventListener("click", showOnlyIntroduced);

  // Show all species observations by default when we start.
  showAll();
}

// TODO: replace this console.log with the code necessary to call the start
// function when the page has finished fully loading.
start();
