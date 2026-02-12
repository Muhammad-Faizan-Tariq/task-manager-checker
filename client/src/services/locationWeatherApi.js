const CACHE_KEY = 'location_weather_cache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Fetch location data from IP address using ip-api.com (free, CORS-enabled, no API key required)
 * @returns {Promise<Object>} Location data with city, region, latitude, longitude
 */
export const getLocationFromIP = async () => {
  try {
    // Using ip-api.com which is CORS-friendly
    const response = await fetch('http://ip-api.com/json/?fields=status,message,country,regionName,city,lat,lon');
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    const data = await response.json();

    if (data.status === 'fail') {
      throw new Error(data.message || 'Failed to get location');
    }

    return {
      city: data.city,
      region: data.regionName,
      country: data.country,
      latitude: data.lat,
      longitude: data.lon
    };
  } catch (error) {
    console.error('Error fetching location:', error);
    throw error;
  }
};

/**
 * Fetch weather data from Open-Meteo (free, no API key required)
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Weather data with temperature and conditions
 */
export const getWeather = async (lat, lon) => {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=celsius`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    return {
      temperature: Math.round(data.current_weather.temperature),
      weatherCode: data.current_weather.weathercode,
      condition: getWeatherCondition(data.current_weather.weathercode)
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

/**
 * Convert weather code to human-readable condition
 * @param {number} code - WMO Weather code
 * @returns {string} Weather condition description
 */
const getWeatherCondition = (code) => {
  if (code === 0) return 'Clear';
  if (code <= 3) return 'Partly Cloudy';
  if (code <= 48) return 'Foggy';
  if (code <= 67) return 'Rainy';
  if (code <= 77) return 'Snowy';
  return 'Stormy';
};

/**
 * Get cached location/weather data if available and not expired
 * @returns {Object|null} Cached data or null if expired/not found
 */
export const getCachedData = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);

    // Check if cache is still valid
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
};

/**
 * Save location/weather data to cache
 * @param {Object} data - Data to cache
 */
export const setCachedData = (data) => {
  try {
    const cacheObject = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObject));
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

/**
 * Fetch complete location and weather information
 * @returns {Promise<Object>} Combined location and weather data
 */
export const getLocationAndWeather = async () => {
  try {
    // Try to get cached data first
    const cached = getCachedData();
    if (cached) {
      console.log('Using cached location/weather data');
      return cached;
    }

    // Fetch fresh data
    const location = await getLocationFromIP();
    const weather = await getWeather(location.latitude, location.longitude);

    const combinedData = {
      city: location.city,
      region: location.region,
      country: location.country,
      temperature: weather.temperature,
      condition: weather.condition
    };

    // Cache the data
    setCachedData(combinedData);

    return combinedData;
  } catch (error) {
    console.error('Error fetching location and weather:', error);
    throw error;
  }
};
