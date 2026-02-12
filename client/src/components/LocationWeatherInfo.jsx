import { MapPin, Clock, Thermometer, RefreshCw } from 'lucide-react';
import { useLocationWeather } from '../context/LocationWeatherContext';
import { useCurrentTime } from '../hooks/useCurrentTime';

const LocationWeatherInfo = () => {
  const { data, loading, error, retry } = useLocationWeather();
  const currentTime = useCurrentTime();

  if (loading) {
    return (
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="animate-pulse flex items-center gap-2">
          <div className="w-16 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={retry}
          className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
          aria-label="Retry loading location and weather"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="hidden md:inline">Retry</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 text-sm text-gray-600">
      {/* Location */}
      {data.city && (
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          <span className="whitespace-nowrap">
            {data.city}, {data.region}
          </span>
        </div>
      )}

      {/* Current Time */}
      <div className="flex items-center gap-1.5">
        <Clock className="w-4 h-4" />
        <span>{currentTime}</span>
      </div>

      {/* Temperature */}
      {data.temperature !== null && (
        <div className="flex items-center gap-1.5">
          <Thermometer className="w-4 h-4" />
          <span>{data.temperature}°C</span>
        </div>
      )}
    </div>
  );
};

export default LocationWeatherInfo;
