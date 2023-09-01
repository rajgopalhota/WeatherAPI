const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector('.search-box');
const wedisplay = document.getElementById('wedisplay');
const errorMessage = document.querySelector('.error-message');

searchbox.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    getResults(searchbox.value);
  }
});

document.getElementById('btn').addEventListener('click', () => {
  getResults(searchbox.value);
});

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Weather data not found for the entered location.');
      }
      return response.json();
    })
    .then(displayResults)
    .catch((error) => {
      displayErrorMessage(error.message);
    });
}

function displayResults(weather) {
  const city = document.querySelector('.location .city');
  const date = document.querySelector('.location .date');
  const temp = document.querySelector('.current .temp');
  const weatherEl = document.querySelector('.current .weather');
  const hiLow = document.querySelector('.hi-low');

  city.innerText = `${weather.name}, ${weather.sys.country}`;
  const now = new Date();
  date.innerText = dateBuilder(now);
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
  weatherEl.innerText = weather.weather[0].main;
  hiLow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;

  // Show weather display and hide error message
  wedisplay.style.display = 'block';
  errorMessage.style.display = 'none';
}

function displayErrorMessage(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  // Hide weather display
  wedisplay.style.display = 'none';
}
// this isfor time display
// Function to format the date and time
function dateBuilder(d) {
  const hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
  const minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
  return `${hours}:${minutes}`;
}

// Function to update the time
function updateTime() {
  const date = new Date();
  const timeString = dateBuilder(date);
  document.getElementById("p1").innerHTML = timeString;
}

// Set an initial time when the page loads
updateTime();

// Update the time every second (1000 milliseconds)
setInterval(updateTime, 1000);
