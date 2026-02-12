import { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    // Update document class and localStorage
    const root = document.documentElement;
    console.log('[ThemeContext] Updating theme to:', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
      console.log('[ThemeContext] Added dark class to html element');
    } else {
      root.classList.remove('dark');
      console.log('[ThemeContext] Removed dark class from html element');
    }
    localStorage.setItem('theme', theme);
    console.log('[ThemeContext] Saved to localStorage:', theme);
  }, [theme]);

  const toggleTheme = () => {
    console.log('[ThemeContext] toggleTheme called, current theme:', theme);
    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      console.log('[ThemeContext] Switching from', prev, 'to', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
