import { useEffect, useState } from 'react';
import { Sun, Moon, Sunrise, MapPin, Clock, Thermometer, Calendar } from 'lucide-react';
import { useLocationWeather } from '../context/LocationWeatherContext';
import { useCurrentTime } from '../hooks/useCurrentTime';

const Greeting = () => {
  const [greeting, setGreeting] = useState('');
  const [icon, setIcon] = useState(null);
  const { data, loading } = useLocationWeather();
  const currentTime = useCurrentTime();

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();

      if (hour < 12) {
        setGreeting('Good Morning');
        setIcon(<Sunrise className="w-6 h-6 text-orange-300" />);
      } else if (hour < 18) {
        setGreeting('Good Afternoon');
        setIcon(<Sun className="w-6 h-6 text-yellow-300" />);
      } else {
        setGreeting('Good Evening');
        setIcon(<Moon className="w-6 h-6 text-indigo-200" />);
      }
    };

    updateGreeting();
    // Update greeting every minute
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  // Get current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="mb-8 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 shadow-lg">
      {/* Greeting */}
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <div>
          <h2 className="text-2xl font-bold">{greeting}!</h2>
          <p className="text-blue-100 mt-1">Ready to tackle your tasks today?</p>
        </div>
      </div>

      {/* Location, Date, Time, Temperature */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-white/90 border-t border-white/20 pt-4">
        {/* Location */}
        {!loading && data.city && (
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span>{data.city}, {data.region}</span>
          </div>
        )}

        {/* Date */}
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>{currentDate}</span>
        </div>

        {/* Time */}
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{currentTime}</span>
        </div>

        {/* Temperature */}
        {!loading && data.temperature !== null && (
          <div className="flex items-center gap-1.5">
            <Thermometer className="w-4 h-4" />
            <span>{data.temperature}°C</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Greeting;
