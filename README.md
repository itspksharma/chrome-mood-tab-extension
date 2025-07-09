# 🌈 Chrome Mood Tab Extension

A clean, animated and motivational Chrome new tab extension that plays background videos based on your selected mood: **Sad**, **Moody**, or **Love**.  
It also shows a live **clock**, **date**, **weather**, **motivational quotes**, and includes a Google search bar with history.

---

## 📸 Features

- 🎬 Mood-based background videos (`Sad`, `Moody`, `Love`)
- 🕓 Live Clock & Full Date
- 🌦️ Weather Info with Auto Location (via OpenWeatherMap)
- 🔍 Google Search Bar with history + clear option
- 💬 Motivational Quotes (Mood-based)
- 🧠 Dynamic text color detection based on background
- 📍City Name with Weather
- 💻 Mobile-optimized UI (experimental)

---

## ⚙️ How to Use (Manually Install in Chrome)

1. **Download the ZIP** or clone this repo:
   ```bash 
   git clone https://github.com/itspksharma/chrome-mood-tab-extension.git

2. Go to chrome://extensions/ in Chrome.

3. Enable Developer Mode (top-right switch)

4. Click on Load Unpacked

5. Select the chrome-mood-tab-extension/ folder (unzipped)

✅ Now open a new tab and enjoy your Mood-Based Extension!

🔑 Setup Your API Keys
To enable live weather and city name, you must provide your own API keys:

1. Copy config-sample.js and rename it to config.js

2. Edit config.js like this:

// config.js
const WEATHER_API_KEY = "your_openweathermap_key_here";
const GEO_API_KEY = "your_opencage_key_here";

3. Don't share your keys publicly. This file is ignored in .gitignore.

🔐 Secure Setup
This project uses a config.js file for sensitive keys which is:

🔒 Ignored in Git (.gitignore)

⚠️ Not pushed to GitHub or shared in public ZIPs

✅ Required only for weather/location functionality

🧰 Tech Stack
HTML5, CSS3, JavaScript (Vanilla)

TailwindCSS for basic animations

OpenWeatherMap API

OpenCage Geo API

🙏 Credits
Videos used are free from Pexels, Coverr or generated

Icons & Emojis from Google Fonts/Unicode

Quotes curated manually for each mood

🚀 Author
Made by Pawan Kumar Sharma
GitHub