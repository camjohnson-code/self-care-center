// EVENT HANDLERS
var receiveMessageBtn = document.querySelector(".receive-message");
var messageSection = document.querySelector(".message-section");
var bellIcon = document.querySelector(".icon");
var affirmationBtn = document.querySelector("#affirmation");
var mantraBtn = document.querySelector("#mantra");

// EVENT LISTENERS
receiveMessageBtn.addEventListener("click", function (event) {
  generateMessage(event);
});
affirmationBtn.addEventListener("click", enableButton);
mantraBtn.addEventListener("click", enableButton);

// FUNCTIONS

function enableButton() {
  if (affirmationBtn.checked || mantraBtn.checked)
    receiveMessageBtn.disabled = false;
}

function disableButton() {
  if (!affirmationBtn.checked && !mantraBtn.checked)
    receiveMessageBtn.disabled = true;
}

function generateRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function returnAffirmation() {
  return affirmations[generateRandomNumber(affirmations.length)].message;
}

function returnMantra() {
  return mantras[generateRandomNumber(mantras.length)].message;
}

function makeClearButton() {
  var clearButton = document.createElement("button");
  clearButton.innerText = "Clear";
  clearButton.classList.add("clear-button");
  messageSection.appendChild(clearButton);

  var clearBtn = document.querySelector(".clear-button");

  clearBtn.addEventListener("click", removeMessage);
}

function generateMessage(event) {
  event.preventDefault();

  if (affirmationBtn.checked) {
    bellIcon.classList.add("hidden");
    messageSection.innerHTML = `<p class="message">${returnAffirmation()}</p>`;
  } else {
    bellIcon.classList.add("hidden");
    messageSection.innerHTML = `<p class="message">${returnMantra()}</p>`;
  }

  makeClearButton();
}

function removeMessage() {
  event.preventDefault();

  messageSection.innerHTML = ``;
  messageSection.appendChild(bellIcon);
  bellIcon.classList.remove("hidden");
}

// STARTING CONDITIONS
disableButton();
