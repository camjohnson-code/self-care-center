// EVENT HANDLERS
var messageBtn = document.querySelector(".receive-message");
var messageSection = document.querySelector(".message-section");
var bellIcon = document.querySelector(".icon");
var affirmationBtn = document.querySelector("#affirmation");
var mantraBtn = document.querySelector("#mantra");

// EVENT LISTENERS
messageBtn.addEventListener("click", function (event) {
  generateMessage(event);
});

// FUNCTIONS
function generateRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function returnAffirmation() {
  return affirmations[generateRandomNumber(affirmations.length)];
}

function returnMantra() {
  return mantras[generateRandomNumber(mantras.length)];
}

function generateMessage(event) {
  event.preventDefault();

  if (affirmationBtn.checked) {
    bellIcon.classList.add("hidden");
    messageSection.innerHTML = `<p class="message">${returnAffirmation()}</p>`;
  } else if (mantraBtn.checked) {
    bellIcon.classList.add("hidden");
    messageSection.innerHTML = `<p class="message">${returnMantra()}</p>`;
  }
}
