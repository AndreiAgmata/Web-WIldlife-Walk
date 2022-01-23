// Add the text to the <span>...<span> element in the element with id=cards-title
function updateTitle(title) {
  const table = document.getElementById("cards-title");
  const text = createText(title);
  const span = table.querySelector("span");
  span.innerText = "";
  span.appendChild(text);
}

// Add the <div> element to the div element with id=observation-cards
function addCard(card) {
  var cards = document.getElementById("observation-cards");
  cards.appendChild(card);
}

// Remove all content from the div element with id=observation-cards
function clearCards() {
  var parent = document.getElementById("observation-cards");
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// Creates and returns new card <div> elements
function createCard(id) {
  var cardElement = document.createElement("div");
  cardElement.setAttribute("class", "card");
  cardElement.setAttribute("id", id);
  return cardElement;
}

// adds a child card element to the parent card
function addContentToCard(child, card) {
  card.appendChild(child);
  return card;
}

// Given a URL src string and alt text string, create an <img> element and return:
// <img src="https://static.inaturalist.org/photos/109319291/square.jpg?1609877680" alt="Muskrat">
function createImg(src, alt) {
  var image = document.createElement("img");
  image.setAttribute("src", src);
  image.setAttribute("alt", alt);
  return image;
}

// Given a string of text, create and return a TextNode
// https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode
function createText(text) {
  var textNode = document.createTextNode(text);
  return textNode;
}

// create and return an anchor element.
// <a href="http://en.wikipedia.org/wiki/Muskrat">Muskrat</a>.  NOTE:
// The innerContent will be a TextNode or HTML Img Element (i.e., it
// won't be simple text).
function createAnchor(href, innerContent) {
  var a = document.createElement("a");
  a.appendChild(innerContent);
  a.href = href;
  return a;
}

// Return a proper time element with its dateTime property set:
// <time datetime="2020-09-18">2020-09-18</time>
function createTime(formatted) {
  var time = document.createElement("time");
  time.dateTime = formatted;
  time.innerText = formatted;
  return time;
}

// Given a boolean value (true/false) return a string "Yes" or "No"
function toYesNo(value) {
  if (value) {
    return "Yes";
  } else {
    return "No";
  }
}

function buildCardForObservation(observation) {
  var card = createCard(observation.id);
  var img = cardImg(observation.photoUrl);
  card = addContentToCard(img, card);
  var body = cardBody(
    observation.name,
    formatDate(observation.date.toLocaleDateString()),
    observation.uri,
    observation.wikipediaUrl
  );
  card = addContentToCard(body, card);
  var icons = cardIcons(
    observation.isNative,
    observation.isIntroduced,
    observation.isThreatened,
    observation.isEndangered
  );
  card = addContentToCard(icons, card);
  return card;
}

function cardImg(uri) {
  var newUrl;
  newUrl = uri.replace("square", "medium");
  var newDiv = document.createElement("div");
  newDiv.className += "card-img";
  newDiv.setAttribute("style", `background-image: url("${newUrl}")`);
  return newDiv;
}

function cardBody(name, date, uri, wikipediaUrl) {
  var newDiv = document.createElement("div");
  newDiv.className += "card-body";
  var h4 = document.createElement("h4");
  var h3 = document.createElement("h3");
  h3.appendChild(createAnchor(wikipediaUrl, createText(name)));
  h4.appendChild(createAnchor(uri, createText(date)));
  newDiv.appendChild(h3);
  newDiv.appendChild(h4);
  return newDiv;
}

function cardIcons(isNative, isIntroduced, isThreatened, isEndangered) {
  var newDiv = document.createElement("div");
  newDiv.setAttribute("class", "card-icons");
  if (isNative) {
    var i = document.createElement("i");
    i.setAttribute("class", "fas fa-leaf");
    i.setAttribute("title", "Native");
    newDiv.appendChild(i);
  }
  if (isIntroduced) {
    var i = document.createElement("i");
    i.setAttribute("class", "fas fa-frog");
    i.setAttribute("title", "Introduced");
    newDiv.appendChild(i);
  }
  if (isThreatened) {
    var i = document.createElement("i");
    i.setAttribute("class", "fas fa-radiation-alt");
    i.setAttribute("title", "Threatened");
    newDiv.appendChild(i);
  }
  if (isEndangered) {
    var i = document.createElement("i");
    i.setAttribute("class", "fas fa-skull-crossbones");
    i.setAttribute("title", "Endangered");
    newDiv.appendChild(i);
  }
  return newDiv;
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
}
