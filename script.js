const clock = document.getElementById("clock");
const dateElem = document.getElementById("date");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const historyList = document.getElementById("history");
const quoteElem = document.getElementById("quote");
const bgVideo = document.getElementById("bgVideo");

// Quotes
const quotes = {
  sad: [
    "Tears are words the heart can't express.",
    "Sometimes, it's okay not to be okay.",
    "Rain falls because the clouds can’t handle the weight.",
    "Let the rain wash away the pain.",
    "Crying is how your heart speaks.",
    "The soul heals in silence.",
    "Scars are proof you survived."
  ],
  moody: [
    "Silence is better than unnecessary drama.",
    "Not mad, just distant.",
    "Let me vibe in peace.",
    "Moody, but beautifully complex.",
    "Don't confuse my mood with my intent.",
    "Peace is the new luxury.",
    "Don't interrupt my solitude."
  ],
  love: [
    "Your love is all I need.",
    "Every love story is beautiful, but ours is my favorite.",
    "You complete me.",
    "In your smile, I see stars.",
    "Love is not what you say, it’s what you do.",
    "My favorite place is next to you.",
    "You're the reason I believe in love."
  ]
};

// Mood videos
const videos = {
  sad: ["sad1.webm", "sad2.webm", "sad3.webm", "sad4.webm"],
  moody: ["moody1.webm", "moody2.webm", "moody3.webm", "moody4.webm"],
  love: ["love1.webm", "love2.webm", "love3.webm", "love4.webm"]
};

// Set clock and date
function updateTimeAndDate() {
    const now = new Date();
  
    // Update Clock
    const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
    clock.textContent = timeStr;
  
    // Update Date (Long format)
    const dateStr = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    dateElem.textContent = dateStr;
  }
  
  // Call initially
  updateTimeAndDate();
  // Then update every second
  setInterval(updateTimeAndDate, 1000);
  

// Mood switch
document.querySelectorAll(".mood-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const mood = btn.dataset.mood;
    localStorage.setItem("mood", mood);
    loadMood(mood);
  });
});

function loadMood(mood) {
  // Change quote
  const q = quotes[mood];
  quoteElem.textContent = q[Math.floor(Math.random() * q.length)];

  // Random video
  const vList = videos[mood];
  const vidName = vList[Math.floor(Math.random() * vList.length)];
  bgVideo.src = `assets/videos/${mood}/${vidName}`;
  bgVideo.load();
  bgVideo.play();
}

// Load saved mood
const savedMood = localStorage.getItem("mood") || "moody";
loadMood(savedMood);

// Search handling
searchForm.addEventListener("submit", () => {
  const term = searchInput.value.trim();
  if (!term) return;
  addToHistory(term);
});

function addToHistory(term) {
  const item = document.createElement("li");
  item.innerHTML = `${term} <span style="color:red;cursor:pointer;">❌</span>`;
  item.querySelector("span").addEventListener("click", () => item.remove());
  historyList.prepend(item);
}

// Weather
navigator.geolocation?.getCurrentPosition(
  (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const weatherKey = WEATHER_API_KEY;
    const geoKey = GEO_API_KEY;

    // Weather Fetch
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherKey}`;

    // Reverse Geocoding to get real city name
    const geoURL = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${geoKey}`;

    // Parallel fetch both
    Promise.all([fetch(weatherURL), fetch(geoURL)])
      .then(async ([weatherRes, geoRes]) => {
        if (!weatherRes.ok || !geoRes.ok) throw new Error("API failed");

        const weatherData = await weatherRes.json();
        const geoData = await geoRes.json();

        const temp = Math.round(weatherData.main.temp);
        const condition = weatherData.weather[0].main;
        const components = geoData.results?.[0]?.components;

        const city =
          components?.city ||
          components?.town ||
          components?.village ||
          components?.hamlet ||
          components?.suburb ||
          components?.county ||
          components?.state ||
          "Unknown";

        document.getElementById("weather").textContent = `📍 ${city} | ${temp}°C ${condition}`;
      })
      .catch((err) => {
        console.error("Weather + City fetch error:", err);
        document.getElementById("weather").textContent = "Weather or City error";
      });
  },
  (err) => {
    console.error("Geolocation blocked:", err);
    document.getElementById("weather").textContent = "Location not allowed";
  }
);

    
  
