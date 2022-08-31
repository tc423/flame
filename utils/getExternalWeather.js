const Weather = require('../models/Weather');
const axios = require('axios');
const loadConfig = require('./loadConfig');

const getExternalWeather = async () => {
  const { WEATHER_API_KEY: secret, lat, long } = await loadConfig();

  // Fetch data from external API
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${secret}`
  );

    // Save weather data
    const cursor = res.data.current;
    const weatherData = await Weather.create({
      tempC: cursor.temp-273.15,
      humidity: cursor.humidity,
    });
    return weatherData;
  } catch (err) {
    throw new Error('External API request failed');
  }
};

module.exports = getExternalWeather;
