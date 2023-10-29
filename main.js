// EVENT HANDLERS
var receiveMessageBtn = document.querySelector(".receive-message");
var affirmationBtn = document.querySelector("#affirmation");
var mantraBtn = document.querySelector("#mantra");
var favoriteBtn = document.querySelector(".favorite-button");
var clearBtn = document.querySelector(".clear-button");
var viewFavoritesBtn = document.querySelector(".view-favorites");
var homeBtn = document.querySelector(".return-home");
var bellIcon = document.querySelector(".icon");
var heartIcon = document.querySelector("svg");
var selectedMessage = document.querySelector(".selected-message");
var messageSection = document.querySelector(".message-section");
var buttonsDiv = document.querySelector(".buttons-div");
var whichMessageSection = document.querySelector(".which-message");
var favoritesPage = document.querySelector("#favorites-page");

// EVENT LISTENERS
receiveMessageBtn.addEventListener("click", generateMessage);
affirmationBtn.addEventListener("click", enableButton);
mantraBtn.addEventListener("click", enableButton);
clearBtn.addEventListener("click", removeMessage);
favoriteBtn.addEventListener("click", function () {
  toggleIsFavorite();
  changeFavoriteButtonColor();
  showViewFavoritesButton();
  addToLocalStorage();
});
viewFavoritesBtn.addEventListener("click", function () {
  showFavoritesPage();
  generateFavorites();
});
homeBtn.addEventListener("click", showHomePage);

// FUNCTIONS
function disableButton() {
  if (!affirmationBtn.checked && !mantraBtn.checked)
    receiveMessageBtn.disabled = true;
}

function enableButton() {
  if (affirmationBtn.checked || mantraBtn.checked)
    receiveMessageBtn.disabled = false;
}

function generateRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function removeMessage() {
  event.preventDefault();

  bellIcon.classList.remove("hidden");
  buttonsDiv.classList.add("hidden");
  selectedMessage.classList.add("hidden");
}

function generateMessage() {
  event.preventDefault();

  if (affirmationBtn.checked) {
    bellIcon.classList.add("hidden");
    selectedMessage.classList.remove("hidden");
    var affirmationIndex = generateRandomNumber(affirmations.length);
    selectedMessage.innerText = `${affirmations[affirmationIndex].message}`;
  } else {
    bellIcon.classList.add("hidden");
    selectedMessage.classList.remove("hidden");
    var mantraIndex = generateRandomNumber(mantras.length);
    selectedMessage.innerText = `${mantras[mantraIndex].message}`;
  }

  buttonsDiv.classList.remove("hidden");
  changeFavoriteButtonColor();
}

function toggleIsFavorite() {
  if (affirmationBtn.checked) {
    for (var i = 0; i < affirmations.length; i++) {
      if (selectedMessage.innerText === affirmations[i].message) {
        return (affirmations[i].isFavorite = !affirmations[i].isFavorite);
      }
    }
  } else {
    for (var i = 0; i < mantras.length; i++) {
      if (selectedMessage.innerText === mantras[i].message) {
        return (mantras[i].isFavorite = !mantras[i].isFavorite);
      }
    }
  }
}

function changeFavoriteButtonColor() {
  if (affirmationBtn.checked) {
    for (var i = 0; i < affirmations.length; i++) {
      if (selectedMessage.innerText === affirmations[i].message) {
        if (affirmations[i].isFavorite) {
          heartIcon.classList.add("favorite-activated");
        } else {
          heartIcon.classList.remove("favorite-activated");
        }
      }
    }
  } else {
    for (var i = 0; i < mantras.length; i++) {
      if (selectedMessage.innerText === mantras[i].message) {
        if (mantras[i].isFavorite) {
          heartIcon.classList.add("favorite-activated");
        } else {
          heartIcon.classList.remove("favorite-activated");
        }
      }
    }
  }
}

function showViewFavoritesButton() {
  var showButton = false;

  for (var i = 0; i < affirmations.length; i++) {
    if (affirmations[i].isFavorite) showButton = true;
  }

  if (!showButton) {
    for (var i = 0; i < mantras.length; i++) {
      if (mantras[i].isFavorite) showButton = true;
    }
  }

  if (showButton) {
    viewFavoritesBtn.classList.remove("hidden");
  } else {
    viewFavoritesBtn.classList.add("hidden");
  }
}

function checkIfFavorite() {
  var localStorageFavorites = [];

  for (var i = 0; i < affirmations.length; i++) {
    if (affirmations[i].isFavorite)
      localStorageFavorites.push(affirmations[i].message);
  }

  for (var i = 0; i < mantras.length; i++) {
    if (mantras[i].isFavorite) localStorageFavorites.push(mantras[i].message);
  }

  return localStorageFavorites;
}

function addToLocalStorage() {
  localStorage.setItem("favoriteMessages", JSON.stringify(checkIfFavorite()));
}

function initializeFavorites() {
  var storedFavorites = localStorage.getItem("favoriteMessages");
  var favoriteMessages = [];

  if (storedFavorites) favoriteMessages = JSON.parse(storedFavorites);

  for (var i = 0; i < affirmations.length; i++) {
    affirmations[i].isFavorite = favoriteMessages.includes(
      affirmations[i].message
    );
  }

  for (var i = 0; i < mantras.length; i++) {
    mantras[i].isFavorite = favoriteMessages.includes(mantras[i].message);
  }
}

function showFavoritesPage() {
  favoritesPage.classList.remove("hidden");
  favoritesPage.classList.add("favorites-page");
  whichMessageSection.classList.add("hidden");
  messageSection.classList.add("hidden");
  homeBtn.classList.remove("hidden");
  viewFavoritesBtn.classList.add("hidden");
}

function generateFavorites() {
  favoritesPage.innerHTML = "";

  for (var i = 0; i < affirmations.length; i++) {
    if (affirmations[i].isFavorite) {
      var newFavorite = document.createElement("section");
      var favoritedMessage = document.createElement("p");

      favoritesPage.appendChild(newFavorite);
      newFavorite.appendChild(favoritedMessage);
      favoritedMessage.innerText = `${affirmations[i].message}`;
      newFavorite.classList.add("message-section");
      favoritedMessage.classList.add("message");
    }
  }

  for (var i = 0; i < mantras.length; i++) {
    if (mantras[i].isFavorite) {
      var newFavorite = document.createElement("section");
      var favoritedMessage = document.createElement("p");

      favoritesPage.appendChild(newFavorite);
      newFavorite.appendChild(favoritedMessage);
      favoritedMessage.innerText = `${mantras[i].message}`;
      newFavorite.classList.add("message-section");
      favoritedMessage.classList.add("message");
    }
  }
}

function showHomePage() {
  favoritesPage.classList.add("hidden");
  whichMessageSection.classList.remove("hidden");
  messageSection.classList.remove("hidden");
  homeBtn.classList.add("hidden");
  viewFavoritesBtn.classList.remove("hidden");
  favoritesPage.classList.add("hidden");
  favoritesPage.classList.remove("favorites-page");
}

// STARTING CONDITIONS
disableButton();
initializeFavorites();
showViewFavoritesButton();
