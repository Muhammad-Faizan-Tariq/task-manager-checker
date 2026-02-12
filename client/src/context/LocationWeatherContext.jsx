import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { getLocationAndWeather } from '../services/locationWeatherApi';

const LocationWeatherContext = createContext();

export const LocationWeatherProvider = ({ children }) => {
  const [data, setData] = useState({
    city: null,
    region: null,
    country: null,
    temperature: null,
    condition: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getLocationAndWeather();
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to load location/weather data');
      console.error('LocationWeather fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const retry = () => {
    fetchData();
  };

  return (
    <LocationWeatherContext.Provider value={{ data, loading, error, retry }}>
      {children}
    </LocationWeatherContext.Provider>
  );
};

export const useLocationWeather = () => {
  const context = useContext(LocationWeatherContext);
  if (!context) {
    throw new Error('useLocationWeather must be used within LocationWeatherProvider');
  }
  return context;
};
