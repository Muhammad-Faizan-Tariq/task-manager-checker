import { useState, useEffect } from 'react';

/**
 * Custom hook that returns the current time and updates every minute
 * @returns {string} Formatted time string (e.g., "2:45 PM")
 */
export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update immediately
    setCurrentTime(new Date());

    // Then update every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 60 seconds

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return formatTime(currentTime);
};
